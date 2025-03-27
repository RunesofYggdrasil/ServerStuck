import { Lexer } from "./lexer-reader";

export function formatExpressionString(
  expressionString: string
): string | undefined {
  const lexer = new Lexer();
  try {
    const lexerMessage = lexer.analyzeCode(expressionString);
    return JSON.stringify(lexerMessage);
  } catch (error) {
    return undefined;
  }
}
