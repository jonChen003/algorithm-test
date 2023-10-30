/**
 * - leetcode 257. 二叉树的所有路径
 * 描述：给定一个二叉树，返回所有从根节点到叶子节点的路径
 * 说明：叶子节点是指没有子节点的节点
 * 示例：
 *
输入:

   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]

解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
 */
/**
 * 算法思想：路径收集问题：递归+回溯法
 */
var binaryTreePaths = function (root) {
  if (!root) return [];
  const result = [];

  /**
   * @param {TreeNode} node: 当前节点
   * @param {number[]} paths: 收集的路径
   */
  function traverse(node, paths) {
    // 处理当前节点
    paths.push(node.val);

    // 如果是叶子节点收集路径
    if (!node.left && !node.right) {
      const pathStr = paths.join('->');
      result.push(pathStr);
      return;
    }
    // 递归左子树
    if (node.left) {
      traverse(node.left, paths);
      // 回溯
      paths.pop();
    }
    // 递归右子树
    if (node.right) {
      traverse(node.right, paths);
      // 回溯
      paths.pop();
    }
  }

  traverse(root, []);

  return result;
};
