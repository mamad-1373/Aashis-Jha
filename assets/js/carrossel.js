function carrosselInit() {
    const botaoAnterior = "[data-botao-anterior]";
    const botaoProximo = "[data-botao-proximo]";
    const listaProjetos = "[data-carrossel]";
    const navegacao = "[data-navegacao]";
    const titulo = "[data-projeto='titulo']";
    const link = "[data-projeto='link']";
    const detalhes = "[data-projeto='detalhes']";
    const techs = "[data-projeto='techs']";
    const botaoVisitar = "[data-botao='visitar']";
    const botaoRepositorio = "[data-botao='repositorio']";

    const dados = {
        projetos: [{
                titulo: "Department Website",
                link: "https://blog-pink.netlify.app/",
                repositorio: "https://github.com/PrakasRavichandran/PINK",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "React", "Figma"],
            },
            {
                titulo: "Event Website",
                link: "https://krct-eee.github.io/VOLTRON-2K21/",
                repositorio: "https://github.com/KRCT-EEE/VOLTRON-2K21",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript"],
            },
            {
                titulo: "Auto - Light",
                link: "https://prks10.netlify.app/",
                repositorio: "https://github.com/PrakasRavichandran/repo",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            {
                titulo: "JS Portfolio",
                link: "http://prakashravichandran.me/code/",
                repositorio: "https://github.com/PrakasRavichandran/code",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            {
                titulo: "Smart Classroom",
                link: "http://smartclassroomiot.netlify.app/",
                repositorio: "https://github.com/PrakasRavichandran/SmartClassroom",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            {
                titulo: "Automatic Attendence",
                link: "",
                repositorio: "https://github.com/PrakasRavichandran/RFID",
                detalhes: "",
                techs: ["HTML5", "CSS3"],
            },
            {
                titulo: "Meditation Ap",
                link: "https://meditationapp3.netlify.app/",
                repositorio: "https://github.com/PrakasRavichandran/meditation",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript"],
            },
            {
                titulo: "Multi-Page Portfolio",
                link: "http://prakashravichandran.me/webb/",
                repositorio: "https://github.com/PrakasRavichandran/webb",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            {
                titulo: "Music Player",
                link: "http://prakashravichandran.me/Fav10Songs",
                repositorio: "https://github.com/PrakasRavichandran/Fav10Songs",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript"],
            },
            {
                titulo: "Online Library",
                link: "https://blog-pink.netlify.app/library.html",
                repositorio: "https://github.com/PrakasRavichandran/PINK",
                detalhes: '',
                techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            /*
            {
              titulo: "Pet Planet | Usuário",
              link: "https://petplanet.netlify.app/07-user-page.html/",
              repositorio: "https://github.com/gc-barros/pet-planet",
              detalhes:
                "Páginas internas da clínica Pet Planet, para as quais os usuários seriam direcionados após o login e cadastro, com acesso a telas navegáveis de início, produtos, serviços e agenda (back-end não integrado).",
              techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            */
        ],
    };

    let carrossel = new Carousel(
        botaoAnterior,
        botaoProximo,
        listaProjetos,
        navegacao,
        titulo,
        link,
        detalhes,
        techs,
        dados,
        botaoVisitar,
        botaoRepositorio
    );

    carrossel.preparaSlides();
}

export default carrosselInit;

class Carousel {
    constructor(
        anterior,
        proximo,
        listaProdutos,
        navegacao,
        titulo,
        link,
        detalhes,
        techs,
        dados,
        botaoVisitar,
        botaoRepositorio
    ) {
        this.anterior = document.querySelector(anterior);
        this.proximo = document.querySelector(proximo);
        this.listaProdutos = document.querySelector(listaProdutos);
        this.navegacao = document.querySelector(navegacao);

        this.titulo = document.querySelector(titulo);
        this.link = document.querySelector(link);
        this.detalhes = document.querySelector(detalhes);
        this.techs = document.querySelector(techs);
        this.dados = dados;

        this.botaoVisitar = document.querySelector(botaoVisitar);
        this.botaoRepositorio = document.querySelector(botaoRepositorio);

        this.slides = this.getListaSlides();
        this.indicadores = this.getListaIndicadores();
        this.tamanhoSlide = this.getTamanhoSlide();

        this.indiceDoSlideAtual = 0;

        this.proximo.addEventListener("click", this.proximoSlide.bind(this));
        this.anterior.addEventListener("click", this.slideAnterior.bind(this));

        this.navegacao.addEventListener("click", this.pularParaSlide.bind(this));

        this.preparaSlides();
        this.renderizarDescricao();
    }

    getListaSlides() {
        return Array.from(this.listaProdutos.children);
    }

    getListaIndicadores() {
        return Array.from(this.navegacao.children);
    }

    getTamanhoSlide() {
        return this.slides[0].offsetWidth !== 0 ?
            this.slides[0].offsetWidth :
            this.slides[0].getBoundingClientRect().width;
    }

    getSlideAtual() {
        return this.slides[this.indiceDoSlideAtual];
    }

    proximoSlide() {
        let proximaPosicao = this.indiceDoSlideAtual + 1;
        if (proximaPosicao > this.slides.length - 1) {
            proximaPosicao = 0;
        }

        this.vaParaSlide(proximaPosicao);
    }

    slideAnterior() {
        let posicaoAnterior = this.indiceDoSlideAtual - 1;
        if (posicaoAnterior < 0) {
            posicaoAnterior = this.slides.length - 1;
        }

        this.vaParaSlide(posicaoAnterior);
    }

    getIndiceAtual() {
        return this.indicadores[this.indiceDoSlideAtual];
    }

    vaParaSlide(posicao) {
        const indicadorAtual = this.getIndiceAtual();
        this.indiceDoSlideAtual = posicao;
        const indicadorSelecionado = this.getIndiceAtual();

        this.scrollParaSlide(this.getSlideAtual());
        this.atualizaIndicadores(indicadorAtual, indicadorSelecionado);

        this.renderizarDescricao();
    }

    scrollParaSlide(slideSelecionado) {
        this.listaProdutos.style.transform =
            "translateX(-" + slideSelecionado.style.left + ")";
    }

    atualizaIndicadores(indicadorAtual, indicadorSelecionado) {
        indicadorAtual.classList.remove("carousel__indicador--ativo");
        indicadorSelecionado.classList.add("carousel__indicador--ativo");
    }

    pularParaSlide(evento) {
        if (evento.target === evento.currentTarget) return;

        const indicadorSelecionado = evento.target.getAttribute("data-indicador");
        this.vaParaSlide(parseInt(indicadorSelecionado));
    }

    preparaSlides() {
        if (this.tamanhoSlide != 0) {
            this.slides.forEach((slide, i) => {
                slide.style.left = this.tamanhoSlide * i + "px";
            });
        } else {
            this.tamanhoSlide = this.getTamanhoSlide();
            this.preparaSlides();
        }
    }

    renderizarDescricao() {
        let i = this.indiceDoSlideAtual;
        let linkProjeto = this.dados.projetos[i].link;
        let linkRepositorio = this.dados.projetos[i].repositorio;

        this.titulo.innerText = this.dados.projetos[i].titulo;
        this.link.innerText = linkProjeto;
        this.link.setAttribute("href", linkProjeto);
        this.detalhes.innerText = this.dados.projetos[i].detalhes;

        this.carregarTechs(this.techs, i);

        this.botaoVisitar.setAttribute(
            "onclick",
            `window.open('${linkProjeto}', '_blank');`
        );
        this.botaoRepositorio.setAttribute(
            "onclick",
            `window.open('${linkRepositorio}', '_blank');`
        );
    }

    carregarTechs(techs, i) {
        // Techs do projeto atual
        const techsProject = this.dados.projetos[i].techs;
        // Todas as techs
        const techCollection = techs.children;
        const techList = [...techCollection];

        techList.forEach((tech) => {
            const techTitle = tech.getAttribute('title');
            tech.classList.add("projetos__techs--disabled");

            if (techsProject.includes(techTitle)) {
                tech.classList.remove("projetos__techs--disabled");
            }
        });

    }
}