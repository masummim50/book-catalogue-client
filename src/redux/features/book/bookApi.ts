import { api } from "../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"]
    }),
    getBookById: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["SingleBook"],
      async onQueryStarted(arg, { queryFulfilled }) {
        const data = await queryFulfilled;
        console.log("get book by id data", data);
      },
    }),
    deleteBookById: builder.mutation({
      query: (id)=> ({
        url:`/book/${id}`,
        method:'DELETE'
      }),
      invalidatesTags: ["books"]
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"]
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
            api.util.updateQueryData("getBookById", arg.id, (draft) => {
              
              return draft = data.data;
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
            api.util.updateQueryData("getBookById", arg.id, (draft) => {
              
              return draft = data.data;
            })
          );
        } catch (error) {
          console.log("path error", error);
        }
      }
    })
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteBookByIdMutation
} = bookApi;
