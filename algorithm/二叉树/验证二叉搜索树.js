/**
 * - leetcode 98. 验证二叉搜索树
 *
 * 题目描述：
 * 	给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树
 * 	有效 二叉搜索树定义如下：
 * 	节点的左子树只包含 小于 当前节点的数。
 * 	节点的右子树只包含 大于 当前节点的数。
 * 	所有左子树和右子树自身必须也是二叉搜索树
 */

/**
 * 方法一：递归
 */
const isValidBST = function (root) {
  function traverse(node, lower, upper) {
    if (node === null) {
      return true;
    }

    if (node.val <= lower || node.val >= upper) {
      return false;
    }

    return (
      traverse(node.left, lower, node.val) &&
      traverse(node.right, node.val, upper)
    );
  }

  return traverse(root, -Infinity, Infinity);
};

/**
 * 方式二：中序遍历（非递归版本）
 * 	二叉搜索树「中序遍历」得到的值构成的序列一定是升序的，
 * 	这启示我们在中序遍历的时候实时检查当前节点的值是否大于前一个中序遍历到的节点的值即可
 * 	如果均大于说明这个序列是升序的，整棵树是二叉搜索树，否则不是
 */

const isValidBST_v2 = (root) => {
  const stack = [];
  let inorder = -Infinity;
  let curNode = root;

  while (stack.length || curNode) {
    // 左子树
    while (curNode !== null) {
      stack.push(curNode);
      curNode = curNode.left;
    }

    // 处理根
    curNode = stack.pop();

    // 如果中序遍历得到的节点的值小于等于前一个 inorder，说明不是二叉搜索树
    if (curNode.val <= inorder) {
      return false;
    }
    inorder = curNode.val;

    // 右子树
    curNode = curNode.right;
  }

  return true;
};
