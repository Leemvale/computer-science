export const swapItems = (array: number[], firstIndex: number, secondIndex: number): void => {
  [array[secondIndex], array[firstIndex]] = [array[firstIndex], array[secondIndex]]
};
