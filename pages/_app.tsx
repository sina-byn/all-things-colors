import Head from 'next/head';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>All Things Colors</title>
        <meta
          name='description'
          content='a web-app that provides you with different color utility tools to boost your speed and productivity'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
