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
    var r = document.querySelector(':root');
    r.style.setProperty('--tck-background', theme.back);
    r.style.setProperty('--tck-color-1', theme.color1);
    r.style.setProperty('--tck-color-2', theme.color2);
    r.style.setProperty('--tck-color-3', theme.color3);
}

function updateTimerDOM() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('minute').innerText = `${String(minutes).padStart(2, '0')}`;
    document.getElementById('second').innerText = `${String(seconds).padStart(2, '0')}`;
}

function updateStateDOM() {

    if (isWorking) {
        setTheme(lightRed);
        document.getElementById('state').innerText = `Working ${pomoRound}`;
    } else if (pomoRound == settingData.pomoUntilLongBreak) {
        setTheme(lightGreen);
        document.getElementById('state').innerText = 'Long break';
    } else {
        setTheme(lightBlue);
        document.getElementById('state').innerText = 'Short break';
    }
}

function updateContextPlayButton() {
    if (isPaused) {
        document.getElementById('startButton').innerHTML = '<span><i class="fa-solid fa-play fa-2xl"></i></span>';
    } else {
        document.getElementById('startButton').innerHTML = '<span><i class="fa-solid fa-pause fa-2xl"></i></span>';
    }
}

function updateContextResetButton() {
    if (isPaused) {
        document.getElementById('resetButton').innerHTML = '<span><i class="fa-solid fa-gear fa-lg"></i></span>';
        document.getElementById('resetButton').dataset.bsTarget = "#settingsModal";
        document.getElementById('resetButton').dataset.bsToggle = "modal";
    } else {
        document.getElementById('resetButton').innerHTML = '<span><i class="fa-solid fa-clock-rotate-left fa-lg"></i></span>';
        document.getElementById('resetButton').dataset.bsTarget = "";
        document.getElementById('resetButton').dataset.bsToggle = "modal";
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
    } else if (pomoRound == settingData.pomoUntilLongBreak) {
        timeRemaining = settingData.longBreakLength * 60;
    } else {
        timeRemaining = settingData.shortBreakLength * 60;
    }
}

function pausePomodoro() {
    clearInterval(timer);
    isPaused = true;
    updateContextPlayButton();
    updateContextResetButton();
}

function resetPomodoro() {
    pausePomodoro();
    resetTimeRemaining();
    updateTimerDOM();
    updateStateDOM();
}

function forwardStateAnd(callBackStart) {
    pausePomodoro();
    if (isWorking) {
        isWorking = false;
    } else if (pomoRound == settingData.pomoUntilLongBreak) {
        pomoRound = 1;
        isWorking = true;
    } else {
        pomoRound += 1;
        isWorking = true;
    }
    resetTimeRemaining();
    updateTimerDOM();
    updateStateDOM();

    if (settingData.autoStart && callBackStart) {
        callBackStart();
    }
}

function startPomodoro() {
    isPaused = false;
    updateContextPlayButton();
    updateContextResetButton();
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            forwardStateAnd(startPomodoro);
        } else {
            timeRemaining--;
        }
        updateTimerDOM();
    }, 1000);
}

function pauseOrStart() {
    if (isPaused) {
        startPomodoro();
    } else {
        pausePomodoro();
    }
}

function resetOrSettings() {
    if (!isPaused) {
        resetPomodoro();
    }
}

function updatePomoSettings() {
    settingData.pomodoroLength = parseInt(document.getElementById('pomodoroLength').value);
    settingData.shortBreakLength = parseInt(document.getElementById('shortBreakLength').value);
    settingData.longBreakLength = parseInt(document.getElementById('longBreakLength').value);
    settingData.pomoUntilLongBreak = parseInt(document.getElementById('pomoUntilLongBreak').value);
    pomoRound = 1;
    isWorking = true;
    resetPomodoro();
}

function updateOtherSettings() {
    settingData.darkTheme = document.getElementById('darkThemeOn').checked;
    settingData.autoStart = document.getElementById('autoStartOn').checked;
    settingData.soundEnable = document.getElementById('soundOn').checked;
    settingData.notificationEnable = document.getElementById('notificationOn').checked;
}

//init
updateStateDOM();
updateTimerDOM();
updateContextPlayButton();
updateContextResetButton();
loadSettingsToDOM();

// DOM
document.getElementById('startButton').addEventListener('click', pauseOrStart);
document.getElementById('resetButton').addEventListener('click', resetOrSettings);
document.getElementById('forwardButton').addEventListener('click', function () { forwardStateAnd(startPomodoro); });
document.getElementById('pomoSettings').addEventListener('change', updatePomoSettings);
document.getElementById('otherSettings').addEventListener('change', updateOtherSettings);