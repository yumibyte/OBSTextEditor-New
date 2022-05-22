
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
  console.log(document.getElementById('inputTitle').value);

  switch (localStorage.getItem("gameType")) {
      case "OW":
        console.log("ow!");
          // console.log()"Oakmont Fenrir vs " + inputTitle + " | PlayVS                                  ";
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
}

// var wpcomment = document.getElementById('inputTitle');
//
// wpcomment.onkeyup = wpcomment.onkeypress = function() {
//     console.log(this.value);
//     // document.getElementById('prevCom').innerHTML = this.value;
// }​




function updateGamePanel() {
  console.log(localStorage.getItem("teamInputTitle"));
  document.getElementById("teamInputTitle").innerHTML = localStorage.getItem("teamInputTitle");
  document.getElementById("gamePanelTitle").innerHTML = localStorage.getItem("gamePanelTitle");
}


// if (document.readyState === 'complete') {
//   // The page is fully loaded
// }
// function setUpGamePanel() {
//   console.log("2");
//   if (document.readyState === 'complete') {
//     // The page is fully loaded
//     console.log(localStorage.getItem("teamInputTitle"));
//     document.getElementById("teamInputTitle").innerHTML = localStorage.getItem("teamInputTitle");
//     document.getElementById("gamePanelTitle").innerHTML = localStorage.getItem("gamePanelTitle");
//   }
//
// }
