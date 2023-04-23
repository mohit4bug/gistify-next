import '@/styles/globals.css'
import { Inter_Tight } from 'next/font/google'

const globalFont = Inter_Tight({
  subsets: ['latin']
})

export default function App({
  Component, pageProps: { session, ...pageProps },
}) {
  return (

    <div className={globalFont.className}>
      <Component {...pageProps} />
    </div>
  )
}