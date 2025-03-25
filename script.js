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
// Animação do título principal
const titleElement = document.querySelector('#name');
const text = "Laís";  // Nome a ser animado
let index = 0;
let isTyping = true;

// Cor atual
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

// Função para animar o título (digitando e apagando)
function animateText() {
    if (isTyping) {
        if (index < text.length) {  
            titleElement.textContent = text.slice(0, index + 1);
            index++;
        } else {
            isTyping = false;
        }
    } else {
        if (index > 0) {
            titleElement.textContent = text.slice(0, index - 1);
            index--;
        } else {
            isTyping = true;
            // Alterna a cor entre preto (ou branco) e laranja
            const isLightMode = document.documentElement.classList.contains('light');
            currentColor = currentColor === (isLightMode ? 'black' : '#fff') ? '#c94c16' : (isLightMode ? 'black' : '#fff');
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animateText, 300);  // Intervalo de animação
}

// Inicia a animação quando carregar a página
document.addEventListener('DOMContentLoaded', animateText);



// funçao para atualizar a cor do texto do titulo com base no tema
function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}
// inicia a animaçao do titulo ao carregar a  página
document.addEventListener('DOMContentLoaded', animateText);


// animaçao seçao home
const homeSection = document.querySelector('#home');
homeSection.style.opacity = '0';
homeSection.style.transform = 'translateY(20px)';
homeSection.style.transition = 'opscity 1s ease, transform 1s ease';

setTimeout(() => {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
}, 100);

// animaçao seçoes
const sections = document.querySelectorAll('section');

sections.forEach((section,index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, transform 1s';

    // aplica diferentes transformaçoes com base no indice da seçao
    if (index!== 0 ) {
            if(index === 1) section.style.transform = 'translateY(100px)';
            else if (index === 2) section.style.transform = 'scale(0.8)';
            else if (index === 3) section.style.transform = 'rotateY(90deg)';
        }
    });

    // observar para animar as seçoes ao rolar a página
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
            }
        });
    });

    // observa cada seçao para aplicar a animaçao
    sections.forEach((section) => observer.observe(section));

// botao de voltar ao topo
// adiciona um evento de clique ao botao de voltar ao topo
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior:'smooth'}); //rola suavimente para o topo da pagina
});

// carrossel de projetos
// seleciona os elementos do carrossel
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelector('.carousel-button.prev');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let autoSlideInterval;

// funçao para exibir o slide atual
function showSlide(slideIndex) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });

    // ajusta o indice do slide para garantir que ele esteja dentro dos limites
    if (slideIndex < 0) currentSlide = slides.length - 1;
    else if (slideIndex >= slides.legth) currentSlide = 0;
    else currentSlide = slideIndex;

    // exibe slide atual
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';
    updateSlidesPosition();
}

// funçao para atualizar a posiçao do carrossel
function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = 'translateX(-${currentSlide * slideWidth}px)';
}

// funçao para avançar para o proximo slide
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide();
}

// funçao para voltar ao slide anterior
function prevSlide(){
    showSlide(currentSlide -1);
    resetAutoSlide();
}

// funçao para iniciar a transiçao automatica dos slides
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// funçao para reiniciar a transiçao automática
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// adiciona eventos de clique aos botoes de navegaçao do carrossel
nextButton.addEventListener('click, nextSlide');
prevButton.addEventListener('click', prevSlide);

// Inicializa o carrossel ao carregar a página
window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    // atualiza a posiçao do carrosel ao redimensionar a janela
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

// Pausa a transiçao automatica ao passar o mouse sobre o carrossel
carouselSlides.parentElement.addEventListener('mouseenter', () =>{
    clearInterval(autoSlideInterval);
});

// retoma a transiçao automática ao remover o mouse do carrossel 
carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);

// FORMULARIO DE CONTATO
// seleciona o formulario de contato e a mensagem de agradecimento
const contactForm = focument.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// adiciona um evento de envio ao formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thankYouMessage.style.display = 'block'; // exibe mensagem de agradecimento

    // envia os dados do formulario usado Fetch API
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method:'POST',
        body: formData,
        headers: {'Accept': 'application/json' }
    })
    .then(response => {
        if(response.ok) {
            setTimeout(() => window.location.reload(), 2000);
        } else {
            alert ('Erro ao enviar formulário. Tente novamente.');
        }
    })
    .catch(() => alert('Erro na conexão. Tente novamente.'));
});

// ANIMAÇAO DA SEÇAO "SOBRE MIM"
// seleciona a seçao "sobre mim"
const aboutSection = document.querySelector('.about');

// funçao para verificar se a seçao está visivel na tela
function checkAbouVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Verifica se a seçao está dentro da area visivel da tela
    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('Visible'); //adiciona a classe "visible"
        window.removeEventListener('scroll', checkAboutVisibility); //remove o listener após a animaçao
    }
}

// Adiciona um listener para o evento scroll
window.addEventListener('scroll', checkAboutVisibility);

// verifica a visibilidade ao carregar a página (caso a seçao ja esteja visivel)
checkAbouVisibility();

