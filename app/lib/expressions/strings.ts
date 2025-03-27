import { Lexer } from "./lexer-reader";

export function formatExpressionString(expressionString: string): string {
  const lexer = new Lexer();
  const lexerMessage = lexer.analyzeCode(expressionString);
  return JSON.stringify(lexerMessage);
}
