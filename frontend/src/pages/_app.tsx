import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { AuthProvider } from "../context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} theme="dark" />
    </AuthProvider>
  );
}

export default App;
