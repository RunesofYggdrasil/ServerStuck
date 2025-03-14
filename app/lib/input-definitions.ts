import { z } from "zod";

// ---
// Section: Regex
// ---

const nameRegex: RegExp = /^\s*.\s*$/;
const ageRegex: RegExp = /^\d+$/;
const genderRegex: RegExp = /^\s*.\s*$/;
const trolltagRegex: RegExp = /^\s*.\s*$/;
const lususRegex: RegExp = /^\s*.\s*$/;
const otherRegex: RegExp = /^\s*.\s*$/;
const summaryRegex: RegExp = /^\s*.\s*$/;

// ---
// Section: Schemas
// ---

export const NameSchema = z.string().regex(nameRegex);
export const AgeSchema = z.string().trim().regex(ageRegex);
export const GenderSchema = z.string().regex(genderRegex);
export const TrollTagSchema = z.string().regex(trolltagRegex);
export const LususSchema = z.string().regex(lususRegex);
export const OtherSchema = z.string().regex(otherRegex);
export const SummarySchema = z.string().regex(summaryRegex);
