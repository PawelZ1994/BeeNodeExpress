import { useState } from "react";

function Register({ onLogin }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [komunikat, setKomunikat] = useState("");

  async function zarejestruj(e) {
    e.preventDefault();

    const response = await fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        email,
        password,
      }),
    });

    const dane = await response.json();

    if (response.ok) {
      setKomunikat("Konto zostało pomyślnie utworzone!");
    } else {
      setKomunikat(dane.error);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Rejestracja</h1>

        <p className="subtitle">Utwórz swoje konto</p>

        <form onSubmit={zarejestruj}>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="main-button" type="submit">
            Zarejestruj się
          </button>
        </form>

        {komunikat && <p className="success-message">{komunikat}</p>}

        <p className="switch-text">Masz już konto?</p>

        <button className="switch-button" onClick={onLogin}>
          Zaloguj się
        </button>
      </div>
    </div>
  );
}

export default Register;
