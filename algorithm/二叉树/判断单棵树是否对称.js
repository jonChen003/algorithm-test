/**
 * - 判断单棵树是否对称
 */

/**
 * - 递归法
 */
function isSymmetric(root) {
  function isEqual(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;

    return (
      p.data === q.data && isEqual(p.left, q.left) && isEqual(p.right, q.right)
    );
  }

  if (!root) return true;
  return isEqual(root.left, root.right);
}
