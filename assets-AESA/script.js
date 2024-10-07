document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Controle do ícone do menu (abrir/fechar)
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        searchContainer.classList.remove('active');
        menuIcon.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Controle do ícone de pesquisa (abrir/fechar)
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        navLinks.classList.remove('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Controle dos dropdowns
    dropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector('.dropdown-btn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        // Evento de mouseover no botão do dropdown
        dropdownBtn.addEventListener('mouseover', (e) => {
            e.preventDefault();
            
            // Fecha todos os outros dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.querySelector('.dropdown-content').classList.remove('active');
                    d.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
                }
            });

            // Abre o dropdown atual
            dropdownContent.classList.add('active');
            dropdownBtn.setAttribute('aria-expanded', 'true');
        });

        // Evento de mouseleave no li que contém o dropdown
        dropdown.addEventListener('mouseleave', () => {
            dropdownContent.classList.remove('active');
            dropdownBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Função de busca
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            const sections = document.querySelectorAll('main section');
            let found = false;

            sections.forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                if (sectionText.includes(searchTerm)) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    found = true;
                    return;
                }
            });

            if (!found) {
                alert('Nenhum resultado encontrado para: ' + searchTerm);
            }
        }
        searchContainer.classList.remove('active');
    }

    // Animação de fade-in para as seções
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Animação de entrada para os livros
    const books = document.querySelectorAll('.book');
    const bookOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const bookAppearOnScroll = new IntersectionObserver((entries, bookAppearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                bookAppearOnScroll.unobserve(entry.target);
            }
        });
    }, bookOptions);

    books.forEach(book => {
        bookAppearOnScroll.observe(book);
    });

    // Função para animar elementos nas páginas de biografia
    function animateElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideLeftElements = document.querySelectorAll('.slide-in-left');
        const slideRightElements = document.querySelectorAll('.slide-in-right');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => observer.observe(el));
        slideLeftElements.forEach(el => observer.observe(el));
        slideRightElements.forEach(el => observer.observe(el));
    }

    // Verificar se estamos em uma página que precisa de animações
    if (document.querySelector('.maria-jose-hero') || document.querySelector('.antonio-elias-hero') || document.querySelector('.historia-casal-hero')) {
        animateElements();
    }

    // Carrossel de livros
    const swiper = new Swiper('.book-carousel', {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 2,
            },
        }
    });
});

// PÁGINA SERMÕES
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = new Audio();
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const autoPlayBtn = document.getElementById('auto-play');
    const progressBar = document.querySelector('.progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');
    const sermaoAtual = document.getElementById('sermao-atual');
    const autorAtual = document.getElementById('autor-atual');
    const listaSermoes = document.getElementById('lista-sermoes');
    const sermoes = Array.from(listaSermoes.getElementsByTagName('li'));
    let currentSermonIndex = 0;
    let isAutoPlayOn = false;

    // Função para carregar o sermão atual
    function loadCurrentSermon() {
        const currentSermon = sermoes[currentSermonIndex];
        audioPlayer.src = currentSermon.dataset.audio;
        sermaoAtual.textContent = currentSermon.querySelector('.sermon-title').textContent;
        autorAtual.textContent = currentSermon.dataset.author;
        highlightCurrentSermon();
        
        // Resetar o display de tempo
        currentTimeDisplay.textContent = '0:00';
        totalTimeDisplay.textContent = '0:00';
        
        // Carregar metadados do áudio para obter a duração
        audioPlayer.addEventListener('loadedmetadata', function() {
            totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
            updateSermonDuration(currentSermon, audioPlayer.duration);
        });
    }

    // Função para atualizar a duração do sermão na lista
    function updateSermonDuration(sermonElement, duration) {
        const durationSpan = sermonElement.querySelector('.sermon-duration');
        if (durationSpan) {
            durationSpan.textContent = formatTime(duration);
        }
    }

    // Carregar o primeiro sermão quando a página for carregada
    loadCurrentSermon();

    // Função para tocar/pausar o áudio
    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // Função para ir para o próximo sermão
    function nextSermon() {
        currentSermonIndex = (currentSermonIndex + 1) % sermoes.length;
        loadCurrentSermon();
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    // Função para ir para o sermão anterior
    function prevSermon() {
        currentSermonIndex = (currentSermonIndex - 1 + sermoes.length) % sermoes.length;
        loadCurrentSermon();
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    // Função para alternar o autoplay
    function toggleAutoPlay() {
        isAutoPlayOn = !isAutoPlayOn;
        autoPlayBtn.classList.toggle('active', isAutoPlayOn);
    }

    // Função para atualizar a barra de progresso
    function updateProgressBar() {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        }
    }

    // Função para formatar o tempo
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Função para destacar o sermão atual na lista
    function highlightCurrentSermon() {
        sermoes.forEach((sermon, index) => {
            if (index === currentSermonIndex) {
                sermon.classList.add('active');
            } else {
                sermon.classList.remove('active');
            }
        });
    }

    // Event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextSermon);
    prevBtn.addEventListener('click', prevSermon);
    autoPlayBtn.addEventListener('click', toggleAutoPlay);

    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    audioPlayer.addEventListener('ended', function() {
        if (isAutoPlayOn) {
            nextSermon();
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    listaSermoes.addEventListener('click', function(e) {
        const clickedSermon = e.target.closest('li');
        if (clickedSermon) {
            currentSermonIndex = sermoes.indexOf(clickedSermon);
            loadCurrentSermon();
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });

    // Carregar duração para todos os sermões
    sermoes.forEach(sermon => {
        const tempAudio = new Audio(sermon.dataset.audio);
        tempAudio.addEventListener('loadedmetadata', function() {
            updateSermonDuration(sermon, tempAudio.duration);
        });
    });

    // Adicione estas novas variáveis e funções
    const pesquisaInput = document.getElementById('pesquisa-sermao');
    const btnPesquisa = document.getElementById('btn-pesquisa');

    function pesquisarSermoes() {
        const termoPesquisa = pesquisaInput.value.toLowerCase();
        sermoes.forEach(sermao => {
            const titulo = sermao.querySelector('.sermon-title').textContent.toLowerCase();
            if (titulo.includes(termoPesquisa)) {
                sermao.style.display = '';
            } else {
                sermao.style.display = 'none';
            }
        });
    }

    btnPesquisa.addEventListener('click', pesquisarSermoes);
    pesquisaInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            pesquisarSermoes();
        }
    });
});