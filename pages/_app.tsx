import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto_Mono } from 'next/font/google';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={robotoMono.className}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <link rel="icon/" href="/public/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
