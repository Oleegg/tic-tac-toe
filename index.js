let isXO = false;
let isPlayMan = true;
let playerName = ''
let localplayerName = ''
const boxs = document.querySelectorAll('.playing__box')
const wrapper = document.querySelector('.playing__wrapper')
const survey = document.querySelector('.survey')
const btnComp = document.querySelector('.btn__one')
const btnMan = document.querySelector('.btn__two')
const inputValue = document.querySelector('.survey__name__text')
const alertName = document.querySelector('.alert__name')
const alertNameBtn = document.querySelector('.alert__name__btn')

const svgO = `<svg class="svg-XO"><use xlink:href="./svg/sprite.svg#o"></use></svg>`
const svgX = `<svg class="svg-XO"><use xlink:href="./svg/sprite.svg#x"></use></svg>`
const arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

btnMan.addEventListener('click', startGameMan)
btnComp.addEventListener('click', startGameComp)
alertNameBtn.addEventListener('click', removeAlarm)
boxs.forEach(el => el.addEventListener('click', addXO))
inputValue.addEventListener('focus', removeAlarm)

function removeAlarm() {
    alertName.classList.remove('visible')
}

function addXO(e) {
    if (isPlayMan) {
        if (!isXO) {
            e.target.insertAdjacentHTML('afterbegin', svgX)
            e.target.classList.add('blockX')
            e.target.classList.add('blockk')
            isXO = !isXO
            winnerSample()
            if ([...boxs].every(el => el.classList.contains('blockk'))) {
                setTimeout(() => showDraw(), 300)
            }
        } else {
            e.target.insertAdjacentHTML('afterbegin', svgO)
            e.target.classList.add('blockO')
            e.target.classList.add('blockk')
            isXO = !isXO
            winnerSample()
            if ([...boxs].every(el => el.classList.contains('blockk'))) {
                setTimeout(() => showDraw(), 300)
            }
        }
    } else {
        e.target.insertAdjacentHTML('afterbegin', svgX)
        e.target.classList.add('blockX')
        e.target.classList.add('blockk')
        if (![...boxs].every(el => el.classList.contains('blockk'))) {
            console.log("pi");
            winnerSample()
            cleverMove()
        } else if ([...boxs].every(el => el.classList.contains('blockk'))) {
            winnerSample()
            setTimeout(() => showDraw(), 300)
        }
    }
}



function rendomMove() {
    let rendomNumber = Math.round(Math.random() * (8))

    if (boxs[rendomNumber].classList.contains('blockO') || boxs[rendomNumber].classList.contains('blockX')) {
        rendomMove()
    } else {
        boxs[rendomNumber].insertAdjacentHTML('afterbegin', svgO)
        boxs[rendomNumber].classList.add('blockO')
        boxs[rendomNumber].classList.add('blockk')
        winnerSample()
    }
}

function cleverMove() {
    //если центр свободен
    if (boxs[4].childElementCount < 1) {
        boxs[4].insertAdjacentHTML('afterbegin', svgO)
        boxs[4].classList.add('blockO')
        boxs[4].classList.add('blockk')
        winnerSample()
        //если центр занят
    } else {
        if (boxs[4].classList.contains('blockk')) {
            console.log('4');
        }
        if ((boxs[0].childElementCount < 1)) {
            boxs[0].insertAdjacentHTML('afterbegin', svgO)
            boxs[0].classList.add('blockO')
            boxs[0].classList.add('blockk')
            winnerSample()
        }


    }

}

function winnerSample() {
    for (let i = 0; i < arr.length; i++) {
        if (boxs[arr[i][0]].classList.contains('blockX') && boxs[arr[i][1]].classList.contains('blockX') && boxs[arr[i][2]].classList.contains('blockX')) {
            winner('Крестики')
        } else if (boxs[arr[i][0]].classList.contains('blockO') && boxs[arr[i][1]].classList.contains('blockO') && boxs[arr[i][2]].classList.contains('blockO')) {
            winner('Нолики')
        }
    }

}

function winner(r) {
    const div = `<div class="alert"><p class='text'>Победили ${r}!!!</p><p> еще раз?</p><button class='btn restart'>Еще игра!</button><button class='btn__list btn'>список победителей</button></div>`
    wrapper.insertAdjacentHTML('afterbegin', div)
    const btnRest = document.querySelector('.restart')
    const btnList = document.querySelector('.btn__list')
    btnRest.addEventListener('click', restartGame)
}

function restartGame() {
    //добавить в локалсторидж и убирать запрос имени при загрузке
    localplayerName = playerName
    location.reload()

}

function modeGame() {
    if (!inputValue.value) {
        alertName.classList.add('visible')
    } else {
        playerName = inputValue.value
        survey.style.display = 'none'
    }
}

function startGameMan() {
    isPlayMan = true
    modeGame()
}

function startGameComp() {
    isPlayMan = false
    modeGame()
}
function showDraw() {
    const div = `<div class="alert"><p class='text'>Ничья!</p><p> еще раз?</p><button class='btn restart'>Еще игра!</button><button class='btn__list btn'>список победителей</button></div>`
    wrapper.insertAdjacentHTML('afterbegin', div)
    const btnRest = document.querySelector('.restart')
    const btnList = document.querySelector('.btn__list')
    btnRest.addEventListener('click', restartGame)
}
