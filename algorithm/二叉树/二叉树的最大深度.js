/**
 * - letcode 104. 二叉树的最大深度
 * 描述：
 * 	给定一个二叉树，找出其最大深度
 * 	二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 *
 * 示例：
 *  3
   / \
  9  20
    /  \
   15   7

	它的最大深度 3
 */

const {
  buildTreeFromPreAndInOrder,
  printBinaryTreePaths,
} = require('../../lib/tree');

/**
 * - 先序遍历(自上而下)
 */
function maxDepth(root) {
  function getDepth(curNode, depth) {
    result = Math.max(depth, result);
    if (!curNode.left && !curNode.right) return;

    if (curNode.left) {
      getDepth(curNode.left, depth + 1);
      // 以上代码隐藏了回溯的逻辑，等价于：
      // depth++;    // 深度+1
      // getdepth(curNode.left, depth);
      // depth--;    // 回溯，深度-1
    }

    if (curNode.right) {
      getDepth(curNode.right, depth + 1);
    }
  }

  let result = 0;
  if (root === null) return result;

  getDepth(root, 1);
  return result;
}

/**
 * - 后序遍历(自下而上)
 * 递归版本经典解法（推荐）
 */

function maxDepthV2(root) {
  function getDepth(node) {
    if (node === null) return 0;

    const leftDepth = getDepth(node.left); // 左
    const rightDepth = getDepth(node.right); // 右
    const depth = Math.max(leftDepth, rightDepth) + 1;

    return depth;
  }

  return getDepth(root);
}

/**
 * - 后序遍历_简化版本
 */

function maxDepthV3(root) {
  if (root === null) return 0;

  return Math.max(maxDepthV3(root.left), maxDepthV3(root.right)) + 1;
}

/**
 * - 迭代法-层序遍历
 */

function maxDepthV4(root) {
  let depth = 0;
  if (root === null) return depth;

  const queue = [];
  queue.push(root);

  while (queue.length) {
    // 外循环遍历层
    // 记录当前层级节点数
    const size = queue.length;
    // 记录深度
    depth++;

    for (let i = 0; i < size; i++) {
      // 内循环遍历每一层节点
      const curNode = queue.shift();
      if (curNode.left) {
        queue.push(curNode.left);
      }
      if (curNode.right) {
        queue.push(curNode.right);
      }
    }
  }

  return depth;
}

// test-case
const preOrder = [3, 9, 20, 15, 7];
const inOrder = [9, 3, 15, 20, 7];
const root = buildTreeFromPreAndInOrder(preOrder, inOrder);
console.log('tree: ', printBinaryTreePaths(root));

console.log('maxDepth: ', maxDepth(root));
console.log('maxDepthV2: ', maxDepthV2(root));
console.log('maxDepthV3: ', maxDepthV3(root));
console.log('maxDepthV4: ', maxDepthV4(root));
