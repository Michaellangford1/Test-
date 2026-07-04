import type { GuideRecord } from '../db/db';
import type { ProfileData } from '../types/schema';

export type ComposerIntent = 'new-guide' | 'improve-guide' | 'new-reference';

// A compact, human-readable version of schema v1 to paste to Claude.
export const SCHEMA_SNIPPET = `{
  "homeManual": 1,
  "type": "guide" | "reference" | "profile",

  // when type = "guide":
  "guide": {
    "id": "kebab-case-id",
    "title": "string",
    "category": "Plumbing" | "Electrics" | "Heating & Cooling" | "Walls & Decorating" | "Fixings & Furniture" | "Appliances" | "Outdoors & Garden" | "Safety & Monitoring",
    "difficulty": "Easy" | "Moderate" | "Involved",
    "timeEstimate": "string, e.g. 20–30 min",
    "tools": ["string"],
    "materials": ["string"],
    "safety": ["string", "... include one 'Stop and call a professional if…' item"],
    "houseNotes": "string — house-specific pointers; use [TODO: …] for missing details",
    "steps": [ { "text": "string", "note": "optional string" } ],
    "tags": ["string"]
  },

  // when type = "reference":
  "reference": {
    "id": "kebab-case-id",
    "title": "string",
    "category": "Utilities" | "Structure & Monitoring" | "Appliances & Manuals" | "Decor & Finishes" | "Outdoors",
    "body": "markdown string",
    "tags": ["string"]
  }
}`;

// The composer template — implemented verbatim from the brief (§4.3).
const BASE_TEMPLATE = `You are writing content for my personal offline DIY app, "House Manual".
Reply with ONE fenced \`\`\`json code block and nothing else, valid against schema v1 below.

MY HOUSE PROFILE:
{{PROFILE_JSON}}

WHAT I NEED:
{{USER_REQUEST}}

RULES:
- UK terminology, tools, fittings and regulations; metric measurements.
- 5–15 steps, one clear action per step, plain language readable at arm's length.
- Realistic tools/materials lists; a safety array; include one "Stop and call a professional if…" item.
- Use my house profile: put house-specific pointers in houseNotes and step notes. If a detail you need is missing from the profile, write [TODO: …] rather than guessing.
- Never invent details about my house.

SCHEMA V1:
{{SCHEMA_SNIPPET}}`;

const IMPROVE_SUFFIX = `

EXISTING GUIDE:
{{GUIDE_JSON}}`;

const IMPROVE_RULE = `Apply my requested changes. Keep the same "id".`;

function profileJson(profile: ProfileData): string {
  return JSON.stringify({ homeManual: 1, type: 'profile', profile }, null, 2);
}

function guideJson(guide: GuideRecord): string {
  // Strip in-app-only book-keeping fields; photos never travel in the exchange format.
  const { id, title, category, difficulty, timeEstimate, tools, materials, safety, houseNotes, steps, tags } =
    guide;
  const payload = {
    homeManual: 1,
    type: 'guide',
    guide: {
      id,
      title,
      category,
      difficulty,
      timeEstimate,
      tools,
      materials,
      safety,
      houseNotes,
      steps: steps.map((s) => ({ text: s.text, note: s.note })),
      tags,
    },
  };
  return JSON.stringify(payload, null, 2);
}

export interface ComposeArgs {
  intent: ComposerIntent;
  profile: ProfileData;
  request: string;
  existingGuide?: GuideRecord;
}

export function composePrompt({ intent, profile, request, existingGuide }: ComposeArgs): string {
  let userRequest = request.trim();

  if (intent === 'improve-guide' && existingGuide) {
    // Fold the "keep the same id" instruction into the request so it is unmissable.
    userRequest = `${userRequest}\n\n${IMPROVE_RULE}`;
  }
  if (intent === 'new-reference') {
    userRequest = `Create a reference item (type: "reference"), not a guide. ${userRequest}`;
  }

  let prompt = BASE_TEMPLATE.replace('{{PROFILE_JSON}}', profileJson(profile))
    .replace('{{USER_REQUEST}}', userRequest)
    .replace('{{SCHEMA_SNIPPET}}', SCHEMA_SNIPPET);

  if (intent === 'improve-guide' && existingGuide) {
    prompt += IMPROVE_SUFFIX.replace('{{GUIDE_JSON}}', guideJson(existingGuide));
  }

  return prompt;
}

// Blank schema helper for manual Claude chats (Settings → "Copy blank schema").
export const BLANK_SCHEMA_HELPER = `${BASE_TEMPLATE.replace(
  '{{PROFILE_JSON}}',
  '{ ...paste your House Profile JSON here... }',
)
  .replace('{{USER_REQUEST}}', '...describe the guide or reference item you want...')
  .replace('{{SCHEMA_SNIPPET}}', SCHEMA_SNIPPET)}`;
