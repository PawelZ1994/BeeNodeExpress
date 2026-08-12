import { useState } from "react";

function Login({ onRegister, onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function zaloguj(e) {
    e.preventDefault();

    const response = await fetch("/user/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        login,
        password,
      }),
    });

    const dane = await response.json();

    console.log(dane);
    if (response.ok) {
      onLogin(dane.user);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Logowanie</h1>

        <p className="subtitle">Zaloguj się do swojego konta</p>

        <form onSubmit={zaloguj}>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="main-button" type="submit">
            Zaloguj się
          </button>
        </form>

        <p className="switch-text">Nie masz jeszcze konta?</p>

        <button className="switch-button" onClick={onRegister}>
          Zarejestruj się
        </button>
      </div>
    </div>
  );
}

export default Login;
