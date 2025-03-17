import {
  ExpressionType,
  ModelName,
  TraitName,
  TraitType,
  TreeName,
} from "@prisma/client";
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
  caste?: Trait | undefined;
  sway?: Trait | undefined;
  aspect?: Trait | undefined;
  casteID: number;
  swayID: number;
  aspectID: number;
}

export interface Tree {
  id?: number | undefined;
  name: string;
  desc?: string | undefined;
  type: TraitName;
  source?: Trait | undefined;
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
  template?: Template | undefined;
  templateID: number;
  trait?: Trait | undefined;
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
  expression?: ExpressionBuilder | undefined;
  expressionID?: number;
}

export interface MovesOnTraits {
  id?: number | undefined;
  type: TraitType;
  move?: Move | undefined;
  moveID: number;
  trait?: Trait | undefined;
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

export interface Color {
  id?: number | undefined;
  hex: string;
  origin: ModelName;
  originID: number;
}

export interface ExpressionBuilder {
  id?: number | undefined;
  name?: string | undefined;
  public: boolean;
  type: ExpressionType;
  move?: Move | undefined;
  moveID?: number | undefined;
  expression?: ExpressionBuilder | undefined;
  expressionID?: number | undefined;
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
      "hex" in data ||
      "match" in data ||
      "origin" in data ||
      "public" in data ||
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
      "hex" in data ||
      "match" in data ||
      "origin" in data ||
      "public" in data ||
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
      "hex" in data ||
      "match" in data ||
      "origin" in data ||
      "public" in data ||
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
      "hex" in data ||
      "match" in data ||
      "origin" in data ||
      "public" in data ||
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
      "hex" in data ||
      "match" in data ||
      "move" in data ||
      "name" in data ||
      "origin" in data ||
      "public" in data ||
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
      "hex" in data ||
      "match" in data ||
      "public" in data ||
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
      "hex" in data ||
      "match" in data ||
      "name" in data ||
      "origin" in data ||
      "public" in data ||
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
      "hex" in data ||
      "match" in data ||
      "origin" in data ||
      "public" in data ||
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
      "hex" in data ||
      "origin" in data ||
      "public" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "type" in data
    )
  );
}

export function isColor(data: any): data is Color {
  return (
    typeof data === "object" &&
    data !== null &&
    "hex" in data &&
    "origin" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "match" in data ||
      "name" in data ||
      "public" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "tree" in data ||
      "type" in data
    )
  );
}

export function isExpressionBuilder(data: any): data is ExpressionBuilder {
  return (
    typeof data === "object" &&
    data !== null &&
    "public" in data &&
    "type" in data &&
    !(
      "aspect" in data ||
      "cases" in data ||
      "caste" in data ||
      "hex" in data ||
      "match" in data ||
      "origin" in data ||
      "replace" in data ||
      "source" in data ||
      "sway" in data ||
      "title" in data ||
      "tree" in data
    )
  );
}

// ---
// Section: Regex
// ---

const zodiacTitleRegex: RegExp =
  /^(Sign\sof\sthe\s|SIGN\sOF\sTHE\s)([A-Z][A-Za-z]*\s(?:(?=[A-Z])[A-Z][A-Za-z]*|))$/;
const quirkMatchRegex: RegExp = /^\/.*\/[ADJUgimsux]{0,10}$/;
const hexRegex: RegExp = /^#?[0-9A-Fa-f]{6}$/;

// ---
// Section: Schemas
// ---

export const TraitSchema = z.object({
  id: z.number().optional(),
  name: z.string().transform((value) => {
    return value.toUpperCase();
  }),
  desc: z.string().optional(),
  type: z.nativeEnum(TraitName),
});

export const ZodiacSchema = z.object({
  id: z.number().optional(),
  name: z.string().transform((value) => {
    return value.toUpperCase();
  }),
  title: z
    .string()
    .regex(zodiacTitleRegex)
    .transform((value) => {
      return value.toUpperCase();
    }),
  caste: TraitSchema.optional(),
  sway: TraitSchema.optional(),
  aspect: TraitSchema.optional(),
  casteID: z.number(),
  swayID: z.number(),
  aspectID: z.number(),
});

export const TreeSchema = z.object({
  id: z.number().optional(),
  name: z.string().transform((value) => {
    return value.toUpperCase();
  }),
  desc: z.string().optional(),
  type: z.nativeEnum(TraitName),
  source: TraitSchema.optional(),
  sourceID: z.number(),
});

export const TemplateSchema = z.object({
  id: z.number().optional(),
  name: z.string().transform((value) => {
    return value.toUpperCase();
  }),
  desc: z.string().optional(),
});

export const TemplatesOnTraitsSchema = z.object({
  id: z.number().optional(),
  type: z.nativeEnum(TraitType),
  template: TemplateSchema.optional(),
  templateID: z.number(),
  trait: TraitSchema.optional(),
  traitID: z.number(),
});

const MoveSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().transform((value) => {
      return value.toUpperCase();
    }),
    desc: z.string().optional(),
    origin: z.nativeEnum(TreeName),
    originID: z.number().optional(),
    expression: z.lazy(() => ExpressionBuilderSchema).optional(),
    expressionID: z.number().optional(),
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
  move: MoveSchema.optional(),
  moveID: z.number(),
  trait: TraitSchema.optional(),
  traitID: z.number(),
});

export const PronounSchema = z.object({
  id: z.number().optional(),
  name: z.string().transform((value) => {
    return value.toUpperCase();
  }),
  cases: z
    .object({
      nom: z.string().transform((value) => {
        return value.toUpperCase();
      }),
      obj: z.string().transform((value) => {
        return value.toUpperCase();
      }),
      det: z.string().transform((value) => {
        return value.toUpperCase();
      }),
      pos: z.string().transform((value) => {
        return value.toUpperCase();
      }),
      ref: z.string().transform((value) => {
        return value.toUpperCase();
      }),
    })
    .or(
      z
        .string()
        .array()
        .length(5)
        .transform((value) => {
          return [
            value[0].toUpperCase(),
            value[1].toUpperCase(),
            value[2].toUpperCase(),
            value[3].toUpperCase(),
            value[4].toUpperCase(),
          ];
        })
    ),
});

export const QuirkSchema = z.object({
  id: z.number().optional(),
  name: z.string().transform((value) => {
    return value.toUpperCase();
  }),
  desc: z.string().optional(),
  match: z.string().regex(quirkMatchRegex),
  replace: z.string(),
});

export const ColorSchema = z.object({
  id: z.number().optional(),
  hex: z
    .string()
    .regex(hexRegex)
    .refine((value) => {
      if (value.startsWith("#")) {
        return value.substring(1);
      } else {
        return value;
      }
    }),
  origin: z.nativeEnum(ModelName),
  originID: z.number(),
});

export const ExpressionBuilderSchema: z.ZodType<ExpressionBuilder> = z.lazy(
  () =>
    z
      .object({
        id: z.number().optional(),
        name: z
          .string()
          .transform((value) => {
            return value.toUpperCase();
          })
          .optional(),
        public: z.boolean(),
        type: z.nativeEnum(ExpressionType),
        move: MoveSchema.optional(),
        moveID: z.number().optional(),
        expression: ExpressionBuilderSchema.optional(),
        expressionID: z.number().optional(),
      })
      .refine((data) => {
        if (data.moveID != undefined || data.expressionID != undefined) {
          return true;
        } else {
          return false;
        }
      })
);

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

export function toModelName(value: string): ModelName {
  switch (value) {
    case "TRAIT":
      return ModelName.TRAIT;
    case "ZODIAC":
      return ModelName.ZODIAC;
    case "TREE":
      return ModelName.TREE;
    case "TEMPLATE":
      return ModelName.TEMPLATE;
    case "MOVE":
      return ModelName.MOVE;
    case "PRONOUN":
      return ModelName.PRONOUN;
    case "QUIRK":
      return ModelName.QUIRK;
    default:
      return ModelName.TRAIT;
  }
}

export function toExpressionType(value: string): ExpressionType {
  switch (value) {
    case "AND":
      return ExpressionType.AND;
    case "OR":
      return ExpressionType.OR;
    case "NOT":
      return ExpressionType.NOT;
    default:
      return ExpressionType.AND;
  }
}
