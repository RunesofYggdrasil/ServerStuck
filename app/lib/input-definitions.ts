import { z } from "zod";

// ---
// Section: Regex
// ---

const nameRegex: RegExp =
  /^(?:(?:\p{L}{6}\s\p{L}{6})|(?:\p{L}{4}\s\p{L}{6,7})|(?:(?:\p{L}{7,9}\s?)+))$/u;
const ageRegex: RegExp = /^\d+$/;
const genderRegex: RegExp = /^(?:\p{L}|\s|\p{P})+$/u;
const trolltagRegex: RegExp = /^(?:\p{Ll}+)(?:\p{Lu}\p{Ll}+)$/u;
const quadrantRegex: RegExp =
  /^(?:(?:\p{P}\s\p{L}+\s|\p{P}?\s)?(?:(?:\p{L}{6}\s\p{L}{6})|(?:\p{L}{4}\s\p{L}{6,7})|(?:(?:\p{L}{7,9}\s?)+)))+$/u;
const lususRegex: RegExp = /^(?:\p{L}|\s)+$/u;
const otherRegex: RegExp = /^(?:\p{L}|\s|\p{P}|\p{N})+$/u;
const summaryRegex: RegExp = /^(?:\p{L}|\s|\p{P})+$/u;

// ---
// Section: Schemas
// ---

export const NameSchema = z.string().regex(nameRegex);
export const AgeSchema = z.string().regex(ageRegex);
export const GenderSchema = z.string().regex(genderRegex);
export const TrollTagSchema = z.string().regex(trolltagRegex);
export const QuadrantSchema = z.string().regex(quadrantRegex);
export const LususSchema = z.string().regex(lususRegex);
export const OtherSchema = z.string().regex(otherRegex);
export const SummarySchema = z.string().regex(summaryRegex);
