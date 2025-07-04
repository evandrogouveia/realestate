export interface Propriedades {
    ID: number;
    IDPropriedade: string;
    titulo: string;
    descricao: string;
    imagemDestacada: string;
    imagens: Array<string>;
    preco: string;
    qtdQuartos: string;
    qtdBanheiros: string;
    qtdVagas: string;
    areaImovel: string;
    plantas: Array<string>;
    video: string;
    dataPublicacao: string;
    categorias: Array<CategoriaPropriedades>;
    endereco: Array<any>;
}

export interface CategoriaPropriedades {
    ID: number;
    nome: string;
}