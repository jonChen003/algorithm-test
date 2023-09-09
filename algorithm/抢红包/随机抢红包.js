/**
 * 题目描述：100元分给10个人，每个人抢到金额的几率是相等的
 */

/**
 * 算法思想：线段切割法
 * 参考文档：https://developer.aliyun.com/article/894855
 */

function randomNumber(min, max) {
  let randomNum = Math.random() * (max - min);
  console.log('randomNum---', randomNum);
  return randomNum;
}

function divideRedPackage() {
  const nums = [];

  for (let i = 1; i < 10; i++) {
    const num = randomNumber(0, 100);
    nums.push(num);
  }

  nums.sort((a, b) => a - b);
  nums.push(100);

  const arrNew = nums.reduce((arr, val, index) => {
    if (index === 0) {
      arr.push(val);
    } else {
      const diff = val - arr[arr.length - 1];
      arr.push(diff);
    }

    return arr;
  }, []);

  console.log('new---', arrNew);
}

divideRedPackage();
