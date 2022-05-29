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

function displayFilter() {
  document.getElementById("filterDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function processFilter() {
  document.getElementById('filterDropdown').onclick = function() {
    var selected = [];
    for (var option of document.getElementById('filterDropdown').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    alert(selected);
}
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

  // read file
  var fileUpload = document.getElementById("filePathInput");
  var filePath = "../" + fileUpload.value;
  console.log(filePath);
  d3.tsv(filePath, function (d) {

    for (var i = 0; i < d.length; i++) {
      d[i]["Display"] = "test";
      delete d['columns'];
    }
    // Put the object into storage
    localStorage.setItem('currentRoster', JSON.stringify(d));
  });

}



function updatePlayerNameDropdown() {

  var playerNameDropdown = document.getElementById("playerNameDropdown");
  var playerTypeDropdown = document.getElementById("playerTypeDropdown");

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('currentRoster');
  var currentRoster = JSON.parse(retrievedObject);

  // append to roster
  for (i in currentRoster) {

    var opt = currentRoster[i]['Last, First'];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    playerNameDropdown.appendChild(el);

    var opt = currentRoster[i]['Team Assignment'];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    playerTypeDropdown.appendChild(el);
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
