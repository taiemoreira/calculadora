const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')
const display = document.getElementById('display')

let novoNumero = true
let operador
let numeroAnterior

numeros.forEach(numero =>
    numero.addEventListener('click', inserirNumero)
)

function inserirNumero(e) {
    atualizarDisplay(e.target.textContent)
}

function atualizarDisplay(texto) {
    if(novoNumero) {
        display.textContent = texto.toLocaleString('BR')
        novoNumero = false
    } else {
        display.textContent += texto
    }
}

operadores.forEach(operador =>
    operador.addEventListener('click', selecionarOperador)
)

function selecionarOperador(e) {
    if (!novoNumero) {
        calcular()
        novoNumero = true
        operador = e.target.textContent
        numeroAnterior = Number(display.textContent.replace(',', '.'))
    }
}

function calcular() {
    if (operador != undefined) {
        novoNumero = true
        let numeroAtual = Number(display.textContent.replace(',', '.'))

        if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual)
        } else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual)
        } else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual)
        } else if (operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual)
        }
    }
}

document.getElementById('limparCalculo').addEventListener('click', lCalculo)

document.getElementById('limparDisplay').addEventListener('click', lDisplay)

document.getElementById('backspace').addEventListener('click', backspace)

document.getElementById('inverter').addEventListener('click', inverter)

document.getElementById('decimal').addEventListener('click', decimal)

document.getElementById('igual').addEventListener('click', igual)

function lCalculo() {
    lDisplay()
    novoNumero = true
    operador = undefined
    numeroAnterior = undefined
}

function lDisplay() {
    display.textContent = ''
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1)
}

function inverter() {
    novoNumero = true
    atualizarDisplay(display.textContent * -1)
}

function decimal() {
    if(naoDecimal()) {
        if(novoNumero) {
            atualizarDisplay('0,')
        } else {
            atualizarDisplay(',')
        }
    }
}

function igual() {
    calcular()
    novoNumero = true
}

const naoDecimal = () => display.textContent.indexOf(',') == -1

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorSomar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal',
}

document.addEventListener('keydown', mapearTeclado)

function mapearTeclado(e) {
    let tecla = e.key
    if (Object.keys(mapaTeclado).indexOf(tecla) != -1)
    document.getElementById(mapaTeclado[tecla]).click()
}