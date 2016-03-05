import makeDict from "./js/dict.js"
import lStorage from "./js/localStorage.js"

let txtArea = document.getElementById('txtArea')
  , cCounter = document.getElementById('cCounter')
  , wCounter = document.getElementById('wCounter')
  , wordListUL = document.getElementById('wordList')

let countChars = () => {
  let txt = txtArea.value
  lStorage.set(txt);
  // see: http://www.mediacollege.com/internet/javascript/text/count-words.html
  let val = txt
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
    let span = document.createElement('span')
    li.className = 'list-group-item';
    span.className = 'badge'
    span.appendChild(document.createTextNode(word.count))
    li.appendChild(document.createTextNode(word.val))
    li.appendChild(span)
    frag.appendChild(li)
  })

  wordListUL.innerHTML = '';
  wordListUL.appendChild(frag);

}

if ( lStorage.get() ) {
  txtArea.value = lStorage.get()
  countChars()
}

['paste', 'change', 'keyup'].forEach(function (evt) {
  txtArea.addEventListener(evt, countChars);
})

let deleteBtn = document.getElementById('deleteBtn')
deleteBtn.addEventListener('click', () => {
  txtArea.value = lStorage.set('')
  txtArea.focus()
  countChars()
})
