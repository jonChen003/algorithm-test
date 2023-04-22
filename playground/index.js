function permute(inputNums) {
  const result = [];

  function dfs(nums, curNums) {
    if (nums.length === curNums.length) {
      result.push([...curNums]);
      return;
    }

    for (let i = 0; i < inputNums.length; i++) {
      if (!curNums.includes(inputNums[i])) {
        curNums.push(inputNums[i])
        dfs(inputNums, curNums);
        curNums.pop();
      }
    }
  }

  dfs(inputNums, []);
}
