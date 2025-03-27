import { CharacterReader } from "./character-reader";

// Note: Completed with assitance from Meme (@meme.magician) on Discord

type Token = {
  type: string;
  value?: string;
};

type AnnotatedToken = {
  type: string;
  value?: string;
  start: number;
  end: number;
};

const supportedOperators: string[] = ["OR", "AND", "NOT"];
const supportedOrigins: string[] = ["TREE", "TEMPLATE", "TRAIT", "MOVE"];

export class Lexer {
  tokenDetectors: ((reader: CharacterReader) => Token | null)[];

  constructor() {
    this.tokenDetectors = [];
    this.initializeTokenDetectors();
  }

  initializeTokenDetectors(): void {
    this.tokenDetectors = [
      this.readGroups,
      this.readOrigins,
      this.readNames,
      this.readOperators,
      this.readWhitespace,
    ];
  }

  readGroups(reader: CharacterReader): Token | null {
    if (reader.peek() === "(") {
      reader.next();
      return { type: "groupStart" };
    } else if (reader.peek() === ")") {
      reader.next();
      return { type: "groupEnd" };
    } else {
      return null;
    }
  }

  readNames(reader: CharacterReader): Token | null {
    if (reader.peek() === "<") {
      let value: string = "";

      reader.next();
      while (reader.peek() !== ">") {
        value += reader.peek();
        reader.next();
      }
      reader.next();

      if (value.length > 0) {
        return { type: "name", value: value };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  readOrigins(reader: CharacterReader): Token | null {
    const originMatch: RegExp = new RegExp(`^(${supportedOrigins.join("|")})$`);

    let value: string = "";

    for (
      let i = 1;
      i <= Math.max(...supportedOrigins.map((x) => x.length));
      i++
    ) {
      const originPeek: string = reader.peek(i);
      if (originPeek.match(originMatch)) {
        reader.next(i);
        value = originPeek;
      }
    }

    if (value.length > 0) {
      return { type: "origin", value: value.toLowerCase() + "s" };
    } else {
      return null;
    }
  }

  readOperators(reader: CharacterReader): Token | null {
    const operatorMatch: RegExp = new RegExp(
      `^(${supportedOperators.join("|")})$`
    );

    let value: string = "";

    for (
      let i = 1;
      i <= Math.max(...supportedOperators.map((x) => x.length));
      i++
    ) {
      const operatorPeek: string = reader.peek(i);
      if (operatorPeek.match(operatorMatch)) {
        reader.next(i);
        value = operatorPeek;
      }
    }

    if (value.length > 0) {
      return { type: "operator", value: value };
    } else {
      return null;
    }
  }

  readWhitespace(reader: CharacterReader): Token | null {
    if (reader.peek() === " ") {
      reader.next();
      return { type: "whitespace" };
    } else {
      return null;
    }
  }

  analyzeCode(code: string): AnnotatedToken[] {
    const codeCharacterReader: CharacterReader = new CharacterReader(code);
    const codeAnnotatedTokens: AnnotatedToken[] = [];
    while (codeCharacterReader.hasNext()) {
      let codePositonStart = codeCharacterReader.getPosition();
      let codePositionEnd = codePositonStart + 1;

      let currentTokenDetected: Token | null = null;
      for (var i = 0; i < this.tokenDetectors.length; i++) {
        currentTokenDetected = this.tokenDetectors[i](codeCharacterReader);
        codePositionEnd = codeCharacterReader.getPosition();
        if (currentTokenDetected != null) {
          break;
        }
      }

      if (currentTokenDetected == null) {
        throw new Error(
          "Invalid Input: Expression Does Not Match Valid Patterns"
        );
      } else {
        let currentAnnotatedToken: AnnotatedToken = {
          type: currentTokenDetected.type,
          value: currentTokenDetected.value,
          start: codePositonStart,
          end: codePositionEnd,
        };
        codeAnnotatedTokens.push(currentAnnotatedToken);
      }
    }
    return codeAnnotatedTokens.filter((currentAnnotatedToken) => {
      return currentAnnotatedToken.type != "whitespace";
    });
  }
}
