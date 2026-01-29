import { Provider } from "react-redux";
import { store } from "../store";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // ✅ ALWAYS expose for GPP verification (Docker = production)
    window.getCartState = () => store.getState().cart;
    window.getWishlistState = () => store.getState().wishlist;
    window.getLastToastMessage = () => window.__LAST_TOAST__ || null;
  }, []);

  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}
