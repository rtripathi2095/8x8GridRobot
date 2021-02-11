var directions = {
  F: [10, -1, -10, 1],
  B: [-10, 1, 10, -1],
  L: [-1, -10, 1, 10],
  R: [1, 10, -1, -10],
};
var id = 11;
var validInputs = ["R", "L", "F", "B"];
var currDir = 0;
var arrowMap = ["right", "up", "left", "down"];
var clearInput = () => {
  debugger;
  document.getElementById("directions").value = "";
};
var checkInput = (inputs) => {
  for (let i of inputs) if (!validInputs.includes(i)) return false;
  return true;
};
var run = () => {
  const player = document.getElementById("player");
  let prevDir = arrowMap[currDir];
  let prevId = id;
  let path = document.getElementById("directions").value;
  let moves = path.split(",");
  if (!checkInput(moves)) {
    alert("Invalid Input");
    return;
  }
  let pos = {};
  pos.y = id % 10;
  pos.x = (id - pos.y) / 10;
  let index = 0;
  while (
    pos.x <= 8 &&
    pos.x >= 1 &&
    pos.y >= 1 &&
    pos.y <= 8 &&
    index < moves.length
  ) {
    const change = directions[moves[index].trim()][currDir];
    id += change;
    switch (change) {
      case 1:
        currDir = 3;
        break;
      case -1:
        currDir = 1;
        break;
      case -10:
        currDir = 2;
        break;
      case 10:
        currDir = 0;
        break;
    }
    pos.y = id % 10;
    pos.x = (id - pos.y) / 10;
    index++;
    if (pos.x > 8 || pos.y > 8 || pos.x < 1 || pos.y < 1) {
      alert("Your player is off the grid");
      id = prevId;
      return;
    }
  }
  player.classList.remove(prevDir);
  player.parentElement.removeChild(player.parentElement.lastElementChild);
  player.classList.add(arrowMap[currDir]);
  document.getElementById(id).appendChild(player);
};
document.addEventListener("DOMContentLoaded", () => {
  const parent = document.getElementsByClassName("grid-container")[0];
  let player = document.createElement("div");
  player.id = "player";
  player.classList.add("arrow", "right");
  for (let i = 1; i <= 8; i++)
    for (let j = 1; j <= 8; j++) {
      let tempDiv = document.createElement("div");
      tempDiv.id = j * 10 + i;
      tempDiv.classList.add("grid-item");
      if (tempDiv.id == id) tempDiv.appendChild(player);
      parent.appendChild(tempDiv);
    }
});
