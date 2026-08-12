function Welcome({ user, onLogout }) {
  //token
  async function sprawdzToken() {
    const response = await fetch("/user/me", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const dane = await response.json();

    console.log(dane);
  }

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

        {/* sprawdzanie tokena  mozna ten button usunać*/}
        <button onClick={sprawdzToken}>Sprawdź JWT</button>
      </div>
    </div>
  );
}

export default Welcome;
