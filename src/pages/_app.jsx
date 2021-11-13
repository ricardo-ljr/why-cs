import { Provider as SessionProvider } from "next-auth/client";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
