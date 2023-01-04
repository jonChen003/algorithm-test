/**
 * - 判断两棵树是否完全相同
 */

function isSameTree(root1, root2) {
  function compare(node1, node2) {
    if (!node1 || !node2) return false;
    if (!node2 && !node2) return true;

    return (
      node1.data === node2.data &&
      compare(node1.left, node2.left) &&
      compare(node1.right, node2.right)
    );
  }

  return compare(root1, root2);
}
