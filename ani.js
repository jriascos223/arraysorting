//fixed x positions for the canvas that allow for the bars to be evenly divided at a width of 28 and about 5px of space between each bar
//it made it simpler to draw the bars, but sacrifices allowing for any length array
var positionsX = [
  5,
  38,
  71,
  104,
  137,
  170,
  203,
  236,
  269,
  302,
  335,
  368,
  401,
  434,
  467
];
//draw global variable will hold the interval that controls all the animations
var draw;
//first let's work out how to get an array on the canvas...
function drawArray(clear) {
  var canvas = document.getElementById("canvas");

  //just to make sure I can stop whatever interval I need while drawing
  if (clear == true) {
    //literally searches all timeouts in the file and exterminates them
    //ended up finding this online cause I just couldn't clear the timeouts I had
    let id = window.setTimeout(() => {}, 0);
    console.log(id);
    while (id) {
      window.clearTimeout(id);
      id--;
    }

    id = window.setInterval(() => {}, 0);
    console.log(id);
    while (id) {
      window.clearInterval(id);
      id--;
    }
  }

  var ctx = canvas.getContext("2d");
  //holds the necessary pixel offset to make 1 digit numbers appear similar to 2 digit numbers
  var offset;
  //clear just in case
  ctx.clearRect(0, 0, 500, 300);
  //for each value in tempArray, shade it in a light blue with the x coordinate defined in positionsX[] above
  for (var i = 0; i < 15; i++) {
    var current = tempArray[i].toString();
    ctx.fillStyle = "#3399ff";
    ctx.font = "20px arial";
    ctx.fillRect(positionsX[i], 300 - tempArray[i] * 3, 28, tempArray[i] * 3);
    //calculates the length of the current number
    if (current.length == 1) {
      offset = 8;
    } else if (current.length == 2) {
      offset = 3;
    }
    //uses offset to draw numbers above bars.
    ctx.fillStyle = "black";
    ctx.fillText(
      tempArray[i],
      positionsX[i] + offset,
      300 - (tempArray[i] * 3 + 3)
    );
  }
}

//single animate function that does everything. REALLY messy but it works
async function animateThis(algo) {
  if (algo === "line") {
    var target = +prompt("Enter your target: ");
    var delay = speed;
    drawArray(true); // needs to clear interval
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var lastIsTarget = true;
    ctx.font = "20px arial";
    ctx.fillText("Linear Search", 190, 30);
    var i = 0;
    (function draw() {
      if (isNaN(target) || isNaN(delay)) {
        clearTimeout(draw);
      }
      if (i > 0 && !lastIsTarget) {
        ctx.clearRect(
          positionsX[i - 1],
          300 - tempArray[i - 1] * 3,
          28,
          tempArray[i - 1] * 3
        );
        ctx.fillStyle = "#3399ff";
        ctx.fillRect(
          positionsX[i - 1],
          300 - tempArray[i - 1] * 3,
          28,
          tempArray[i - 1] * 3
        );
      }
      if (tempArray[i] == target) {
        ctx.clearRect(
          positionsX[i],
          300 - tempArray[i] * 3,
          28,
          tempArray[i] * 3
        );
        ctx.fillStyle = "green";
        ctx.fillRect(
          positionsX[i],
          300 - tempArray[i] * 3,
          28,
          tempArray[i] * 3
        );
        lastIsTarget = true;
      } else {
        ctx.clearRect(
          positionsX[i],
          300 - tempArray[i] * 3,
          28,
          tempArray[i] * 3
        );
        ctx.fillStyle = "red";
        ctx.fillRect(
          positionsX[i],
          300 - tempArray[i] * 3,
          28,
          tempArray[i] * 3
        );
        lastIsTarget = false;
      }
      i++;
      setTimeout(draw, speed);
    })();
  } else if (algo == "binary") {
    drawArray(true); //needs to clear interval
    var target = +prompt("Enter your target: ");
    var delay = speed;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "20px arial";
    ctx.fillStyle = "black";
    ctx.fillText("Binary Search", 190, 30);
    var startIndex = 0;
    var stopIndex = tempArray.length - 1;
    var middle = Math.floor((stopIndex + startIndex) / 2);
    //first initially draw middle
    ctx.fillStyle = "cyan";
    ctx.fillRect(
      positionsX[middle],
      300 - tempArray[middle] * 3,
      28,
      tempArray[middle] * 3
    );
    var counter = 0;

    (function draw() {
      if (document.getElementById("slider").value != delay) {
        delay = document.getElementById("slider").value;
        console.log(delay);
      }
      //clear any residual grey / repaint array
      ctx.font = "20px arial";
      ctx.fillStyle = "black";
      ctx.fillText("Binary Search", 190, 30);
      ctx.clearRect(0, 0, 500, 300);
      drawArray();
      ctx.font = "20px arial";
      ctx.fillStyle = "black";
      ctx.fillText("Binary Search", 190, 30);
      if (tempArray[middle] != target && startIndex < stopIndex) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(
          positionsX[middle],
          300 - tempArray[middle] * 3,
          28,
          tempArray[middle] * 3
        );
        //adjust and shade in the search area
        if (target < tempArray[middle]) {
          stopIndex = middle - 1;
          var i = startIndex;
          for (var i = startIndex; i <= stopIndex; i++) {
            ctx.clearRect(
              positionsX[i],
              300 - tempArray[i] * 3,
              28,
              tempArray[i] * 3
            );
            ctx.fillStyle = "grey";
            ctx.fillRect(
              positionsX[i],
              300 - tempArray[i] * 3,
              28,
              tempArray[i] * 3
            );
          }
        } else if (target > tempArray[middle]) {
          startIndex = middle + 1;
          for (var i = startIndex; i <= stopIndex; i++) {
            ctx.clearRect(
              positionsX[i],
              300 - tempArray[i] * 3,
              28,
              tempArray[i] * 3
            );
            ctx.fillStyle = "grey";
            ctx.fillRect(
              positionsX[i],
              300 - tempArray[i] * 3,
              28,
              tempArray[i] * 3
            );
          }
        }
        middle = Math.floor((stopIndex + startIndex) / 2);
      } else if (target == tempArray[middle]) {
        ctx.fillStyle = "green";
        ctx.fillRect(
          positionsX[middle],
          300 - tempArray[middle] * 3,
          28,
          tempArray[middle] * 3
        );
        clearTimeout(draw);
      }
      counter++;
      setTimeout(draw, speed);
    })();
  } else if (algo == "bubble") {
    var canvas = document.getElementById("canvas");
    var delay = speed;
    var ctx = canvas.getContext("2d");
    var i = 0;
    ctx.fillStyle = "green";
    ctx.fillRect(
      positionsX[i],
      300 - tempArray[i] * 3,
      28,
      tempArray[i] * 3
    );
    ctx.fillStyle = "orange";
    ctx.fillRect(
      positionsX[i + 1],
      300 - tempArray[i + 1] * 3,
      28,
      tempArray[i + 1] * 3
    );
    var swapped;
    var finish = false;
    await sleep(delay);
    (draw = function() {
      ctx.font = "Calibri 20px;";
      ctx.fillstyle = "black";
      ctx.fillText("Bubble Sort", 190, 30);
      drawArray();
      if (i < tempArray.length - 1) {
        if (tempArray[i] > tempArray[i + 1]) {
          ctx.clearRect(0, 0, 500, 300);
          var temp = tempArray[i];
          tempArray[i] = tempArray[i + 1];
          tempArray[i + 1] = temp;
          drawArray();
        } else {
          if (isSorted(tempArray)) {
            clearTimeout(draw);
            var stop = true;
          }
        }
        if (!stop) {
          ctx.fillStyle = "green";
          ctx.fillRect(
            positionsX[i + 1],
            300 - tempArray[i + 1] * 3,
            28,
            tempArray[i + 1] * 3
          );
          ctx.fillStyle = "orange";
          ctx.fillRect(
            positionsX[i + 2],
            300 - tempArray[i + 2] * 3,
            28,
            tempArray[i + 2] * 3
          );
        }

        i++;
      } else {
        i = 0;
        ctx.fillStyle = "green";
        ctx.fillRect(
          positionsX[i],
          300 - tempArray[i] * 3,
          28,
          tempArray[i] * 3
        );
        ctx.fillStyle = "orange";
        ctx.fillRect(
          positionsX[i + 1],
          300 - tempArray[i + 1] * 3,
          28,
          tempArray[i + 1] * 3
        );
      }
      setTimeout(draw, speed);
    })();
  } else if (algo == "selection") {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var delay = speed;
    var min;
    var i = 0;
    var min = 0;
    var j = 0;
    (function draw() {
      drawArray();
      ctx.fillStyle = "orange";
      ctx.fillRect(
        positionsX[min],
        300 - tempArray[min] * 3,
        28,
        tempArray[min] * 3
      );
      if (i <= tempArray.length) {
        ctx.fillStyle = "green";
        ctx.fillRect(
          positionsX[i],
          300 - tempArray[i] * 3,
          28,
          tempArray[i] * 3
        );
        if (tempArray[i] < tempArray[min]) {
          ctx.clearRect(
            positionsX[min],
            300 - tempArray[min] * 3,
            28,
            tempArray[min] * 3
          );
          ctx.fillStyle = "#3399ff";
          ctx.fillRect(
            positionsX[min],
            300 - tempArray[min] * 3,
            28,
            tempArray[min] * 3
          );
          min = i;
          ctx.fillStyle = "orange";
          ctx.fillRect(
            positionsX[i],
            300 - tempArray[i] * 3,
            28,
            tempArray[i] * 3
          );
        }
        i++;
      } else {
        if (j == tempArray.length) {
          clearTimeout(draw);
        }
        if (tempArray[min] == tempArray[j]) {
          drawArray();

          console.log(tempArray);
          i = 1 + j;
          j++;
          min = j;
        } else {
          var temp = tempArray[j];
          tempArray[j] = tempArray[min];
          tempArray[min] = temp;

          drawArray();

          console.log(tempArray);
          i = 1 + j;
          j++;
          min = j;
        }
      }
      setTimeout(draw, speed);
    })();
  } else if (algo == "insertion") {
    var delay = speed;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var leftIndex = 0;
    var rightIndex = 1;
    var counter = 1;
    var repeat = true;
    (function draw() {
      delay = document.getElementById("slider").value;
      drawArray();
      if (leftIndex < 0) {
        leftIndex = counter - 1;
        rightIndex = counter;
      }
      if (tempArray[leftIndex] > tempArray[rightIndex]) {
        drawArray();
        ctx.fillStyle = "green";
        ctx.fillRect(
          positionsX[leftIndex],
          300 - tempArray[leftIndex] * 3,
          28,
          tempArray[leftIndex] * 3
        );
        ctx.fillRect(
          positionsX[rightIndex],
          300 - tempArray[rightIndex] * 3,
          28,
          tempArray[rightIndex] * 3
        );
        var temp = tempArray[rightIndex];
        tempArray[rightIndex] = tempArray[leftIndex];
        tempArray[leftIndex] = temp;

        leftIndex--;
        rightIndex--;
      } else if (tempArray[leftIndex] <= tempArray[rightIndex]) {
        drawArray();
        ctx.fillStyle = "red";
        ctx.fillRect(
          positionsX[leftIndex],
          300 - tempArray[leftIndex] * 3,
          28,
          tempArray[leftIndex] * 3
        );
        ctx.fillRect(
          positionsX[rightIndex],
          300 - tempArray[rightIndex] * 3,
          28,
          tempArray[rightIndex] * 3
        );
        counter++;
        leftIndex = counter - 1;
        rightIndex = counter;
      }
      if (counter == 15) {
        repeat = false;
        drawArray();
      }
      if (repeat == false) {
        clearTimeout(draw);
      }
      setTimeout(draw, speed);
    })();
  }
}
