const html = document.querySelector('html')
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startBotao = document.querySelector ('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const somIniciar = new Audio('/sons/play.wav')
const somPause = new Audio ('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const iconeComeçarPausar = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorrido = 1500
let intervaloId = null

musica.loop = true


/*  -- antes de criar a função alterarContexto --
focoBotao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
    banner.setAttribute('src', '/imagens/foco.png')
})

curtoBotao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
    banner.setAttribute('src', '/imagens/descanso-curto.png')
} )

longoBotao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', '/imagens/descanso-longo.png')
} ) */

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBotao.addEventListener('click', () => {
    tempoDecorrido = 1500
    alterarContexto('foco')
    focoBotao.classList.add ('active')
})

curtoBotao.addEventListener('click', () => {
    tempoDecorrido = 300
    alterarContexto('descanso-curto')
    curtoBotao.classList.add ('active')
})

longoBotao.addEventListener('click', () => {
    tempoDecorrido = 900
    alterarContexto('descanso-longo')
    longoBotao.classList.add ('active')
})


// usado `` para definir ${contexto} --- usado o forEach para remover o active do botao que nao esta selecionado -- usado o switch para inserir os texto conforme o case
function alterarContexto (contexto) {
    monstraTempor()
    botoes.forEach (function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute ('data-contexto', contexto)
    banner.setAttribute ('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML= ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

        break;

        case "descanso-curto":
            titulo.innerHTML= `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`

        break;

        case "descanso-longo":
            titulo.innerHTML= `Hora de voltar à superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    
        break;
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        audioTempoFinalizado.play()
        alert ('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorrido -= 1
    monstraTempor()
}

startBotao.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervaloId) {
        somPause.play()
        zerar()
        return
    }
    somIniciar.play()
    intervaloId = setInterval (contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconeComeçarPausar = ('/imagens/pause.png')
}

function zerar () {
    clearInterval (intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iconeComeçarPausar = ('/imagens/play_arrow.png')
    intervaloId = null
}

function monstraTempor () {
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute:'2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

monstraTempor ()