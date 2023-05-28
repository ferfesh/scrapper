export const extractNumbersFromString = (str: string): number => {
  const regex = /\d+(\.\d+)?/g;
  const matches = str.match(regex);

  if (matches && matches.length > 0) {
    return parseFloat(matches[0]);
  }

  return NaN;
}