import { z } from "zod";

// ---
// Section: Interfaces
// ---

export interface Trait {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  type: TraitName;
}

export interface Zodiac {
  id?: number | undefined;
  name: string;
  title: string;
  caste: Trait;
  sway: Trait;
  aspect: Trait;
  casteID?: number | undefined;
  swayID?: number | undefined;
  aspectID?: number | undefined;
}

export interface Tree {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  type: TraitName;
  source: Trait;
  sourceID?: number | undefined;
}

export interface Template {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  tag: Trait[];
  requires: Trait[];
  prevents: Trait[];
  tagIDs?: number[] | undefined;
  requiresIDs?: number[] | undefined;
  preventsIDs?: number[] | undefined;
}

export interface Move {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  type: TraitName | TreeName;
  source?: Trait | undefined;
  sourceID?: number | undefined;
  tag: Trait[];
  requires: Trait[];
  prevents: Trait[];
  tagIDs?: number[] | undefined;
  requiresIDs?: number[] | undefined;
  preventsIDs?: number[] | undefined;
}

export interface Pronoun {
  id?: number | undefined;
  name: string;
  cases:
    | {
        nom: string;
        obj: string;
        det: string;
        pos: string;
        ref: string;
      }
    | string[];
}

export interface Quirk {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  match: string;
  replace: string;
}

export enum TraitName {
  CASTE = "CASTES",
  SWAY = "LUNAR SWAYS",
  CLASS = "CLASSES",
  ASPECT = "ASPECTS",
  TAG = "TAGS",
}

export enum TreeName {
  TREE = "TREES",
  TEMPLATE = "TEMPLATES",
  GENERIC = "GENERICS",
}

// ---
// Section: User-Defined Type Guards
// ---

export function isTrait(data: any): data is Trait {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "type" in data
  );
}

export function isZodiac(data: any): data is Zodiac {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "title" in data &&
    "caste" in data &&
    "sway" in data &&
    "aspect" in data
  );
}

export function isTree(data: any): data is Tree {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "type" in data &&
    "source" in data
  );
}

export function isTemplate(data: any): data is Template {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "tag" in data &&
    "requires" in data &&
    "prevents" in data
  );
}

export function isMove(data: any): data is Move {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "type" in data &&
    "tag" in data &&
    "requires" in data &&
    "prevents" in data
  );
}

export function isPronoun(data: any): data is Pronoun {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "cases" in data
  );
}

export function isQuirk(data: any): data is Quirk {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "match" in data &&
    "replace" in data
  );
}

// ---
// Section: Regex
// ---

const zodiacRegex: RegExp =
  /(Sign\sof\sthe\s|SIGN\sOF\sTHE\s)([A-Z][A-Za-z]*\s(?:(?=[A-Z])[A-Z][A-Za-z]*|))/;

// ---
// Section: Schemas
// ---

export const TraitSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  desc: z.string().optional(),
  type: z.nativeEnum(TraitName),
});

export const ZodiacSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  title: z.string().regex(zodiacRegex),
  caste: TraitSchema,
  sway: TraitSchema,
  aspect: TraitSchema,
  casteID: z.number().optional(),
  swayID: z.number().optional(),
  aspectID: z.number().optional(),
});

export const TreeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  desc: z.string().optional(),
  type: z.nativeEnum(TraitName),
  source: TraitSchema,
  sourceID: z.number().optional(),
});

export const TemplateSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  desc: z.string().optional(),
  tag: TraitSchema,
  requires: TraitSchema,
  prevents: TraitSchema,
  tagIDs: z.number().optional(),
  requiresIDs: z.number().optional(),
  preventsIDs: z.number().optional(),
});

export const MoveSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  desc: z.string().optional(),
  type: z.nativeEnum(TraitName).or(z.nativeEnum(TreeName)),
  source: TraitSchema,
  sourceID: z.number().optional(),
  tag: TraitSchema,
  requires: TraitSchema,
  prevents: TraitSchema,
  tagIDs: z.number().optional(),
  requiresIDs: z.number().optional(),
  preventsIDs: z.number().optional(),
});

export const PronounSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  cases: z
    .object({
      nom: z.string(),
      obj: z.string(),
      det: z.string(),
      pos: z.string(),
      ref: z.string(),
    })
    .or(z.string().array()),
});

export const QuirkSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  desc: z.string().optional(),
  match: z.string(),
  replace: z.string(),
});
