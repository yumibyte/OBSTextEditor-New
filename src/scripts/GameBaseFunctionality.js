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
    }
  }



}

function refreshPage() {
  document.location.reload();
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
      d[i]['Display'] = "1";

      // delete d['columns'];
    }
    // deleted function to remove columns?
    // Put the object into storage
    console.log(d)

    localStorage.setItem('currentRoster', JSON.stringify(d));
  });

  updatePlayerDropdown(false);


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

      var opt = currentRoster[i]['Team Assignment'];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      playerTypeDropdown.appendChild(el);

    }
  }
  console.log("updated!");
  if (!isRefreshed) {
    window.location.reload()

  }

}


function updateGamePanel() {
  document.getElementById("teamInputTitle").innerHTML = localStorage.getItem("teamInputTitle");
  document.getElementById("gamePanelTitle").innerHTML = localStorage.getItem("gamePanelTitle");
  updatePlayerDropdown(true);

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
