window.onload = function () {
  if (localStorage.getItem("notFirstLoad")) {
    var player1ImageNmu = Math.floor(Math.random() * 6) + 1;
    var player2ImageNmu = Math.floor(Math.random() * 6) + 1;

    document
      .querySelector(".img1")
      .setAttribute("src", "images/dice" + player1ImageNmu + ".png");
    document
      .querySelector(".img2")
      .setAttribute("src", "images/dice" + player2ImageNmu + ".png");

    if (player1ImageNmu > player2ImageNmu) {
      document.querySelector("h1").innerHTML = "🚩Player 1 Wins!";
    } else if (player1ImageNmu < player2ImageNmu) {
      document.querySelector("h1").innerHTML = "Player 2 Wins!🚩";
    } else {
      document.querySelector("h1").innerHTML = "Draw!";
    }
  } else {
    localStorage.setItem("notFirstLoad", "true");
  }
};
