import { api } from "../api/apiSlice";

const bookApi = api.injectEndpoints({
    endpoints: (builder)=> ({
        getBooks: builder.query({
            query: ()=> "/books"
        }),
        getBookById: builder.query({
            query: (id)=> `/book/${id}`
        })
    })
})


export const {useGetBooksQuery, useGetBookByIdQuery} = bookApi;