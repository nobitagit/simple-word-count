(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var txtArea = document.getElementById('txtArea'),
    cCounter = document.getElementById('cCounter'),
    wCounter = document.getElementById('wCounter'),
    wordListUL = document.getElementById('wordList');

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

var countChars = function countChars() {
  // see: http://www.mediacollege.com/internet/javascript/text/count-words.html
  var val = txtArea.value.replace(/(^\s*)|(\s*$)/gi, '') // exclude start and end white-space
  .replace(/\n/gi, ' ') // convert newline to space
  .replace(/[ ]{2,}/gi, ' ') // 2 or more space to 1
  .replace(/[.,!?/]{1,}/gi, ' '); // remove special chars

  var wordList = val.split(' ');

  cCounter.innerHTML = val.length;
  wCounter.innerHTML = val.length !== 0 ? wordList.length : 0;

  var frag = document.createDocumentFragment();
  var dict = makeDict(wordList);

  dict.forEach(function (word) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(word.val + ' ' + word.count));
    frag.appendChild(li);
  });

  wordListUL.innerHTML = '';
  wordListUL.appendChild(frag);
};

['paste', 'change', 'keyup'].forEach(function (evt) {
  txtArea.addEventListener(evt, countChars);
});

},{}]},{},[1]);
