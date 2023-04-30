import '../styles/globals.css';
import { Inter } from '@next/font/google';
import { toast, ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  
  return <main className={inter.className}>
    <Component {...pageProps}></Component>
    <ToastContainer icon={false} position={toast.POSITION.BOTTOM_CENTER} theme="colored" autoClose={3000} />
  </main>;

}
