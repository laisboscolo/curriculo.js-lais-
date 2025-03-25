// Controle do menu mobile
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

// adicionar evento ao meu menu-icon

menuIcon.addEventListener('click',() => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');

    // Bloquear o scroll quando o menu estiver aberto
    document.body.style.overflow = navList.classLiist.contains('open') ?
    'hiden' : 'auto';
});

// Fechar menu ao clicar nos links
document.querySelectorAll('.navlist a').forEach(link=> {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// fechar ao rolar a página
window.addEventListener('scroll', () => {
    if(navList.classList.contains('open')){
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// hoover nav / aparecer a cor e ficar selecionada quando clicar em um id da nav
// ===== Navegaçao ativa ===/ links que fica com corzinha na nav
// seleciona todos os links de navegação
const navLinks = document.querySelectorAll('.navlist a');

// funçao para adicionar a classe 'active' no link clicado
function activeLink(){
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

// adiciona um evento de clique no link de navegação / forEach= para cada
navLinks.forEach(item => item.addEventListener('click', activeLink));

// botao modo claro e modo escuro
// ==== Alternar modo claro / modo escuro
// funçao para alterar entre os temas
function toggleMode(){
    // elemento dentro do meu documento
    const html = document.documentElement;
    html.classList.toggle('light');

    // salva o tema escolhido no LocalStorage= armazenamento local
    // vou procura no meu html aonde tem o light e vai armazenar
    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    // alterar aparencia do titulo
    // funçao de mudar a cor do texto = updateTextColor();
    updateTextColor();

}

// funçao que altera a cor do texto de acordo com o tema /TEM QUE ESTAR FORA DO TOGGLEMODE
function updateTextColor(){
    currentColor = document.documentElement.classList.contains('light') ?
    'black' : '#fff';
    titleElement.style.color = currentColor;
}

// carrega o tema salvo no LocalStorage ao carregar a página
// tudo dps de const e constante
const savedTheme = localStorage.getItem('theme');
if (savedTheme){
    document.documentElement.classList.toggle('light', savedTheme === 
    'light');
}

// ==== animaçao do titulo principal
// seleciona o elemento 'titulo' e define as variáveis para animação
const titleElement = document.querySelector('#name');
const text = "Laís";
let index = 0;
let isTyping = true;
// cor atual
let currentColor = document.documentElement.classList.contains('light') ?
'black' : '#fff';

// funçao para animar o titulo( digitando e apagando)
// funçao texto animado
function animateText(){
    // se
    if(isTyping){
        // if dentro do if
        if(index < text.leght){
            // slice = fatiar = dividir
            titleElement.textContent = text.slice(0, index + 1);
            index ++;
        }else {
            isTyping = false;
        }
    } else {
        // esse index e uma variavel que atribuimos e tem valor 0
        if (index > 1){
            titleElement.textContent = text.slice(0, index -1);
            index --;
        } else {
            isTyping = true;
            // alterna a cor entre preto e laranja
            currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff') ? '#c94c16' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animateText, 300);
}

// inicia a animaçao quando carregar a página
document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();




