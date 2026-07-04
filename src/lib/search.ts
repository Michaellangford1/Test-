import MiniSearch from 'minisearch';
import type { GuideRecord, ReferenceRecord } from '../db/db';

export interface SearchDoc {
  key: string; // `${type}:${id}` to keep guide/reference ids distinct
  type: 'guide' | 'reference';
  id: string;
  title: string;
  category: string;
  tags: string;
  text: string;
}

export interface SearchResultGroup {
  guides: SearchDoc[];
  reference: SearchDoc[];
}

function guideToDoc(g: GuideRecord): SearchDoc {
  return {
    key: `guide:${g.id}`,
    type: 'guide',
    id: g.id,
    title: g.title,
    category: g.category,
    tags: g.tags.join(' '),
    text: `${g.houseNotes} ${g.steps.map((s) => `${s.text} ${s.note}`).join(' ')}`,
  };
}

function refToDoc(r: ReferenceRecord): SearchDoc {
  return {
    key: `reference:${r.id}`,
    type: 'reference',
    id: r.id,
    title: r.title,
    category: r.category,
    tags: r.tags.join(' '),
    text: r.body,
  };
}

let index: MiniSearch<SearchDoc> | null = null;

function makeIndex(): MiniSearch<SearchDoc> {
  return new MiniSearch<SearchDoc>({
    idField: 'key',
    fields: ['title', 'tags', 'text', 'category'],
    storeFields: ['type', 'id', 'title', 'category'],
    searchOptions: {
      boost: { title: 3, tags: 2 },
      prefix: true,
      fuzzy: 0.2,
    },
  });
}

// Rebuilt whenever data changes.
export function rebuildIndex(guides: GuideRecord[], reference: ReferenceRecord[]): void {
  index = makeIndex();
  index.addAll([...guides.map(guideToDoc), ...reference.map(refToDoc)]);
}

export function runSearch(query: string): SearchResultGroup {
  if (!index || !query.trim()) return { guides: [], reference: [] };
  const results = index.search(query) as unknown as SearchDoc[];
  return {
    guides: results.filter((r) => r.type === 'guide'),
    reference: results.filter((r) => r.type === 'reference'),
  };
}
