// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

console.log('Dress The Clown!')

var verticalIndex = 0
var bodyParts = ['head', 'body', 'shoes']
// var bodyParts = ['shoes', 'body', 'head']
var indexArray = [0, 0, 0]

document.onkeydown = checkKey

function checkKey(e) {
  e = e || window.event

  if (e.keyCode == '38') {
    // up arrow
    if (verticalIndex > 0) {
      verticalIndex = (verticalIndex - 1) % 3
    }
  } else if (e.keyCode == '40') {
    // down arrow
    verticalIndex = (verticalIndex + 1) % 3
  } else if (e.keyCode == '37') {
    // left arrow
    changeClown((indexArray[verticalIndex] -= 1))
  } else if (e.keyCode == '39') {
    // right arrow
    changeClown((indexArray[verticalIndex] += 1))
  }

  console.group('arrowKeys')
  console.log(verticalIndex)
  console.log(indexArray)
}

function changeClown(index) {
  var headSrc =
    './images/' +
    bodyParts[Math.abs(verticalIndex)] +
    (Math.abs(index) % 6) +
    '.png'

  document.getElementById(bodyParts[Math.abs(verticalIndex)]).src = headSrc
}
