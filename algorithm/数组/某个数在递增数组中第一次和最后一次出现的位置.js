/**
 * - leetcode 34. 某个数在递增数组中第一次和最后一次出现的位置
 * 例如：
 * 给定一个递增数组：[5, 7, 7, 8, 8, 10]，目标元素：8
 * 返回：[3, 4]
 * 分析：
 * 递增序列找某一个元素，常用的都是二分法查找：
 * 正常二分法查找算法如下：
 * 是通过判断中间位置的值与给定值的大小关系，从而将区间变为原来的一半，
 * 继续查找，不断的一半，一半，最后变成只有一个元素的区间，比较后返回
 *
 * 普通的二分法查找到一个相等的值就结束了，但是这里需要确定这个值第一次出现和最后一次出现的位置。
 * 所以很明显不能让它结束这么快，也就是说即使nums[middle] == target，也不返回，
 * 因为目的是要找一个范围，即两个边界，而middle只是一个点，不一定是边界，
 * 有可能middle前面和后面也都是等于target的位置
 */

// 某个数在递增数组中第一次出现的位置
function searchFirstTargetValue(nums, target) {
  // 左闭右闭区间
  let left = 0;
  let right = nums.length - 1;
  let pos = -1;

  // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
  while (left <= right) {
    // 这里注意middle的计算
    const middle = left + Math.floor((right - left) / 2);

    if (nums[middle] > target) {
      // 去左面闭区间寻找
      right = middle - 1;
    } else if (nums[middle] < target) {
      // 去右面闭区间寻找
      left = middle + 1;
    } else {
      pos = middle;
      right = middle - 1;
    }
  }

  return pos;
}

function searchLastTargetValue(nums, target) {
  // 左闭右闭区间
  let left = 0;
  let right = nums.length - 1;
  let pos = -1;

  // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
  while (left <= right) {
    // 这里注意middle的计算
    const middle = left + Math.floor((right - left) / 2);

    if (nums[middle] > target) {
      // 去左面闭区间寻找
      right = middle - 1;
    } else if (nums[middle] < target) {
      // 去右面闭区间寻找
      left = middle + 1;
    } else {
      pos = middle;
      left = middle + 1;
    }
  }

  return pos;
}

const testNums = [1, 1, 2, 3, 4, 4, 5, 6, 6];

console.log('search-first-target: ', searchFirstTargetValue(testNums, 4));
console.log('search-last-target: ', searchLastTargetValue(testNums, 4));
