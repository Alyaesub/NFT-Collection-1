export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}