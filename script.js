// Controle do menu mobile
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');

    // Bloquear o scroll quando o menu estiver aberto
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
});

// Fechar menu ao clicar nos links
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// Fechar ao rolar a página
window.addEventListener('scroll', () => {
    if(navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Navegação ativa
// Seleciona todos os links de navegação
const navLinks = document.querySelectorAll('.navlist a');

//  Função para adicionar a classe 'active' no link clicado
function activeLink(){
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

//  Adicioa um evento de clique no link de navegação
navLinks.forEach(item => item.addEventListener('click', activeLink));


// Alternar modo claro / modo escuro
// Função para alterar entre os temas
function toggleMode() {
    const html = document.documentElement;
    html.classList.toggle('light');

    // Salva o tema escolhido no LocalStorage
    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    // Alterar aparência do título
    updateTextColor();
}

// Função que altera a cor do texto de acordo com o tema
function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}

// Carrega o tema salvo no LocalStorage ao carregar a página
const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light');
}

// Animação de título principal
//  Seleciona o elemento 'título' e define as variáveis para animação
const titleElement = document.querySelector('#name');
const text = "LAÍS";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

// função para animar o texto (digitnado e apagando)
function animateText() {
    if(isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index + 1);
            index ++;
        } else {
            isTyping = false;
        }
    } else {
        if (index > 1) {
            titleElement.textContent = text.slice(0, index - 1);
            index --;
        } else {
            isTyping = true;
            // alterna a cor entre preto e laranja
            currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff') ? '#db79df' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animateText, 300);
}

// Inicia a animação quando carregar a página

function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}

document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();


// ANIMAÇÃO DA SEÇÃO HOME
// Seleciona a seção home e aplica uma animação de fade-in
const homeSection = document.querySelector('#home');
homeSection.style.opacity = '0';
homeSection.style.transform = 'translateY(200px)';
homeSection.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(() => {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
}, 100);

// Animação da seções 
// Seleciona as animações e aplica 'fade-in' ao atualizar
const sections = document.querySelectorAll('section');

sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, trnasform 1s';

    //  Aplica diferente transformações de acordo com o índice da seção 
    if (index !== 0){
        if(index === 1) section.style.transform = 'translateY(100px)';
        else if (index === 2) section.style.transform = 'scale(0.8)';
        else if (index === 3) section.style.tranform = 'rotateY(90deg)';
    } 
});

// Observar para animar as seções ao rolar a página
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
        }
    });
});

// Observa cada seção para aplicar a animação 
sections.forEach((section) => observer.observe(section));

// BOTÃO DE VOLTAR AO TOPO
// Adiciona um evento de clique ao botão de voltar ao topo
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // rola suavemente para o topo da página 
});

// CARROSSEL DE PROJETOS
// Seleciona os elementos do carrossel
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let autoSlideInterval;

//  Função de exibir o slide atual
function showSlide(slideIndex) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });

    // Ajusta o índice do slide para garantir que ele esteja dentro dos limites
    if (slideIndex < 0) currentSlide = slide.length - 1;
    else if (slideIndex >= slides.length) currentSlide = 0;
    else currentSlide = slideIndex;
    
    // Exibe o slide atual
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';
    updateSlidePosition();
}

// Função para atualizar a posição do carrossel
function updateSlidePosition(){
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Função para avançar para o próximo slide
function nextSlide(){
    showSlide(currentSlide + 1);
    resetAutoSlide(); // Reinicia o intervalo de transição automática
} 

// Função para voltar para o slide anterior
function prevSlide(){
    showSlide(currentSlide - 1);
    resetAutoSlide(); // Reinicia o intervalo de transição automática
} 

// Função para iniciar a transição automática dos slides
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); //avança o slide a cada 5 seg
}

// Função para reiniciar a transição automática
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Adiciona eventos de clique aos botões de navegação do carrossel
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

//  Inicializa o carrossel ao carregar a página 
window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    // Atualiza a posição do carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

// Pausa a transição automática ao passar o mouse sobre o carrossel
carouselSlides.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Retoma a transição automática ao remover o mouse do carrossel
carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);

// FORMULÁRIO DE CONTATO
// Seleciona o formulário de contato e a mensagem de agradecimento 
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// Adiciona um evento de envio ao formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thankYouMessage.style.display = 'block'; //Exibe a mensagem de agradecimento

    // Envia os dados do formulário usando Fetch API
    const formData = new FormData(contactForm);
    fetch(contactForm.ariaDescription, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok){
            setTimeout(() => window.location.reload(), 2000); // Recarrega a página após 2 seg
        } else {
            alert('Erro ao enviar formulário. Tente novamente.');
        }
    })
    .catch(() => alert('Erro na conexão. Tente novamente'));
});


// ANIMAÇÃO DA SEÇÃO 'SOBRE MIM'
// Seleciona a seção 'Sobre mim'

const aboutSection = document.querySelector('.about');

// Função para verificar se a seção está visivel na tela
function checkAboutVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Verifica se a seção está dentro da área visível da tela
    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('visible'); // Adiciona a classe "visible"
        window,removeEventListener('scroll', checkAboutVisibility); // Remove o listener após a animação
    }
}

//  Adiciona um listener para o evento de scroll
window.addEventListener('scroll', checkAboutVisibility);

// Verifica a visibilidade ao carregar a página (caso a seção já esteja visível)
checkAboutVisibility(); 