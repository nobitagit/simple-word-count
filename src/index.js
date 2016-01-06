let txtArea = document.getElementById('txtArea')
  , cCounter = document.getElementById('cCounter')
  , wCounter = document.getElementById('wCounter')
  , wordListUL = document.getElementById('wordList')

let makeDict = wordList => {
  let dict = wordList.reduce((dict, word) => {
    // convert to lowercase to index properly?
    //let w = word.toLowerCase();
    // discard short words
    if (!word || word.length < 3) { return dict; }

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
    return w2.count - w1.count; // reverse sort so we can use appendChild as needed
  });
}

let countChars = () => {
  // see: http://www.mediacollege.com/internet/javascript/text/count-words.html
  let val = txtArea
              .value
              .replace(/(^\s*)|(\s*$)/gi,'') //exclude start and end white-space
              .replace(/[ ]{2,}/gi,' ') //2 or more space to 1
              .replace(/[.,!?/]{1,}/gi,' ') // remove special chars
              .replace(/\n /,' '); // convert newline to space

  let wordList = val.split(' ');

  cCounter.innerHTML = val.length
  wCounter.innerHTML = val.length !== 0 ? wordList.length : 0;

  let frag = document.createDocumentFragment()
  let dict = makeDict(wordList)

  dict.forEach(word => {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(word.val + ' ' + word.count))
    frag.appendChild(li);
  });

  wordListUL.innerHTML = '';
  wordListUL.appendChild(frag);

};

['paste', 'change', 'keyup'].forEach(function (evt) {
  txtArea.addEventListener(evt, countChars);
});

