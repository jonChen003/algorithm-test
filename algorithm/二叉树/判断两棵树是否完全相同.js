/**
 * - leetcode 100. 判断两棵树是否完全相同
 *
 * 题目描述：
 *  给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
 *  如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 */

function isSameTree(root1, root2) {
  function compare(node1, node2) {
    if (!node1 && !node2) return true;
    if (!node1 || !node2) return false;

    return (
      node1.val === node2.val &&
      compare(node1.left, node2.left) &&
      compare(node1.right, node2.right)
    );
  }

  return compare(root1, root2);
}
