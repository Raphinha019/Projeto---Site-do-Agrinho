// ==========================================================================
// 1. MENU RESPONSIVO (MOBILE)
// ==========================================================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

// Abre/fecha o menu de celular ao clicar no botão hamburguer
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Fecha o menu automaticamente quando o usuário clica em qualquer link dele
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});


// ==========================================================================
// 2. BANCO DE DADOS DO JOGO (PERGUNTAS, RESPOSTAS E EXPLICAÇÕES)
// ==========================================================================
const perguntas = [
    {
        texto: "Queimar a palha e o resto das plantas que sobraram da colheita para limpar o terreno rapidamente.",
        correta: false, // false significa "Errado"
        icone: "fa-fire-alt",
        explicacao: "A queimada destrói os nutrientes do solo, elimina microrganismos benéficos e polui o ar. O correto é manter a cobertura vegetal!"
    },
    {
        texto: "Usar Drones e Sensores avançados para mapear quais áreas da plantação estão realmente sofrendo com pragas.",
        correta: true, // true significa "Certo"
        icone: "fa-drone",
        explicacao: "Isso permite aplicar defensivos agrícolas cirurgicamente, apenas onde é necessário. Economiza recursos e preserva o meio ambiente!"
    },
    {
        texto: "Retirar árvores e vegetação nativa das margens de rios e nascentes da fazenda para expandir a área de plantio.",
        correta: false,
        icone: "fa-water",
        explicacao: "Sem a Mata Ciliar, as margens desmoronam nos rios (assoreamento), reduzindo drasticamente a quantidade e qualidade da água da região."
    },
    {
        texto: "Utilizar o manejo do Solo através do Plantio Direto (plantar as novas sementes diretamente sob a palha da colheita anterior).",
        correta: true,
        icone: "fa-seedling",
        explicacao: "Esta técnica fantástica evita a erosão do solo, mantém a umidade natural da terra e reduz bastante a necessidade de irrigação."
    }
];

// ==========================================================================
// 3. VARIÁVEIS DE CONTROLE DO ESTADO DO JOGO
// ==========================================================================
let indiceAtual = 0;
let pontuacao = 0;

// Elementos das Telas
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaFeedback = document.getElementById('tela-feedback');
const telaFinal = document.getElementById('tela-final');

// Elementos de Conteúdo Dinâmico
const cardAgro = document.getElementById('card-agro');
const cardTexto = document.getElementById('card-texto');
const cardFaIcon = document.getElementById('card-fa-icon');
const perguntaAtualElement = document.getElementById('pergunta-atual');
const pontosAtualElement = document.getElementById('pontos-atual');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackTexto = document.getElementById('feedback-texto');
const pontuacaoFinalElement = document.getElementById('pontuação-final');
const mensagemFinalElement = document.getElementById('mensagem-final');

// Botões de Interação
const btnIniciar = document.getElementById('btn-iniciar');
const btnCerto = document.getElementById('btn-certo');
const btnErrado = document.getElementById('btn-errado');
const btnAvancar = document.getElementById('btn-avancar');
const btnReiniciar = document.getElementById('btn-reiniciar');


// ==========================================================================
// 4. FUNÇÕES DE FLUXO DO JOGO
// ==========================================================================

// Alterna a exibição entre as telas do contêiner do jogo
function mudarTela(telaAtiva) {
    [telaInicial, telaJogo, telaFeedback, telaFinal].forEach(tela => {
        tela.classList.remove('active');
    });
    telaAtiva.classList.add('active');
}

// Inicia a partida zerando as variáveis de controle
function iniciarJogo() {
    indiceAtual = 0;
    pontuacao = 0;
    pontosAtualElement.textContent = pontuacao;
    carregarCard();
    mudarTela(telaJogo);
}

// Atualiza o texto e os ícones do card com base na pergunta atual
function carregarCard() {
    // Reseta classes de animação de saída que foram adicionadas antes
    cardAgro.className = 'card-agro'; 
    
    const dadosPergunta = perguntas[indiceAtual];
    cardTexto.textContent = dadosPergunta.texto;
    perguntaAtualElement.textContent = indiceAtual + 1;
    
    // Altera dinamicamente a classe do ícone do FontAwesome
    cardFaIcon.className = `fa-solid ${dadosPergunta.icone}`;
}

// Processa a resposta dada pelo usuário (clique no botão Certo ou Errado)
function processarResposta(respostaUsuario) {
    const dadosPergunta = perguntas[indiceAtual];
    const acertou = (respostaUsuario === dadosPergunta.correta);

    // Dispara a animação visual de arrastar o card
    if (respostaUsuario === true) {
        cardAgro.classList.add('swipe-right'); // Arrastou para a direita (Certo)
    } else {
        cardAgro.classList.add('swipe-left');  // Arrastou para a esquerda (Errado)
    }

    // Aguarda o término da animação do card (300ms) para mostrar a tela de feedback explicativa
    setTimeout(() => {
        if (acertou) {
            pontuacao++;
            pontosAtualElement.textContent = pontuacao;
            feedbackStatus.textContent = "🏆 Você Acertou!";
            feedbackStatus.className = "status-sucesso";
        } else {
            feedbackStatus.textContent = "❌ Prática Incorreta!";
            feedbackStatus.className = "status-erro";
        }

        feedbackTexto.textContent = dadosPergunta.explicacao;
        mudarTela(telaFeedback);
    }, 350);
}

// Avança para o próximo card da lista ou finaliza a rodada
function avancarJogo() {
    indiceAtual++;
    
    if (indiceAtual < perguntas.length) {
        carregarCard();
        mudarTela(telaJogo);
    } else {
        finalizarJogo();
    }
}

// Exibe a tela final com pontuação estruturada e mensagem motivacional personalizada
function finalizarJogo() {
    pontuacaoFinalElement.textContent = pontuacao;
    
    if (pontuacao === perguntas.length) {
        mensagemFinalElement.innerHTML = "Excelente! Você é um <strong>Mestre do Agro Sustentável</strong>. Sabe exatamente como manter o agro forte protegendo o futuro!";
    } else if (pontuacao >= perguntas.length / 2) {
        mensagemFinalElement.innerHTML = "Muito bom! Você entende os conceitos básicos, mas lembre-se: a tecnologia e a responsabilidade precisam estar em 100% das nossas ações.";
    } else {
        mensagemFinalElement.innerHTML = "Que tal estudar mais um pouco sobre o tema? O futuro do nosso planeta depende de entendermos práticas agrícolas responsáveis.";
    }
    
    mudarTela(telaFinal);
}


// ==========================================================================
// 5. MAPEAMENTO DOS EVENTOS DE CLIQUE DOS BOTÕES
// ==========================================================================
btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', iniciarJogo);
btnAvancar.addEventListener('click', avancarJogo);

// Botão "Certo" representa o valor lógico TRUE
btnCerto.addEventListener('click', () => processarResposta(true));

// Botão "Errado" representa o valor lógico FALSE
btnErrado.addEventListener('click', () => processarResposta(false));