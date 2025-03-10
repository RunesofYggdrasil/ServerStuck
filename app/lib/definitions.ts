import { TraitName, TraitType, TreeName } from "@prisma/client";
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
  traits?: TemplatesOnTraits[] | undefined;
  traitIDs?: number[] | undefined;
}

export interface TemplatesOnTraits {
  id?: number | undefined;
  type: TraitType;
  template: Template;
  templateID: number;
  trait: Trait;
  traitID: number;
}

export interface Move {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  tree: TreeName;
  source?: Trait | undefined;
  sourceID?: number | undefined;
  traits?: MovesOnTraits[] | undefined;
  traitIDs?: number[] | undefined;
}

export interface MovesOnTraits {
  id?: number | undefined;
  type: TraitType;
  move: Move;
  moveID: number;
  trait: Trait;
  traitID: number;
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

// ---
// Section: User-Defined Type Guards
// ---

export function isTrait(data: any): data is Trait {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "type" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "match" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "tree" in data
    )
  );
}

export function isZodiac(data: any): data is Zodiac {
  return (
    typeof data === "object" &&
    data !== null &&
    "aspect" in data &&
    "caste" in data &&
    "name" in data &&
    "sway" in data &&
    "title" in data &&
    !(
      "cases" in data ||
      "match" in data ||
      "replace" in data ||
      "source" in data ||
      "tree" in data ||
      "type" in data
    )
  );
}

export function isTree(data: any): data is Tree {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "source" in data &&
    "type" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "match" in data ||
      "replace" in data ||
      "sway" in data ||
      "title" in data ||
      "tree" in data
    )
  );
}

export function isTemplate(data: any): data is Template {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "match" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "tree" in data ||
      "type" in data
    )
  );
}

export function isMove(data: any): data is Move {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "tree" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "match" in data ||
      "replace" in data ||
      "sway" in data ||
      "title" in data
    )
  );
}

export function isPronoun(data: any): data is Pronoun {
  return (
    typeof data === "object" &&
    data !== null &&
    "cases" in data &&
    "name" in data &&
    !(
      "aspect" in data ||
      "caste" in data ||
      "match" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "tree" in data ||
      "type" in data
    )
  );
}

export function isQuirk(data: any): data is Quirk {
  return (
    typeof data === "object" &&
    data !== null &&
    "match" in data &&
    "name" in data &&
    "replace" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "tree" in data ||
      "type" in data
    )
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
  traitIDs: z.number().array().optional(),
});

export const TemplatesOnTraitsSchema = z.object({
  id: z.number().optional(),
  type: z.nativeEnum(TraitType),
  template: TemplateSchema,
  templateID: z.number(),
  trait: TraitSchema,
  traitID: z.number(),
});

export const MoveSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  desc: z.string().optional(),
  tree: z.nativeEnum(TreeName),
  source: TraitSchema.optional(),
  sourceID: z.number().optional(),
  traitIDs: z.number().array().optional(),
});

export const MovesOnTraitsSchema = z.object({
  id: z.number().optional(),
  type: z.nativeEnum(TraitType),
  move: MoveSchema,
  moveID: z.number(),
  trait: TraitSchema,
  traitID: z.number(),
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
