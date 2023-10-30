/**
 * - letcode 112. 路径总和
 * 描述：
 * 	给你二叉树的根节点root和一个表示目标和的整数targetSum
 * 	判断该树中是否存在根节点到叶子节点的路径, 这条路径上所有节点值相加等于目标和targetSum
 * 	如果存在，返回 true ；否则，返回 false 。
 */

const {
  buildTreeFromPreAndInOrder,
  printBinaryTreePaths,
} = require('../../lib/tree');

/**
 * - 二叉树路径问题通用解法（推荐）
 */
const hasPathSum = function (root, targetSum) {
  if (!root) return false;
  let result = false;

  function traverse(node, paths) {
    paths.push(node.val);

    if (!node.left && !node.right) {
      const sum = paths.reduce((acc, val) => acc + val, 0);
      if (sum === targetSum) {
        result = true;
      }
      return;
    }

    if (node.left) {
      traverse(node.left, paths);
      paths.pop();
    }

    if (node.right) {
      traverse(node.right, paths);
      paths.pop();
    }
  }

  traverse(root, []);

  return result;
};

/**
 * - 递归法
 */
function hasPathSum_V2(root, targetSum) {
  if (root === null) return false;

  function traverse(curNode, count) {
    // 递归终止条件
    if (!curNode.left && !curNode.right && count === 0) {
      // 遇到叶子节点，并且count为0
      return true;
    }
    if (!curNode.left && !curNode.right) {
      // 遇到叶子节点直接返回，没找到直接返回
      return false;
    }

    if (curNode.left) {
      if (traverse(curNode.left, count - curNode.left.data)) return true;
      // 以上代码隐藏了回溯的逻辑，等价于：
      // count -= curNode.left.data count // 处理节点，这里count值改变了
      // if (traverse(curNode.left, count)) return true; // 递归
      // count += curNode.left.data // 回溯，撤销处理结果
    }

    if (curNode.right) {
      if (traverse(curNode.right, count - curNode.right.data)) return true;
      // 以上代码隐藏了回溯的逻辑，等价于：
      // count -= curNode.right.data count // 处理节点，这里count值改变了
      // if (traverse(curNode.right, count)) return true; // 递归
      // count += curNode.right.data // 回溯，撤销处理结果
    }

    return false;
  }

  return traverse(root, targetSum - root.data);
}

/**
 * - 迭代法
 */

function hasPathSumV2(root, targetSum) {
  if (root === null) return false;
  // stack中存放{节点，路径数值}
  const stack = [];
  stack.push({
    node: root,
    sum: root.data,
  });

  while (stack.length) {
    const curElement = stack.pop();
    const { node, sum } = curElement;

    if (node.left === null && node.right === null && sum === targetSum) {
      // 如果是叶子节点，同时该节点的路径数值等于targetSum，那么返回true
      return true;
    }

    if (node.right) {
      // 右节点，压进去一个节点的时候，同时将该节点的路径数值也记录下来
      stack.push({
        node: node.right,
        sum: sum + node.right.data,
      });
    }

    if (node.left) {
      // 左节点，压进去一个节点的时候，同时将该节点的路径数值也记录下来
      stack.push({
        node: node.left,
        sum: sum + node.left.data,
      });
    }
  }

  return false;
}

// test-case
const preOrder = [5, 4, 11, 7, 2, 8, 13, 4, 1];
const inOrder = [7, 11, 2, 4, 5, 13, 8, 4, 1];
const root = buildTreeFromPreAndInOrder(preOrder, inOrder);

console.log('tree: ', printBinaryTreePaths(root));
console.log('path-sum: ', hasPathSum(root, 22));
console.log('path-sum2: ', hasPathSumV2(root, 22));
