import { z } from 'zod';

// --- Content exchange format (schema v1) -----------------------------------

export const GUIDE_CATEGORIES = [
  'Plumbing',
  'Electrics',
  'Heating & Cooling',
  'Walls & Decorating',
  'Fixings & Furniture',
  'Appliances',
  'Outdoors & Garden',
  'Safety & Monitoring',
] as const;

export const REFERENCE_CATEGORIES = [
  'Utilities',
  'Structure & Monitoring',
  'Appliances & Manuals',
  'Decor & Finishes',
  'Outdoors',
] as const;

export const DIFFICULTIES = ['Easy', 'Moderate', 'Involved'] as const;

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];
export type ReferenceCategory = (typeof REFERENCE_CATEGORIES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type Source = 'seed' | 'claude' | 'manual';

// Friendly issue path used when surfacing validation errors, e.g. "steps[3].text".
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path
        .map((p) => (typeof p === 'number' ? `[${p}]` : p))
        .join('.')
        .replace(/\.\[/g, '[');
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join('\n');
}

// Step within a guide. photoIds are attached in-app and never travel in the
// exchange format, so they are optional on import.
export const stepSchema = z.object({
  text: z.string({ required_error: 'is missing', invalid_type_error: 'must be text' }).min(1, 'is missing'),
  note: z.string().optional().default(''),
  photoIds: z.array(z.string()).optional(),
});

export const guidePayloadSchema = z.object({
  id: z
    .string()
    .min(1, 'is missing')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case (lowercase, hyphens)'),
  title: z.string().min(1, 'is missing'),
  category: z.enum(GUIDE_CATEGORIES, {
    errorMap: () => ({ message: `must be one of: ${GUIDE_CATEGORIES.join(', ')}` }),
  }),
  difficulty: z.enum(DIFFICULTIES, {
    errorMap: () => ({ message: `must be one of: ${DIFFICULTIES.join(', ')}` }),
  }),
  timeEstimate: z.string().min(1, 'is missing'),
  tools: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  safety: z.array(z.string()).default([]),
  houseNotes: z.string().optional().default(''),
  steps: z.array(stepSchema).min(1, 'a guide needs at least one step'),
  tags: z.array(z.string()).default([]),
});

export const referencePayloadSchema = z.object({
  id: z
    .string()
    .min(1, 'is missing')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case (lowercase, hyphens)'),
  title: z.string().min(1, 'is missing'),
  category: z.enum(REFERENCE_CATEGORIES, {
    errorMap: () => ({ message: `must be one of: ${REFERENCE_CATEGORIES.join(', ')}` }),
  }),
  body: z.string().default(''),
  tags: z.array(z.string()).default([]),
});

// The House Profile is a free-form structured object; we validate the envelope
// and keep the inner object flexible so it can grow over time.
export const profileDataSchema = z
  .object({
    areaAndClimate: z.string().optional(),
    property: z.record(z.any()).optional(),
    utilities: z.record(z.any()).optional(),
    knownIssues: z.array(z.string()).optional(),
    appliances: z.array(z.any()).optional(),
    decorAndFinishes: z.record(z.any()).optional(),
    outdoors: z.string().optional(),
    household: z.string().optional(),
    freeformNotes: z.string().optional(),
  })
  .passthrough();

export const envelopeSchema = z.object({
  homeManual: z.literal(1, {
    errorMap: () => ({ message: 'not a House Manual payload (expected "homeManual": 1)' }),
  }),
  type: z.enum(['guide', 'reference', 'profile'], {
    errorMap: () => ({ message: 'type must be "guide", "reference" or "profile"' }),
  }),
  guide: guidePayloadSchema.optional(),
  reference: referencePayloadSchema.optional(),
  profile: profileDataSchema.optional(),
});

export type GuidePayload = z.infer<typeof guidePayloadSchema>;
export type ReferencePayload = z.infer<typeof referencePayloadSchema>;
export type ProfileData = z.infer<typeof profileDataSchema>;
export type Envelope = z.infer<typeof envelopeSchema>;

export type ParsedPayload =
  | { type: 'guide'; guide: GuidePayload }
  | { type: 'reference'; reference: ReferencePayload }
  | { type: 'profile'; profile: ProfileData };

// Parse an already-JSON-parsed object into a typed payload, or throw a ZodError.
export function parseEnvelope(obj: unknown): ParsedPayload {
  const env = envelopeSchema.parse(obj);
  if (env.type === 'guide') {
    if (!env.guide) throw new z.ZodError([{ code: 'custom', path: ['guide'], message: 'is missing' }]);
    return { type: 'guide', guide: guidePayloadSchema.parse(env.guide) };
  }
  if (env.type === 'reference') {
    if (!env.reference)
      throw new z.ZodError([{ code: 'custom', path: ['reference'], message: 'is missing' }]);
    return { type: 'reference', reference: referencePayloadSchema.parse(env.reference) };
  }
  if (!env.profile)
    throw new z.ZodError([{ code: 'custom', path: ['profile'], message: 'is missing' }]);
  return { type: 'profile', profile: profileDataSchema.parse(env.profile) };
}
