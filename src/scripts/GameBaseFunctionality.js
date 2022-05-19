

function navigateToGamePanel(gameType) {
  switch(gameType) {
    case "OW":
      console.log("button clicked!");
      localStorage.setItem("gamePanelTitle", "Overwatch");
      localStorage.setItem("teamInputTitle", "Opposing Team Name");
      break;
    case "LoL":
      localStorage.setItem("teamInputTitle", "Opposing Team Name");
      break;
    case "RL":
      localStorage.setItem("teamInputTitle", "Opposing Team Name");
      break;
    case "SSBU":
      localStorage.setItem("teamInputTitle", "Player Name");
      break;
    case "Chess":
      localStorage.setItem("teamInputTitle", "Player Name");
      break;
  }
}

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
