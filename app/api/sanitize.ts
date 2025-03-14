import {
  Trait,
  Zodiac,
  Tree,
  Template,
  TemplatesOnTraits,
  Move,
  MovesOnTraits,
  Pronoun,
  Quirk,
  Color,
} from "@/app/lib/prisma-definitions";
import {
  isTrait,
  isZodiac,
  isTree,
  isTemplate,
  isTemplatesOnTraits,
  isMove,
  isMovesOnTraits,
  isPronoun,
  isQuirk,
  isColor,
} from "@/app/lib/prisma-definitions";

// https://github.com/colinhacks/zod
export function sanitize(data: Zodiac): Zodiac | null;
export function sanitize(data: Tree): Tree | null;
export function sanitize(data: Template): Template | null;
export function sanitize(data: TemplatesOnTraits): TemplatesOnTraits | null;
export function sanitize(data: Move): Move | null;
export function sanitize(data: MovesOnTraits): MovesOnTraits | null;
export function sanitize(data: Pronoun): Pronoun | null;
export function sanitize(data: Quirk): Quirk | null;
export function sanitize(data: Trait): Trait | null;
export function sanitize(data: Color): Color | null;
export function sanitize(
  data:
    | Zodiac
    | Tree
    | Template
    | TemplatesOnTraits
    | Move
    | MovesOnTraits
    | Pronoun
    | Quirk
    | Trait
    | Color
):
  | Zodiac
  | Tree
  | Template
  | TemplatesOnTraits
  | Move
  | MovesOnTraits
  | Pronoun
  | Quirk
  | Trait
  | Color
  | null {
  try {
    if (isZodiac(data)) {
      console.log(2);
      return data;
    } else if (isTree(data)) {
      console.log(3);
      return data;
    } else if (isTemplate(data)) {
      console.log(4);
      return data;
    } else if (isTemplatesOnTraits(data)) {
      console.log(5);
      return data;
    } else if (isMove(data)) {
      console.log(6);
      return data;
    } else if (isMovesOnTraits(data)) {
      console.log(7);
      return data;
    } else if (isPronoun(data)) {
      console.log(8);
      return data;
    } else if (isQuirk(data)) {
      console.log(9);
      return data;
    } else if (isTrait(data)) {
      console.log(1);
      return data;
    } else if (isColor(data)) {
      console.log(10);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
