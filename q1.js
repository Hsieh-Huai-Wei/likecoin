const readCells = (() => {
  const RANGE_SIZE = 30;
  const emptyRow = 30;
  
  return async function readCells(range) {
    // For simplicity, only support column A, enough for test case purpose
    const rangeRegexp = /^A([0-9]+):A([0-9]+)$/;
    const match = rangeRegexp.exec(range);
    if (!match) {
      
      throw new Error('invalid range string1');
    }
    const lower = Number.parseInt(match[1], 10);
    if (!Number.isSafeInteger(lower) || lower <= 0) {
      throw new Error('invalid range string2');
    }
    const upper = Number.parseInt(match[2], 10);
    if (!Number.isSafeInteger(upper) || upper < lower) {
      throw new Error('invalid range string3');
    }
    if (upper - lower >= RANGE_SIZE) {
      throw new Error('range exceeded limit');
    }
    const result = [];
    for (let i = lower; i <= upper && i < emptyRow; i += 1) {
      result.push(i);
    }
    if (result.length === 0) {
      return null;
    }
    return result;
  };
})();

async function emptyRow () {
  let count = 1;
  for (let i=1; i<Infinity; i+=30) {
    const checkEmpty = await readCells(`A${i}:A${i + 29}`);
    if (checkEmpty === null) {
      return checkEmpty;
    } else if (checkEmpty.length < 30) {
      return count + checkEmpty.length;
    } else {
      count += 30;
    }
  }
}

async function test() {
  const result = await emptyRow();
  console.log("Empty position : ", result)
}

test();