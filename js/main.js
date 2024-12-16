'use strict'

var gData 
var gCurrNum
var gMaxNum 

function onInitGame(blockNum = 16) {
    gData = []
    gCurrNum = 0
    gMaxNum = blockNum 
    var htmlString = '<table>\n<tr>\n'
    for (var i = 0; i < gMaxNum; i++) {
        gData[i] = {value: i + 1, isPressed: false}
    }

    gData = shuffleArray(gData)
    for (var i = 0; i < gMaxNum; i++) {
        htmlString += `<td class="square ${gData[i].value}" onclick="onTouchedNumber(this)">
            ${gData[i].value}</td>\n`
        if ((i + 1) % Math.sqrt(gMaxNum) === 0) htmlString += '</tr>\n'
    }

    htmlString += '</table>'
    
    var elTable = document.querySelector('.game .table')
    elTable.innerHTML = htmlString
}

var gIntervalId
function startTimer() {
    var elDigit = document.querySelectorAll('.digit')
    var elSec = elDigit[0]
    var elMS = elDigit[1]
    var secDigit = +elSec.innerText
    var countMS = 0
    
    gIntervalId = setInterval(function() {
        countMS++

        if (countMS < 10) elMS.innerText = '0' + countMS
        else elMS.innerText = countMS

        if (countMS == 100) {
            countMS = 0
            secDigit++
            if (secDigit < 10) elSec.innerText = secDigit
            else elSec.innerText = secDigit 
        }    
    }, 10)
}

function onTouchedNumber(elTableData) {

    var index = elTableData.classList[1] - 1    
    if (gCurrNum == index) {
        if (gCurrNum === 0) startTimer()

        gData[index].isPressed = true
        elTableData.classList.add('pressed')
        gCurrNum++
        if (gCurrNum === gMaxNum) youWon()
    }
}

function youWon() {
    var elTable = document.querySelector('.game .table')
    elTable.innerHTML = '<h1> You WON! </h1>'

    var audioFile = new Audio('sound/win_sound.mp3')
    audioFile.play()

    clearInterval(gIntervalId)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        // swap the elements
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}