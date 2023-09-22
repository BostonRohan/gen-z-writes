export default function getCharacterValidationError(str: string) {
  return `Your password must have at least 1 ${str} character`;
}
