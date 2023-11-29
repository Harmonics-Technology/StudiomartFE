import { Validate } from "@components/Payment/Validate";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { PaymentService } from "src/services";

function validate({ data }: { data: any }) {
  console.log({data});
  return <Validate data={data} />;
}

export default validate;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { trxref } = ctx.query;
  //
  console.log({trxref});
  try {
    const data = await PaymentService.verifyPayment({
      transactionReference: trxref as string,
    });

    console.log({data})
    if(!data.status)
    {
      return {
        redirect: {
          permanent: false,
          destination: "/payment/cancelled",
        },
      };
    }


    return {
      props: {
        data: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};
