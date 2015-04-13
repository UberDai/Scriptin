'use strict';

document.getElementById('insert-btn').onclick = function () {
	  chrome.tabs.executeScript({
	    code:  'lol()'
	  });
};