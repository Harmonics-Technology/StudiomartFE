import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
// import Image from "next/image";
import { Image } from "@chakra-ui/react";
// import { ServerStyleSheet } from "styled-components";

class CustomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="globalLoader">
            <Image src="/stdd.gif" alt=""  />
          </div>
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
