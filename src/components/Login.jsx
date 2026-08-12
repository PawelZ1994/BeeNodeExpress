function Login({ onRegister }) {
  return (
    <div className="page">
      <div className="card">
        <h1>Logowanie</h1>

        <p className="subtitle">Zaloguj się do swojego konta</p>

        <input type="text" placeholder="Login" />

        <input type="password" placeholder="Hasło" />

        <button className="main-button">Zaloguj się</button>

        <p className="switch-text">Nie masz jeszcze konta?</p>

        <button className="switch-button" onClick={onRegister}>
          Zarejestruj się
        </button>
      </div>
    </div>
  );
}

export default Login;
