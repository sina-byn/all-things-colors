import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
          integrity='sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <style id='gradients-styles' />
        <style id='random-gradient-styles' />
      </Head>
      <body>
        <div id='toast-notif-container' className="toast-notif-container w-auto h-fit fixed right-0 top-0 z-[100]" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
