import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/style.css'
import type { AppProps } from 'next/app'
import Layout from './Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp