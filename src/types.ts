export interface ICollectionType  {
    name: string
    images: string[]
}

export interface ICategory {
    name: string;
}

export interface ICollection {
    category: number;
    name: string;
    photos: string[];
}

export interface ResponseType {
    categories: ICategory[];
    collections: ICollection[];
}

