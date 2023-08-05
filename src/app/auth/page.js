'use client'

import { checkUser } from "@/functions";
import React, { useState } from "react";

const Authorize = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors,setErrors]=useState({});
  const handleChange=(e)=>{
    const{id,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [id]:value,
    }))
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const validationErrors=validForm(form);
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length=0){
      console.log("Form is valid. Authorizing user...")
      try{
        const isUserValid = await checkUser(formData.username, formData.password);
        if (isUserValid) {

          console.log("User is authorized!");
          // Здесь вы можете перенаправить пользователя на другую страницу или выполнить другие действия при успешной авторизации.
        } else {
          console.log("User is not authorized.");
          // Здесь вы можете показать сообщение об ошибке входа или выполнить другие действия при неуспешной авторизации.
        }
      }catch(error){
        
      }
    }
  }
  const validForm = (data) => {
    let errors = {};

    if (!data.username.trim()) {
      errors.username = "Логін обовязковий";
    }

    if (!data.password.trim()) {
      errors.password = "Пароль обовязковий";
    }

    return errors;
  };
  return (
    <div className="card my-5 ">
      <h1 className="text-center mb-5 my-5">Вхід</h1>
      <form className="card-body cardbody-color p-lg-5">

        <div className="text-center">

        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Логін"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Пароль"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-color px-5 w-100">
            Війти
          </button>
        </div>
        <div
          id="emailHelp"
          className="form-text text-center text-dark"
        >
          Не зареєстровані?{" "}
          <a href="auth/register" className="text-dark fw-bold">
            Створити акаунт
          </a>
        </div>
        <div
          id="emailHelp"
          className="form-text text-center text-dark"
        >
          <a href="\" className="text-dark fw-bold">
            Головна сторінка
          </a>
        </div>
      </form>
    </div>
  );
};

export default Authorize;
