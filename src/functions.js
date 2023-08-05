const checkUser = async (login) => {
  try {
    // Пример использования fetch:
    const response = await fetch(`/api/auth/check?username=${login}`);
    const userData = await response.json();

    if (userData && userData.length > 0) {
      return true; // Пользователь с таким логином найден
    } else {
      return false; // Пользователь с таким логином не найден
    }
  } catch (error) {
    console.error('Error while checking user:', error);
    throw new Error('Failed to check user.');
  }
};

const register=async (userData)=>{
    let { username, email, password, role, firstname, lastname, phone, age } = userData;
    try {
      const response = await fetch('/api/auth/reg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Регистрация прошла успешно
        return true;
      } else {
        // Обработка ошибок, если необходимо
        throw new Error('Failed to register user.');
      }
    } catch (error) {
      console.error('Error while registering user:', error);
      throw new Error('Failed to register user.');
    }
}
const enterUser= async(username, password)=>{
  try {
    const response = await fetch(`/api/auth/login?username=${username}&password=${password}`);
    const userData = await response.json();

    if (userData && userData.length > 0) {
      const user = userData[0];
      // Вход успешен, возвращаем информацию о пользователе
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        // ... другие поля, если необходимо ...
      };
    } else {
      // Вход не успешен, возвращаем null или пустой объект
      return null;
    }
  } catch (error) {
    console.error('Error while logging in:', error);
    throw new Error('Failed to log in.');
  }
}
export {register,checkUser,enterUser}