let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime() {
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function startStopwatch() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    timeDisplay.textContent = formatTime();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(timer);
}

startStopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopStopwatch();
    startStopBtn.textContent = 'Start';
  } else {
    startStopwatch();
    startStopBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
  stopStopwatch();
  seconds = 0;
  minutes = 0;
  hours = 0;
  timeDisplay.textContent = formatTime();
  startStopBtn.textContent = 'Start';
  isRunning = false;
  lapCounter = 1;
  lapList.innerHTML = '';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
  const lapTime = document.createElement('li');
  lapTime.textContent = `Lap ${lapCounter}: ${formatTime()}`;
  lapList.appendChild(lapTime);
  lapCounter++;
});
