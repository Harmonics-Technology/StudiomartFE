import { Validate } from "@components/Payment/Validate";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { PaymentService } from "src/services";

function validate({ data }: { data: any }) {
  return <Validate data={data} />;
}

export default validate;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tx_ref, transaction_id, status } = ctx.query;
  //

  if (status == "cancelled") {
    return {
      redirect: {
        permanent: false,
        destination: "/payment/cancelled",
      },
    };
  }
  if (status == "failed") {
    return {
      redirect: {
        permanent: false,
        destination: "/payment/cancelled",
      },
    };
  }
  try {
    const data = await PaymentService.verifyPayment({
      transactionId: Number(transaction_id),
      transactionReference: tx_ref as string,
    });

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
