import { swapItems } from "../../../utils/swapItems/swapItems";

export const bubbleSortComplexity = 'O(n^2)'
export function bubbleSort(array: number[]): number[] {

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j + 1] < array[j]) {
        swapItems(array, j, j + 1);
      }
    }
  };
  return array;
};

export function* bubbleSortGenerator (array: number[]): Generator {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      yield ['compare', j, j + 1];
      if (array[j + 1] < array[j]) {
        yield ['swap', j, j + 1];
        swapItems(array, j, j + 1);
      }
      yield ['reset colors', j, j + 1];
    }
    yield ['sorted', array.length - 1 - i];
  };
  return array;
};