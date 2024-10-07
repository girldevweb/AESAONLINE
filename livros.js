document.addEventListener('DOMContentLoaded', () => {
    const livros = [
        { id: 1, titulo: "A Oração na Bíblia", autor: "Maria José A. Elias", imagem: "images/oracao-na-biblia-1.jpg", categoria: "Oração" },
        { id: 2, titulo: "O Deus Presente", autor: "Maria José A. Elias", imagem: "images/o-Deus-presente-1.jpg", categoria: "Espiritualidade" },
        { id: 3, titulo: "A Família do Pastor e a Igreja", autor: "Maria José A. Elias", imagem: "images/a-familia-do-pastor-1.jpg", categoria: "Família" },
        { id: 4, titulo: "Passos pelo caminho", autor: "Maria José A. Elias", imagem: "images/passos-do-caminho-1.jpg", categoria: "Vida Cristã" },
        { id: 5, titulo: "Propostas Bíblicas para a Liderança Cristã", autor: "Maria José A. Elias", imagem: "images/propostas-biblicas-1.jpg", categoria: "Liderança" },
        { id: 6, titulo: "Sucata de Lembranças", autor: "Maria José A. Elias", imagem: "images/sucata-de-lembrancas-1.jpg", categoria: "Poesia" },
        { id: 7, titulo: "Pescadores de Homens", autor: "Maria José A. Elias e Pr. Odélio Hertz", imagem: "images/pescadores-de-homens-1.jpg", categoria: "Evangelismo" },
        { id: 8, titulo: "Cantigas para o meu Deus", autor: "Maria José A. Elias", imagem: "images/cantigas-para-o-meu-Deus-1.jpg", categoria: "Poesia" },
        { id: 9, titulo: "Testemunhos Vivos", autor: "Rev. Antônio Elias", imagem: "images/testemunhos-vivos-1.png", categoria: "Testemunhos" },
        { id: 10, titulo: "Família em Foco", autor: "Maria José A. Elias", imagem: "images/familia-em-foco-1.jpg", categoria: "Família" },
        { id: 11, titulo: "Era sem forma e vazia...", autor: "Maria José A. Elias", imagem: "images/era-sem-forma-1.jpg", categoria: "Estudo Bíblico" },
        { id: 12, titulo: "Água feita vinho", autor: "Maria José A. Elias e Rev. Antônio Elias", imagem: "images/agua-feita-vinho-1.jpg", categoria: "Estudo Bíblico" },
        { id: 13, titulo: "O teu Deus, onde está?", autor: "Maria José A. Elias", imagem: "images/o-teu-Deus-onde-esta-1.jpg", categoria: "Espiritualidade" },
        { id: 14, titulo: "Sementeira da Palavra", autor: "Rev. Antônio Elias", imagem: "images/sementeira-da-palavra-1.jpg", categoria: "Sermões" },
        { id: 15, titulo: "Cartas de Amor", autor: "Maria José A. Elias e Rev. Antônio Elias", imagem: "images/cartas-de-amor-1.jpg", categoria: "Testemunhos" }
    ];

    const livrosContainer = document.getElementById('livros-container');
    const categoriasLinks = document.querySelectorAll('.categorias-conteudo a');
    const categoriasBotao = document.querySelector('.categorias-btn');

    function exibirLivros(livrosFiltrados) {
        livrosContainer.innerHTML = '';
        livrosFiltrados.forEach(livro => {
            const livroElement = document.createElement('div');
            livroElement.className = 'livro-item';
            livroElement.innerHTML = `
                <div class="livro-imagem">
                    <img src="${livro.imagem}" alt="${livro.titulo}">
                    <a href="livro.html?id=${livro.id}" class="ver-livro">Ver Livro</a>
                </div>
                <h3 class="livro-titulo">${livro.titulo}</h3>
                <p class="livro-autor">${livro.autor}</p>
            `;
            livrosContainer.appendChild(livroElement);
        });
    }

    function filtrarLivros(categoria) {
        if (categoria === 'Todos') {
            return livros;
        } else {
            return livros.filter(livro => livro.categoria === categoria);
        }
    }

    categoriasLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoriaSeleccionada = e.target.textContent;
            const livrosFiltrados = filtrarLivros(categoriaSeleccionada);
            exibirLivros(livrosFiltrados);
            
            categoriasBotao.textContent = categoriaSeleccionada;
            categoriasBotao.appendChild(document.createElement('i')).className = 'fas fa-chevron-down';
        });
    });

    // Exibir todos os livros inicialmente
    exibirLivros(livros);
});