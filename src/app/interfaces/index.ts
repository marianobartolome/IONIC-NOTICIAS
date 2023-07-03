export interface NewsResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:      Source;
    author?:        string;
    title:       string;
    description?: string;
    url:         string;
    urlToImage?:  string;
    publishedAt: Date;
    content?:     string;
}

export interface Source {
    id?:   string;
    name: string;
}

export interface ArticlesbyCategoryAndPage{
    [key:string] :{     //uso llaves cuadradas para indicar que el obejeto puede tener x propiedades dinamicas
        page:number,
        articles:Article[]
    }
}
