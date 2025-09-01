let game = [0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,]
let score = 0
let quadrado = [3,4,5,12,13,14,21,22,23]
let t = [4,12,13,14]
let s = [4,5,12,13]
let linha = [3,4,5]

let formatos = [quadrado, t, s, linha]


//Váriavel auxiliar que diz qual a rotação atual do formato para modificar as cordenadas
// 0:padrão
// 1:para direita
// 2:para baixo
// 3:para esquerda
let rotacao = 0


//Váriavel auxiliar que diz qual o formato para modificar as cordenadas
// 0:quadrado
// 1:t
// 2:s
// 3:linha
let formatoAtual = Math.floor(Math.random() * formatos.length)

let novoFormato = formatos[formatoAtual]

function mudarFundoDivPorForma(novoFormato){
    for (let index = 0; index < game.length; index++) {
        if(novoFormato.includes(index) && game[index] !==1){
            game[index] = 1
        }
        if ( game[index] ==1) {
            document.getElementById(index).style.background = "#FFD700";
        }
    }
}

function reverterFundoDivPorForma(figuraAtual){
    for (let index = 0; index < figuraAtual.length; index++) {
        if(game[figuraAtual[index]] ==1){
            game[figuraAtual[index]] = 0
        }
        document.getElementById(figuraAtual[index]).style.background = "#0d0d0d";
    }
}

function gameover(){
    score = 0
    document.getElementById("score").textContent = ""
    for (let i = 0; i < game.length; i++) {
        game[i] = 0
        document.getElementById(i).style.background = "#0d0d0d";
    }
}

function obterPossisaoFimLinha(figuraAtual){
    let possisaoFimLinha = [72,73,74,75,76,77,78,79,80] //Ultimas cedulas em que a figura pode estar proximo
    let gameSemFiguraAtual = Array.from(game)
    for (let index = 0; index < figuraAtual.length; index++) {
        gameSemFiguraAtual[figuraAtual[index]] = 0 
    }
    if (!gameSemFiguraAtual.includes(1)) {
        return possisaoFimLinha
    }
    externo: for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
                if (gameSemFiguraAtual[9*j+i] == 1 ) {
                    possisaoFimLinha[i]=((9*j+i)-9)
                    continue externo
                }
            }
        }
    return possisaoFimLinha
}

function chegouNoFundo(figuraAtual){
    let possisaoFimLinha = obterPossisaoFimLinha(figuraAtual)
    for (let index = 0; index < figuraAtual.length; index++) {
        if (possisaoFimLinha.includes(figuraAtual[index])) {
            return true
        }
    }
    return false
}

function descerUmaLinha(figuraAtual){
    let novaFigura = []
    reverterFundoDivPorForma(figuraAtual)
    for (let index = 0; index < figuraAtual.length; index++) {
        novaFigura.push(figuraAtual[index]+9)
    }
    mudarFundoDivPorForma(novaFigura)
    return novaFigura
}

    function verificaPerdeu(){
        for (let i = 0; i < 9; i++) {
            if (game[i] == 1) {
                return true
            }
        }
        return false
    }



    function logica() {
        
    }
    
    function esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    

    function moverEsquerda(){
        let novaPosicao = []
        
        switch (novoFormato.length) {
            case 9:
                if (game[novoFormato[6] -1] == 1) {
                    return
                }
                break;
            case 4:
                let copiaFormato = Array.from(novoFormato.splice(0,1))
                let formatoS = false
                for (let i = 0; i < copiaFormato.length; i++) {
                    if (copiaFormato[i] - i != copiaFormato[0]) {
                        formatoS = true
                    }
                }
                if (formatoS && game[novoFormato[0] -1] == 1) {
                    return
                }
                if (game[novoFormato[1] -1] == 1) {
                    return
                }
                break;
            case 3:
                if (game[novoFormato[0] -1] == 1) {
                    return
                }
                break;
            default:
                break;
        }
        for (let index = 0; index < novoFormato.length; index++) {
            novaPosicao.push(novoFormato[index] -1)
            if (novoFormato[index]%9==0) {
                return
            }
        }
        reverterFundoDivPorForma(novoFormato)
        novoFormato = Array.from(novaPosicao)
    }

    function moverDireita(){
        let novaPosicao = []
        
        switch (novoFormato.length) {
            case 9:
                if (game[novoFormato[8] +1] == 1) {
                    return
                }
                break;
            case 4:
                if (game[novoFormato[3] +1] == 1){
                    return
                }
                break;
            case 3:
                if (game[novoFormato[2] +1] == 1) {
                    return
                }
                break;
            default:
                break;
        }
        for (let index = 0; index < novoFormato.length; index++) {
            novaPosicao.push(novoFormato[index] +1)
            if ((novoFormato[index]+1)%9==0) {
                return
            }
        }
        reverterFundoDivPorForma(novoFormato)
        novoFormato = Array.from(novaPosicao)
    }

    function retirarLinhaCompleta(){
        var linhaAtual = []
        var linhaAtualConteudo = []
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if ((9*i+j)%9 == 0 && (9*i+j) != 0) {
                    if (!linhaAtualConteudo.includes(0) && linhaAtualConteudo.length != 0) {
                        game.splice(linhaAtual[0], 9)
                        
                        game = [0,0,0,0,0,0,0,0,0, ...game]
                        for (let i = 0; i < game.length; i++) {
                            if (game[i]==0) {
                                document.getElementById(i).style.background = "#0d0d0d";
                            }else{
                                document.getElementById(i).style.background = "#FFD700";
                            }
                        }
                        score += 100
                    }
                    var linhaAtual = []
                    var linhaAtualConteudo = []
                }
                linhaAtual.push((9*i+j))
                linhaAtualConteudo.push(game[(9*i+j)])
            }
        }
        let verificaUltimaLinha =[]
        for (let i = 0; i < 9; i++) {
            verificaUltimaLinha.push(game[72 + i])
        }
        if (!verificaUltimaLinha.includes(0)) {
            game.splice(72, 9)
            game = [0,0,0,0,0,0,0,0,0, ...game]
            for (let i = 0; i < game.length; i++) {
                if (game[i]==0) {
                    document.getElementById(i).style.background = "#0d0d0d";
                }else{
                    document.getElementById(i).style.background = "#FFD700";
                }
            }
            score += 100
        }
        let valorScore = "SCORE:" + score
        document.getElementById("score").textContent = valorScore
    }

    function rotacionar(){
        let FormatoRotacionado = Array.from(novoFormato)
        switch (formatoAtual) {
        // 1:t
        // 2:s
        // 3:linharotacao = 1
            case 0:
                return
            case 1:
                switch (rotacao) {
                    case 0:
                        FormatoRotacionado[1] = FormatoRotacionado[1] + 10
                        rotacao = 1
                        break;
                    case 1:
                        FormatoRotacionado[1] = FormatoRotacionado[1] - 10  
                        FormatoRotacionado[0] = FormatoRotacionado[0] + 18
                        rotacao = 2
                        break;
                    case 2:
                        FormatoRotacionado[0] = FormatoRotacionado[0] - 18
                        FormatoRotacionado[3] = FormatoRotacionado[3] + 8 
                        rotacao = 3
                        break;
                    case 3: 
                        FormatoRotacionado[3] = FormatoRotacionado[3] -8
                        rotacao = 0
                        break;
                
                    default:
                        break;
                }
                break;
            case 2:
                switch (rotacao) {
                    case 0:
                        FormatoRotacionado[0] = FormatoRotacionado[0] + 18
                        FormatoRotacionado[1] = FormatoRotacionado[1] -2
                        rotacao = 1
                        break;
                    case 1:
                        FormatoRotacionado[0] = FormatoRotacionado[0] - 18
                        FormatoRotacionado[1] = FormatoRotacionado[1] + 2
                        rotacao = 0
                        break;
                    default:
                        break;
                }
                break;
            case 3:
                switch (rotacao) {
                    case 0:
                        FormatoRotacionado[0] = FormatoRotacionado[0]  -8
                        FormatoRotacionado[2] = FormatoRotacionado[2]  +8
                        rotacao = 1
                        break;
                    case 1:
                        FormatoRotacionado[0] = FormatoRotacionado[0]  +8
                        FormatoRotacionado[2] = FormatoRotacionado[2]  -8
                        rotacao = 0
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        reverterFundoDivPorForma(novoFormato)
        novoFormato = Array.from(FormatoRotacionado)
        mudarFundoDivPorForma(novoFormato)
    }

    async function executar() {
        while(true) {
            await esperar(1000);
            mudarFundoDivPorForma(novoFormato)
            if (chegouNoFundo(novoFormato)) {
                retirarLinhaCompleta()
                formatoAtual = Math.floor(Math.random() * formatos.length)
                rotacao = 0
                novoFormato = formatos[formatoAtual]
            } else{
                novoFormato = descerUmaLinha(novoFormato)
            }
            if (verificaPerdeu()) {
                mudarFundoDivPorForma(novoFormato)
                await esperar(300);
                gameover()

            }
        }
    }
    executar()

// GABARITO 
// ┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
// │ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │
// ├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
// │    0    │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │
// │    1    │ 9 │10 │11 │12 │13 │14 │15 │16 │17 │
// │    2    │18 │19 │20 │21 │22 │23 │24 │25 │26 │
// │    3    │27 │28 │29 │30 │31 │32 │33 │34 │35 │
// │    4    │36 │37 │38 │39 │40 │41 │42 │43 │44 │
// │    5    │45 │46 │47 │48 │49 │50 │51 │52 │53 │
// │    6    │54 │55 │56 │57 │58 │59 │60 │61 │62 │
// │    7    │63 │64 │65 │66 │67 │68 │69 │70 │71 │
// │    8    │72 │73 │74 │75 │76 │77 │78 │79 │80 │
// └─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┘