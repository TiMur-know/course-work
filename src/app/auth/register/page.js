import React from "react";
const Register=()=>{
    return(
        <div className="card my-5">
      <form className="card-body cardbody-color p-lg-5">
      <h3 class="fw-normal mb-5">Регистрация</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Логин"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
            <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Пароль"
                required
            />
        </div>
        <div className="mb-3">
            <input
                type="password"
                className="form-control"
                id="password2"
                placeholder="Повторите пароль"
                required
            />
        </div>
        <div className="mb-3">
        <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Фамилия"
            required
        />
        </div>
        <div className="mb-3">
        <input
            type="text"
            className="form-control"
            id="firstname"
            placeholder="Имя"
            required
        />
        </div>
        <div className="mb-3">
        <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Возраст"
            required
        />
        </div>
        <div className="mb-3">
        <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Номер телефона"
            required
        />
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-color px-5 mb-5 w-100">
        Зарегистрироваться
        </button>
        </div>
        <div className="form-text text-center mb-5 text-dark">
        Уже есть акаунт?{" "}
        <a href="/auth" className="text-dark fw-bold">
            Войти
        </a>
        </div>
      </form>
    </div>
    )
}
export default Register;
