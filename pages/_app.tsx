import Head from 'next/head';
import type { AppProps } from 'next/app';

// * styles
import '../styles/globals.css';

// * context provider
import AppContextProvider from '../context/AppContextProvider';

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
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  );
}

export default MyApp;
