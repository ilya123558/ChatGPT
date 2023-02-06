import '@assets/styles/globals.scss'
import Loading from '@components/ui/Loading/Loading'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../app/store/store'


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  
  return (
    <Provider store={store()}>
      <Component {...pageProps} />
      {router.isFallback && <Loading />}
    </Provider>
  )
}
