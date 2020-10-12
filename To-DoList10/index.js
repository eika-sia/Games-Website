const messageBoard = document.getElementById("taskList");
const confNewTasks = document.getElementById("setUpTask");

let Tasks = [];

//? Create Elem part

let NOfTasks = 0;

function addTask() {
  messageBoard.innerHTML = "";

  NOfTasks++;

  Tasks.push({
    title: document.getElementById("TitleInput").value,
    desc: document.getElementById("descInput").value,
    time: document.getElementById("dateInput").value,
  });

  for (let i = 0; i < NOfTasks; i++) {
    let TempElem = document.createElement("div");

    TempElem.classList.add("elem");
    TempElem.innerHTML = `${Tasks[i].title} \n ${Tasks[i].desc} \n ${Tasks[i].time}`;

    let TempButton = document.createElement("button");
    TempButton.addEventListener("click", completeTask());
    TempButton.innerHTML = "Complete task";

    TempElem.appendChild(TempButton);

    messageBoard.appendChild(TempElem);
  }

  confNewTasks.classList.add("NonVisable");
  document.getElementById("TitleInput").value = "Title";
  document.getElementById("descInput").value = "Description";
}

function confTask() {
  confNewTasks.classList.remove("NonVisable");
}

function removeText(elemId) {
  document.getElementById(elemId).value = "";
}

function completeTask() {
  
}
