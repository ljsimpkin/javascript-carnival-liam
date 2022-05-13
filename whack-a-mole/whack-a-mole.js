// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

console.log('Whack-a-Mole!')

// table = []

// for (let i = 0; i < 25; i++) {
//     table.push(0)
// }

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

var audio = new Audio('./whack-audio.wav')

function updateMoleMap(event) {
    if (isMole(event.target.id)) {
        audio.pause()
        audio.currentTime = 0
        audio.play()
        removeMole(event.target.id)
        addMole(randomIntFromInterval(0, 24).toString())
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}