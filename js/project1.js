let idCounter = 0;
let tasksArr = [];

function init() {
  const localArray = JSON.parse(localStorage.getItem("tasks"));
  if (localArray.length > 0) {
    let currCounter = localArray[localArray.length - 1].id;
    idCounter = currCounter + 1;
    tasksArr = localArray;
    showNotes(localArray);
  }
}

function saveTask() {
  const userTask = document.getElementById("task");
  const userDate = document.getElementById("date");
  const userTime = document.getElementById("time");

  const myTask = {
    task: userTask.value,
    date: userDate.value,
    time: userTime.value,
    id: idCounter,
  };

  createString(myTask);

  tasksArr.push(myTask);
  setLocal(tasksArr);

  let newNote = document.getElementById(myTask.id);
  addAnimation(newNote);

  idCounter++;
  clearTask(userTask, userDate, userTime);
}

function createString(task) {
  let myHtml = `<div class="note" id="${task.id}" onmouseover="mouseOver(${
    task.id
  })"><img src="img/notebg.png" class="note-img"/>
  <div class="removeBtn-container"> 
  <span style="display:none;" class="glyphicon glyphicon-remove btn${
    task.id
  }" onclick="removeNote(${task.id})" title="remove note"></span>
  <span style="display:none;" class="favorite-btn btn${
    task.id
  }" onclick="importantTask(${
    task.id
  })" title="choose as most important">🧷</span>
  </div>
  <div class="note-task">${
    task.task
  }</div><div class="note-details">${convertDate(task.date)} <br/>
    ${task.time}
    </div></div>`;

  task.string = myHtml;
}

function setLocal(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  showNotes(tasksArray);
}

function showNotes(tasksArray) {
  const notes = document.getElementById("notes");

  if (tasksArray == null) return;
  notes.innerHTML = "";
  let myString = "";

  for (let i = 0; i < tasksArray.length; i++) {
    myString += tasksArray[i].string;
  }
  notes.insertAdjacentHTML("beforeend", myString);

  toggleClearBtn();
}

function mouseOver(noteId) {
  const myButtons = document.querySelectorAll(`.btn${noteId}`);
  const myNote = document.getElementById(noteId);

  myButtons.forEach((btn) => (btn.style.display = "block"));
  myNote.addEventListener("mouseout", () =>
    myButtons.forEach((btn) => (btn.style.display = "none"))
  );
}

function removeNote(taskId) {
  tasksArr = tasksArr.filter((note) => note.id != taskId);
  setLocal(tasksArr);
}
