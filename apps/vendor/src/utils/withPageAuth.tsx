import { OpenAPI } from "src/services";

export function withPageAuth(gssp: any) {
  return async (context: any) => {
    const { req } = context;
    const token = req.cookies.vendorToken;
    // console.log(req.url);

    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: `/login?from=${encodeURIComponent(req.url)}`,
          statusCode: 302,
        },
      };
    }

    OpenAPI.TOKEN = token;
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
