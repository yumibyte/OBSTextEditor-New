function navigateToGamePanel(gameType) {
  // set current game type for other functions
  localStorage.setItem("gameType", gameType);
  localStorage.setItem("roster", "");


  // determine title

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
    for (var option of document.getElementById('filterDropdown').options) {
        if (option.selected) {
            selected.push(option.value);
        }
    }

    // alphabetical filter
    if (selected.includes('Alphabetically')) {

      // sort array of names
      var sorted = [];

      var currentRoster = localStorage.getItem('currentRoster');
      currentRoster = JSON.parse(currentRoster);


      for(var i in currentRoster) {
          sorted[i] = currentRoster[i]['Last, First'];
      }
      sorted.sort();

      var sortedRoster = currentRoster;
      // modify dictionary to be in correct order
      for (var j in sorted) {
        sortedRoster[j]['Last, First'] = sorted[j];

        for (var k in currentRoster) {
          if (currentRoster[k]['Last, First'] == sortedRoster[j]['Last, First']) {

            sortedRoster[j]['Team Assignment'] = currentRoster[k]['Team Assignment'];
            sortedRoster[j]['Display'] = currentRoster[k]['Display'];
          }
        }
      }
      localStorage.setItem('currentRoster', JSON.stringify(sortedRoster));
      updatePlayerDropdown(false);


    }

    if (selected.includes('Team Assignment')) {
      var inputTeamAssignment = localStorage.getItem('gameType');

      // swap team assignment to proper formatting on spreadsheet
      switch (inputTeamAssignment) {
        case "OW":
          inputTeamAssignment = "OW (Fenrir)";
          break;

        case "LoL":
          inputTeamAssignment = "LoL (Berserkers)";
          break;

        case "Chess":
          inputTeamAssignment = "Chess";
          break;

        case "RL":
          inputTeamAssignment = "RL (Ragnarok)";
          break;

        case "SSBU":
          inputTeamAssignment = "SSBU (Drakkar)";
          break;
      }

      var currentRoster = localStorage.getItem('currentRoster');
      currentRoster = JSON.parse(currentRoster);
      // change display status for all arrays
      for (var m in currentRoster) {
        if (!(currentRoster[m]['Team Assignment'] == inputTeamAssignment)) {
          currentRoster[m]['Display'] = false;
        }
      }

      localStorage.setItem('currentRoster', JSON.stringify(currentRoster));
      updatePlayerDropdown(false);
    }

    if (selected.includes('Remove Filters')) {
      var currentRoster = localStorage.getItem('currentRoster');
      currentRoster = JSON.parse(currentRoster);

      for (var l in currentRoster) {
        currentRoster[l]['Display'] = true;
      }
      localStorage.setItem('currentRoster', JSON.stringify(currentRoster));
      updatePlayerDropdown(false);

    }
  }
}

function refreshPage() {
  document.location.reload();
}


function clearRoster() {

  localStorage.setItem('roster', "");
  updateStreamPreview();

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

// todo
    case "OW":
      localStorage.setItem("title", "Oakmont Fenrir vs " + inputTitle + " | " + localStorage.getItem('season') + " | PlayVS                       ");
      break;
    case "RL":
      localStorage.setItem("title", "Oakmont Ragnarok vs " + inputTitle + " | " + localStorage.getItem('season') + " | Varsity Rocket League                        ");
      break;
    case "LoL":
      localStorage.setItem("title", "Oakmont Berserkers vs " + inputTitle + " | " + localStorage.getItem('season') + " | Varsity LoL                       ");
      break;
    case "SSBU":
      localStorage.setItem("title", inputTitle + " | Oakmont Drakkar | " + localStorage.getItem('season') + " | Varsity SSBU                        ")
      break;
    case "Chess":
      localStorage.setItem("title", inputTitle + " | Chess | " + localStorage.getItem('season') + " | " + "Oakmont Esports                        ")
      break;
  }
  updateStreamPreview();
}

function readTSV() {

  // read file
  var fileUpload = document.getElementById("filePathInput");
  var filePath = "../" + fileUpload.value;
  d3.tsv(filePath, function (d) {
    for (var i = 0; i < d.length; i++) {
      d[i]['Display'] = true;

      // delete d['columns'];
    }
    // deleted function to remove columns?
    // Put the object into storage

    localStorage.setItem('currentRoster', JSON.stringify(d));
  });

  updatePlayerDropdown(false);

  let inputRosterRow = document.getElementById("inputRosterRow");
  inputRosterRow.style.display = "none";




}



function updatePlayerDropdown(isRefreshed) {

  var playerNameDropdown = document.getElementById("playerNameDropdown");
  var playerTypeDropdown = document.getElementById("playerTypeDropdown");

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('currentRoster');
  var currentRoster = JSON.parse(retrievedObject);

  // append to roster
  for (i in currentRoster) {

    if (currentRoster[i]['Display']) {
      var opt = currentRoster[i]['Last, First'];
      console.log(opt);
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      playerNameDropdown.appendChild(el);
    }
  }
  if (!isRefreshed) {
    window.location.reload()

  }

}

function addPlayer() {
  // add player to Roster

  var selectedPlayerName = document.getElementById('playerNameDropdown').value;
  // check if player type exists? TODO
  var selectedPlayerType = document.getElementById('playerTypeDropdown').value;

  var rosterAppended = localStorage.getItem('roster') + "<br>- " + selectedPlayerName + ": " + selectedPlayerType;
  localStorage.setItem('roster', rosterAppended);

  updateStreamPreview();

}


function updateGamePanel() {
  document.getElementById("teamInputTitle").innerHTML = localStorage.getItem("teamInputTitle");
  document.getElementById("gamePanelTitle").innerHTML = localStorage.getItem("gamePanelTitle");

  var inputRosterRow = document.getElementById("inputRosterRow");
  inputRosterRow.style.display = "none";


  updatePlayerDropdown(true);

}

function updateStreamPreview() {
  // add function to set all localStorage to an empty string?
  document.getElementById("streamPreviewLabel").innerHTML = "Title: " + localStorage.getItem("title") + "<br><br>Roster:" + localStorage.getItem("roster");

}

function updateSeason(inputSeason) {
  localStorage.setItem("season", inputSeason);
  generateTitle();
}

function addNewRoster() {
    console.log("add");
    let inputRosterRow = document.getElementById("inputRosterRow");
    inputRosterRow.style.display = "block";

}
