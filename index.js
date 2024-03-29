let dino = document.querySelector('.dino')
let cactus = document.querySelector('.cactus')
let texCactus = cactus.querySelector('div')
let texDino = dino.querySelector('div')
let stop = document.querySelector('.stop')
let audioJump = new Audio('img/jump.mp3')
let audioFite = new Audio('img/fait.mp3')
let menu = document.querySelector('.menu')
let count = 0


audioFite.volume = 0.1
let speedGame = '2s'
let tim = 100
let run = true
let runJump = true
setInterval(function () {
    if (runJump) {
        if (run) {
            dino.style.backgroundImage = 'url("img/dino1.png")'
            run = false
        } else {
            dino.style.backgroundImage = 'url("img/dino2.png")'
            run = true
        }
    }


}, tim)
let jumpOn = true
let jump = Math.round(parseInt(getComputedStyle(dino).top))
window.addEventListener('keydown', function (evt) {
    if (runJump) {
        if (!dino.classList.contains('jump')) {
            dino.classList.add('jump')
            audioJump.play()
            dino.style.backgroundImage = 'url("img/dino.png")'
            runJump = false
            setTimeout(function () {
                dino.classList.remove('jump')
                runJump = true

            }, 1000)
        }
    }

})


let endGame = true
let positionCactus
let positionDino
cactus.classList.add('cacMov')
function game() {
    cactus.style.animationDuration = speedGame
    positionDino = Math.round(parseInt(getComputedStyle(dino).top))
    positionCactus = Math.round(parseInt(getComputedStyle(cactus).left))
    
    
    if (positionCactus < 70 && positionCactus > 50 && positionDino > 20) {
        if (endGame) {
            cactus.classList.remove('cacMov')
            clearInterval(stopTotal)
            clearInterval(stopLand)
            clearInterval(stopCloud)
            cactus.style.left = positionCactus + 'px'
            jumpOn = false
            
            
            speedGame = '0s'
            audioFite.play()
            endGame = false
            runJump = false
            dino.style.backgroundImage = 'url("img/dino.png")'
            menu.style.visibility = 'visible'
            console.log('Game over')
        }
    }
}
let r1 = setInterval(game, 10)
let starGame = false
stop.onclick = function () {
    if (starGame) {
        r1 = setInterval(game, 10)
        starGame = false
    } else {
        clearInterval(r1)
        cactus.style.left = positionCactus + 'px'
        cactus.style.animationDuration = '0s'
        starGame = true
    }
}

let land = document.querySelector('.land')
function lenc() {
    let earth = document.createElement('div')
    earth.classList.add('earth')
    earth.style.animationDuration = speedGame
    let randWhite = Math.round(Math.random() * 40)
    let randTop = Math.round(Math.random() * 20)
    earth.style.marginTop = randTop + 'px'
    earth.style.width = randWhite + 'px'
    land.append(earth)
    let whi = parseInt(getComputedStyle(earth).width)
    let r1 = setInterval(function () {
        let position = parseInt(getComputedStyle(earth).left)

        if (position < -10) {

            earth.remove()
        }
    }, 10)
}
let stopLand = setInterval(lenc, parseInt(speedGame) * 100)
let gameFon = document.querySelector('.gameFon')
let animCloud = function () {
    let cloud = document.createElement('div')
    cloud.classList.add('cloud')
    let top = (function () {
        return Math.floor(Math.random() * (100 - 50) + 50)
    })()
    cloud.style.top = top + 'px'
    cloud.style.animationDuration = speedGame
    let positionCloud = parseInt(getComputedStyle(cloud).left)

    gameFon.append(cloud)
    setTimeout(function () {
        cloud.remove()
    }, 32000)




}

let stopCloud = setInterval(animCloud, 8000)


let total = document.getElementById('total')

function totals() {

    count += 10
    if (count >= 10 && count < 100) {
        total.textContent = '0000' + count
    } else if (count >= 100 && count < 1000) {
        total.textContent = '000' + count
    }
    else if (count >= 1000 && count < 10000) {
        total.textContent = '00' + count
    }
    else if (count >= 10000 && count < 100000) {
        total.textContent = '0' + count
    } else if (count >= 100000 && count < 1000000) {
        total.textContent = '0' + count
    }

}
let stopTotal = setInterval(totals, 200)


stop.onclick = function () {
    menu.style.visibility = 'hidden'
    count = 0
    cactus.classList.add('cacMov')
    stopTotal = setInterval(totals, 200)
    speedGame = '2s'
    stopCloud = setInterval(animCloud, 8000)
    stopLand = setInterval(lenc, parseInt(speedGame) * 100)
    endGame = true
    runJump = true


}


