let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let switchBtn = document.getElementById("switchBtn");

let messageHeader = document.getElementById("messageHeader");

browser.runtime.sendMessage({ action: "pop-up init"});

startBtn.onclick = function () {
	//browser.runtime.sendMessage({ studyTime: parseInt(studyTime.value)});
	//browser.runtime.sendMessage({ breakTime: parseInt(breakTime.value)});
	browser.runtime.sendMessage({ action: "start" });
};

resetBtn.onclick = function () {
	browser.runtime.sendMessage({ action: "reset" });
};

pauseBtn.onclick = function () {
	browser.runtime.sendMessage({ action: "pause" });
};

switchBtn.onclick = function () {
	browser.runtime.sendMessage({ action: "switch" });
};

/*
// TODO: Implement sliders for study and break durations

let studyTime = document.getElementById("study-time");
let breakTime = document.getElementById("break-time");

studyTime.addEventListener("input", function() {
	browser.runtime.sendMessage({ studyTime: parseInt(studyTime.value)});
});

breakTime.addEventListener("input", function() {
	browser.runtime.sendMessage({ breakTime: parseInt(breakTime.value)});
});
*/

browser.runtime.onMessage.addListener((message) => {
	if (message.timeInSeconds != undefined) {
		console.log(message.timeInSeconds);
		updateTimeString(message.timeInSeconds);
	}
	if (message.isPaused != undefined) {
		if (message.isPaused) {
			showStartBtn();
		} else {
			showPauseBtn();
		}
	}
	if (message.isBreak != undefined) {
		if (message.isBreak) {
			messageHeader.innerHTML = "Enjoy Your Break";
		} else {
			messageHeader.innerHTML = "Stay Focused";
		}
	}
});

function showPauseBtn() {
	startBtn.style.display = 'none';	
	startBtn.style.display = 'none';	
	pauseBtn.style.display = 'initial';
}

function showStartBtn() {
	pauseBtn.style.display = 'none';
	startBtn.style.display = 'initial';
}

function updateTimeString(valueInSeconds) {
	let min = Math.floor(valueInSeconds/60);
	let sec = valueInSeconds % 60;
	let formatSec = sec.toString().padStart(2, '0');
	let str = min + ":" + formatSec;
	document.getElementById("timer_string").innerHTML = str;
}
