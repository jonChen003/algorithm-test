/**
 *  - 还原一棵二叉树：
 *   - leetcode 105. 先序和中序还原一棵二叉树
 *   - leetcode 106. 后序和中序还原一棵二叉树
 * 注意：
 * 先序和后序是无法还原一棵唯一的二叉树，因为无法唯一确定根节点的左右子树
 */

const {
  BFS,
  preOrderTraverseNodeUnRec,
  inOrderTraverseNodeUnRec,
  postOrderTraverseNodeUnRec,
} = require('../../lib/tree');

function TreeNode(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

/**
 * - 根据中序遍历和前序遍历创建二叉树
 * param:
 * inorder——中序遍历数组
 * preorder——前序遍历数组
 * return:
 * node——构建好的二叉树的根
 */
function buildTreeFromPreAndInOrder(preOrder, inOrder) {
  if (!preOrder.length) return null;

  const rootVal = preOrder.shift();
  const root = new TreeNode(rootVal);

  const rootIndex = inOrder.indexOf(rootVal);

  root.left = buildTreeFromPreAndInOrder(
    preOrder.slice(0, rootIndex),
    inOrder.slice(0, rootIndex)
  );

  root.right = buildTreeFromPreAndInOrder(
    preOrder.slice(rootIndex),
    inOrder.slice(rootIndex + 1)
  );

  return root;
}

/**
 * 中序和后序生成二叉树
 */
function buildTreeFromInAndPostOrder(inOrder, postOrder) {
  // 1. 递归终止条件
  if (!postOrder.length) return null;

  // 2. 从后序数组中取出当前根节点
  const rootVal = postOrder.pop();
  const root = new TreeNode(rootVal);
  // 优化点，如果是叶子结点直接返回

  // 3. 找切割点
  const rootIndex = inOrder.indexOf(rootVal);

  // 4. 切割中序数组，得到中序左数组和右数组
  // 5. 切割后续数组，得到后续左数组和右数组
  // 6. 递归遍历
  root.left = buildTreeFromInAndPostOrder(
    inOrder.slice(0, rootIndex),
    postOrder.slice(0, rootIndex)
  );
  root.right = buildTreeFromInAndPostOrder(
    inOrder.slice(rootIndex + 1),
    postOrder.slice(rootIndex)
  );

  return root;
}

/**
 *      1
 *    2    3
 * 4      5  6
 */

const preOrder = [1, 2, 4, 3, 5, 6];
const inOrder = [4, 2, 1, 5, 3, 6];
const postOrder = [4, 2, 5, 6, 3, 1];

const root = buildTreeFromPreAndInOrder(preOrder, inOrder);
// const root = buildTreeFromInAndPostOrder(inOrder, postOrder);

console.log('BFS: ', BFS(root));
console.log('preOrderTraverseNode: ', preOrderTraverseNodeUnRec(root));
console.log('inOrderTraverseNode: ', inOrderTraverseNodeUnRec(root));
console.log('postOrderTraverseNode: ', postOrderTraverseNodeUnRec(root));
