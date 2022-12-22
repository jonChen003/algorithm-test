/**
 * - letcode-257. 二叉树的所有路径
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

const { BST } = require('../../lib/tree');

function printArray(pathArray, pathLen = 0) {
  if (Array.isArray(pathArray)) {
    const len = pathLen || pathArray.length;
    const pathStr = pathArray.slice(0, len).join('->');
    console.log('path:', pathStr);
  }
}

/**
 * 从根节点到叶子的路径 -> 深度优先遍历 -> 前序遍历
 * 到叶子节点后，需要回溯来回退一个路径 -> 进入到另一个路径
 */
function printBinaryTreePaths(root) {
  function traverse(curNode, path, res) {
    // 处理当前节点
    path.push(curNode.data);

    if (curNode.left === null && curNode.right === null) {
      // 叶子节点，收集路径
      res.push([...path]);
      printArray([...path]);
      return;
    }

    // 递归
    if (curNode.left) {
      // 遍历左子树
      traverse(curNode.left, path, res);
      // 回溯，回溯和递归是一一对应的，有一个递归，就要有一个回溯
      path.pop();
    }
    if (curNode.right) {
      // 遍历右子树
      traverse(curNode.right, path, res);
      // 回溯，回溯和递归是一一对应的，有一个递归，就要有一个回溯
      path.pop();
    }
  }

  const res = [];
  const path = [];
  if (root === null) return res;
  traverse(root, path, res);

  return res;
}

// test-case
/**
    6
  /   \
  4    7
/   \    \
3     5   8
 */
const tree = new BST();
tree.insert(6);
tree.insert(4);
tree.insert(3);
tree.insert(5);
tree.insert(7);
tree.insert(8);

console.log('先序遍历：', tree.preOrderTraverseNode_unRec(tree.root));
console.log('广度优先遍历：', tree.BFS(tree.root));
console.log('路径：', printBinaryTreePaths(tree.root));
