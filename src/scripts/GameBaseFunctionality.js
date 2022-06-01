function navigateToGamePanel(gameType) {
  // set current game type for other functions
  localStorage.setItem("gameType", gameType);
  localStorage.setItem("roster", "");

  var initArray = [];
  localStorage.setItem("rosterArray", JSON.stringify(initArray));

  // initialize all text files
  localStorage.setItem("titleTxt", "title.txt");
  localStorage.setItem("rosterTxt", "roster.txt");



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
  var initArray = [];

  localStorage.setItem('rosterArray', JSON.stringify(initArray));

  updateStreamPreview();

}

function updateMobalyticsCard(playerType, mobalyticsLink) {

  var fs = require('fs');
  const path = require('path');

  var htmlContent = '<iframe id="" src="' + mobalyticsLink + '"width="300" height="300"></iframe>';

  // update title of stream
  var filePath = path.join(__dirname,'..', 'OBSLocalFiles', playerType + ".html");
  fs.writeFile(filePath, htmlContent, (err) => {
      if (err) throw err;
  })

}


function generateStream() {

  const fs = require('fs');
  const path = require('path');

  // update title of stream
  var filePath = path.join(__dirname,'..', 'OBSLocalFiles', localStorage.getItem("titleTxt"));
  fs.writeFile(filePath, localStorage.getItem("title"), (err) => {
      if (err) throw err;
  })

  // update roster of stream

  if ((localStorage.getItem('gameType') == "RL") || (localStorage.getItem('gameType') == "OW")) {
    var formattedRoster = localStorage.getItem('roster');
    formattedRoster = formattedRoster.replaceAll("<br>", "\n");

    filePath = path.join(__dirname,'..', 'OBSLocalFiles', localStorage.getItem("rosterTxt"));
    fs.writeFile(filePath, formattedRoster, (err) => {
        if (err) throw err;
    })
  }

  // update mobalytics

  if (localStorage.getItem('gameType') == "LoL") {

    var rosterArray = JSON.parse(localStorage.getItem("rosterArray"));
    var currentRoster = JSON.parse(localStorage.getItem("currentRoster"));
    for (var n in rosterArray) {

      // search for name in main roster

      for (var o in currentRoster) {
        if (currentRoster[o]["Last, First"] == rosterArray[n]["Last, First"]) {

          // change appropriate card

          var playerTypeCard = rosterArray[n]["Player Type"];

          if (currentRoster[o]["Mobalytics Weblink"]) {

            // update stream preview card
            document.getElementById(playerTypeCard).src = currentRoster[o]["Mobalytics Weblink"];

            // update html card
            updateMobalyticsCard(rosterArray[n]["Player Type"], currentRoster[o]["Mobalytics Weblink"]);
          } else {
            document.getElementById(playerTypeCard).src = "../htmlTemplates/NoCard.html";

          }

          // switch (rosterArray[n]["Player Type"]) {
          //
          // }
        }
      }
    }
  }

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

  if (localStorage.getItem("gameType") == "LoL") {
    var rosterAppended = localStorage.getItem('roster') + "<br>" + selectedPlayerName + " | " + selectedPlayerType;
  } else {
    var rosterAppended = localStorage.getItem('roster') + "<br>" + selectedPlayerName;
  }
  localStorage.setItem('roster', rosterAppended);


  // add player names to list for parsing for mobalytics if necessary
  if (localStorage.getItem("gameType") == "LoL") {
    var playerArray = {
      "Last, First": selectedPlayerName,
      "Player Type": selectedPlayerType,
    };

    var rosterArray = JSON.parse(localStorage.getItem("rosterArray") || "[]");
    rosterArray.push(playerArray);
    localStorage.setItem('rosterArray', JSON.stringify(rosterArray));
  }
  updateStreamPreview();


}


function updateGamePanel() {
  document.getElementById("teamInputTitle").innerHTML = localStorage.getItem("teamInputTitle");
  document.getElementById("gamePanelTitle").innerHTML = localStorage.getItem("gamePanelTitle");

  var inputRosterRow = document.getElementById("inputRosterRow");
  inputRosterRow.style.display = "none";

  // set mobalytics cards to hidden if the game isn't LoL
  if (localStorage.getItem("gameType") == "LoL") {

    // set player type to be hidden if game isn't LoL
    document.getElementById("playerTypeDiv").style.visibility = "visible";

    document.getElementById("Top").style.visibility = "visible";
    document.getElementById("Middle").style.visibility = "visible";
    document.getElementById("ADC").style.visibility = "visible";
    document.getElementById("Support").style.visibility = "visible";
    document.getElementById("Jungle").style.visibility = "visible";
  } else {
    document.getElementById("playerTypeDiv").style.visibility = "hidden";


    document.getElementById("Top").style.visibility = "hidden";
    document.getElementById("Middle").style.visibility = "hidden";
    document.getElementById("ADC").style.visibility = "hidden";
    document.getElementById("Support").style.visibility = "hidden";
    document.getElementById("Jungle").style.visibility = "hidden";
  }



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
    let inputRosterRow = document.getElementById("inputRosterRow");
    inputRosterRow.style.display = "block";

}

function displayOBSLocalFile(element) {

  var id = element.id;
  switch (id) {
    case "inputTitleSettings":
      alert("Point local file to: " + localStorage.getItem("titleTxt"));
      break;
    case "rosterSettings":

      if (localStorage.getItem("gameType") == "LoL") {
        alert("Point local file to: \n" +
        "Top: Top.html\n" +
        "Mid: Middle.html\n" +
        "Jungle: Jungle.html\n" +
        "ADC: ADC.html\n" +
        "Support: Support.html");

      } else {
        alert("Point local file to: " + localStorage.getItem("rosterTxt"));

      }
      break;
  }

}
