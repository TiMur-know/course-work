"use client"
import Link from "next/link";
import React,{ useContext } from "react";
import { Image } from "react-bootstrap";
import { UserContext } from "./userContext";

export default function Header() {
  const {logoutUser,user}=useContext(UserContext);
  const logOut=()=>{
    logoutUser()
  }
  return (
    <header className=" d-flex flex-wrap justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="nav text-start">
        <Image srcSet="/logo.png" width={100} height={50}/>
      </div>
        <ul className="nav col-12 col-md-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link px-2 " style={{color:'#05a2e5'}} href="/">Головна сторінка</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2" style={{color:'#05a2e5'}} href="/services">Послуги</Link>
          </li>
          {user!=null&&user.role!="USER"&&(
              <li className="nav-item"> 
            <Link className="nav-link px-2" style={{color:'#05a2e5'}} href="/clients">Клієнти</Link>
          </li>)}
          {user!=null&&user.role!="USER"&&(
          <li className="nav-item">
            <Link className="nav-link px-2" style={{color:'#05a2e5'}} href="/order">Замовлення</Link>
          </li>)}
          
          {user!=null&&user.role=="ADMIN"&&(
          <li className="nav-item">
            <Link className="nav-link px-2" style={{color:'#05a2e5'}} href="/reports">Звіти</Link>
          </li>)}
          {user!=null&&user.role=="ADMIN"&&(
          <li className="nav-item">
            <Link className="nav-link px-2" style={{color:'#05a2e5'}} href="/users">Користувачі</Link>
          </li>)}
          
          
        </ul>
        <div className="nav text-end">
          {user==null&&(<Link className="px-2 btn btn-outline-info" style={{marginRight:"20px"}} href="/auth">Війти</Link>)}
          {user!=null&&(<button type="button" className="btn btn-outline-info" style={{color:'#05a2e5', marginRight:"20px"}} onClick={logOut}>Вийти</button>)}
          
        </div>
    </header>
  )
}
