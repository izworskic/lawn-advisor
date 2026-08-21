import "../styles/globals.css";
import ToolNetworkLinks from "../components/ToolNetworkLinks";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToolNetworkLinks />
    </>
  );
}
