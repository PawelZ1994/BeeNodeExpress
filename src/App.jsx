import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import "./App.css";

function App() {
  const [rejestracja, setRejestracja] = useState(true);
  const [user, setUser] = useState(null);

  if (user) {
    return <Welcome user={user} onLogout={() => setUser(null)} />;
  }

  return (
    <>
      {rejestracja ? (
        <Register onLogin={() => setRejestracja(false)} />
      ) : (
        <Login onRegister={() => setRejestracja(true)} onLogin={setUser} />
      )}
    </>
  );
}

export default App;
