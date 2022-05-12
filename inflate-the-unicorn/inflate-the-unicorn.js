// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

console.log('Inflate The Unicorn!')

let unicorns = [
    './images/unicorn-0.png',
    './images/unicorn-1.png',
    './images/unicorn-2.png',
    './images/unicorn-3.png',
]

let clickCount = 1

function changeImage(img) {
    if (clickCount < 4) {
        document.getElementById('inflate-an-image').src = unicorns[clickCount]
        clickCount += 1
    } else {
        alert('Unicorn Number ' + clickCount + ' says thank you!')
    }
}