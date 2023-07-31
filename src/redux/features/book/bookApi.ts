import { api } from "../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["SingleBook"],
      async onQueryStarted(arg, { queryFulfilled }) {
        const data = await queryFulfilled;
        console.log("get book by id data", data);
      },
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/book",
        method: "POST",
        body: data,
      }),
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
          console.log("review query fullfilled", data);
          const patchResult = dispatch(
            api.util.updateQueryData("getBookById", arg.id, (draft) => {
              console.log(
                JSON.stringify(draft),
                data,
                "after query fullfilled"
              );
              return draft = data.data;
            })
            //   api.util.updateQueryData('getBookById', id, (draft) => {
            //     Object.assign(draft, updatedPost)
            //   })
          );
        } catch (error) {
          console.log("path error", error);
        }
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useAddReviewMutation,
} = bookApi;
