document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const isMobile = window.innerWidth <= 1100;
    let openDropdown = null;

    // Adiciona estilos para remover qualquer transição/rotação
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @media (max-width: 1100px) {
            .dropdown-btn i {
                transition: none !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    function isMobileView() {
        return window.innerWidth <= 1100;
    }

    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.style.display = 'none';
            }
        });
    }

    function setupMobileDropdowns() {
        let openDropdown = null;
        
        const dropdownBtns = document.querySelectorAll('.nav-link.dropdown-btn');
        
        // Remove event listeners anteriores
        dropdownBtns.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });
        
        // Adiciona novos event listeners
        document.querySelectorAll('.nav-link.dropdown-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownId = this.getAttribute('data-dropdown');
                const dropdownContent = document.getElementById(dropdownId);
                
                if (dropdownContent) {
                    if (openDropdown === dropdownContent) {
                        dropdownContent.style.display = 'none';
                        this.classList.remove('active');
                        openDropdown = null;
                    } else {
                        if (openDropdown) {
                            openDropdown.style.display = 'none';
                            document.querySelectorAll('.nav-link.dropdown-btn').forEach(b => b.classList.remove('active'));
                        }
                        
                        dropdownContent.style.display = 'block';
                        this.classList.add('active');
                        openDropdown = dropdownContent;
                    }
                }
            });
        });
    }

    function setupDesktopDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 1100) {
                    const content = dropdown.querySelector('.dropdown-content');
                    content.style.display = 'block';
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 1100) {
                    const content = dropdown.querySelector('.dropdown-content');
                    content.style.display = 'none';
                }
            });
        });
    }

    function setupDropdowns() {
        // Remove todos os event listeners anteriores
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.dropdown-btn');
            const newBtn = btn?.cloneNode(true);
            if (btn && newBtn) {
                btn.parentNode.replaceChild(newBtn, btn);
            }
        });

        // Configura os novos event listeners
        if (isMobileView()) {
            setupMobileDropdowns();
        } else {
            setupDesktopDropdowns();
        }
    }

    // Configuração inicial
    setupDropdowns();

    // Gerenciamento de redimensionamento
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            closeAllDropdowns();
            setupDropdowns();
        }, 250);
    });

    // Fecha dropdowns ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    // Menu mobile
    menuIcon?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Controle do ícone de pesquisa
    searchIcon?.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        navLinks.classList.remove('active');
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

    // DESKTOP (> 1100px)
    if (window.innerWidth > 1100) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const content = dropdown.querySelector('.dropdown-content');
            const icon = dropdown.querySelector('.dropdown-btn i');
            
            // Hover para abrir/fechar
            dropdown.addEventListener('mouseenter', () => {
                content.style.display = 'block';
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                content.style.display = 'none';
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // MOBILE (≤ 1100px)
    else {
        const dropdownBtns = document.querySelectorAll('.nav-link.dropdown-btn');
        let openDropdown = null; // Mantém registro do dropdown aberto
        
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Só executa em mobile
                if (window.innerWidth > 1100) return;
                
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownId = this.getAttribute('data-dropdown');
                const dropdownContent = document.getElementById(dropdownId);
                
                // Se clicou no mesmo que está aberto, fecha
                if (openDropdown === dropdownContent) {
                    dropdownContent.style.display = 'none';
                    this.classList.remove('active');
                    openDropdown = null;
                }
                // Se clicou em um novo, fecha o anterior e abre o novo
                else {
                    // Fecha o anterior se existir
                    if (openDropdown) {
                        openDropdown.style.display = 'none';
                        dropdownBtns.forEach(b => b.classList.remove('active'));
                    }
                    
                    // Abre o novo
                    dropdownContent.style.display = 'block';
                    this.classList.add('active');
                    openDropdown = dropdownContent;
                }
            });
        });
        
        // Fecha ao clicar fora
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1100 && openDropdown && !e.target.closest('.dropdown-btn')) {
                openDropdown.style.display = 'none';
                dropdownBtns.forEach(btn => btn.classList.remove('active'));
                openDropdown = null;
            }
        });
    }
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

document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    console.log('Encontrou botões:', dropdownBtns.length);
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Só executa em mobile
            if (window.innerWidth > 1100) return;
            
            const content = this.nextElementSibling;
            const chevron = this.querySelector('.fa-chevron-down');
            
            // Toggle do atual
            if (content.classList.contains('show')) {
                // Se está aberto, fecha
                content.classList.remove('show');
                this.classList.remove('active');
                chevron.style.transform = 'rotate(0deg)'; // Aponta para baixo
            } else {
                // Fecha todos os outros primeiro
                dropdownBtns.forEach(otherBtn => {
                    if (otherBtn !== this) {
                        otherBtn.nextElementSibling.classList.remove('show');
                        otherBtn.classList.remove('active');
                        const otherChevron = otherBtn.querySelector('.fa-chevron-down');
                        if (otherChevron) {
                            otherChevron.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Abre o atual
                content.classList.add('show');
                this.classList.add('active');
                chevron.style.transform = 'rotate(180deg)'; // Aponta para cima
            }
        });
    });
    
    // Fecha ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-btn') && window.innerWidth <= 1100) {
            console.log('Clicou fora');
            dropdownBtns.forEach(btn => {
                btn.nextElementSibling.classList.remove('show');
                btn.classList.remove('active');
                const chevron = btn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                    console.log('Resetando chevron ao clicar fora');
                }
            });
        }
    });
});