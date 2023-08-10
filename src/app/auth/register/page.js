'use client'

import React, { useContext, useState } from "react";
import { UserContext } from "./UserProvider"; // Укажите правильный путь к вашему UserProvider.js
const Register=()=>{
  const { checkUser, registerUser } = useContext(UserContext);
    const [formData,setFormData]=useState({
      username:"",
      email:"",
      password:"",
      password2:"",
      lastname:"",
      firstname:"",
      age:"",
      phone:"",
    })
    const [errors,setErrors]=useState({})
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const userExists = await checkUser(formData.username);
      
      if (userExists) {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: "Пользователь с таким именем уже существует"
        }));
      } else {
        const validationErrors = validForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          const registrationSuccess = await registerUser(formData);
          if (registrationSuccess) {
            console.log("User registered successfully.");
          } else {
            console.log("Failed to register user.");
          }
        }
      }
    };
    const validForm=(data)=>{
      let errors={};
      if(!data.username.trim()){
        errors.username = "Логин обязателен";
      }
  
      if (!data.email.trim()) {
        errors.email = "Email обязателен";
      } 
      if (!isValidEmail(data.email)) {
        errors.email = "Неправильный формат email";
      }
  
      if (!data.password.trim()) {
        errors.password = "Пароль обязателен";
      } else if (data.password.length < 6) {
        errors.password = "Пароль должен быть не менее 6 символов";
      }
  
      if (data.password !== data.password2) {
        errors.password2 = "Пароли не совпадают";
      }
  
      if (!data.lastname.trim()) {
        errors.lastname = "Фамилия обязательна";
      }
  
      if (!data.firstname.trim()) {
        errors.firstname = "Имя обязательно";
      }
  
      if (!data.age.trim()) {
        errors.age = "Возраст обязателен";
      } else if (isNaN(data.age) || parseInt(data.age) <= 0) {
        errors.age = "Некорректный возраст";
      }
  
      if (!data.phone.trim()) {
        errors.phone = "Номер телефона обязателен";
      }
  
      return errors;
    }
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    return(
      <div className="card my-5">
      <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>
        <h3 className="fw-border mb-5 my-4 text-center">Реєстрація</h3>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            id="username"
            aria-describedby="emailHelp"
            placeholder="Логін"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password2 ? "is-invalid" : ""}`}
            id="password2"
            placeholder="Повторіть пароль"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
            id="lastname"
            placeholder="Прізвище"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          {errors.lastname && (
            <div className="invalid-feedback">{errors.lastname}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
            id="firstname"
            placeholder="Імя"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          {errors.firstname && (
            <div className="invalid-feedback">{errors.firstname}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            id="age"
            placeholder="Возраст"
            value={formData.age}
            onChange={handleChange}
            required
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            placeholder="Номер телефону"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>
        <div className="text-center">
          <button type="submit" className="btn px-5 mb-5 ">
            Зареєструватися
          </button>
        </div>
        <div className="form-text text-center mb-5 text-dark">
          Вже є аккаунт?{" "}
          <a href="/auth" className="text-dark fw-bold">
            Війти
          </a>
        </div>
      </form>
    </div>
    )
}
export default Register;
