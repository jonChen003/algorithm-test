/**
 * - letcode 113. 路径总和II
 * 描述：
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，
 * 找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 */

const {
  buildTreeFromPreAndInOrder,
  printBinaryTreePaths,
} = require('../../lib/tree');

/**
 * - 递归法
 */
function pathsum(root, targetSum) {
  function traverse(curNode, count) {
    path.push(curNode.data);

    if (!curNode.left && !curNode.right && count === 0) {
      // 遇到了叶子节点且找到了和为sum的路径
      result.push([...path]);
      return;
    }

    if (!curNode.left && !curNode.right) return;

    // 递归
    if (curNode.left) {
      // 遍历左子树
      // path.push(curNode.left.data);
      traverse(curNode.left, count - curNode.left.data);
      // 回溯
      path.pop();
    }

    if (curNode.right) {
      // 遍历右子树
      // path.push(curNode.right.data);
      traverse(curNode.right, count - curNode.right.data);
      // 回溯
      path.pop();
    }
  }

  const result = [];
  const path = [];
  if (root === null) return result;

  // 先把根节点放进路径，这种与二叉树所有路径题目原理一样，只是写法不一样
  // path.push(root.data);
  traverse(root, targetSum - root.data);

  // 把path放进递归参数里也是可以的
  // traverse(root, targetSum - root.data, [root.data]);

  return result;
}

/**
 * - 递归法，只是处理节点方式不一样，逻辑跟上面一致
 */
function pathsumV2(root, targetSum) {
  function traverse(curNode, count) {
    if (!curNode.left && !curNode.right && count === 0) {
      // 遇到了叶子节点且找到了和为sum的路径
      result.push([...path]);
      return;
    }

    if (!curNode.left && !curNode.right) return;

    // 递归
    if (curNode.left) {
      // 遍历左子树
      path.push(curNode.left.data);
      traverse(curNode.left, count - curNode.left.data);
      // 回溯
      path.pop();
    }

    if (curNode.right) {
      // 遍历右子树
      path.push(curNode.right.data);
      traverse(curNode.right, count - curNode.right.data);
      // 回溯
      path.pop();
    }
  }

  const result = [];
  const path = [];
  if (root === null) return result;

  // 先把根节点放进路径，这种与二叉树所有路径题目原理一样，只是写法不一样
  path.push(root.data);
  traverse(root, targetSum - root.data);

  // 把path放进递归参数里也是可以的
  // traverse(root, targetSum - root.data, [root.data]);

  return result;
}

// test-case
const preOrder = [5, 4, 11, 7, 2, 8, 13, 4, 5, 1];
const inOrder = [7, 11, 2, 4, 5, 13, 8, 5, 4, 1];
const root = buildTreeFromPreAndInOrder(preOrder, inOrder);

console.log('tree: ', printBinaryTreePaths(root));
console.log('path-sum: ', pathsum(root, 22));
console.log('path-sumV2: ', pathsumV2(root, 22));
