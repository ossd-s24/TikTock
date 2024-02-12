const timer_types = {
	break: "break",
	study: "study"
};


let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

startBtn.onclick = function () {
	showPauseBtn()
    browser.runtime.sendMessage({ action: "start" });
};

resetBtn.onclick = function () {
    browser.runtime.sendMessage({ action: "reset" });
};

pauseBtn.onclick = function () {
	showStartBtn();
    browser.runtime.sendMessage({ action: "pause" });
};

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
	console.log("Min:" + min);
	console.log("Sec:" + sec);
	document.getElementById("timer_string").innerHTML = str;
}
