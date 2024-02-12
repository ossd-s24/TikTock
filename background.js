const STUDY_TIME_SECONDS = 60 * 25; // 25 minutes of study time in seconds
const BREAK_TIME_SECONDS = 60 * 5; // 5 minutes of break time in seconds

// Event listener for when the extension is started
browser.runtime.onInstalled.addListener(onExtensionEnabled);
browser.runtime.onStartup.addListener(onExtensionEnabled);

function onExtensionEnabled() {
    setIntialValues();
    resetTimers();

    setInterval(() => {
        browser.storage.session.get(['timeInSeconds', 'isPaused', 'isBreak']).then(result => {
            const timeLeft = result.timeInSeconds;
            const isPaused = result.isPaused;
            const isBreak = result.isBreak;
            if (isPaused) return;
            
            if (timeLeft <= 0) {
                switchTimers();
                resetTimers();
                // TODO: play sound
            }

            setTimeLeft(timeLeft - 1);
        }).catch(error => {
            console.error('Error retrieving session variables:', error);
        });
    }, 1000);
}


browser.runtime.onMessage.addListener((message) => {
    if (message.action === "start") {
        setPaused(false);
        // TODO: Play sound
    } else if (message.action === "reset") {
        resetTimers();

    } else if (message.action === "pause") {
        setPaused(true);
        // TODO: Play sound
    } else if (message.action === "pop-up init") {
        browser.storage.session.get(['timeInSeconds', 'isPaused', 'isBreak']).then(result => {
            const timeLeft = result.timeInSeconds;
            const isPausedLocal = result.isPaused;
            const isBreakLocal = result.isBreak;
             
            browser.runtime.sendMessage({ 
                timeInSeconds: timeLeft,
                isPaused: isPausedLocal,
                isBreak: isBreakLocal
            });

        }).catch(error => {
            console.error('Error retrieving session variables:', error);
        });
    }
});

function switchTimers() {
    const isBreakLocal = browser.storage.session.get(isBreak);
    setBreak(!isBreakLocal);
}

function setIntialValues() {
    setPaused(true);
    setBreak(false);
}

function resetTimers() {
    browser.storage.session.get(['isBreak'])
        .then(result => {
            if (result.isBreak) {
                setTimeLeft(BREAK_TIME_SECONDS);
            } else {
                setTimeLeft(STUDY_TIME_SECONDS);
            } 
        }).catch(error => {
            console.error('Error retrieving session variables:', error);
    });
    setPaused(true);
}

function setPaused(boolValue) {
    browser.storage.session.set({ isPaused: boolValue});
    browser.runtime.sendMessage({ isPaused: boolValue});
}

function setBreak(boolValue) {
    browser.storage.session.set({ isBreak: boolValue});
    browser.runtime.sendMessage({ isBreak: boolValue});
}

function setTimeLeft(value) {
    browser.storage.session.set({ timeInSeconds: value});
    browser.runtime.sendMessage({ timeInSeconds: value});
}
