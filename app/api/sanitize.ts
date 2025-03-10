import {
  Trait,
  Zodiac,
  Tree,
  Template,
  Move,
  Pronoun,
  Quirk,
  TraitName,
  TreeName,
} from "@/app/lib/definitions";
import {
  isTrait,
  isZodiac,
  isTree,
  isTemplate,
  isMove,
  isPronoun,
  isQuirk,
} from "@/app/lib/definitions";

// https://github.com/colinhacks/zod
export function sanitize(data: Trait): Trait | null;
export function sanitize(data: Zodiac): Zodiac | null;
export function sanitize(data: Tree): Tree | null;
export function sanitize(data: Template): Template | null;
export function sanitize(data: Move): Move | null;
export function sanitize(data: Pronoun): Pronoun | null;
export function sanitize(data: Quirk): Quirk | null;
export function sanitize(data: unknown): unknown {
  try {
    if (isTrait(data)) {
      console.log(1);
    } else if (isZodiac(data)) {
      console.log(2);
    } else if (isTree(data)) {
      console.log(3);
    } else if (isTemplate(data)) {
      console.log(4);
    } else if (isMove(data)) {
      console.log(5);
    } else if (isPronoun(data)) {
      console.log(6);
    } else if (isQuirk(data)) {
      console.log(7);
    } else {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
}
