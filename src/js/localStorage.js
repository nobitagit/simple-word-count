const keyWord = 'textToCount'

let ls = {}
ls.get = () => {
  return window.localStorage.getItem(keyWord);
}
ls.set = txt => {
  window.localStorage.setItem(keyWord, txt);
  return ls.get()
}

export default ls
