function Welcome({ user, onLogout }) {
  return (
    <div className="page">
      <div className="card">
        <h1>Witaj, {user.login}!</h1>

        <p className="subtitle">Zalogowano pomyślnie</p>

        <div className="api-key">
          <p>Twój apiKey to:</p>

          <strong>{user.apiKey}</strong>
        </div>

        <button className="main-button" onClick={onLogout}>
          Wyloguj się
        </button>
      </div>
    </div>
  );
}

export default Welcome;
