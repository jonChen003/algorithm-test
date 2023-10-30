/**
 * - leetcode LCR 145. 判断对称二叉树
 *
 * 题目描述：
 *  请设计一个函数判断一棵二叉树是否 轴对称
 */

const checkSymmetricTree = function (root) {
  if (!root) return true;

  function traverse(node1, node2) {
    if (!node1 && !node2) return true;
    if (!node1 || !node2) return false;

    return (
      node1.val === node2.val &&
      traverse(node1.left, node2.right) &&
      traverse(node1.right, node2.left)
    );
  }

  return traverse(root.left, root.right);
};
