import { baseApi } from "@/services/baseApi";

type FontType = {
  text: string;
  value: string;
};

export const fontsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFonts: builder.query<FontType[], void>({
      query: () => "fonts",
    }),
  }),
});

export const { useGetFontsQuery } = fontsApi;
