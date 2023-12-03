const timers = [];

// Function to handle timer setting
function setTimer() {
    const hours = document.getElementById("hour").value || 0;
    const minutes = document.getElementById("min").value || 0;
    const seconds = document.getElementById("sec").value || 0;

    // Create a timer object
    const timer = {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
        display: null,
        intervalId: null,
        isComplete: false
    };

    // Display the timer
    const currentDiv = document.getElementById("list");
    currentDiv.classList.add("displayy");

    // Check if there are no timers
    if (timers.length === 0) {
        // No timers, remove any existing message
        const noTimersMessage = document.querySelector("#list p");
        if (noTimersMessage) {
            currentDiv.removeChild(noTimersMessage);
        }
    }

    // Create a div to hold the timer display and stop button
    const timerContainer = document.createElement("div");
    timerContainer.classList.add("timer-container");

    // Timer display
    const timerDisplay = document.createElement("p");

    // Stop button
    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop";
    stopButton.addEventListener("click", function() {
        stopTimer(timer, timerContainer);
    });

    // Append display and button to the timer container
    timerContainer.appendChild(timerDisplay);
    timerContainer.appendChild(stopButton);

    // Append the timer container to the display
    timerContainer.style.marginBottom = "10px"; // Adjust the value as needed
    currentDiv.appendChild(timerContainer);

    // Add the timer to the array
    timers.push(timer);

    // Start the timer
    timer.intervalId = setInterval(function() {
        if (timer.seconds > 0 || timer.minutes > 0 || timer.hours > 0) {
            // Timer is still running
            if (timer.seconds > 0) {
                timer.seconds--;
            } else {
                if (timer.minutes > 0) {
                    timer.minutes--;
                    timer.seconds = 59;
                } else {
                    if (timer.hours > 0) {
                        timer.hours--;
                        timer.minutes = 59;
                        timer.seconds = 59;
                    }
                }
            }
            // Update the timer display
            timerDisplay.textContent = `Time left : ${timer.hours}h ${timer.minutes}m ${timer.seconds}s`;
            timerDisplay.style.marginLeft = "140px";
        } else {
            // Timer reached 0, clear interval
            clearInterval(timer.intervalId);

            timerDisplay.textContent = "Time is up!";
            timer.isComplete = true;

            stopButton.textContent = "Delete";

            timerDisplay.style.marginLeft = "270px";
            timerContainer.style.backgroundColor = "#F0F757";
            timerDisplay.style.color = "#34344A";
            stopButton.style.backgroundColor = "#34344A";
            stopButton.style.color = "#FFF";
        }
    }, 1000);
}

// Function to stop a timer
function stopTimer(timer, timerContainer) {
    clearInterval(timer.intervalId);

    // Remove the timer from the array
    const index = timers.indexOf(timer);
    if (index !== -1) {
        timers.splice(index, 1);
    }

    // Remove the timer display from the current timers
    const currentDiv = document.getElementById("list");
    currentDiv.removeChild(timerContainer);

    // Check if there are no timers
    if (timers.length === 0) {
        // No timers, display a message
        const noTimersMessage = document.createElement("p");
        noTimersMessage.textContent = "You have no timers currently!";
        currentDiv.appendChild(noTimersMessage);
    }
}

// Add click event listener to the "Set" button
document.getElementById("btn").addEventListener("click", setTimer);