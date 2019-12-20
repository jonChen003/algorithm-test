/**
 * letcode-257：二叉树的所有路径
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


import BST from '../../lib/tree';

const debug = require('debug')('binaryTreePaths');

function printArray(pathArray, pathLen = 0) {
  if (Array.isArray(pathArray)) {
    const len = pathLen || pathArray.length;
    const pathStr = pathArray.slice(0, len).join('->');
    debug('path:', pathStr);
  }
}

function printBinaryTreePaths(node, pathArray, pathLen) {
  if (node === null) return;
  pathArray[pathLen] = node.data;
  pathLen += 1;
  if (node.left === null && node.right === null) {
    printArray(pathArray, pathLen);
  } else {
    printBinaryTreePaths(node.left, pathArray, pathLen);
    printBinaryTreePaths(node.right, pathArray, pathLen);
  }
}

function printBinaryTreePathsV2(node, pathArray) {
  if (node === null) return;
  pathArray.push(node.data);
  if (node.left === null && node.right === null) {
    printArray(pathArray);
  } else {
    printBinaryTreePathsV2(node.left, pathArray);
    printBinaryTreePathsV2(node.right, pathArray);
  }
  pathArray.pop();
}

const tree = new BST();
tree.insert(23);
tree.insert(45);
tree.insert(16);
// tree.insert(37);
tree.insert(3);
// tree.insert(99);
// tree.insert(22);

// debug('root:', tree.root);

const pathArray = [];
const pathArray2 = [];

printBinaryTreePaths(tree.root, pathArray, 0);
printBinaryTreePathsV2(tree.root, pathArray2);

// tree.inOrderTraverseNode(tree.root);
// debug('inOrderTraverseNode: ', tree.elements);

debug('先序遍历：', tree.preOrderTraverseNode_unRec(tree.root));
// debug('中序遍历：', tree.inOrderTraverseNode_unRec(tree.root));
// debug('后序遍历：', tree.postOrderTraverseNode_unRec(tree.root));

debug('先序遍历：', tree.preOrderTraverseNode_unRec_v2(tree.root));

debug('广度优先遍历：', tree.BFS(tree.root));
