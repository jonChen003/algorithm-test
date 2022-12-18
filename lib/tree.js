// 插入一个节点， 生成二叉搜索树(BST)
/**
 * 二叉搜索树是二叉树的一种
 * 但是它只允许你在左侧节点存储（比父节点）小的值，
 * 在右侧节点存储（比父节点）大（或者等于）的值。
 */

/**
 * 按照根节点访问顺序的不同，树的遍历分为以下三种：前序遍历、中序遍历、后序遍历
 * 前序遍历：根节点 -> 左子树 -> 右子树
 * 中序遍历：左子树 -> 根节点 -> 右子树
 * 后序遍历：左子树 -> 右子树 -> 根节点
 */

function TreeNode(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

/**
 * 先序遍历_递归版
 * @param {treeNode} root
 * @return {array} res
 */
function preOrderTraverseNode(root) {
  const res = [];

  function traverse(node) {
    // 递归终止条件
    if (node === null) return;
    res.push(node.data);
    traverse(node.left);
    traverse(node.right);
  }

  // 只使用一个参数，使用闭包存储结果
  traverse(root);
  // traverse(root, res);
  return res;
}

/**
 * 先序遍历_非递归版本_v1（推荐）
 * 使用栈来保存节点信息
 * @param {*} root
 */
function preOrderTraverseNodeUnRec(root) {
  const elements = [];
  if (!root) return elements;

  const stack = [root];
  // 如果栈不为空，则循环遍历
  while (stack.length) {
    const node = stack.pop();
    elements.push(node.data);
    // 如果存在右子树，将右子树压入栈
    if (node.right) {
      stack.push(node.right);
    }
    // 如果存在左子树，将左子树压入栈
    if (node.left) {
      stack.push(node.left);
    }
  }

  return elements;
}

/**
 * 先序遍历_非递归版本_v2
 * 使用栈来保存节点信息
 * @param {*} node
 */

function preOrderTraverseNodeUnRecV2(root) {
  const elements = [];
  const stack = [];
  let curNode = root;
  while (curNode || stack.length) {
    while (curNode) {
      stack.push(curNode);
      elements.push(curNode.data);
      curNode = curNode.left;
    }
    curNode = stack.pop();
    // 转向
    curNode = curNode.right;
  }

  return elements;
}

/**
 * 中序遍历_递归版
 * @param {treeNode} root
 * @return {array} res
 */
function inOrderTraverseNode(root) {
  const res = [];

  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    res.push(node.data);
    traverse(node.right);
  }

  traverse(root);
  return res;
}

/**
 * 中序遍历_非递归版本
 * @param {*} node
 */
function inOrderTraverseNodeUnRec(root) {
  const elements = [];
  if (!root) return elements;

  const stack = [];
  let curNode = root; // 指针指向移动的节点
  while (stack.length !== 0 || curNode) {
    if (curNode) {
      // 沿左子树一直往下找
      stack.push(curNode);
      curNode = curNode.left;
    } else {
      // 没有左子树，开始处理节点
      curNode = stack.pop();
      elements.push(curNode.data);
      // 右子树
      curNode = curNode.right;
    }
  }

  return elements;
}

/**
 * 后序遍历_递归版
 * @param {treeNode} root
 * @return {array} res
 */
function postOrderTraverseNode(root) {
  const res = [];

  function traverse(node) {
    if (node === null) return;

    traverse(node.left);
    traverse(node.right);
    res.push(node.data);
  }

  traverse(root);
  return res;
}

/**
 * 后序遍历_非递归版本_巧妙方法
 * 前序：根->左->右
 * 后序：左->右->根
 * 主要思想：那么可以把后序当作：根->右->左，然后再反转一下即可
 * @param {*} node
 */
function postOrderTraverseNodeUnRec(root) {
  const elements = [];
  if (!root) return elements;

  const stack = [root];
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const node = stack.pop();
    elements.push(node.data);
    // 如果存在左子树，将左子树压入栈
    if (node.left) {
      stack.push(node.left);
    }
    // 如果存在右子树，将右子树压入栈
    if (node.right) {
      stack.push(node.right);
    }
  }
  elements.reverse();

  return elements;
}

/**
 * 广度优先遍历
 * 说明：广度遍历是从二叉树的根结点开始，自上而下逐层遍历；在同一层中，按照从左到右的顺序对结点逐一访问
 * 实现原理：
 * 使用数组模拟队列，首先将根结点归入队列
 * 当队列不为空时，执行循环：
 *    取出队列的一个结点，如果该节点有左子树，则将该节点的左子树存入队列；
 *    如果该节点有右子树，则将该节点的右子树存入队列
 * 使用队列来保存节点信息
 */
function BFS(root) {
  const elements = [];
  let curNode = root;
  if (curNode) {
    const queue = [curNode];
    while (queue.length) {
      curNode = queue.shift();
      elements.push(curNode.data);
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
    }
  }
  return elements;
}

/**
 * 二维数组：输出每一层的节点（推荐）
 */
function BFS_V2(root) {
  const res = [];
  const queue = [];
  if (!root) return res;

  queue.push(root);
  while (queue.length) {
    // 记录当前层级节点数
    const size = queue.length;
    // 存放每一层的节点
    const curLevelNodes = [];

    for (let i = 0; i < size; i++) {
      const curNode = queue.shift();
      curLevelNodes.push(curNode.data);
      // 存放当前层下一层的节点
      if (curNode.left) {
        queue.push(curNode.left);
      }
      if (curNode.right) {
        queue.push(curNode.right);
      }
    }
    // 把每一层的结果放到结果数组
    res.push(curLevelNodes);
  }

  return res;
}

/* eslint-disable no-lonely-if */
function BST() {
  this.root = null;
  this.elements = [];
}

function insertNode(node, newNode) {
  if (newNode.data < node.data) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      insertNode(node.left, newNode);
    }
  } else {
    if (node.right === null) {
      node.right = newNode;
    } else {
      insertNode(node.right, newNode);
    }
  }
}

BST.prototype.insert = function (data) {
  const newNode = new TreeNode(data);
  if (this.root === null) {
    this.root = newNode;
  } else {
    insertNode(this.root, newNode);
  }
};

BST.prototype.removeNode = function (data) {
  return removeNode(this.root, data);
};

function removeNode(node, val) {
  if (!node) return null;

  if (val < node.val) {
    // node.left赋值很重要
    node.left = removeNode(node.left, val);
  } else if (val > node.val) {
    node.right = removeNode(node.right, val);
  } else {
    // 找到目标了
    if (!node.left && !node.right) {
      // 目标节点是叶子节点
      node = null;
    } else if (!node.left && node.right) {
      // 目标节点左子树为空
      node = node.right;
    } else if (node.left && !node.right) {
      // 目标节点右子树为空
      node = node.left;
    } else {
      // 左右子树都不为空
      const rightMinNode = findMinNode(node.right); // 在右子树树中的最小节点
      const rightMinVal = rightMinNode.val;
      // 使用更新值这种方式去删除它;
      node.val = rightMinVal;
      node.right = removeNode(node, rightMinVal);
    }
  }

  return node;
}

function findMinNode(node) {
  while (node && node.left) {
    node = node.left;
  }

  return node;
}

/**
 * 先序遍历_递归版
 */
BST.prototype.preOrderTraverseNode = function (node) {
  if (node) {
    this.elements.push(node.data);
    this.inOrderTraverseNode(node.left);
    this.inOrderTraverseNode(node.right);
  }
};

/**
 * 中序遍历_递归版
 */
BST.prototype.inOrderTraverseNode = function (node) {
  if (node) {
    this.inOrderTraverseNode(node.left);
    this.elements.push(node.data);
    this.inOrderTraverseNode(node.right);
  }
};

/**
 * 后序遍历_递归版
 */
BST.prototype.postOrderTraverseNode = function (node) {
  if (node) {
    this.inOrderTraverseNode(node.left);
    this.inOrderTraverseNode(node.right);
    this.elements.push(node.data);
  }
};

/**
 * 先序遍历_非递归版
 */
BST.prototype.preOrderTraverseNode_unRec = preOrderTraverseNodeUnRec;

/**
 * 先序遍历_非递归版_v2
 */
BST.prototype.preOrderTraverseNode_unRec_v2 = preOrderTraverseNodeUnRecV2;

/**
 * 中序遍历_非递归版
 */
BST.prototype.inOrderTraverseNode_unRec = inOrderTraverseNodeUnRec;

/**
 * 后序遍历_非递归版
 */
BST.prototype.postOrderTraverseNode_unRec = postOrderTraverseNodeUnRec;

/**
 * 广度优先遍历
 */
BST.prototype.BFS = BFS;

module.exports = {
  preOrderTraverseNode,
  inOrderTraverseNode,
  postOrderTraverseNode,
  preOrderTraverseNodeUnRec,
  inOrderTraverseNodeUnRec,
  postOrderTraverseNodeUnRec,
  BST,
  BFS,
};
