let txtArea = document.getElementById('txtArea')
  , cCounter = document.getElementById('cCounter')
  , wCounter = document.getElementById('wCounter')
  , wordListUL = document.getElementById('wordList')

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

let countChars = () => {
  // see: http://www.mediacollege.com/internet/javascript/text/count-words.html
  let val = txtArea
              .value
              .replace(/(^\s*)|(\s*$)/gi,'') // exclude start and end white-space
              .replace(/\n/gi,' ') // convert newline to space
              .replace(/[ ]{2,}/gi,' ') // 2 or more space to 1
              .replace(/[.,!?/]{1,}/gi,' ') // remove special chars

  let wordList = val.split(' ');

  cCounter.innerHTML = val.length
  wCounter.innerHTML = val.length !== 0 ? wordList.length : 0;

  let frag = document.createDocumentFragment()
  let dict = makeDict(wordList)

  dict.forEach(word => {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(word.val + ' ' + word.count))
    frag.appendChild(li);
  })

  wordListUL.innerHTML = '';
  wordListUL.appendChild(frag);

}

['paste', 'change', 'keyup'].forEach(function (evt) {
  txtArea.addEventListener(evt, countChars);
})

