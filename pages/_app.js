import '../styles/globals.css';
import { Inter } from '@next/font/google';

const montserrat = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export default function App({ Component, pageProps }) {
  return <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>;
}
