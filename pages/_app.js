import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from '../src/components/Navbar';
import { BreadCrumb } from '../src/components/BreadCrumb';
import { Footer } from '../src/components/Footer';
export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Navbar />
      <BreadCrumb />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}