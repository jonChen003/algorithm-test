/**
 * [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
]
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
