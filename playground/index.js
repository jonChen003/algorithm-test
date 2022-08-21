/**
 * - playground
 */

function bubbleSort(arr) {
  let i = arr.length - 1;
  let pos;
  let temp;

  while (i > 0) {
    pos = 0;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }

    i = pos;
  }

  return arr;
}
