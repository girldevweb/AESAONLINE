document.addEventListener('DOMContentLoaded', () => {
    const livros = [
        { id: 1, titulo: "A Oração na Bíblia", autor: "Maria José A. Elias", imagem: "images/livros/Oracao.jpg", categoria: "Oração" },
        { id: 2, titulo: "O Deus Presente", autor: "Maria José A. Elias", imagem: "images/livros/O Deus Presente.jpg", categoria: "Espiritualidade" },
        { id: 3, titulo: "A Família do Pastor e a Igreja", autor: "Maria José A. Elias", imagem: "images/livros/A Familia do Pastor.jpg", categoria: "Família" },
        { id: 4, titulo: "Passos pelo caminho", autor: "Maria José A. Elias", imagem: "images/livros/Passos.jpg", categoria: "Vida Cristã" },
        { id: 5, titulo: "Propostas Bíblicas para a Liderança Cristã", autor: "Maria José A. Elias", imagem: "images/livros/Propostas.jpg", categoria: "Liderança" },
        { id: 6, titulo: "Sucata de Lembranças", autor: "Maria José A. Elias", imagem: "images/livros/Sucata.jpg", categoria: "Poesia" },
        { id: 7, titulo: "Pescadores de Homens", autor: "Maria José A. Elias e Pr. Odélio Hertz", imagem: "images/livros/Pescadores.jpg", categoria: "Evangelismo" },
        { id: 8, titulo: "Cantigas para o meu Deus", autor: "Maria José A. Elias", imagem: "images/livros/Cantigas.jpg", categoria: "Poesia" },
        { id: 9, titulo: "Testemunhos Vivos", autor: "Rev. Antônio Elias", imagem: "images/livros/Testemunhos.jpg", categoria: "Testemunhos" },
        { id: 10, titulo: "Família em Foco", autor: "Maria José A. Elias", imagem: "images/livros/Familia em Foco.jpg", categoria: "Família" },
        { id: 11, titulo: "Era sem forma e vazia...", autor: "Maria José A. Elias", imagem: "images/livros/Era Sem Forma.jpg", categoria: "Estudo Bíblico" },
        { id: 12, titulo: "Água feita vinho", autor: "Maria José A. Elias e Rev. Antônio Elias", imagem: "images/livros/Agua feita.jpg", categoria: "Estudo Bíblico" },
        { id: 13, titulo: "O teu Deus, onde está?", autor: "Maria José A. Elias", imagem: "images/livros/O teu Deus.jpg", categoria: "Espiritualidade" },
        { id: 14, titulo: "Sementeira da Palavra", autor: "Rev. Antônio Elias", imagem: "images/livros/Sementeira.jpg", categoria: "Sermões" },
        { id: 15, titulo: "Cartas de Amor", autor: "Maria José A. Elias e Rev. Antônio Elias", imagem: "images/livros/Cartas de Amor.jpg", categoria: "Testemunhos" }
    ];

    const livrosContainer = document.getElementById('livros-container');
    const categoriasLinks = document.querySelectorAll('.categorias-conteudo a');
    const categoriasBotao = document.querySelector('.categorias-btn');
    const categoriasConteudo = document.querySelector('.categorias-conteudo');

    // Adiciona toggle ao botão de categorias e ao conteúdo
    categoriasBotao.addEventListener('click', () => {
        categoriasConteudo.style.display = categoriasConteudo.style.display === 'block' ? 'none' : 'block';
    });

    categoriasConteudo.addEventListener('click', () => {
        categoriasConteudo.style.display = 'none';
    });

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
            categoriasConteudo.style.display = 'none';
        });
    });

    // Fecha o dropdown quando clicar fora dele
    document.addEventListener('click', (e) => {
        if (!categoriasBotao.contains(e.target) && !categoriasConteudo.contains(e.target)) {
            categoriasConteudo.style.display = 'none';
        }
    });

    // Exibir todos os livros inicialmente
    exibirLivros(livros);
});