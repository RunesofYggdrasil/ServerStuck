// Note: Completed with assitance from Meme (@meme.magician) on Discord

export class CharacterReader {
  code: string;
  character: number;

  constructor(code: string) {
    this.code = code;
    this.character = 0;
  }

  getPosition(): number {
    return this.character;
  }

  hasNext(): boolean {
    return this.character < this.code.length;
  }

  peek(amount: number = 1): string {
    return this.code.substring(this.character, this.character + amount);
  }

  next(amount: number = 1) {
    this.character += amount;
  }
}
