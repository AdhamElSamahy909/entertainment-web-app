import { apiSlice } from "./apiSlice";

export const moviesTvSeriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesTvSeries: builder.query({
      query: () => ({
        url: "/moviesTVSeries",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("All Shows: ", data.data);
        } catch (error) {
          console.log(error);
        }
      },

      // providesTags: ["moviesTVSeries"],
      providesTags: (result = []) => {
        if (!result || !result.data) return ["Shows"];

        return [
          "Shows",
          ...result.data.data.map(({ _id }) => ({ type: "Shows", id: _id })),
        ];
      },
    }),

    getMovieTVSeries: builder.query({
      query: (id) => ({
        url: `/moviesTVSeries/${id}`,
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Show: ", data);
        } catch (error) {
          console.log(error);
        }
      },

      providesTags: (result = {}) => {
        return [{ type: "Shows", id: result._id }];
      },
    }),

    updateMoviesTVSeries: builder.mutation({
      query: ({ id, body }) => ({
        url: `/moviesTVSeries/${id}`,
        method: "POST",
        credentials: "include",
        body,
      }),

      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getMoviesTvSeries",
            undefined,
            (draft) => {
              const show = draft.data.data.find((s) => s._id === id);
              if (show) {
                Object.assign(show, body);
              }
            }
          )
        );

        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getMoviesTvSeries",
              undefined,
              (draft) => {
                const index = draft.findIndex((s) => s._id === id);
                if (index !== -1) {
                  draft[index] = data;
                }
              }
            )
          );
        } catch {
          patchResult.undo();
          dispatch(apiSlice.util.invalidateTags([{ type: "Shows", id }]));
        }
      },
    }),

    search: builder.query({
      query: ({ type, search }) => ({
        url: "/moviesTVSeries/search",
        method: "GET",
        credentials: "include",
        params: {
          type,
          search,
        },
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Search: ", data);
        } catch (error) {
          console.log(error);
        }
      },

      providesTags: (result = []) => {
        if (!result || !result.data) return "Searched Shows";

        return [
          "Searched Shows",
          ...result.data.data.map((show) => ({
            type: "Searched Shows",
            id: show._id,
          })),
        ];
      },
    }),
  }),
});

export const {
  useGetMoviesTvSeriesQuery,
  useGetMovieTVSeriesQuery,
  useSearchQuery,
  useUpdateMoviesTVSeriesMutation,
} = moviesTvSeriesApiSlice;
