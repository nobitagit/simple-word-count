let txtArea = document.getElementById('txtArea')
	, cCounter = document.getElementById('cCounter')
	, wCounter = document.getElementById('wCounter')

let countChars = () => {
  let val = txtArea
  						.value
  						.replace(/(^\s*)|(\s*$)/gi,'') //exclude  start and end white-space
  						.replace(/[ ]{2,}/gi,' ') //2 or more space to 1
							.replace(/\n /,'\n'); // exclude newline with a start spacing

	cCounter.innerHTML = val.length
	wCounter.innerHTML = val.length !== 0 ? val.split(' ').length : 0;
};

['paste', 'change', 'keyup'].forEach(function (evt) {
	txtArea.addEventListener(evt, countChars);
});

