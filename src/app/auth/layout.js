'use client'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {React,ReactNode} from 'react';
const inter = Inter({ subsets: ['latin'] })
export default function Layou({ children }) {
  return <body>{children}</body>
}
