import "../assets/css/reset.scss";
import "../assets/css/layout.scss";
import "../assets/css/styles.scss";
import "horizontal_carousel/css/default.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// ${(process.env.NODE_ENV==='development' ? 'src' : 'dist')}
