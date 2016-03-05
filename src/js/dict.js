let makeDict = wordList => {
  let dict = wordList.reduce((dict, word) => {
    // ditch short words
    if (!word || word.length < 3) { return dict; }

    word = word.toLowerCase()

    if (!dict[word]) {
      dict[word] = {
        val: word,
        count: 1
      }
    } else {
      dict[word].count = dict[word].count + 1
    }
    return dict;
  }, {});

  let arr = [];
  for (let word in dict) {
    // discard words used only once
    if ( dict[word].count > 1) {
      arr.push(dict[word]);
    }
  }
  return arr.sort((w1,w2) => {
    // reverse sort so we can use a straight appendChild later on
    return w2.count - w1.count;
  })
}

export default makeDict