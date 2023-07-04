import { Verify } from "@components/Authentication/Verifiy";
import { GetServerSidePropsContext } from "next";

function index({ code }: { code: string }) {
  return <Verify code={code} />;
}

export default index;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { token } = ctx.query;
  return {
    props: {
      code: token,
    },
  };
};
