/**
 * - leetcode 236: 二叉树的最近公共祖先
 */

/**
 * - 解法一：自底向上查找（递归）（推荐）
 * 	后序遍历（左右中）就是天然的回溯过程，可以根据左右子树的返回值，来处理中节点的逻辑
 * 		left = 递归函数(root->left);  // 左
 *		right = 递归函数(root->right); // 右
 *		left与right的逻辑处理;         // 中
 */

const lowestCommonAncestor_v1 = function (root, p, q) {
  // 1. 确定递归函数
  function traverse(curRoot, p, q) {
    // 2. 确定递归终止条件
    if (curRoot === null || curRoot === p || curRoot === q) {
      return curRoot;
    }

    // 3. 确定递归单层逻辑
    const left = traverse(curRoot.left, p, q);
    const right = traverse(curRoot.right, p, q);

    // 4. 根据left和right的返回值来处理
    if (left !== null && right !== null) {
      return curRoot;
    }

    if (left !== null) return left;
    if (right !== null) return right;

    return null;
  }

  return traverse(root, p, q);
};

/**
 * - 解法二：根据遍历路径思想来实现
 */
const lowestCommonAncestor_v2 = function (root, p, q) {
  if (!root) return null;

  // 存储p路径
  let pArr = null;
  // 存储q路径
  let qArr = null;

  function traverse(curNode, paths) {
    paths.push(curNode);

    if (curNode.val === p.val && !pArr) {
      pArr = [...paths];
    }

    if (curNode.val === q.val && !qArr) {
      qArr = [...paths];
    }

    if (curNode.left === null && curNode.right === null) {
      return;
    }

    if (curNode.left) {
      traverse(curNode.left, paths);
      paths.pop();
    }

    if (curNode.right) {
      traverse(curNode.right, paths);
      paths.pop();
    }
  }

  traverse(root, []);

  let i = 0;
  // 找到两者公共的祖先节点
  while (i < pArr.length && i < qArr.length) {
    if (pArr[i].val === qArr[i].val) {
      i++;
    } else {
      break;
    }
  }

  return pArr[i - 1];
};
