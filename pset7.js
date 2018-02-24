//global variable that holds the array that all functions willl be working with
var tempArray;
var speed;

/* literally 1000000% useless
//sort object which contains methods for sorting (bubble sort, etc)
var sort = {
  bubbleSort: function(array) {
    do {
      var swapped = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i] > array[i + 1]) {
          var temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    tempArray = array;
    return array;
  },
  insertionSort: function(array) {
    for (var i = 0; i < array.length; i++) {
      var temp = array[i];
      var j = i - 1;
      while (j >= 0 && array[j] > temp) {
        array[j + 1] = array[j];
        j--;
        console.log(array);
      }
      array[j + 1] = temp;
    }
    return array;
  },
  selectionSort: function(array) {
    var min;
    for (var i = 0; i < array.length; i++) {
      min = i;
      for (var m = i + 1; m < array.length; m++) {
        if (array[m] < array[min]) {
          min = m;
        }
      }
      var temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
    return array;
  }
};

//search object which contains linear search and binary search
var search = {
  linearSearch: function(array, target) {
    var index;
    var count = 0;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < array.length; i++) {
      setInterval(animateLinear, 3000);
      if (array[i] == target) {
        return index;
      }
    }
    return -1;
  }, //end of linearSearch method

  binarySearch: function(array) {
    console.log(array);
    var indexes = [];
    var target = +prompt("Enter the target value: ");
    var startIndex = 0;
    var stopIndex = array.length - 1;
    var middle = Math.floor((stopIndex + startIndex) / 2);

    while (array[middle] != target && startIndex < stopIndex) {
      //adjust search area
      if (target < array[middle]) {
        stopIndex = middle - 1;
      } else if (target > array[middle]) {
        startIndex = middle + 1;
      }

      //recalculate middle
      middle = Math.floor((stopIndex + startIndex) / 2);
    }

    //make sure it's the right value
    //love ternary operators!
    return array[middle] != target ? -1 : middle;
  } //end of binarySearch method
}; //end of object
*/

//creates an array of repetit length filled with random values of 1 - 50 (inclusive - inclusive)
//appiles it to tempArray global variable that was defined at the top of this file
//draws it on the canvas on the html page using drawArray() which is defined at the top of the ani.js file
function randomArray() {
  var array = [];
  speed = document.getElementById("slider").value;

  for (var i = 0; i < 15; i++) {
    var number = Math.floor(Math.random() * (50 - 1 + 1) + 1);

    array.push(number);
  }
  tempArray = array;
  console.log(array);
  drawArray(true);

  return array;
}

//checks to see if the array is sorted 
//used as a condition to stop an interval in ani.js (bubble sort specifically)
function isSorted(array, sign) {
  var compare = {
    "<": function(a, b) {
      return a < b;
    },
    ">": function(a, b) {
      return a > b;
    },
    "<=": function(a, b) {
      return a <= b;
    },
    ">=": function(a, b) {
      return a >= b;
    }
  };
  return array.every(function(a, i, aa) {
    return !i || this(a, aa[i - 1]);
  }, compare[sign] || compare[">="]);
}

function adjustSpeed() {
  speed = document.getElementById("slider").value;
  var display = document.getElementById("valueHolder");
  display.style.color = "white";
  display.innerHTML = speed / 1000 + " seconds per step.";
  console.log(speed);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



