const pers = document.querySelector('.person')
let mesTreePressF = document.querySelector('.meTree')
let tree = document.querySelector('.tree')
let messTotal = document.querySelector('.total')
let firewood = document.querySelector('.firewood')
let listFirWood = document.querySelector('.woodAll')
let oblastGame = document.querySelector('.game')
let vmestimostRukzak = document.querySelector('.meRvmes')
let maxWeight = document.querySelector('.maxWeight')

function createTeg(teg, clas, tet) {
    let element = document.createElement(teg)
    element.classList.add(clas)
    if (tet) {
        element.textContent = tet
    }
    return element
}


let warnehouse={
    maxSklad:2000,
    sklad:0,
    vigruzka:function(){
        warnehouse.sklad = rukzak.sumWood
        rukzak.sumWood = 0
    },
}

let go = true
let anim = 1
let anim2 = 5
let animRub = true
let animRubBack = 1

let alex = {
    sped: 30,
}
let timeGame = {
    speedIntreval: 100,
}

let rukzak = {
    weightMax: 22,
    sumWood: 0,
    vmes: function () {
        vmestimostRukzak.textContent = this.sumWood
    },
    animLoading:function (ss) {
        let r1 = 1020 + ss
        let random = Math.floor(Math.random()*40)+590
        let list = document.querySelector('.oblRukzaka')
        let element = createTeg('div', 'woodRuk')
        element.style.left = r1 + 'px'
        element.style.top = random + 'px'
        list.append(element)
    },
    animIf:40,
}

    

let rubka
let game = {
    removeWood: function () {
        let data = document.querySelectorAll('.firewood')
        if (rukzak.weightMax > rukzak.sumWood) {
            if (game.total > 0) {
                data[game.total - 1].remove()
                game.total -= 1
                rukzak.sumWood++
                rukzak.vmes()
                if(rukzak.animIf<200){
                    rukzak.animIf+=40
                rukzak.animLoading(rukzak.animIf)
                }
                
                messTotal.textContent = game.total
            }
        } else {
            return 0
        }

    },
    animationGetWood: zamAnim(3)
    ,
    animationFireWood: function () {
        let wood = createTeg('div', 'firewood')
        listFirWood.append(wood)
    },
    total: 0,
    count: function () {
        this.total++
        messTotal.textContent = this.total
    },
    animRub1: true,
    animRubki: function () {         //рубка дерева
        let audio = new Audio('musik/kolka.mp3')
        if (this.animRub1) {
            this.animRub1 = false
            rubka = setInterval(function () {
                tree.style.backgroundImage = `url("person/tree${animRubBack}.png")`
                pers.style.backgroundImage = `url("person/rub/0${animRubBack}.png")`
                animRubBack++
                if (animRubBack == 3) {
                    game.animationFireWood()
                    audio.play()
                    game.count()
                    animRubBack = 1
                }
            }, alex.sped)
        }

    },
    endRubka: function () {
        clearInterval(rubka)
        pers.style.backgroundImage = `url("person/beGo_00.png")`
        tree.style.backgroundImage = `url("person/tree1.png")`
        game.animRub1 = true
    }
}

window.addEventListener('keydown', (e) => {
    let goLeft = parseInt(getComputedStyle(pers).left)

    if (e.code == 'KeyD') {

        goLeft += alex.sped
        if (goLeft < 1200) {
            mesTreePressF.style.visibility = 'hidden'
        } else {
            mesTreePressF.style.visibility = 'visible'
        }


        if (goLeft < 1220) {
            pers.textContent = goLeft //Кординаты где бегает
            pers.style.left = goLeft + 'px'
            pers.style.backgroundImage = `url("person/beGo_0${anim}.png")`
            if (go) {
                go = false
                let r1 = setInterval(function () {
                    anim++
                    go = true
                    clearInterval(r1)
                }, 100)
            }
            if (anim == 3) {
                anim = 1
            }
        }
        document.onkeyup = function () {
            pers.style.backgroundImage = `url("person/beGo_00.png")`
        }


    }
    if (e.code == 'KeyA') {
        goLeft = parseInt(getComputedStyle(pers).left)
        goLeft -= alex.sped
        pers.textContent = goLeft //Кординаты где бегает
        if (goLeft < 1200) mesTreePressF.style.visibility = 'hidden'
        if (goLeft > 40) {
            pers.style.backgroundImage = `url("person/beGo_0${anim2}.png")`
            if (go) {
                go = false
                let r1 = setInterval(function () {
                    anim2++
                    go = true
                    clearInterval(r1)
                }, 100)
            }
            if (anim2 == 6) {
                anim2 = 5
            }
            pers.style.left = goLeft + 'px'
        }
        document.onkeyup = function () {
            pers.style.backgroundImage = `url("person/beGo_00.png")`
        }

    }
    if (e.code == 'KeyF') {                                         //////рубка деревева
        if (goLeft > 1190) {
            game.animRubki()
            document.addEventListener('keyup', game.endRubka)
        }
    }

    if (goLeft >= 1020 && goLeft < 1160) {                           //Показать поднять дрова
        if (rukzak.weightMax > rukzak.sumWood) {
            document.querySelector('.fireWoodPress').style.visibility = 'visible'
            if (game.total > 0) {
                if (e.code == 'KeyF') {
                    animationInterval('img/getWood', timeGame.speedIntreval, game.removeWood)
                }
            }
        }
    } else {
        document.querySelector('.fireWoodPress').style.visibility = 'hidden'
    }



})





function zamAnim(n) {         //замыкание анимации
    let count = 0
    return function () {
        if (count > n) {
            return count = 0
        }
        return count++
    }
}

function animationInterval(path, time, fun) {
    let score
    let data
    if (game.animRub1) {
        score = game.animationGetWood()
        game.animRub1 = false
        data = setInterval(function () {
            pers.style.backgroundImage = `url("${path}${score}.png")`
            game.animRub1 = true
            if (score == 3) {
                fun()
                console.log('32')
            }
            clearInterval(data)
        }, time)
    }


}
function skyOn() {

    let speedSky = 1
    for (let i = 0; i < 2; i++) {
        let sky = createTeg('div', 'sky')
        oblastGame.append(sky)
        sky.style.left = Math.floor(Math.random() * 1000) + 'px'
        sky.style.backgroundImage = ` url('img/sky${Math.floor(Math.random() * 5) + 1}.png')`
        sky.style.width = Math.floor(Math.random() * 150) + 100 + 'px'
        sky.style.top = Math.floor(Math.random() * 200) + 'px'
        let r1 = setInterval(function () {
            let data = parseInt(getComputedStyle(sky).left)

            sky.style.left = (data - speedSky) + 'px'
            if (data < -100) {
                sky.remove()
                clearInterval(r1)

            }
        }, Math.floor(Math.random() * 1000))
    }
    r33()
    function r33() {
        let random = Math.floor(Math.random() * 100000)
        let r2 = setTimeout(function () {
            let sky = createTeg('div', 'sky')
            oblastGame.append(sky)
            speedSky = 1
            sky.style.backgroundImage = ` url('img/sky${Math.floor(Math.random() * 5) + 1}.png')`
            sky.style.width = Math.floor(Math.random() * 150) + 100 + 'px'
            sky.style.top = Math.floor(Math.random() * 200) + 'px'
            let r1 = setInterval(function () {
                let data = parseInt(getComputedStyle(sky).left)

                sky.style.left = (data - speedSky) + 'px'
                if (data < -100) {
                    sky.remove()
                    clearInterval(r1)

                }
            }, Math.floor(Math.random() * 1000))
            r33()
        }, random)
    }
}
skyOn() //тучи
