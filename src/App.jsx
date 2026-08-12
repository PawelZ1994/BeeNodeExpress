import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [rejestracja, setRejestracja] = useState(true);

  return (
    <>
      {rejestracja ? (
        <Register onLogin={() => setRejestracja(false)} />
      ) : (
        <Login onRegister={() => setRejestracja(true)} />
      )}
    </>
  );
}

export default App;
