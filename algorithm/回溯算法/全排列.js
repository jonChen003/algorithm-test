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

function permute(inputNums) {
  if (!inputNums.length) {
    return inputNums;
  }

  const resArr = [];
  backtrack(inputNums, []);
  return resArr;

  /**
   * 1. 确定回溯函数入参
   * @param {*} nums: 输入的数组，inputNums
   * @param {*} path: 当前收集的路径
   */
  function backtrack(nums, path) {
    // 2. 确定终止条件
    if (nums.length === path.length) {
      // 注意这里一定要克隆下，因为path是个引用类型
      resArr.push([...path]);
      return;
    }

    // 3. 深度优先遍历
    for (let i = 0; i < nums.length; i++) {
      // 如果path中已有，则跳过
      if (!path.includes(nums[i])) {
        path.push(nums[i]); // 处理节点
        backtrack(nums, path); // 递归
        path.pop(); // 回溯
      }
    }
  }
}

// test-case
console.log('permute-res: ', permute([1, 2, 3]));
console.log('permute-res: ', permute([1]));
