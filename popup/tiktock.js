let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

browser.runtime.sendMessage({action: "pop-up init"});

startBtn.onclick = function () {
	browser.runtime.sendMessage({ action: "start" });
};

resetBtn.onclick = function () {
	browser.runtime.sendMessage({ action: "reset" });
};

pauseBtn.onclick = function () {
	browser.runtime.sendMessage({ action: "pause" });
};

browser.runtime.onMessage.addListener((message) => {
	if (message.timeInSeconds != undefined) {
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
		// TODO: Change the title if it's a break
	}
});

function showPauseBtn() {
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
	let str = min + ":" + sec;
	document.getElementById("timer_string").innerHTML = str;
}
