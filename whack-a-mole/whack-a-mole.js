// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

console.log('Whack-a-Mole!')

let hitCount = 0
var audio = new Audio('./whack-audio.wav')
var firstClickEvent = 1
var startTime, endTime

document.addEventListener('DOMContentLoaded', start)

function start() {
    bindEventListeners(document.getElementsByClassName('table')[0].children)
    addMole(randomIntFromInterval(0, 24).toString())
}

function bindEventListeners(table) {
    for (var i = 0; i < table.length; i++) {
        table[i].addEventListener('click', updateMoleMap)
            // dots[i].addEventListener('dblclick', undoDot)
    }
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
    startTime = new Date()
}

function endTimer() {
    endTime = new Date()
    var timeDiff = endTime - startTime //in ms
        // strip the ms
    timeDiff /= 1000

    // get seconds
    var seconds = Math.round(timeDiff)
    return seconds
}

if (!localStorage.getItem('HighScore')) {
    localStorage.setItem('HighScore', 0)
}

document.getElementById('highScore').innerHTML =
    localStorage.getItem('HighScore')

function updateMoleMap(event) {
    if (firstClickEvent) {
        startTimer()
        firstClickEvent = 0
    }

    if (endTimer() > 7) {
        if (hitCount > parseInt(localStorage.getItem('HighScore'))) {
            localStorage.setItem('HighScore', hitCount)
            alert('Congrats, new high score of ', localStorage.getItem('HighScore'))
        } else {
            alert(
                '10 Seconds is up!, you clicked ' +
                hitCount +
                '. Click ok to start again'
            )
        }
        firstClickEvent = 1
        hitCount = 0

        document.getElementById('highScore').innerHTML =
            localStorage.getItem('HighScore')
        document.getElementById('hitCount').innerHTML = '0'
    }

    if (isMole(event.target.id)) {
        audio.pause()
        audio.currentTime = 0
        audio.play()
        removeMole(event.target.id)
        addMole(randomIntFromInterval(0, 24).toString())
        hitCount += 1
        document.getElementById('hitCount').innerHTML = hitCount.toString()
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}