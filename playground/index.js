function arrayToTree(arr) {
  const result = [];
	const itemMap = {};

	for (const item of arr) {
		itemMap[item.id] = { ...item, children: [] };
	}

	for (const item of arr) {
		const { id, pid } = item;

		if (item.pid === 0) {
			result.push(itemMap[id]);
		} else {
			if(!itemMap[pid]) {
				itemMap[pid] = {
					children: []
				}
			}

			itemMap[pid].children.push(item[id]);
		}
	}

	return result;
}
