/**
 * leetcode 104: 二叉树的最大深度
 * 题目描述：
 *  给定一个二叉树，找出其最大深度
 *  二叉树的深度为根节点到最远叶子节点的最长路径上的节点数
 * 示例：
 *  给定二叉树 [3,9,20,null,null,15,7]，
 *  3
   / \
  9  20
    /  \
   15   7

 * 返回它的最大深度 3
 */

/**
 * 解题思路：
 *  1、节点为null，返回0
 *  2、递归左子树
 *  3、递归右子树
 *  4、将子问题合并求总问题
 */

import BST from '../../lib/tree';

const debug = require('debug')('maxDepth');

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  if (root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

const tree = new BST();
tree.insert(23);
tree.insert(45);
tree.insert(16);
tree.insert(3);

debug('result: ', maxDepth(tree.root));