/**
 * - leetcode 1726. 同积元组
 *
 * 题目描述：
 * 给你一个由 不同 正整数组成的数组 nums ，请你返回满足 a * b = c * d 的元组 (a, b, c, d) 的数量。其中 a、b、c 和 d 都是 nums 中的元素，且 a != b != c != d 。
 *	示例 1：

 *	输入：nums = [2,3,4,6]
 *	输出：8
 *	解释：存在 8 个满足题意的元组：
 *	(2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
 *	(3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)
 *	示例 2：

 *	输入：nums = [1,2,4,5,10]
 *	输出：16
 *	解释：存在 16 个满足题意的元组：
 *	(1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
 *	(2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
 *	(2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,5,4)
 *	(4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)
 */

/**
 * 双层循环 + hash map统计
 */
/**
 * @param {number[]} nums
 * @return {number}
 */

const tupleSameProduct = function (nums) {
  const map = new Map();
  const n = nums.length;
  let result = 0;

  // 两数依次做乘法，利用map保存每个乘积结果出现的次数
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const mul = nums[i] * nums[j];
      const count = map.get(mul) || 0;
      map.set(mul, count + 1);
    }
  }

  // 从相同结果中，做排列组合，例如乘积结果为12，出现了三次，那就是从三个中选择两对
  for (const count of map.values()) {
    result += ((count * (count - 1)) / 2) * 8;
  }

  return result;
};
