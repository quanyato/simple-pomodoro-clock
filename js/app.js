let settingData = {
    darkTheme: false, //chua phat trien tinh nang
    pomodoroLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
    pomoUntilLongBreak: 4,
    autoStart: false, //chua phat trien tinh nang
    soundEnable: false, //chua phat trien tinh nang
    notificationEnable: false //chua phat trien tinh nang
}

let timer; //khoi tao mot chiec dong ho
let isPaused = true;
let pomoRound = 1;
let isWorking = true;
let timeRemaining = settingData.pomodoroLength * 60;

// UI function
function updateTimerDOM() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('minute').innerText = `${String(minutes).padStart(2, '0')}`;
    document.getElementById('second').innerText = `${String(seconds).padStart(2, '0')}`;
}

function updateStateDOM() {
    if (isWorking) {
        document.getElementById('state').innerText = `Working ${pomoRound}`;
    } else if (pomoRound == 4) {
        document.getElementById('state').innerText = 'Long break';
    } else {
        document.getElementById('state').innerText = 'Short break';
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

// main function
function resetTimeRemaining() {
    if (isWorking) {
        timeRemaining = settingData.pomodoroLength * 60;
    } else if (pomoRound == 4) {
        timeRemaining = settingData.longBreakLength * 60;
    } else {
        timeRemaining = settingData.shortBreakLength * 60;
    }
}

function pausePomodoro() {
    clearInterval(timer);
    isPaused = true;
}

function resetPomodoro() {
    clearInterval(timer);
    isPaused = true;
    resetTimeRemaining();
    updateTimerDOM();
    updateStateDOM();
}

function forwardState() {
    clearInterval(timer);
    isPaused = true;
    if (isWorking) {
        isWorking = false;
    } else if (pomoRound == 4) {
        pomoRound = 1;
        isWorking = true;
    } else {
        pomoRound += 1;
        isWorking = true;
    }
    resetTimeRemaining();
    updateTimerDOM();
    updateStateDOM();
}

function startPomodoro() {
    isPaused = false;
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            forwardState();
        } else {
            timeRemaining--;
        }
        updateTimerDOM();
    }, 1000);
}

function pauseOrStart() {
    if (isPaused) {
        document.getElementById('startButton').innerText = 'Pause';
        startPomodoro();
    } else {
        document.getElementById('startButton').innerText = 'Play';
        pausePomodoro();
    }
}

function updateSettingsFromDOM() {
    settingData.darkTheme = document.getElementById('darkThemeOn').checked;
    settingData.pomodoroLength = parseInt(document.getElementById('pomodoroLength').value);
    settingData.shortBreakLength = parseInt(document.getElementById('shortBreakLength').value);
    settingData.longBreakLength = parseInt(document.getElementById('longBreakLength').value);
    settingData.pomoUntilLongBreak = parseInt(document.getElementById('pomoUntilLongBreak').value);
    settingData.autoStart = document.getElementById('autoStartOn').checked;
    settingData.soundEnable = document.getElementById('soundOn').checked;
    settingData.notificationEnable = document.getElementById('notificationOn').checked;
    pomoRound = 1;
    isWorking = true;
    resetPomodoro();
}

//init
updateStateDOM();
updateTimerDOM();
loadSettingsToDOM();

// DOM
document.getElementById('startButton').addEventListener('click', pauseOrStart);
document.getElementById('resetButton').addEventListener('click', resetPomodoro);
document.getElementById('forwardButton').addEventListener('click', forwardState);
document.getElementById('settingMenu').addEventListener('change', updateSettingsFromDOM);