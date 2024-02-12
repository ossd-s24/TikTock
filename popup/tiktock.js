let time_string = ""; // This will eventually write to the html element in the pop-up

let STUDY_TIME_SECONDS = 60 * 25; // 25 minutes of study time in seconds
let BREAK_TIME_SECONDS = 60 * 5; // 5 minutes of break time in seconds

let break_time_left = BREAK_TIME_SECONDS;
let study_time_left = STUDY_TIME_SECONDS;

const timer_types = {
	break: "break",
	study: "study"
};
let current_timer_type = timer_types.study;

document.getElementById("startBtn").onclick = function () {
	console.log("pressed start button");
};

// Code to be executed each second
// TODO: should call this when pressed a 'start timer' button
setInterval(() => {

	if (current_timer_type === timer_types.study) {
		study_time_left--;
	} else if (current_timer_type === timer_types.break) {
		break_time_left--;
	}

	if (study_time_left <= 0 || study_time_left <= 0) {
		resetTimers();
		switchTimers();
	}

	updateTimeString();
}, 1000);

function resetTimers() {
	break_time_left = BREAK_TIME_SECONDS;
	study_time_left = STUDY_TIME_SECONDS;
}

function switchTimers() {
	if (current_timer_type === timer_types.break) {
		current_timer_type = timer_types.study;
	} else if (current_timer_type === timer_types.break) {
		current_timer_type = timer_types.break;
	}
}

function updateTimeString() {
	// TODO: Update the string to be displayed based on current break or study time left
}
