import "../../globals.css";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const use = async () => {
      (await require("tw-elements")).default;
    };
    use();
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
