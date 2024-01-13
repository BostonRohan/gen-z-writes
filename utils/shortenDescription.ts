export default function shortenDescription(
  originalText: string,
  maxLength: number
): string {
  if (originalText.length <= maxLength) {
    return originalText;
  }

  const shortenedText = originalText.substring(0, maxLength - 3) + "...";

  return shortenedText;
}
