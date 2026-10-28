export type WordToken = { text: string; accent: boolean };

/**
 * Разбирает строку заголовка на слова. `*слово*` — акцент терракотой.
 * «*в разрезе*» → [{text:"в", accent:true}, {text:"разрезе", accent:true}]
 */
export function splitWords(line: string): WordToken[] {
  const tokens: WordToken[] = [];
  line.split(/(\*[^*]+\*)/g).forEach((chunk) => {
    if (!chunk) return;
    const accent = chunk.startsWith("*") && chunk.endsWith("*");
    const text = accent ? chunk.slice(1, -1) : chunk;
    text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => tokens.push({ text: word, accent }));
  });
  return tokens;
}

/** Строка без разметки — для sr-only заголовка, alt и метаданных. */
export function plainText(lines: readonly string[] | string) {
  const arr = typeof lines === "string" ? [lines] : lines;
  return arr.join(" ").replace(/\*/g, "").replace(/\s+/g, " ").trim();
}
