//teste troca Image//
let cartasIrmãs = ["imagens/android.png", "imagens/chrome.png", "imagens/facebook.png", "imagens/firefox.png", "imagens/googleplus.png", "imagens/html5.png", "imagens/twitter.png", "imagens/windows.png"]
let cartaJogada = [0, 0]
let idCartaJogada = [0, 0]
let acertos = 0
let contemPrimeiraCarta
let travar = true
let tempo = 0
let minutos = 0
let segundos = 0






prepararTabuleiro()

function iniciarJogo() {
    travar = true
    cartaJogada = [0, 0]
    idCartaJogada = [0, 0]
    acertos = 0
    tempo = 0
    prepararTabuleiro()
    embaralhar()
    virarCartas()
    controlaTempo()
}



function prepararTabuleiro() {
    let index = 1
    let documentoId = document.getElementById("baralho")
    documentoId.innerHTML = ``
    for (let x = 0; x < 8; x++) {
        for (let i = 0; i < 2; i++) {
            documentoId.innerHTML += `<div id="carta${index}" onclick="jogarCarta(carta${index})">
            <img id="${index},0" src="${cartasIrmãs[x]}" onclick="trocaImg(${index},0)">
            <img id="0,${index}" hidden="" src="imagens/mental.png" onclick="trocaImg(0,${index})">
            </div>`
            index++
        }
    }

}


function embaralhar() {

    for (let x = 0; x < 4; x++) {
        for (let i = 1; i < 17; i++) {
            numeroAleatorio = Math.floor((Math.random() * 16) + 1)
            let carta1 = document.getElementById("carta" + i)
            let guardaCarta1 = carta1.innerHTML
            let carta2 = document.getElementById("carta" + numeroAleatorio)
            carta1.innerHTML = carta2.innerHTML
            carta2.innerHTML = guardaCarta1
        }
    }
}

function virarCartas() {
    setTimeout(() => {
        travar = false
        for (let y = 0; y < 17; y++) {

            trocaImg(y, 0)
        }

    }, 3000);


}

function trocaImg(x, y) {
    if (travar) return
    if (x > 0 && y == 0) {
        let aEsconder = document.getElementById(`${x},${y}`).setAttribute("class", "esconder")
        aEsconder = document.getElementById(`${x},${y}`).setAttribute("hidden", true)
        aEsconder = document.getElementById(`${y},${x}`).setAttribute("class", "mostrar")
        aEsconder = document.getElementById(`${y},${x}`).removeAttribute("hidden")
    } else if (x == 0 && y > 0) {
        let aEsconder = document.getElementById(`${y},${x}`).setAttribute("class", "mostrar")
        aEsconder = document.getElementById(`${y},${x}`).removeAttribute("hidden")
        aEsconder = document.getElementById(`${x},${y}`).setAttribute("class", "esconder")
        aEsconder = document.getElementById(`${x},${y}`).setAttribute("hidden", true)

    }
}

function jogarCarta(cartaEscolhida) {
    if (travar) return
    if (cartaJogada[0] == 0) {
        cartaJogada[0] = cartaEscolhida.firstElementChild.src
        idCartaJogada[0] = parseInt(cartaEscolhida.firstElementChild.id)
        let travaCarta1 = document.getElementById(`${idCartaJogada[0]},0`)
        travaCarta1.removeAttribute("onclick")
        contemPrimeiraCarta = cartaEscolhida
    } else {
        travar = true
        cartaJogada[1] = cartaEscolhida.firstElementChild.src
        idCartaJogada[1] = parseInt(cartaEscolhida.firstElementChild.id)
        travaCarta1 = document.getElementById(`${idCartaJogada[1]},0`)
        travaCarta1.removeAttribute("onclick")
    }
    if (idCartaJogada[0] == 0 || idCartaJogada[1] == 0) return
    if (cartaJogada[0] === cartaJogada[1] && idCartaJogada[0] != parseInt(cartaEscolhida.firstElementChild.id)) {
        acertos++
        window.alert("Acertou!")
        contemPrimeiraCarta.removeAttribute("onclick")
        cartaEscolhida.removeAttribute("onclick")
        if (acertos === 8) {
            controlaTempo()
            window.alert(`Parabéns você conseguiu formar os oito pares em apenas ${minutos}:${segundos} `)
            iniciarJogo()
        }
        idCartaJogada[0] = 0
        idCartaJogada[1] = 0
        cartaJogada[0] = 0
        cartaJogada[1] = 0
        travar = false
    } else {
        setTimeout(() => {
            travar = false
            travaCarta1 = document.getElementById(`${idCartaJogada[0]},0`)
            travaCarta1.setAttribute("onclick", `trocaImg(${idCartaJogada[0]},0)`)
            travaCarta1 = document.getElementById(`${idCartaJogada[1]},0`)
            travaCarta1.setAttribute("onclick", `trocaImg(${idCartaJogada[1]},0)`)
            trocaImg(idCartaJogada[0], 0)
            trocaImg(idCartaJogada[1], 0)
            if (idCartaJogada[0] === idCartaJogada[1]) {
                window.alert("Selecionou a mesma carta duas vezes! tente novamente")
            } else {
                window.alert("Pares errados! tente novamente")
            }
            idCartaJogada[0] = 0
            idCartaJogada[1] = 0
            cartaJogada[0] = 0
            cartaJogada[1] = 0

        }, 1500);

    }

}

function controlaTempo() {
    // if (tempo === 0) {
    //     tempo = new Date()
    // }
    // else {
    //     let cronometro = new Date()
    //     let diferença
    //     diferença = (tempo - cronometro)
    //     tempo = diferença
    //     minutos = diferença.getMinutes()
    //     segundos = diferença.getSeconds()
    // }
}

