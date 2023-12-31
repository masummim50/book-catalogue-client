import { api } from "../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"]
    }),
    getRecentBooks: builder.query({
      query: ()=> "/books/recent",
      providesTags: ["recentBooks"]
    }),
    getYears: builder.query({
      query: ()=> "/books/years",
      providesTags: ["years"]
    }),
    getBookById: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["SingleBook"],
      async onQueryStarted(_, { queryFulfilled }) {
        const data = await queryFulfilled;
        console.log("get book by id data", data);
      },
    }),
    getSearchedBooks: builder.query({
      query: (arg)=> `/books/search/${arg}`
    }),
    deleteBookById: builder.mutation({
      query: (id)=> ({
        url:`/book/${id}`,
        method:'DELETE'
      }),
      invalidatesTags: ["books", "recentBooks"]
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books", "recentBooks", "years"]
    }),
    updateBook: builder.mutation({
      query: (arg) => ({
        url: `/book/${arg.id}`,
        method: "PATCH",
        body: arg.data,
      }),
      invalidatesTags: ["books", "SingleBook", "recentBooks", "years"]
    }),
    addReview: builder.mutation({
      query: (arg) => ({
        url: `/book/review/${arg.id}`,
        method: "POST",
        body: arg.review,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(
            bookApi.util.updateQueryData("getBookById", arg.id, (draft) => {
              
              draft = data.data;
              return draft;
            })
          );
        } catch (error) {
          console.log("path error", error);
        }
      },
    }),
    updateReview: builder.mutation({
      query: (arg)=> ({
        url:`/book/review/${arg.id}`,
        method: 'PATCH',
        body: arg.review
      }),
      async onQueryStarted(arg, {dispatch,queryFulfilled}){
        try {
          const data = await queryFulfilled;
          dispatch(
            bookApi.util.updateQueryData("getBookById", arg.id, (draft) => {
              
              draft = data.data;
              return draft 
            })
          );
        } catch (error) {
          console.log("path error", error);
        }
      }
    }),
    deleteReview: builder.mutation({
      query: (arg)=> ({
        url:`/book/review/${arg.id}`,
        method: 'DELETE',
        body: arg.review
      }),
      async onQueryStarted(arg, {dispatch,queryFulfilled}){
        try {
          const data = await queryFulfilled;
          dispatch(
            bookApi.util.updateQueryData("getBookById", arg.id, (draft) => {
              draft = data.data;
              return draft;
            })
          );
        } catch (error) {
          console.log("path error", error);
        }
      }
    }),
    addBookToWishlist: builder.mutation({
      query: (arg)=> ({
        url: `book/wishlist/${arg}`,
        method:'PATCH'
      }),
      invalidatesTags: ['lists']
    }),
    removeBookFromWishlist: builder.mutation({
      query: (arg)=> ({
        url: `book/wishlist/remove/${arg}`,
        method:'PATCH'
      }),
      invalidatesTags: ['lists']
    }),
    removeBookFromReadingList: builder.mutation({
      query: (arg)=> ({
        url: `book/readingList/remove/${arg}`,
        method:'PATCH'
      }),
      invalidatesTags: ['lists']
    }),
    addBookToReadingList: builder.mutation({
      query: (arg)=> ({
        url: `book/reading/${arg}`,
        method:'PATCH'
      }),
      invalidatesTags: ['lists']
    })
  }),
});

export const {
  useGetBooksQuery,
  useGetRecentBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteBookByIdMutation,
  useUpdateBookMutation,
  useDeleteReviewMutation,
  useAddBookToWishlistMutation,
  useAddBookToReadingListMutation,
  useRemoveBookFromWishlistMutation,
  useRemoveBookFromReadingListMutation,
  useGetYearsQuery,
  useGetSearchedBooksQuery
} = bookApi;
