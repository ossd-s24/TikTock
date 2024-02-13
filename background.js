// TODO: Get these values from sliders
const STUDY_TIME = 60 * 25;
const BREAK_TIME = 60 * 5;

const timerSound = new Audio('./sounds/timer.mp3');
const buttonSound = new Audio('./sounds/button.mp3');

browser.runtime.onInstalled.addListener(onExtensionEnabled);
browser.runtime.onStartup.addListener(onExtensionEnabled);

function onExtensionEnabled() {
    setIntialValues();
    resetTimers();

    console.log("init");
    setInterval(() => {
        browser.storage.session.get(['timeInSeconds', 'isPaused']).then(result => {
            const timeLeft = result.timeInSeconds;
            const isPaused = result.isPaused;
            if (isPaused) return;
            
            if (timeLeft <= 0) {
                timerSound.play();
                switchTimers().then(() => {
                    resetTimers();
                });
            }

            setTimeLeft(timeLeft - 1);
        })
    }, 1000);
}

browser.runtime.onMessage.addListener((message) => {
    /*
    if (message.studyTime != undefined) {
        setStudyTimeInSeconds(message.studyTime * 60);
    }
    if (message.breakTime != undefined) {
        setBreakTimeInSeconds(message.breakTime * 60);
    }
    */

    if (message.action === "start") {
        buttonSound.play();
        setPaused(false);
    } else if (message.action === "reset") {
        buttonSound.play();
        resetTimers();
    } else if (message.action === "pause") {
        buttonSound.play();
        setPaused(true);
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
    } else if (message.action === "switch") {
        buttonSound.play();
        switchTimers();
    }
});

function switchTimers() {
    return browser.storage.session.get("isBreak").then(result => {
        const isBreak = result.isBreak;
        setBreak(!isBreak);
    });
}

function setIntialValues() {
    setPaused(true);
    setBreak(false);
}

function resetTimers() {
    browser.storage.session.get(['isBreak'])
        .then(result => {
            if (result.isBreak) {
                getBreakTimeInSeconds().then(result => {
                    setTimeLeft(result);
                });
            } else {
                getStudyTimeInSeconds().then(result => {
                    setTimeLeft(result);
                });
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

function setStudyTimeInSeconds(value) {
    browser.storage.session.set({ studyTime: value});
}

function setBreakTimeInSeconds(value) {
    browser.storage.session.set({ breakTime: value});
}

async function getStudyTimeInSeconds() {
    /*
        const result = await browser.storage.session.get("studyTime");
        console.log("Study Time:", result.studyTime);
        return parseInt(result.studyTime);
    */
    return STUDY_TIME;
}

async function getBreakTimeInSeconds() {
    /*
        const result = await browser.storage.session.get("breakTime");
        return parseInt(result.breakTime);
    */
    return BREAK_TIME;
}

