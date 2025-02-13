document.addEventListener('DOMContentLoaded', () => {
    const livros = [
        {
            id: 1, titulo: "A Oração na Bíblia", autor: "Maria José A. Elias", imagem: "images/livros/Oracao.jpg",
            descricao: "Uma exploração profunda sobre os desafios e recompensas de uma vida de oração baseada nos ensinamentos bíblicos.",
            autorBio: "Maria José A. Elias é uma renomada autora e estudiosa da Bíblia, com mais de 30 anos de experiência em ministério e ensino teológico.",
            paginas: 200, publicado: "10 de janeiro de 2020", editora: "Editora Vida",
            epub: "epubs/a-oracao-na-biblia.epub", pdf: "pdfs/a-oracao-na-biblia.pdf"
        },
        {
            id: 2, titulo: "O Deus Presente", autor: "Maria José A. Elias", imagem: "images/livros/O Deus Presente.jpg",
            descricao: "Uma reflexão sobre a presença constante de Deus em nossas vidas e como podemos reconhecê-la no cotidiano.",
            autorBio: "Maria José A. Elias é conhecida por sua habilidade em conectar as verdades bíblicas com a vida prática dos crentes.",
            paginas: 180, publicado: "15 de março de 2019", editora: "Editora Luz",
            epub: "epubs/o-Deus-presente.epub", pdf: "pdfs/o-Deus-presente.pdf"
        },
        {
            id: 3, titulo: "A Família do Pastor e a Igreja", autor: "Maria José A. Elias", imagem: "images/livros/A Familia do Pastor.jpg",
            descricao: "Um guia prático para pastores e suas famílias navegarem os desafios únicos do ministério.",
            autorBio: "Com décadas de experiência como esposa de pastor, Maria José A. Elias oferece conselhos valiosos para famílias ministeriais.",
            paginas: 220, publicado: "5 de maio de 2018", editora: "Editora Fé",
            epub: "epubs/a-familia-do-pastor-e-a-igreja.epub", pdf: "pdfs/a-familia-do-pastor-e-a-igreja.pdf"
        },
        {
            id: 4, titulo: "Passos pelo caminho", autor: "Maria José A. Elias", imagem: "images/livros/Passos.jpg",
            descricao: "Uma jornada espiritual que guia o leitor através dos passos para uma vida cristã mais profunda e significativa.",
            autorBio: "Maria José A. Elias combina sabedoria bíblica com insights práticos para ajudar os crentes em sua caminhada diária.",
            paginas: 190, publicado: "20 de julho de 2017", editora: "Editora Vida",
            epub: "epubs/passos-pelo-caminho.epub", pdf: "pdfs/passos-pelo-caminho.pdf"
        },
        {
            id: 5, titulo: "Propostas Bíblicas para a Liderança Cristã", autor: "Maria José A. Elias", imagem: "images/livros/Propostas.jpg",
            descricao: "Um estudo aprofundado sobre princípios bíblicos de liderança aplicáveis à igreja moderna.",
            autorBio: "Maria José A. Elias traz anos de observação e estudo para oferecer orientações práticas para líderes cristãos.",
            paginas: 250, publicado: "12 de setembro de 2016", editora: "Editora Luz",
            epub: "epubs/propostas-bibliotecas-para-a-lideranca-cristã.epub", pdf: "pdfs/propostas-bibliotecas-para-a-lideranca-cristã.pdf"
        },
        {
            id: 6, titulo: "Sucata de Lembranças", autor: "Maria José A. Elias", imagem: "images/livros/Sucata.jpg",
            descricao: "Uma coleção de memórias e reflexões pessoais que ilustram a fidelidade de Deus ao longo da vida.",
            autorBio: "Neste livro mais pessoal, Maria José A. Elias compartilha histórias de sua própria jornada de fé.",
            paginas: 170, publicado: "3 de novembro de 2015", editora: "Editora Fé",
            epub: "epubs/sucata-de-lembrancas.epub", pdf: "pdfs/sucata-de-lembrancas.pdf"
        },
        {
            id: 7, titulo: "Pescadores de Homens", autor: "Maria José A. Elias e Pr. Odélio Hertz", imagem: "images/livros/Pescadores.jpg",
            descricao: "Um guia prático para evangelismo eficaz no mundo contemporâneo.",
            autorBio: "Maria José A. Elias colabora com o Pr. Odélio Hertz para oferecer estratégias testadas para alcançar almas para Cristo.",
            paginas: 210, publicado: "8 de fevereiro de 2014", editora: "Editora Vida",
            epub: "epubs/pescadores-de-homens.epub", pdf: "pdfs/pescadores-de-homens.pdf"
        },
        {
            id: 8, titulo: "Cantigas para o meu Deus", autor: "Maria José A. Elias", imagem: "images/livros/Cantigas.jpg",
            descricao: "Uma coleção de poemas e cânticos de louvor que expressam profunda devoção a Deus.",
            autorBio: "Maria José A. Elias revela seu lado poético nesta obra que combina fé e arte.",
            paginas: 150, publicado: "17 de abril de 2013", editora: "Editora Luz",
            epub: "epubs/cantigas-para-o-meu-Deus.epub", pdf: "pdfs/cantigas-para-o-meu-Deus.pdf"
        },
        {
            id: 9, titulo: "Testemunhos Vivos", autor: "Rev. Antônio Elias", imagem: "images/livros/Testemunhos.jpg",
            descricao: "Uma compilação inspiradora de testemunhos de vidas transformadas pelo poder de Deus.",
            autorBio: "Rev. Antônio Elias compartilha histórias poderosas de conversão e renovação espiritual de seu ministério.",
            paginas: 230, publicado: "22 de junho de 2012", editora: "Editora Fé",
            epub: "epubs/Testemunhos Vivos.epub", pdf: "pdfs/testemunhos-vivos.pdf"
        },
        {
            id: 10, titulo: "Família em Foco", autor: "Maria José A. Elias", imagem: "images/livros/Familia em Foco.jpg",
            descricao: "Um guia prático para fortalecer os laços familiares com base em princípios bíblicos.",
            autorBio: "Maria José A. Elias oferece conselhos sábios para casais e pais, baseados em anos de aconselhamento familiar.",
            paginas: 200, publicado: "9 de agosto de 2011", editora: "Editora Vida",
            epub: "epubs/familia-em-foco.epub", pdf: "pdfs/familia-em-foco.pdf"
        },
        {
            id: 11, titulo: "Era sem forma e vazia...", autor: "Maria José A. Elias", imagem: "images/livros/Era Sem Forma.jpg",
            descricao: "Uma exploração profunda da criação e do propósito de Deus para a humanidade.",
            autorBio: "Neste estudo teológico, Maria José A. Elias examina as implicações da doutrina da criação para a vida cristã.",
            paginas: 240, publicado: "14 de outubro de 2010", editora: "Editora Luz",
            epub: "epubs/era-sem-forma-e-vazia.epub", pdf: "pdfs/era-sem-forma-e-vazia.pdf"
        },
        {
            id: 12, titulo: "Água feita vinho", autor: "Maria José A. Elias e Rev. Antônio Elias", imagem: "images/livros/Agua feita.jpg",
            descricao: "Uma análise dos milagres de Jesus e seu significado para os crentes hoje.",
            autorBio: "Maria José A. Elias e Rev. Antônio Elias combinam seus conhecimentos para oferecer insights profundos sobre os milagres bíblicos.",
            paginas: 190, publicado: "30 de janeiro de 2009", editora: "Editora Fé",
            epub: "epubs/agua-feita-vinho.epub", pdf: "pdfs/agua-feita-vinho.pdf"
        },
        {
            id: 13, titulo: "O teu Deus, onde está?", autor: "Maria José A. Elias", imagem: "images/livros/O teu Deus.jpg",
            descricao: "Um estudo sobre a fidelidade de Deus em tempos de crise e dúvida.",
            autorBio: "Maria José A. Elias aborda questões difíceis de fé e oferece esperança para aqueles que lutam com dúvidas.",
            paginas: 180, publicado: "5 de março de 2008", editora: "Editora Vida",
            epub: "epubs/O teu Deus, onde está.epub", pdf: "pdfs/o-teu-Deus-onde-esta.pdf"
        },
        {
            id: 14, titulo: "Sementeira da Palavra", autor: "Rev. Antônio Elias", imagem: "images/livros/Sementeira.jpg",
            descricao: "Uma coleção de sermões poderosos que plantam as sementes da Palavra de Deus nos corações dos leitores.",
            autorBio: "Rev. Antônio Elias compartilha algumas de suas mensagens mais impactantes nesta obra inspiradora.",
            paginas: 220, publicado: "11 de maio de 2007", editora: "Editora Luz",
            epub: "epubs/sSementeira.epub", pdf: "pdfs/Sementeira.pdf"
        },
        {
            id: 15, 
            titulo: "Cartas de Amor", 
            autor: "Maria José A. Elias e Rev. Antônio Elias", 
            imagem: "images/livros/Cartas de Amor.jpg",
            descricao: `Cartas de Amor é uma coletânea de correspondências trocadas entre Maria José e Antônio Elias, dois jovens que se conheceram em circunstâncias incomuns e desenvolveram um relacionamento profundo e sincero através de cartas. O livro narra a história de amor que floresceu entre eles, apesar das barreiras geográficas, sociais e religiosas que enfrentaram. Maria José, uma católica praticante, e Antônio, um missionário presbiteriano, descobriram um amor que transcendeu as diferenças religiosas e os preconceitos da época.

As cartas, escritas entre 1946 e 1949, revelam não apenas o crescimento de seu afeto, mas também suas reflexões sobre fé, vida e futuro. O livro é um testemunho da força do amor, da importância da comunicação e da intervenção divina em suas vidas. Ao longo das páginas, os leitores são convidados a acompanhar a jornada de Maria José e Antônio, desde os primeiros encontros até a decisão de construir uma vida juntos, superando desafios e fortalecendo sua união através da fé e do amor.

"Cartas de Amor" é uma obra que inspira e emociona, mostrando como o amor verdadeiro pode vencer obstáculos e transformar vidas.`,
            autorBio: "Maria José A. Elias e Rev. Antônio Elias abrem seus corações nesta obra íntima e inspiradora.",
            paginas: 192, publicado: "14 de fevereiro de 2006", editora: "Editora Fé",
            epub: "epubs/Cartas de Amor.epub", pdf: "pdfs/cartas.pdf"
        }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const livroId = parseInt(urlParams.get('id'));
    const livro = livros.find(l => l.id === livroId);

    if (livro) {
        document.title = `${livro.titulo} - Detalhes do Livro`;
        document.getElementById('livro-capa').src = livro.imagem;
        document.getElementById('livro-titulo').textContent = livro.titulo;
        document.getElementById('livro-autor').textContent = livro.autor;
        document.getElementById('livro-descricao-texto').textContent = livro.descricao;
        document.getElementById('autor-bio').textContent = livro.autorBio;
        document.getElementById('livro-paginas').textContent = livro.paginas;
        document.getElementById('livro-publicado').textContent = livro.publicado;
        document.getElementById('livro-editora').textContent = livro.editora;

        document.getElementById('baixar-epub').addEventListener('click', () => {
            window.open(livro.epub, '_blank');
        });

        document.getElementById('baixar-pdf').addEventListener('click', () => {
            window.open(livro.pdf, '_blank');
        });

        const audioPlayer = document.getElementById('audio-player');
        const audioElement = document.getElementById('audio-element');
        const audioChapters = document.getElementById('audio-chapters');

        document.getElementById('audio-livro').addEventListener('click', () => {
            audioPlayer.style.display = 'block';
            audioChapters.innerHTML = '';
            ['Capítulo 1', 'Capítulo 2', 'Capítulo 3'].forEach((capitulo, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-play"></i> ${capitulo}`;
                li.addEventListener('click', () => {
                    audioElement.src = `audios/audio${index + 1}.mp3`;
                    audioElement.play();
                    document.querySelectorAll('#audio-chapters li').forEach(item => {
                        item.classList.remove('playing');
                    });
                    li.classList.add('playing');
                });
                audioChapters.appendChild(li);
            });
        });
    } else {
        alert('Livro não encontrado');
        window.location.href = 'livros.html';
    }
});