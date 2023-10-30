/**
 * - leetcode 46. 全排列
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 示例 2：
 *
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 * 示例 3：
 *
 * 输入：nums = [1]
 * 输出：[[1]]
 */

/**
 * 参考文档：
 * 	https://leetcode.cn/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/
 * 	https://programmercarl.com/0046.%E5%85%A8%E6%8E%92%E5%88%97.html#%E6%80%9D%E8%B7%AF
 *
 * 	图示: https://pic.leetcode-cn.com/0bf18f9b86a2542d1f6aa8db6cc45475fce5aa329a07ca02a9357c2ead81eec1-image.png
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];

  // 确定回溯函数入参，path：当前收集的路径
  function traverse(path) {
    // 确定递归终止条件
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    // 选择：本层集合中元素
    for (let i = 0; i < nums.length; i++) {
      if (!path.includes(nums[i])) {
        // 处理节点
        path.push(nums[i]);
        // 递归
        traverse(path);
        // 回溯，撤销处理结果
        path.pop();
      }
    }
  }

  traverse([]);

  return res;
};

// test-case
console.log('permute-res: ', permute([1, 2, 3]));
console.log('permute-res: ', permute([1]));
