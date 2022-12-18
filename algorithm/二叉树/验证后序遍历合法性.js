/**
 * - 验证二叉搜索树后序遍历是否合法
 *  1. 根节点的值大于左子树中的任何一个节点的值，小于右子树中任何一个节点的值，
 * 	2.子树也是必须满足「条件1」
 */

function verifyPostOrder(postOrder) {
  if (postOrder.length <= 1) {
    return true;
  }

  // left左指针，right右指针
  function check(left, right) {
    // 递归终止条件
    if (left >= right) {
      return true;
    }

    // 取根节点
    const rootVal = postOrder[right];
    // 查找左右子树分割点，左[left, dividPos -1]，右 [dividPos,right-1]
    let dividPos = left;
    while (dividPos < right && postOrder[dividPos] < rootVal) {
      dividPos++;
    }
    // 右子树需要全部都满足大于rootVal，否则不合法
    for (let i = dividPos; i < right; i++) {
      if (postOrder[i] < rootVal) {
        return false;
      }
    }
    // 递归查找左子树，左子树范围[left, pos - 1];
    const isLeftOk = check(left, dividPos - 1);
    // 递归查找右子树，右子树范围 [pos,right-1]
    const isRightOk = check(dividPos, right - 1);

    return isLeftOk && isRightOk;
  }

  return check(0, postOrder.length - 1);
}

// test-case
const postOrder = [4, 2, 5, 6, 3, 1];

console.log('res---', verifyPostOrder(postOrder));
