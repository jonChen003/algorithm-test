/**
 * - leetcode 543. 二叉树的直径
 *
 * 题目描述：
 * 	给你一棵二叉树的根节点，返回该树的直径
 * 	二叉树的直径是指树中任意两个节点之间最长路径的长度 。这条路径可能经过也可能不经过根节点 root
 * 	两节点之间路径的长度由它们之间边数表示
 */

var diameterOfBinaryTree = function (root) {
  let max = 0;

  // 直径问题可以转换成求每个节点的深度
  // 直径节点数 = 左子树深度 + 右子树深度 + 1
  function traverse(node) {
    if (node === null) {
      return 0;
    }

    // 后序遍历
    const leftDepth = traverse(node.left);
    const rightDepth = traverse(node.right);

    max = Math.max(leftDepth + rightDepth + 1, max);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  traverse(root);

  return max - 1;
};
