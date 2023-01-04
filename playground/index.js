function mackRandList(a, b, len) {
  function getRand() {
    return a + Math.floor(Math.random() * (b - a));
  }

  const res = [];
  while (res.length < len) {
    let temp = getRand();
    while (res.includes(temp)) {
      temp = getRand();
    }

    res.push(temp);
  }

  return res;
}
