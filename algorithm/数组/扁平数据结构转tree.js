/**
 * - 扁平数据结构转为tree
 * 例如下面：
 * let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
	]

	[
		{
			id: 1,
			name: '部门1',
			pid: 0,
			children: [
				{
					id: 2,
					name: '部门2',
					pid: 1,
					children: [],
				},
				{
					id: 3,
					name: '部门3',
					pid: 1,
					children: [
						// 结果 ,,,
					],
				},
			],
		},
	];

 */
/**
 * 参考文档：https://juejin.cn/post/6983904373508145189?searchId=20230918210813B4997DECE3FC8D23DE44
 */

/* eslint-disable */

// 方法一： 递归方法

// - 方法二： Map + 两次遍历数组（推荐）
function arrayToTree2(items) {
  const result = [];
  // 借用对象map来存储
  const itemMap = {};

  // 第一次遍历：利用map来记录每个节点，增加children
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }

  // 第二次遍历：把node塞到map对应的节点的children上
  for (const item of items) {
    const { id, pid } = item;
    const treeItem = itemMap[id];

    if (pid === 0) {
      // 放到结果数组中
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        // 兼容下不存在的情况
        itemMap[pid] = {
          children: [],
        };
      }

      // 放到children
      itemMap[pid].children.push(treeItem);
    }
  }

  return result;
}

// 方法三： Map + 一次遍历数组
/**
 * 主要思路:
 *  也是先把数据转成Map去存储
 *  之后遍历的同时借助对象的引用，直接从Map找对应的数据做存储
 *  不同点在遍历的时候即做Map存储，有找对应关系，性能会更好。
 */
function arrayToTree(items) {
  const result = []; // 存放结果集
  const itemMap = {};

  // 一次遍历
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    // 增加children
    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    // 存储每个节点
    itemMap[id] = {
      ...item,
      children: itemMap[id]['children'],
    };

    // 后面处理逻辑一样
    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }

  return result;
}

// ---------------------------------------

/**
 * 树形结构转成列表：将上面的过程反过来
 */

function treeToArray(arr) {
  const res = [];

  function traverse(childList) {
    childList.forEach((item) => {
      if (item.children && item.children.length) {
        res.push({
          id: item.id,
          name: item.name,
          pid: item.pid,
        });
        traverse(item.children);
      } else {
        res.push(item);
      }
    });
  }

  traverse(arr);

  return res;
}

// test-case
const arr = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      {
        id: 2,
        name: '部门2',
        pid: 1,
        children: [
          {
            id: 4,
            name: '111',
            pid: 2,
          },
        ],
      },
      {
        id: 3,
        name: '部门3',
        pid: 1,
        children: [],
      },
    ],
  },
];

console.log('res: ', treeToArray(arr));
