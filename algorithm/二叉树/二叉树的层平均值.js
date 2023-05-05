/**
 * - leetcode 637: 二叉树的层平均值
 * 题目描述：
 *  给定一个非空二叉树, 返回一个由每层节点平均值组成的数组
 *
 * 示例：
 * 输入:
    3
   / \
  9  20
    /  \
   15   7
输出: [3, 14.5, 11]
解释:
第0层的平均值是 3,  第1层是 14.5, 第2层是 11. 因此返回 [3, 14.5, 11].
 */

/**
 * 解题思路：二叉树的广度遍历，维护一个队列
 */

const { BST } = require('../../lib/tree');

// 二叉树的广度优先遍历（推荐）
function averageOfLevelsV1(root) {
  if (root === null) return 0;
  const result = [];
  const queue = [root];

  while (queue.length) {
    const len = queue.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      sum += node.data;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(sum / len);
  }

  return result;
}

function averageOfLevelsV2(root) {
  if (root === null) return 0;
  const result = [];
  const queue = [root];
  let currentLevelNum = 1;
  let nextLevelNum = 0;
  let sum = 0;
  let currentCount = 0;

  while (queue.length) {
    const currentNode = queue.shift();
    currentCount += 1;
    sum += currentNode.data;

    if (currentNode.left) {
      queue.push(currentNode.left);
      nextLevelNum += 1;
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
      nextLevelNum += 1;
    }

    if (currentCount === currentLevelNum) {
      result.push(sum / currentLevelNum);
      sum = 0;
      currentLevelNum = nextLevelNum;
      nextLevelNum = 0;
      currentCount = 0;
    }
  }

  return result;
}

const tree = new BST();
tree.insert(23);
tree.insert(45);
tree.insert(15);
tree.insert(3);

console.log('result: ', averageOfLevelsV1(tree.root));
console.log('result: ', averageOfLevelsV2(tree.root));
