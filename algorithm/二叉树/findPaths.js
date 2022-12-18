/**
 * 题目：求二叉树中和为某一个值的路径
 * 描述：
 *  输入一颗二叉树的跟节点和一个整数，
 *  打印出二叉树中结点值的和为输入整数的所有路径。
 *  路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径
 */

import BST from '../../lib/tree';

const debug = require('debug')('findPaths');

function findPath(node, expectNumber, path, result) {
  if (node === null) return result;
  path.push(node.data);
  expectNumber -= node.data;
  if (expectNumber === 0 && node.left === null && node.right === null) {
    result.push(path);
  }
  findPath(node.left, expectNumber, path, result);
  findPath(node.right, expectNumber, path, result);
  path.pop();
}

function getPaths(root, expectNumber) {
  const result = [];
  findPath(root, expectNumber, [], result);
  return result;
}

/**
 * 方法二
 */
function findPathV2(node, expectNumber, path, result) {
  path.push(node.data);
  expectNumber -= node.data;
  if (expectNumber === 0 && node.left === null && node.right === null) {
    result.push(path.slice(0));
  }
  if (node.left !== null) {
    findPathV2(node.left, expectNumber, path, result);
  }
  if (node.right !== null) {
    findPathV2(node.right, expectNumber, path, result);
  }
  path.pop();
}

function getPathsV2(root, expectNumber) {
  const result = [];
  if (root === null) return result;
  findPathV2(root, expectNumber, [], result);
  return result;
}

const tree = new BST();
tree.insert(5);
tree.insert(3);
tree.insert(8);
tree.insert(2);
tree.insert(4);
tree.insert(6);
tree.insert(7);

debug('二叉树中和为某一值的路径: ', getPathsV2(tree.root, 10));