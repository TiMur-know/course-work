
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const inter = Inter({ subsets: ['latin'] })
export default function Layout({ children }) {
  return (
      <body>
        {children}
      </body>
  )
}
