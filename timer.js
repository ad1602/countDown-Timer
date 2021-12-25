console.log("this is timer.js");
let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const endTimeDisplay = document.querySelector('.display-end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);


    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop the countdown
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    let display = `${minutes}:${(remainderSeconds < 10) ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = 'Time remaining: ' + display;
}

function displayEndTime(timestamp) {
    const endTime = new Date(timestamp);
    let hour = endTime.getHours();
    let minute = endTime.getMinutes();
    let ampm = "AM";
    if(hour>11){
        ampm='PM';
     }
    if (hour > 12) {
        hour -= 12;
    }
  
    endTimeDisplay.textContent = `The Time ends at ${hour}:${(minute<10)?'0':''}${minute} ${ampm}`;
}

function startTimer() {
    let seconds = parseInt(this.dataset.time);
    timer(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));
document.timeForm.addEventListener('submit',function(e){
  e.preventDefault();
  let mins=this.minutes.value;
  timer(mins*60);
  this.reset();

});