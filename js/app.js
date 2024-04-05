let settingData = {
    darkTheme: false, //chua phat trien tinh nang
    pomodoroLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
    pomoUntilLongBreak: 4,
    autoStart: false, //chua phat trien tinh nang
    soundEnable: true, //chua phat trien tinh nang
    notificationEnable: true //chua phat trien tinh nang
}

let timer; //khoi tao mot chiec dong ho
let isPaused = true;
let pomoRound = 1;
let isWorking = true;
let timeRemaining = settingData.pomodoroLength * 60;
const startSoundUrl = '/audio/start.m4a';
const shortBreakStartSoundUrl = '/audio/short_break_start.m4a';
const shortBreakEndSoundUrl = '/audio/short_break_end.m4a';
const longBreakStartSoundUrl = '/audio/long_break_start.m4a';
const longBreakEndSoundUrl = '/audio/long_break_end.m4a';
const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="34"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" class="svg-color-3"/></svg>';
const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="34"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" class="svg-color-3"/></svg>';
const restartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="21"><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" class="svg-color-3"/></svg>';
const settingIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="21"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" class="svg-color-3"/></svg>';
const forwardIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="21"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" class="svg-color-3"/></svg>';

const lightRed = {
    'back': '255, 245, 245',
    'color1': '254, 215, 215',
    'color2': '252, 129, 129',
    'color3': '99, 23, 27',
}

const lightBlue = {
    'back': '235, 248, 255',
    'color1': '190, 227, 248',
    'color2': '99, 179, 237',
    'color3': '26, 54, 93',
}

const lightGreen = {
    'back': '240, 255, 244',
    'color1': '198, 246, 213',
    'color2': '104, 211, 145',
    'color3': '28, 69, 50',
}

// UI function
function setTheme(theme) {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', `rgb(${theme.back})`);
    var r = document.querySelector(':root');
    r.style.setProperty('--tck-background', theme.back);
    r.style.setProperty('--tck-color-1', theme.color1);
    r.style.setProperty('--tck-color-2', theme.color2);
    r.style.setProperty('--tck-color-3', theme.color3);
    document.getElementById('forwardButton').innerHTML = forwardIcon;
}

function updateTimerDOM() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('minute').innerText = `${String(minutes).padStart(2, '0')}`;
    document.getElementById('second').innerText = `${String(seconds).padStart(2, '0')}`;
}

function updateSessionDOM() {
    if (isWorking) {
        setTheme(lightRed);
        document.getElementById('session').innerText = `Working ${pomoRound}`;
    } else if (pomoRound == settingData.pomoUntilLongBreak) {
        setTheme(lightGreen);
        document.getElementById('session').innerText = 'Long break';
    } else {
        setTheme(lightBlue);
        document.getElementById('session').innerText = 'Short break';
    }
}

function updateContextPlayButton() {
    if (isPaused) {
        document.getElementById('startButton').innerHTML = playIcon;
    } else {
        document.getElementById('startButton').innerHTML = pauseIcon;
    }
}

function updateContextStopButton() {
    if (isPaused) {
        document.getElementById('stopButton').innerHTML = settingIcon;
        document.getElementById('stopButton').dataset.bsTarget = "#settingsModal";
        document.getElementById('stopButton').dataset.bsToggle = "modal";
    } else {
        document.getElementById('stopButton').innerHTML = restartIcon;
        document.getElementById('stopButton').dataset.bsTarget = "";
        document.getElementById('stopButton').dataset.bsToggle = "modal";
    }
}

function loadSettingsToDOM() {
    document.getElementById('darkThemeOn').checked = settingData.darkTheme;
    document.getElementById('pomodoroLength').value = settingData.pomodoroLength;
    document.getElementById('shortBreakLength').value = settingData.shortBreakLength;
    document.getElementById('longBreakLength').value = settingData.longBreakLength;
    document.getElementById('pomoUntilLongBreak').value = settingData.pomoUntilLongBreak;
    document.getElementById('autoStartOn').checked = settingData.autoStart;
    document.getElementById('soundOn').checked = settingData.soundEnable;
    document.getElementById('notificationOn').checked = settingData.notificationEnable;
}

function playSound(soundUrl) {
    let sfx = new Audio(soundUrl);
    if (settingData.soundEnable) {
        sfx.play();
    }
}

function playStartBreakSound() {
    if (pomoRound == settingData.pomoUntilLongBreak) {
        playSound(longBreakStartSoundUrl);
    } else {
        playSound(shortBreakStartSoundUrl);
    }
}

function playEndBreakSound() {
    if (pomoRound == settingData.pomoUntilLongBreak) {
        playSound(longBreakEndSoundUrl);
    } else {
        playSound(shortBreakEndSoundUrl);
    }
}

// main function
function startCountdown(funcExecuteWhenCountdownEnd) {
    isPaused = false;
    updateContextPlayButton();
    updateContextStopButton();
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            funcExecuteWhenCountdownEnd();
        } else {
            timeRemaining--;
        }
        updateTimerDOM();
    }, 1000);
}

function pauseCountdown() {
    clearInterval(timer);
    isPaused = true;
    updateContextPlayButton();
    updateContextStopButton();
}

function setPomodoro() {
    if (isWorking) {
        timeRemaining = settingData.pomodoroLength * 60;
    } else if (pomoRound == settingData.pomoUntilLongBreak) {
        timeRemaining = settingData.longBreakLength * 60;
    } else {
        timeRemaining = settingData.shortBreakLength * 60;
    }
    updateTimerDOM();
}

function forwardSession() {
    pauseCountdown();
    if (isWorking) {
        isWorking = false;
        playStartBreakSound();
    } else if (pomoRound == settingData.pomoUntilLongBreak) {
        pomoRound = 1;
        isWorking = true;
    } else {
        pomoRound += 1;
        isWorking = true;
    }
    updateSessionDOM();
    setPomodoro();
}

function executeWhenCountdownEnds() {
    if (!isWorking) {
        playEndBreakSound();
    }
    forwardSession();
    if (settingData.autoStart) {
        startCountdown(executeWhenCountdownEnds);
    }
}

function stopThisSession() {
    pauseCountdown();
    setPomodoro();
}

function pauseOrStart() {
    if (isPaused) {
        playSound(startSoundUrl);
        startCountdown(executeWhenCountdownEnds);
    } else {
        pauseCountdown();
    }
}

function stopOrSettings() {
    if (!isPaused) {
        stopThisSession();
    }
}

function updatePomoSettings() {
    settingData.pomodoroLength = parseInt(document.getElementById('pomodoroLength').value);
    settingData.shortBreakLength = parseInt(document.getElementById('shortBreakLength').value);
    settingData.longBreakLength = parseInt(document.getElementById('longBreakLength').value);
    settingData.pomoUntilLongBreak = parseInt(document.getElementById('pomoUntilLongBreak').value);
    pomoRound = 1;
    isWorking = true;
    stopThisSession();
    updateSessionDOM();
}

function updateOtherSettings() {
    settingData.darkTheme = document.getElementById('darkThemeOn').checked;
    settingData.autoStart = document.getElementById('autoStartOn').checked;
    settingData.soundEnable = document.getElementById('soundOn').checked;
    settingData.notificationEnable = document.getElementById('notificationOn').checked;
}


//init
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/js/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
setPomodoro();
updateSessionDOM();
updateContextPlayButton();
updateContextStopButton();
loadSettingsToDOM();

// install prompt visible
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.querySelector("#installBtn").style.display="block"; 
});
async function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        console.log("Installation Dialog opened");

        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt.', true);
        } else if (outcome === 'dismissed') {
            console.log('User dismissed the install prompt');
        }

        document.querySelector("#installBtn").style.display = "none";
    }
}

// DOM
document.getElementById('startButton').addEventListener('click', pauseOrStart);
document.getElementById('stopButton').addEventListener('click', stopOrSettings);
document.getElementById('forwardButton').addEventListener('click', forwardSession);
document.getElementById('pomoSettings').addEventListener('change', updatePomoSettings);
document.getElementById('otherSettings').addEventListener('change', updateOtherSettings);