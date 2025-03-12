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
  casteID: number;
  swayID: number;
  aspectID: number;
}

export interface Tree {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  type: TraitName;
  source: Trait;
  sourceID: number;
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
  origin: TreeName;
  originID?: number | undefined;
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
      "origin" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data
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
      "origin" in data ||
      "replace" in data ||
      "source" in data ||
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
      "origin" in data ||
      "replace" in data ||
      "sway" in data ||
      "title" in data
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
      "origin" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "type" in data
    )
  );
}

export function isTemplatesOnTraits(data: any): data is TemplatesOnTraits {
  return (
    typeof data === "object" &&
    data !== null &&
    "template" in data &&
    "trait" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "match" in data ||
      "move" in data ||
      "name" in data ||
      "origin" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "type" in data
    )
  );
}

export function isMove(data: any): data is Move {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "origin" in data &&
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

export function isMovesOnTraits(data: any): data is MovesOnTraits {
  return (
    typeof data === "object" &&
    data !== null &&
    "move" in data &&
    "trait" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "match" in data ||
      "name" in data ||
      "origin" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "template" in data ||
      "title" in data ||
      "type" in data
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
      "origin" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
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
      "origin" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
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
  casteID: z.number(),
  swayID: z.number(),
  aspectID: z.number(),
});

export const TreeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  desc: z.string().optional(),
  type: z.nativeEnum(TraitName),
  source: TraitSchema,
  sourceID: z.number(),
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

export const MoveSchema = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    desc: z.string().optional(),
    origin: z.nativeEnum(TreeName),
    originID: z.number().optional(),
    traitIDs: z.number().array().optional(),
  })
  .refine((data) => {
    if (data.originID == undefined && data.origin != TreeName.GENERICS) {
      return false;
    } else {
      return true;
    }
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

// ---
// Section: Enums
// ---

export function toTraitName(value: string): TraitName {
  switch (value) {
    case "CASTES":
      return TraitName.CASTES;
    case "SWAYS":
      return TraitName.SWAYS;
    case "CLASSES":
      return TraitName.CLASSES;
    case "ASPECTS":
      return TraitName.ASPECTS;
    case "TAGS":
      return TraitName.TAGS;
    default:
      return TraitName.TAGS;
  }
}

export function toTreeName(value: string): TreeName {
  switch (value) {
    case "TREES":
      return TreeName.TREES;
    case "TEMPLATES":
      return TreeName.TEMPLATES;
    case "GENERICS":
      return TreeName.GENERICS;
    default:
      return TreeName.GENERICS;
  }
}
