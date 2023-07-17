import React from "react";

const Authorize = () => {
  return (
    <div className="card my-5">
      <form className="card-body cardbody-color p-lg-5">

        <div className="text-center">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
            className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
            width="200px"
            alt="profile"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Логин"
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
          <button type="submit" className="btn btn-color px-5 mb-5 w-100">
            Войти
          </button>
        </div>
        <div
          id="emailHelp"
          className="form-text text-center mb-5 text-dark"
        >
          Не зарегистрированы?{" "}
          <a href="auth/register" className="text-dark fw-bold">
            Создать акаунт
          </a>
        </div>
      </form>
    </div>
  );
};

export default Authorize;
