import { Verify } from "@components/Authentication/Verifiy";
import { GetServerSidePropsContext } from "next";
import { UserService } from "src/services";

function index({ code }: { code: string }) {
  return <Verify code={code} />;
}

export default index;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { token } = ctx.query;

  return {
    props: {
      code: token,
    },
  };
};
