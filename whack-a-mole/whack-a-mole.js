// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

console.log('Whack-a-Mole!')

var audio = new Audio('./whack-audio.wav')
let HITCOUNT = 0
var FIRSTEVENTCLICK = 1
var STARTTIME, ENDTIME
var TIMERLENGTH = 10

document.addEventListener('DOMContentLoaded', start)

function start() {
    bindEventListeners(document.getElementsByClassName('table')[0].children)
    addMole(randomIntFromInterval(0, 24).toString())
    document.getElementById('timer').innerHTML = TIMERLENGTH
    document.getElementById('highScore').innerHTML =
        localStorage.getItem('HighScore')
}

function bindEventListeners(table) {
    for (var i = 0; i < table.length; i++) {
        table[i].addEventListener('click', updateMap)
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function addMole(tableId) {
    var img = document.createElement('img')
    img.src = './mole.PNG'
    img.id = 'moleImg'
    document.getElementById(tableId).appendChild(img)
}

function isMole(tableId) {
    return tableId == 'moleImg'
}

function removeMole(tableId) {
    let d_nested = document.getElementById(tableId)
    let d = d_nested.parentElement
    d.removeChild(d_nested)
}

function startTimer() {
    STARTTIME = new Date()
}

function elapsedTime() {
    ENDTIME = new Date()
    var timeDiff = ENDTIME - STARTTIME //in ms
        // strip the ms
    timeDiff /= 1000

    // get seconds
    var seconds = Math.round(timeDiff)
    return seconds
}

if (!localStorage.getItem('HighScore')) {
    localStorage.setItem('HighScore', 0)
}

function startGame() {
    var game = window.setInterval(function() {
        document.getElementById('timer').innerHTML =
            10 - elapsedTime() >= 0 ? TIMERLENGTH - elapsedTime() : 0
        if (elapsedTime() > TIMERLENGTH) {
            clearInterval(game)
            finishGame()
        }
    }, 1000)
}

function finishGame() {
    if (HITCOUNT > parseInt(localStorage.getItem('HighScore'))) {
        localStorage.setItem('HighScore', HITCOUNT)
        alert('Congrats!! New high score of ' + HITCOUNT)
    } else {
        alert(
            TIMERLENGTH +
            ' seconds is up! You clicked ' +
            HITCOUNT +
            '. Close this box to start again.'
        )
    }
    FIRSTEVENTCLICK = 1
    HITCOUNT = 0

    document.getElementById('highScore').innerHTML =
        localStorage.getItem('HighScore')
    document.getElementById('hitCount').innerHTML = '0'
    document.getElementById('timer').innerHTML = TIMERLENGTH
}

function updateMap(event) {
    if (FIRSTEVENTCLICK) {
        startTimer()
        startGame()
        FIRSTEVENTCLICK = 0
    }

    if (isMole(event.target.id)) {
        audio.pause()
        audio.currentTime = 0
        audio.play()
        removeMole(event.target.id)
        addMole(randomIntFromInterval(0, 24).toString())
        HITCOUNT += 1
        document.getElementById('hitCount').innerHTML = HITCOUNT.toString()
    }
}