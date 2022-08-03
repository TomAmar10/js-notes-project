function clearTask(task, date, time) {
  task.value = "";
  date.value = "";
  time.value = "";
}

function convertDate(date) {
  dateArray = date.split("-");
  let newDate = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
  return newDate;
}

function addAnimation(item) {
  item.classList.add("animation");
}

function toggleClearBtn() {
  const footer = document.querySelector(".footer");
  addAnimation(footer);
  footer.style.visibility = tasksArr.length > 0 ? "visible" : "hidden";
}

function deleteAll() {
  tasksArr = [];
  setLocal(tasksArr);
}

function importantTask(taskId) {
  let myNewTask = tasksArr.find((note) => note.id == taskId);
  removeNote(taskId);
  tasksArr.unshift(myNewTask);
  setLocal(tasksArr);
}
