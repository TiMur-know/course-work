'use client'
import { useRouter } from "next/navigation";
import React, { useState,useContext } from "react";
import { UserContext } from "../../userContext";
const Authorize = () => {
  const router = useRouter();
  const {checkUser,loginUser}=useContext(UserContext)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
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
    console.log(formData)
    const validationErrors=validForm(formData);
    setErrors(validationErrors);
    console.log(validationErrors)
    if(Object.keys(validationErrors).length==0){
      console.log("Form is valid. Authorizing user...")
      try{
        const isUserValid = await checkUser(formData.username, formData.password);
        if (isUserValid) {
          await loginUser(formData.username, formData.password)
          console.log("User is authorized!");
          setAlertMessage("Ви успішно авторизовані!");
          router.push('/')
        } else {
          console.log("User is not authorized.");
          setAlertMessage("Неправильний логін або пароль чи користувача немає в системі");
        }
      }catch(error){
        console.error("Error authorizing user:", error);
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
      {alertMessage && ( // Отображаем alert, если есть сообщение
        <div className="alert alert-info">{alertMessage}</div>
      )}
      <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>

        <div className="text-center">

        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Логін"
            value={formData.username} 
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
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
