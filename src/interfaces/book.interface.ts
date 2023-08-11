
export interface IBook {
    _id: string,
    title:string,
    author:string,
    genre:string,
    date: Date,
    reviews: [],
    addedBy: {
        _id:string,
        name:string
    }
}