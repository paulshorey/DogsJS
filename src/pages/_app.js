import "src/styles/reset.scss";
import "src/styles/layout.scss";
import "src/styles/styles.scss";
import "horizontal_carousel/css/default.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// ${(process.env.NODE_ENV==='development' ? 'src' : 'dist')}
