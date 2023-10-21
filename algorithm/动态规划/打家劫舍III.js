/**
 * - leetcode 337. 打家劫舍 III
 * 题目描述：
 * 	小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
 *	除了 root 之外，每栋房子有且只有一个“父“房子与之相连。
 *	一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
 *	如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
 *	给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
 */

/**
 * 参考文档：
 * 	https://programmercarl.com/0337.%E6%89%93%E5%AE%B6%E5%8A%AB%E8%88%8DIII.html
 */

/**
 * 算法思想：动态规划
 * 树形dp的入门题目
 * 树的遍历：深度优先（采用后序遍历）
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  if (!root) return 0;

  // 采用后序遍历方式
  // 返回：长度为2的数组，0：不偷，1：偷
  function postOrder(curNode) {
    // 递归终止条件
    if (!curNode) return [0, 0];

    // 先递归左子树
    const leftArr = postOrder(curNode.left);
    // 再递归右子树
    const rightArr = postOrder(curNode.right);
    // 再处理当前根节点
    // 不偷的情况
    const val1 =
      Math.max(leftArr[0], leftArr[1]) + Math.max(rightArr[0], rightArr[1]);
    // 偷的情况
    const val2 = curNode.val + leftArr[0] + rightArr[0];

    return [val1, val2];
  }

  // 返回不偷和偷对应的最大值
  const [val1, val2] = postOrder(root);

  return Math.max(val1, val2);
};
