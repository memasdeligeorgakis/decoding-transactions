import "../styles/globals.css";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer, Pages } from "../components/Footer";
import type { AppProps } from "next/app";
import styled from "styled-components";
import { Space_Grotesk } from "@next/font/google";

const spaceGrotesk = Space_Grotesk();

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
  background-color: black;
  background-image: url(/BackgroundPattern.svg);
  background-size: 64px;
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainContainer
      style={{
        width: "100%",
        backgroundImage: "url(/BackgroundPattern.svg)",
        backgroundSize: "64px",
      }}
    >
      <style jsx global>{`
        html {
          font-family: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Namada Explorer</title>
        <meta name="description" content="Namada Ceremony" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header selectedPage={Pages.TrustedSetup} />
      <Component {...pageProps} />
      <Footer selectedPage={Pages.TrustedSetup} />
    </MainContainer>
  );
}
