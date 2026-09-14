// ---------- DOM Elements ----------

let input = document.querySelector("#userInput");
let list = document.querySelector("#habitList");
let input2 = document.querySelector("#userInput2");
let habitBtn = document.querySelector(".habitBtn");
let habitModal = document.querySelector("#habitModal-section");
let emojiBtn = document.querySelectorAll("#emoji-list > button");
let progressBar = document.querySelector("#progress-percent");
let progressCircle = document.querySelector(".circle-box");
let habitNumber = document.querySelector(".habitNum");
let remainingHabit = document.querySelector(".remainingHabit");
let streakNum = document.querySelector("#streak-no");
let weekSection = document.querySelector("#week-section");
let greeting = document.querySelector("#para1");
let dateBox = document.querySelector(".date-box p");
let statCard2 = document.querySelector(".stat-card #total-habits");
let statCard3 = document.querySelector(".stat-card #done-today");
let currentStreak = document.querySelector("#current-streak");
let bestStreak = document.querySelector("#best-streak");
let homeSection = document.querySelector("#home-section");
let statsSection = document.querySelector("#stats-section");
let homeBtn = document.querySelector("#home-btn");
let statsBtn = document.querySelector("#stats-btn");
let habitStreakList = document.querySelector("#habit-streak-list");

// ---------- Date Update ----------

function updateHeader() {
  let now = new Date();
  let hour = now.getHours();

  if (hour < 12) {
    greeting.textContent = "GOOD MORNING🌅";
  } else if (hour < 17) {
    greeting.textContent = "GOOD AFTERNOON🌞";
  } else {
    greeting.textContent = "GOOD EVENING🌆";
  }

  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug", "Sep","Oct","Nov","Dec"];

  let dayName = days[now.getDay()];
  let monthName = months[now.getMonth()];
  let date = now.getDate();

  dateBox.textContent = `${dayName}, ${date} ${monthName}`;
}

updateHeader();

// ---------- Habit Data ----------

let Habits = JSON.parse(localStorage.getItem("dailyHabits")) || [];

let habitName = "";

let selectedEmoji = "";

let habitTime = "";

// ---------- Get Habit-Name Functions ----------

function getHabitName() {
  habitName = input.value;
  console.log(habitName);
}

function getHabitTime() {
  habitTime = input2.value;
  console.log(habitTime);
}

function createHabit() {
  getHabitName();
  getHabitTime();
  let habit = {
    emoji: selectedEmoji,
    name: habitName,
    time: habitTime,
    completed: false,
    completedDates: [],
  };
  Habits.push(habit);
  localStorage.setItem("dailyHabits", JSON.stringify(Habits));
  showHabits();
  hidePanel();
  updateProgress();
  showWeek();
  showHabitStreaks();

  console.log(habit);
}

function habitCompelet(index) {
  Habits[index].completed = !Habits[index].completed;
  if (Habits[index].completed === true) {
    Habits[index].completedDates.push(todayDate);
  } else {
    let dateIndex = Habits[index].completedDates.indexOf(todayDate);
    if (dateIndex !== -1) {
      Habits[index].completedDates.splice(dateIndex, 1);
    }
  }

  localStorage.setItem("dailyHabits", JSON.stringify(Habits));
  showHabits();
  updateProgress();
  showWeek();
  showHabitStreaks();
  statFunction();

  console.log(Habits[index].completedDates);
  console.log(Habits[index]);
}
// ---------- Show Habit Functions ----------

function showHabits() {
  list.innerHTML = "";

  for (let i = 0; i < Habits.length; i++) {
    list.innerHTML += `
           <li class="habit-card ${Habits[i].completed ? "completed" : ""}">

                <div class="habit-left">

                    <div class="habit-emoji">
                       <p> ${Habits[i].emoji} </p>
                    </div>

                    <div class="habit-info">
                        <h3>${Habits[i].name}</h3>
                        <p>Best time: ${Habits[i].time}</p>
                    </div>

                </div>

                <div class="cardBtn"><button onclick="habitCompelet(${i})" class="habit-check ${Habits[i].completed ? "completed" : ""}">✓</button>
                <button onclick="deleteHabits(${i})" class="habit-delete">❌</button> </div>
            </li>
        `;
  }

  input.value = "";
  updateStreak();
}
showHabits();

function updateProgress() {
  let completeCount = 0;

  for (let i = 0; i < Habits.length; i++) {
    if (Habits[i].completed === true) {
      completeCount++;
    }
  }
  let progress = 0;
  if (Habits.length > 0) {
    progress = Math.floor((completeCount / Habits.length) * 100);
  }
  progressBar.textContent = progress + "%";

  let progressDegree = progress * 3.6;
  progressCircle.style.setProperty("--progress", `${progressDegree}deg`);

  habitNumber.textContent = `${completeCount} of ${Habits.length} Completed`;

  remainingHabit.textContent = `${Habits.length - completeCount} habits remaining — keep going!`;
  if (Habits.length == 0) {
    habitNumber.textContent = `Get Started!`;
    remainingHabit.textContent = `Tap + to add your first habit`;
  } else if (Habits.length - completeCount == 0) {
    habitNumber.textContent = `🎉 All Done! Amazing!`;

    remainingHabit.textContent = `You completed all ${Habits.length} habits today!`;
  } else if (Habits.length - completeCount == 1) {
    remainingHabit.textContent = `${Habits.length - completeCount} habit remaining — keep going!`;
  } else {
    remainingHabit.textContent = `${Habits.length - completeCount} habits remaining — keep going!`;
  }

  console.log("Total:", Habits.length);
  console.log("Completed:", completeCount);
  console.log("Progress:", progress);
  console.log("Degrees:", progressDegree);
}
updateProgress();

// ---------- Delete Habit Functions ----------

function deleteHabits(index) {
  Habits.splice(index, 1);
  localStorage.setItem("dailyHabits", JSON.stringify(Habits));
  alert("You are going to delete this habit");
  showHabits();
  updateProgress();
  showHabitStreaks();
  
}

// ---------- Open Habit-Modal Functions ----------

function showPanel(event) {
  habitModal.style.display = "flex";
}

// habitBtn.addEventListener("click", function(){
//     habitModal.style.display = "flex";
// });

// ---------- Close Habit-Modal Functions ----------

function hidePanel() {
  habitModal.style.display = "none";
}

// ---------- Emoji Selection Functions ----------

function selectEmoji(event) {
  for (let i = 0; i < emojiBtn.length; i++) {
    emojiBtn[i].classList.remove("selected");
  }
  event.target.classList.add("selected");
  selectedEmoji = event.target.textContent;
}

function emojiSelection() {
  for (let i = 0; i < emojiBtn.length; i++) {
    emojiBtn[i].addEventListener("click", selectEmoji);
  }
}
emojiSelection();

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let todayDate = `${year}-${String(month).padStart(2, "0")}-${String(date).padStart("2", 0)}`;
console.log(todayDate);

function updateStreak() {
  if (Habits.length === 0) {
    streakNum.textContent = 0;
    return;
  }

  let streak = 0;

  let checkDate = new Date();

  while (true) {
    let dateString = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;

    let allCompleted = true;

    for (let i = 0; i < Habits.length; i++) {
      if (!Habits[i].completedDates.includes(dateString)) {
        allCompleted = false;
        break;
      }
    }

    if (allCompleted === true) {
      streak++;

      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  streakNum.textContent = streak;
}
updateStreak();

function showWeek() {
  let weekSection = document.querySelector("#week-section");

  weekSection.innerHTML = "";

  let today = new Date();

  let dayNumber = today.getDay();

  let startDate = new Date(today);

  startDate.setDate(today.getDate() - dayNumber);

  let dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(startDate);

    currentDate.setDate(startDate.getDate() + i);

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let date = currentDate.getDate();

    let dateString = `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    let isToday = dateString === todayDate;

    let statusClass = "";

if (i < dayNumber) {
  statusClass = "completed";
}
else if (i === dayNumber) {
  statusClass = "today";
}

    let dayDiv = document.createElement("div");

    dayDiv.innerHTML = `
            <div class="day-box ${statusClass}">
                ${dayNames[i]}
            </div>
            <small>${dayNames[i]}</small>
        `;

    weekSection.appendChild(dayDiv);
  }
}
showWeek();

function showHome() {
  homeSection.style.display = "block";
  statsSection.style.display = "none";

  homeBtn.classList.add("active");
  statsBtn.classList.remove("active");
}

function showStats() {
  homeSection.style.display = "none";
  statsSection.style.display = "block";

  homeBtn.classList.remove("active");
  statsBtn.classList.add("active");

  statFunction();
  showHabitStreaks();
}

function statFunction() {

    let doneToday = 0;

    for (let i = 0; i < Habits.length; i++) {

        if (Habits[i].completed === true) {
            doneToday++;
        }

    }
      let streak = getCurrentStreak();
      let best = getBestStreak();

    statCard2.innerHTML = Habits.length;
    statCard3.innerHTML = doneToday;
    currentStreak.innerHTML = streak;
     bestStreak.innerHTML = best;
}

statFunction();

function getCurrentStreak() {

    if (Habits.length === 0) {
        return 0;
    }

    let streak = 0;
    let checkDate = new Date();

    while (true) {

        let dateString =
            `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;

        let allCompleted = true;

        for (let i = 0; i < Habits.length; i++) {

            if (!Habits[i].completedDates.includes(dateString)) {
                allCompleted = false;
                break;
            }

        }

        if (allCompleted === true) {

            streak++;
            checkDate.setDate(checkDate.getDate() - 1);

        } else {

            break;
        }
    }

    return streak;
}


function getBestStreak() {

    if (Habits.length === 0) {
        return 0;
    }

    let allDates = [];

    for (let i = 0; i < Habits.length; i++) {

        for (let j = 0; j < Habits[i].completedDates.length; j++) {

            let date = Habits[i].completedDates[j];

            let allCompleted = true;

            for (let k = 0; k < Habits.length; k++) {

                if (!Habits[k].completedDates.includes(date)) {
                    allCompleted = false;
                    break;
                }

            }

            if (allCompleted === true && !allDates.includes(date)) {
                allDates.push(date);
            }
        }
    }

    if (allDates.length === 0) {
        return 0;
    }

    allDates.sort();

    let bestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < allDates.length; i++) {

        let previousDate = new Date(allDates[i - 1]);
        let currentDate = new Date(allDates[i]);

        previousDate.setDate(previousDate.getDate() + 1);

        if (previousDate.toISOString().slice(0, 10) === allDates[i]) {

            currentStreak++;

            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
            }

        } else {

            currentStreak = 1;
        }
    }

    return bestStreak;
}


function getHabitStreak(habit) {

    let streak = 0;
    let checkDate = new Date();

    while (true) {

        let dateString =
            `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;

        if (habit.completedDates.includes(dateString)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

function showHabitStreaks() {

    habitStreakList.innerHTML = "";

    for (let i = 0; i < Habits.length; i++) {

        let streak = getHabitStreak(Habits[i]);

        let progress = Math.min(streak * 10, 100);

        habitStreakList.innerHTML += `
            <div class="habit-streak-card">

                <div class="streak-card-top">

                    <div class="streak-habit-name">
                        ${Habits[i].emoji} ${Habits[i].name}
                    </div>

                    <div class="streak-days">
                        🔥 ${streak} days
                    </div>

                </div>

                <div class="streak-progress">

                    <div
                        class="streak-progress-bar"
                        style="width: ${progress}%">
                    </div>

                </div>

            </div>
        `;
    }
}

showHabitStreaks();
