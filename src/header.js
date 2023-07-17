"use client"
import Link from "next/link";


export default function Header() {
  let login=false;
  const logOut=()=>{
    
  }
  return (
    <header className=" d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="">

      </div>
        <ul className="nav col-12 col-md-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link px-2 " href="/">Головна сторінка</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2" href="/services">Послуги</Link>
          </li>
          <li className="nav-item"> 
            <Link className="nav-link px-2" href="/clients">Клієнти</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2" href="/reports">Звіти</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2" href="/users">Користувачі</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2" href="/order">Замовлення</Link>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <Link className="nav-link px-2" href="/auth">Войти</Link>
          <button type="button" className="btn" onClick={logOut}>Выйти</button>
        </div>
    </header>
  )
}
