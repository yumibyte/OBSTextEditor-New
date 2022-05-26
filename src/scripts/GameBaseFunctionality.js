function navigateToGamePanel(gameType) {
  // set current game type for other functions
  localStorage.setItem("gameType", gameType);
  switch(gameType) {


    case "OW":
      localStorage.setItem("gamePanelTitle", "Overwatch");
      localStorage.setItem("teamInputTitle", "Opposing Team Name");
      break;
    case "LoL":

      localStorage.setItem("gamePanelTitle", "League of Legends");
      localStorage.setItem("teamInputTitle", "Opposing Team Name");
      break;
    case "RL":

      localStorage.setItem("gamePanelTitle", "Rocket League");
      localStorage.setItem("teamInputTitle", "Opposing Team Name");
      break;
    case "SSBU":

      localStorage.setItem("gamePanelTitle", "Super Smash Bros");
      localStorage.setItem("teamInputTitle", "Player Name");
      break;
    case "Chess":

      localStorage.setItem("gamePanelTitle", "Chess");
      localStorage.setItem("teamInputTitle", "Player Name");
      break;
  }
}

function filterSelected() {
  //
}

function clearRoster() {
  //
}

function generateStream() {
  //
}


// generate title
function generateTitle() {
  var inputTitle = document.getElementById('inputTitle').value;

  if (localStorage.getItem('season') == null) {
    localStorage.setItem('season', "");
  }

  switch (localStorage.getItem("gameType")) {

    case "OW":
      localStorage.setItem("title", "Oakmont Fenrir vs " + inputTitle + " | " + localStorage.getItem('season') + " | PlayVS");
      break;

    case "RL":
      break;
    case "LoL":
      break;
    case "SSBU":
      break;
    case "Chess":
      break;
  }
  updateStreamPreview();
}

function readCSV() {

  console.log("hello");
}

function updatePlayerNameDropdown() {
  var playerNameDropdown = document.getElementById("playerNameDropdown");
  var playerRoster = [
    ["Matthew Chance Lopez", "type", 1],
    ["Mason Harder", "type1", 1],
    ["Jordan Hopper", "type2", 1]
  ]

  for (i in playerRoster) {

    var opt = playerRoster[i][0];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    playerNameDropdown.appendChild(el);
  }
}


function updateGamePanel() {
  document.getElementById("teamInputTitle").innerHTML = localStorage.getItem("teamInputTitle");
  document.getElementById("gamePanelTitle").innerHTML = localStorage.getItem("gamePanelTitle");
  updatePlayerNameDropdown();

}

function updateStreamPreview() {
  // add function to set all localStorage to an empty string?
  document.getElementById("streamPreviewLabel").innerHTML = localStorage.getItem("title") + "<br>" + localStorage.getItem("roster");
}

function updateSeason(inputSeason) {
  localStorage.setItem("season", inputSeason);
  generateTitle();
}

function updateRoster() {
  console.log("test!");
}
