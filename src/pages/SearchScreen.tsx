import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { runSearch } from '../lib/search';
import { categoryAccent } from '../lib/categories';

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => runSearch(query), [query]);
  const hasQuery = query.trim().length > 0;
  const empty = hasQuery && results.guides.length === 0 && results.reference.length === 0;

  return (
    <div>
      <PageHeader title="Search" back />
      <div className="relative mb-5">
        <Search
          size={20}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
        />
        <input
          ref={inputRef}
          className="input pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides and reference…"
        />
      </div>

      {results.guides.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-60">Guides</h2>
          <ul className="space-y-2">
            {results.guides.map((r) => (
              <li key={r.key}>
                <Link
                  to={`/guide/${r.id}`}
                  className="card block p-3.5"
                  style={{ borderLeft: `4px solid ${categoryAccent(r.category)}` }}
                >
                  <p className="font-bold">{r.title}</p>
                  <p className="text-sm opacity-70">{r.category}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.reference.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-60">
            Reference
          </h2>
          <ul className="space-y-2">
            {results.reference.map((r) => (
              <li key={r.key}>
                <Link to={`/reference/${r.id}`} className="card block p-3.5">
                  <p className="font-bold">{r.title}</p>
                  <p className="text-sm opacity-70">{r.category}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {empty && <p className="card p-6 text-center opacity-70">No matches for “{query}”.</p>}
      {!hasQuery && (
        <p className="opacity-60">Type to search titles, tags, steps, house notes and reference bodies.</p>
      )}
    </div>
  );
}
