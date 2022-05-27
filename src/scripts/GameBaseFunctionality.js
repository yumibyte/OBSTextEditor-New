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

  var fileUpload = document.getElementById("filePathInput");
  var filePath = "../" + fileUpload.value;
  console.log(filePath);
  d3.tsv(filePath, function (d) {
    console.log(d);
  });
}

        // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.tsv|.txt)$/;
        // if (regex.test(fileUpload.value.toLowerCase())) {
        //     if (typeof (FileReader) != "undefined") {
        //         var reader = new FileReader();
        //         reader.onload = function (e) {
        //             var table = document.createElement("table");
        //             var rows = e.target.result.split("\n");
        //             for (var i = 0; i < rows.length; i++) {
        //                 var cells = rows[i].split("");
        //                 if (cells.length > 1) {
        //                     var row = table.insertRow(-1);
        //                     for (var j = 0; j < cells.length; j++) {
        //                         var cell = row.insertCell(-1);
        //                         console.log(cells[j]);
        //                     }
        //                 }
        //             }
        //             // var dvCSV = document.getElementById("dvCSV");
        //             // dvCSV.innerHTML = "";
        //             // dvCSV.appendChild(table);
        //         }
        //         reader.readAsText(fileUpload.files[0]);
        //     } else {
        //         alert("This browser does not support HTML5.");
        //     }
        // } else {
        //     alert("Please upload a valid CSV file.");
        // }


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
