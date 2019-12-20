/**
 * 还原一棵二叉树：
 * 1、先序和中序还原一棵二叉树
 * 2、后序和中序还原一棵二叉树
 * 注意：
 * 先序和后序是无法还原一棵唯一的二叉树，因为无法唯一确定根节点的左右子树
 */

import {
  BFS,
  preOrderTraverseNodeUnRec,
  inOrderTraverseNodeUnRec,
  postOrderTraverseNodeUnRec,
} from '../../lib/tree';

const debug = require('debug')('BTFromOrdering');

function TreeNode(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

/**
 * 根据中序遍历和前序遍历创建二叉树
 * param:
 * inorder——中序遍历数组
 * preorder——前序遍历数组
 * length——数组长度
 * return:
 * node——构建好的二叉树的根
 */
function BTFromOrdering(preOrder, inOrder, length) {
  if (length) {
    let rootIndex = 0;

    // 通过先序序列，来获取根节点在中序数组中的位置
    for (; rootIndex < length; rootIndex++) {
      if (preOrder[0] === inOrder[rootIndex]) break;
    }

    // 根据根节点来切割中序数组
    const leftInOrder = inOrder.slice(0, rootIndex);
    const rightInOrder = inOrder.slice(rootIndex + 1);

    // 递归获取左右子树
    const leftNode = BTFromOrdering(preOrder.slice(1, leftInOrder.length + 1), leftInOrder, leftInOrder.length);
    const rightNode = BTFromOrdering(preOrder.slice(leftInOrder.length + 1), rightInOrder, rightInOrder.length);

    // 创建二叉树节点
    const node = new TreeNode(preOrder[0], leftNode, rightNode);
    return node;
  }
}

const preOrder = [1, 2, 4, 3, 5, 6];
const inOrder = [4, 2, 1, 5, 3, 6];

const root = BTFromOrdering(preOrder, inOrder, preOrder.length);

debug('BFS: ', BFS(root));
debug('preOrderTraverseNode: ', preOrderTraverseNodeUnRec(root));
debug('inOrderTraverseNode: ', inOrderTraverseNodeUnRec(root));
debug('postOrderTraverseNode: ', postOrderTraverseNodeUnRec(root));