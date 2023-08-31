import type { AppProps } from 'next/app'
import { AppProvider } from "@/products/widgets"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <AppProvider><Component {...pageProps} /></AppProvider>
}