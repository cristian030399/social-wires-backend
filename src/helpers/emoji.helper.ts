export function emojiToUnicodeConverter(emoji: string): string {
  console.log(emoji, emoji.length);
  return emoji.codePointAt(0).toString(16);
}
