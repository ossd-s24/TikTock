const STUDY_TIME_SECONDS = 60 * 25; // 25 minutes of study time in seconds
const BREAK_TIME_SECONDS = 60 * 5; // 5 minutes of break time in seconds

// Event listener for when the extension is started
browser.runtime.onInstalled.addListener(function() {
    console.log("OnInstalled");
    resetTimers();
    setInterval(() => {
        browser.storage.session.get(['timeInSeconds', 'isPaused', 'isBreak']).then(result => {
            const timeLeft = result.timeInSeconds;
            const isPaused = result.ispaused;
            const isBreak = result.isBreak;

            console.log(timeLeft, isPaused, isBreak);

            if (isPaused) return;

            browser.storage.session.set({ timeInSeconds: timeLeft - 1 });
        }).catch(error => {
            console.error('Error retrieving session variables:', error);
        });
    }, 1000);
});


browser.runtime.onMessage.addListener((message) => {
    if (message.action === "start") {
        // Handle start action
    } else if (message.action === "reset") {
        // Handle reset action
    } else if (message.action === "pause") {
        // Handle pause action
    }
});

function switchTimers() {
}

function resetTimers() {
    browser.storage.session.get(['isBreak'])
        .then(result => {
            if (result.isBreak) {
                browser.storage.session.set({ timeInSeconds: BREAK_TIME_SECONDS});
            } else {
                browser.storage.session.set({ timeInSeconds: STUDY_TIME_SECONDS});
            } 
        }).catch(error => {
            console.error('Error retrieving session variables:', error);
    });
}
