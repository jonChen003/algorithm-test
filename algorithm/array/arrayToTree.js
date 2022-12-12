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

/* eslint-disable */

// 方法一： 递归方法

// 方法二： Map + 两次遍历数组
function arrayToTree2(items) {
  const result = [];
  const itemMap = {};

  // 利用map来记录每个节点，对于嵌套情况来说，引用不变，只是改变其children
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }

  // 遍历一遍nodes，把node塞到map对应的节点的children上
  for (const item of items) {
    const { id, pid } = item;
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

// 方法三： Map + 一次遍历数组
