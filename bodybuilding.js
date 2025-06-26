// Exercise data with proper breaks between sets
const exercises = [
    // Warm-up Section
    { name: "Warm-up", duration: 60, type: "warm-up", image: "images/warmup.png" }, // 1 minute

    // Set 1 - Upper Body Push
    { name: "Push-ups", duration: 45, type: "exercise", image: "images/pushup.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Shoulder Press", duration: 45, type: "exercise", image: "images/shoulderpress.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Tricep Dips", duration: 45, type: "exercise", image: "images/tricepdips.png" },
    { name: "Break Time!", duration: 120, type: "break", image: "images/rest.png" }, // 2-minute break between sets

    // Set 2 - Lower Body
    { name: "Squats", duration: 45, type: "exercise", image: "images/squats.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Lunges", duration: 45, type: "exercise", image: "images/lunges.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Calf Raises", duration: 45, type: "exercise", image: "images/calfraise.png" },
    { name: "Break Time!", duration: 120, type: "break", image: "images/rest.png" }, // 2-minute break between sets

    // Set 3 - Upper Body Pull
    { name: "Dumbbell Rows", duration: 45, type: "exercise", image: "images/dumbellrows.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Bicep Curls", duration: 45, type: "exercise", image: "images/bicepscurls.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Pull-ups or Band Pulls", duration: 45, type: "exercise", image: "images/pullups.png" },
    { name: "Break Time!", duration: 120, type: "break", image: "images/rest.png" }, // 2-minute break between sets

    // Set 4 - Core
    { name: "Plank", duration: 30, type: "exercise", image: "images/plank.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Crunches", duration: 45, type: "exercise", image: "images/crunches.png" },
    { name: "Rest", duration: 30, type: "rest", image: "images/rest.png" },
    { name: "Russian Twists", duration: 45, type: "exercise", image: "images/russiantwists.png" },
    
    // Cool-down
    { name: "Cool-down Stretches", duration: 60, type: "cool-down", image: "images/cooldown.png" } // 1 minute
];

// DOM elements
const timerDisplay = document.getElementById('timer');
const currentExerciseDisplay = document.getElementById('currentExercise');
const nextExerciseDisplay = document.getElementById('nextExercise');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const skipBtn = document.getElementById('skipBtn');
const prevBtn = document.getElementById('prevBtn');
const exerciseListContainer = document.getElementById('exerciseList');
const progressFill = document.getElementById('progressFill');
const currentPhaseSpan = document.querySelector('#currentPhase span');
const phaseElements = document.querySelectorAll('.phase');
const exerciseImage = document.getElementById('exerciseImage');
const beepSound = document.getElementById('beepSound');

let currentExerciseIndex = 0;
let timeLeft = 0;
let isRunning = false;
let timerInterval;
let userInteracted = false;

// Calculate total workout duration
const totalWorkoutDuration = exercises.reduce((total, exercise) => total + exercise.duration, 0);
let elapsedTime = 0;

// Initialize exercise list with improved visual grouping
function initializeExerciseList() {
    let currentSet = '';
    exercises.forEach((exercise, index) => {
        // Add set headers
        if (index === 0) {
            currentSet = 'Warm-up';
            addSetHeader('Warm-up');
        } else if (index === 2) {
            currentSet = 'Set 1 - Upper Body Push';
            addSetHeader('Set 1 - Upper Body Push');
        } else if (index === 8) {
            currentSet = 'Set 2 - Lower Body';
            addSetHeader('Set 2 - Lower Body');
        } else if (index === 14) {
            currentSet = 'Set 3 - Upper Body Pull';
            addSetHeader('Set 3 - Upper Body Pull');
        } else if (index === 20) {
            currentSet = 'Set 4 - Core';
            addSetHeader('Set 4 - Core');
        }

        const exerciseItem = document.createElement('div');
        exerciseItem.className = `exercise-item ${exercise.type}`;
        exerciseItem.id = `exercise-${index}`;
        
        exerciseItem.innerHTML = `
            <div class="exercise-number">${index + 1}</div>
            <div class="exercise-details">
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-duration">${Math.floor(exercise.duration / 60)}:${(exercise.duration % 60).toString().padStart(2, '0')}</div>
            </div>
        `;
        
        exerciseListContainer.appendChild(exerciseItem);
    });
}

// Helper function to add set headers
function addSetHeader(title) {
    const header = document.createElement('div');
    header.className = 'exercise-set-header';
    header.textContent = title;
    exerciseListContainer.appendChild(header);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `
        <span id="minutes">${minutes.toString().padStart(2, '0')}</span>:
        <span id="seconds">${seconds.toString().padStart(2, '0')}</span>
    `;
}

// Update exercise displays with type-specific styling
function updateExerciseDisplays() {
    const currentExercise = exercises[currentExerciseIndex];
    currentExerciseDisplay.textContent = currentExercise.name;
    
    // Add type-specific styling
    currentExerciseDisplay.className = currentExercise.type;
    
    // Update current phase display
    currentPhaseSpan.textContent = currentExercise.name;
    
    // Update phase indicators
    phaseElements.forEach(phase => {
        phase.classList.remove('active');
        if (phase.classList.contains(currentExercise.type)) {
            phase.classList.add('active');
        }
    });

    // Update exercise image
    if (currentExercise.image) {
        exerciseImage.src = currentExercise.image;
        exerciseImage.alt = currentExercise.name + ' demonstration';
    } else {
        exerciseImage.src = '';
        exerciseImage.alt = '';
    }
    
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < exercises.length) {
        nextExerciseDisplay.textContent = `Next: ${exercises[nextIndex].name}`;
    } else {
        nextExerciseDisplay.textContent = 'Last exercise!';
    }

    // Update exercise list UI
    document.querySelectorAll('.exercise-item').forEach((item, index) => {
        item.classList.remove('active');
        if (index < currentExerciseIndex) {
            item.classList.add('completed');
        } else if (index === currentExerciseIndex) {
            item.classList.add('active');
        }
    });
    // Enable/disable prevBtn
    prevBtn.disabled = (currentExerciseIndex === 0);
}

// Play beep sound
function playBeep() {
    if (beepSound && userInteracted) {
        beepSound.currentTime = 0;
        beepSound.play().catch(error => console.error("Audio playback failed:", error));
    }
}

// Start timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        skipBtn.disabled = false;

        if (timeLeft === 0) {
            timeLeft = exercises[currentExerciseIndex].duration;
        }

        timerInterval = setInterval(() => {
            timeLeft--;
            elapsedTime++;
            updateTimerDisplay();
            
            // Update progress bar
            const progress = (elapsedTime / totalWorkoutDuration) * 100;
            progressFill.style.width = `${progress}%`;

            if (timeLeft === 0) {
                // Play beep at end of exercise
                playBeep();
                // Move to next exercise
                currentExerciseIndex++;
                if (currentExerciseIndex < exercises.length) {
                    timeLeft = exercises[currentExerciseIndex].duration;
                    updateExerciseDisplays();
                    // Play beep at start of new exercise
                    playBeep();
                } else {
                    // Workout complete
                    clearInterval(timerInterval);
                    isRunning = false;
                    currentExerciseDisplay.textContent = 'Workout Complete!';
                    nextExerciseDisplay.textContent = 'Great job!';
                    currentPhaseSpan.textContent = 'Workout Complete!';
                    startBtn.disabled = true;
                    pauseBtn.disabled = true;
                    skipBtn.disabled = true;
                    prevBtn.disabled = true;
                    progressFill.style.width = '100%';
                    // Play beep at end of workout
                    playBeep();
                }
            }
        }, 1000);
    }
}

// Pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    startBtn.textContent = 'Resume';
}

// Skip exercise
function skipExercise() {
    // Add the remaining time of the current exercise to elapsedTime
    elapsedTime += timeLeft;

    currentExerciseIndex++;
    if (currentExerciseIndex < exercises.length) {
        // Show 3-second countdown before starting next exercise
        let countdown = 3;
        currentExerciseDisplay.textContent = `Next exercise in ${countdown}...`;
        nextExerciseDisplay.textContent = '';
        exerciseImage.style.opacity = '0.5';
        startBtn.disabled = true;
        pauseBtn.disabled = true;
        skipBtn.disabled = true;
        prevBtn.disabled = true;

        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                currentExerciseDisplay.textContent = `Next exercise in ${countdown}...`;
            } else {
                clearInterval(countdownInterval);
                exerciseImage.style.opacity = '1';
                timeLeft = exercises[currentExerciseIndex].duration;
                updateTimerDisplay();
                updateExerciseDisplays();
                playBeep();
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                skipBtn.disabled = false;
                prevBtn.disabled = (currentExerciseIndex === 0);
                // Resume timer if workout was running
                if (isRunning) {
                    startTimer();
                }
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        currentExerciseDisplay.textContent = 'Workout Complete!';
        nextExerciseDisplay.textContent = 'Great job!';
        currentPhaseSpan.textContent = 'Workout Complete!';
        startBtn.disabled = true;
        pauseBtn.disabled = true;
        skipBtn.disabled = true;
        prevBtn.disabled = true;
        progressFill.style.width = '100%';
        playBeep();
    }
}

// Go to previous exercise
function goToPreviousExercise() {
    // Prevent going before the first exercise
    if (currentExerciseIndex === 0) return;

    // Subtract the time of the current exercise from elapsedTime
    elapsedTime -= (exercises[currentExerciseIndex].duration - timeLeft);
    if (elapsedTime < 0) elapsedTime = 0;

    currentExerciseIndex--;
    // Show 3-second countdown before starting previous exercise
    let countdown = 3;
    currentExerciseDisplay.textContent = `Previous exercise in ${countdown}...`;
    nextExerciseDisplay.textContent = '';
    exerciseImage.style.opacity = '0.5';
    startBtn.disabled = true;
    pauseBtn.disabled = true;
    skipBtn.disabled = true;
    prevBtn.disabled = true;

    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            currentExerciseDisplay.textContent = `Previous exercise in ${countdown}...`;
        } else {
            clearInterval(countdownInterval);
            exerciseImage.style.opacity = '1';
            timeLeft = exercises[currentExerciseIndex].duration;
            updateTimerDisplay();
            updateExerciseDisplays();
            playBeep();
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            skipBtn.disabled = false;
            prevBtn.disabled = (currentExerciseIndex === 0);
            // Resume timer if workout was running
            if (isRunning) {
                startTimer();
            }
        }
    }, 1000);
}

// Event listeners
startBtn.addEventListener('click', () => {
    if (!userInteracted) {
        userInteracted = true;
        // Muted play to unlock audio on some browsers
        beepSound.muted = true;
        beepSound.play().then(() => {
            beepSound.pause();
            beepSound.currentTime = 0;
            beepSound.muted = false;
        }).catch(() => { 
            // In case even muted play fails
            beepSound.muted = false;
        });
    }
    startTimer();
});
pauseBtn.addEventListener('click', pauseTimer);
skipBtn.addEventListener('click', skipExercise);
prevBtn.addEventListener('click', goToPreviousExercise);

// Initialize
initializeExerciseList();
updateExerciseDisplays();
updateTimerDisplay(); 