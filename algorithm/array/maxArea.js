/**
 * leetcode 11: 盛最多水的容器
 * 题目描述：
 *  给定 n 个非负整数 a1，a2，...，an
 *  每个数代表坐标中的一个点(i, ai)，在坐标内画 n 条垂直线
 *  垂直线i的两个端点分别为(i, ai) 和 (i, 0)
 *  找出其中的两条线，使得它们与x轴共同构成的容器可以容纳最多的水
 */

const debug = require('debug')('maxArea');

/**
 * 算法思想：
 *  方法1-暴力法
 *  方法2-双指针法
 */

// 方法一：暴力法
/**
 * @param {number[]} height
 * @return {number}
 */
function maxAreaV1(height) {
  let maxArea = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i));
    }
  }

  return maxArea;
}

// 方法二：双指针法
/**
 * 使用双指针，一个放在开始，一个置于末尾
 * 两个指针对应的线段比较，移动矮的指针
 * 为什么要移动矮的指针？
 *  因为矮的指针已经限制了矩形的高度，移动高指针时矩形的高度不变并且宽度会缩减
 *  由此移动高指针不会带来面积的上升，所以选择移动矮的指针
 */
function maxAreaV2(height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    maxArea = Math.max(
      maxArea,
      Math.min(height[left], height[right]) * (right - left),
    );
    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return maxArea;
}

// test-case
debug('case1: ', maxAreaV1([1, 8, 6, 2, 5, 4, 8, 3, 7]));
debug('case1: ', maxAreaV2([1, 8, 6, 2, 5, 4, 8, 3, 7]));
