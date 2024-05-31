import GlobalsApi from "@/features/api/globalsApi";

const dashboardApiInjector = GlobalsApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => ({
        url: "/users",
        method: "GET",
        credentials:"include"
      }),
      transformResponse: (response: any, meta: any) => {
        if (meta.response?.status === 500) {
          console.error("Internal Server Error: ", response);
          throw new Error("Internal Server Error",);
        }
        return response;
      },
      
    }),

    updateBookApi : builder.mutation<any,void> ({
      query:()=>({
        url:"",
        method:"PUT",
        credentials:"include"
      })
    })
  }),
});



export const { useGetUserQuery,useUpdateBookApiMutation } = dashboardApiInjector;

export default dashboardApiInjector;
