(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _dict = require("./js/dict.js");

var _dict2 = _interopRequireDefault(_dict);

var _localStorage = require("./js/localStorage.js");

var _localStorage2 = _interopRequireDefault(_localStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var txtArea = document.getElementById('txtArea'),
    cCounter = document.getElementById('cCounter'),
    wCounter = document.getElementById('wCounter'),
    wordListUL = document.getElementById('wordList');

var countChars = function countChars() {
  var txt = txtArea.value;
  _localStorage2.default.set(txt);
  // see: http://www.mediacollege.com/internet/javascript/text/count-words.html
  var val = txt.replace(/(^\s*)|(\s*$)/gi, '') // exclude start and end white-space
  .replace(/\n/gi, ' ') // convert newline to space
  .replace(/[ ]{2,}/gi, ' ') // 2 or more space to 1
  .replace(/[.,!?/]{1,}/gi, ' '); // remove special chars

  var wordList = val.split(' ');

  cCounter.innerHTML = val.length;
  wCounter.innerHTML = val.length !== 0 ? wordList.length : 0;

  var frag = document.createDocumentFragment();
  var dict = (0, _dict2.default)(wordList);

  dict.forEach(function (word) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    li.className = 'list-group-item';
    span.className = 'badge';
    span.appendChild(document.createTextNode(word.count));
    li.appendChild(document.createTextNode(word.val));
    li.appendChild(span);
    frag.appendChild(li);
  });

  wordListUL.innerHTML = '';
  wordListUL.appendChild(frag);
};

if (_localStorage2.default.get()) {
  txtArea.value = _localStorage2.default.get();
  countChars();
}

['paste', 'change', 'keyup'].forEach(function (evt) {
  txtArea.addEventListener(evt, countChars);
});

var deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', function () {
  txtArea.value = _localStorage2.default.set('');
  txtArea.focus();
  countChars();
});

},{"./js/dict.js":2,"./js/localStorage.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeDict = function makeDict(wordList) {
  var dict = wordList.reduce(function (dict, word) {
    // ditch short words
    if (!word || word.length < 3) {
      return dict;
    }

    word = word.toLowerCase();

    if (!dict[word]) {
      dict[word] = {
        val: word,
        count: 1
      };
    } else {
      dict[word].count = dict[word].count + 1;
    }
    return dict;
  }, {});

  var arr = [];
  for (var word in dict) {
    // discard words used only once
    if (dict[word].count > 1) {
      arr.push(dict[word]);
    }
  }
  return arr.sort(function (w1, w2) {
    // reverse sort so we can use a straight appendChild later on
    return w2.count - w1.count;
  });
};

exports.default = makeDict;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var keyWord = 'textToCount';

var ls = {};
ls.get = function () {
  return window.localStorage.getItem(keyWord);
};
ls.set = function (txt) {
  window.localStorage.setItem(keyWord, txt);
  return ls.get();
};

exports.default = ls;

},{}]},{},[1]);
