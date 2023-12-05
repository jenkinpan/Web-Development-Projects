// ! select the h1 element and add some classes to it using jQuery
// $("h1").addClass("big-title margin-50");
// $("h1").removeClass("big-title margin-50");

// ! 选中所有的 <button> 元素
// $("button");

// ! select the button elements and change the text inside them
// $("button").text("Don't Click Me");

// ! select the button elements and change the html inside them
// $("button").html("<em>Click Me</em>");

// ! select the img element and get the value of the attribute src, finally log it to the console
// console.log($("img").attr("src"));

// ! jQuery event listener for keypress
$(document).keypress(function (event) {
  $("h1").text(event.key);
});

// ! vanilla JS event listener for keypress
document.addEventListener("keypress", function (event) {
  document.querySelector("h1").textContent = event.key;
});

// ! jQuery on click event listener
$("h1").on("click", function () {
  $("h1").css("color", "purple");
});

// ! vanilla JS onclick event listener
// document.querySelector("h1").onClick = function () {
//   document.querySelector("h1").style.color = "purple";
// };

// ! add an new button element before the h1 element
// $("h1").before("<button>New</button>");

// ! add an new button element after the h1 element
// $("h1").after("<button>New</button>");

// ! add an new button element inside the h1 element but before the h1 textContent after the h1 opening tag
// $("h1").prepend("<button>New</button>");

// ! add an new button element inside the h1 element but after the h1 textContent before teh h1 closing tag
// $("h1").append("<button>New</button>");

// ! remove all the button elements
// $("button").remove();


$(".lastOne").text("Toggle H1");

// * Display or hide the matched elements by clicking the button with class lastOne.
// $("button.lastOne").on("click", function () {
//   $("h1").toggle();
// });


// * Fade in or out the matched elements by clicking the button with class lastOne.
$(".lastOne").on("click", function () {
    $("h1").fadeToggle();
});