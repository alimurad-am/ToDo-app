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


// ---------- Habit Data ----------

let Habits = JSON.parse(localStorage.getItem("dailyHabits")) || [];

let habitName = "";

let selectedEmoji = "";

let habitTime = "";


// ---------- Get Habit-Name Functions ----------

function getHabitName(){
habitName = input.value;
console.log(habitName)
}

function getHabitTime(){
    habitTime = input2.value;
    console.log(habitTime)
}

function createHabit(){
    getHabitName();
    getHabitTime();
    let habit = {
        emoji: selectedEmoji,
        name: habitName,
        time: habitTime,
        completed: false
    };
   Habits.push(habit);
   localStorage.setItem("dailyHabits", JSON.stringify(Habits));
   showHabits();
   hidePanel();
   updateProgress();
    console.log(habit);
}

function habitCompelet(index){
    Habits[index].completed = !Habits[index].completed; 
    localStorage.setItem("dailyHabits", JSON.stringify(Habits));
    showHabits();
    updateProgress()
    console.log(Habits[index])
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

                <div class="cardBtn"><button onclick="habitCompelet(${i})" class="habit-check ${Habits[i].completed ? "completed": ""}">✓</button>
                <button onclick="deleteHabits(${i})" class="habit-delete">❌</button> </div>
            </li>
        `;
  }

  input.value = "";
}
showHabits();

function updateProgress(){
    let completeCount = 0;

    for(let i = 0; i < Habits.length; i++){
        if(Habits[i].completed === true){
          completeCount++;
        }   
    }
    let progress = 0;
    if(Habits.length > 0){
        progress = Math.floor((completeCount / Habits.length) * 100);
    }
    progressBar.textContent = progress +"%";

    let progressDegree = progress * 3.6;
    progressCircle.style.setProperty(  "--progress",
    `${progressDegree}deg`);  

        habitNumber.textContent = `${completeCount} of ${Habits.length} Completed`;

        remainingHabit.textContent = `${Habits.length - completeCount} habits remaining - keep going!`;
        if(Habits.length == 0){
          habitNumber.textContent = `Get Started!`;
          remainingHabit.textContent = `Tap + to add your first habit`;
        }
        else if(Habits.length - completeCount == 0){
          habitNumber.textContent = `🎉 All Done! Amazing!`;

          remainingHabit.textContent = `You completed all ${Habits.length} habits today!`;

        }else if(Habits.length - completeCount == 1){
            remainingHabit.textContent = `${Habits.length - completeCount} habit remaining - keep going!`;

        }else{
            remainingHabit.textContent = `${Habits.length - completeCount} habits remaining - keep going!`;
        }

    
    console.log("Total:", Habits.length)
    console.log("Completed:", completeCount)
    console.log("Progress:", progress)
    console.log("Degrees:", progressDegree)
}
updateProgress()

// ---------- Delete Habit Functions ----------

function deleteHabits(index) {
  Habits.splice(index, 1);
  localStorage.setItem("dailyHabits", JSON.stringify(Habits));
  alert ("You are going to delete this habit")
  showHabits();
  updateProgress();
}

// ---------- Open Habit-Modal Functions ----------

function showPanel(event){
    habitModal.style.display = "flex"
}

// habitBtn.addEventListener("click", function(){
//     habitModal.style.display = "flex";
// });

// ---------- Close Habit-Modal Functions ----------

function hidePanel(){
    habitModal.style.display = "none"
}

// ---------- Emoji Selection Functions ----------

function selectEmoji(event){
    for(let i = 0; i < emojiBtn.length; i++){
        emojiBtn[i].classList.remove("selected");
    }
   event.target.classList.add("selected");
    selectedEmoji = event.target.textContent;

}


function emojiSelection(){
    for(let i = 0; i < emojiBtn.length; i++){
    emojiBtn[i].addEventListener("click", selectEmoji)
    }
}
emojiSelection()



   


