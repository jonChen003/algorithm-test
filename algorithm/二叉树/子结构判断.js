/**
 * - leetcode LCR 143. 子结构判断
 *
 * 题目描述：
 * 	给定两棵二叉树 tree1 和 tree2，判断 tree2 是否以 tree1 的某个节点为根的子树具有 相同的结构和节点值 。
 * 	注意，空树 不会是以 tree1 的某个节点为根的子树具有 相同的结构和节点值 。
 */

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
function isSameTree(node1, node2) {
  // 当node2为空，说明树B已经匹配完成，那说明树B满足条件
  if (node2 === null) return true;
  // 当node1为空，说明B还没匹配完，那树B肯定不是A的局部结构
  if (node1 === null) return false;

  return (
    node1.val === node2.val &&
    isSameTree(node1.left, node2.left) &&
    isSameTree(node1.right, node2.right)
  );
}

const isSubStructure = function (A, B) {
  if (!A || !B) {
    return false;
  }

  // 情况1：以节点A为根节点的子树包含树B
  if (isSameTree(A, B)) {
    return true;
  }

  // 情况2：树B是树A左子树的子结构
  // 情况3：树B是树A右子树的子结构
  return isSubStructure(A.left, B) || isSubStructure(A.right, B);
};
