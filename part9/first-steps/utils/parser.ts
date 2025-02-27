export const isNotNumber = (...args: unknown[]): boolean => {
  const flatArray = args.flat(Infinity);
  const length = flatArray.length;

  for(let i = 0; i < length; i++) {
    if(isNaN(Number(flatArray[i]))) return true
  }

  return false
}