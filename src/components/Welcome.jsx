import { useEffect, useState } from "react";
import "./Welcome.css";

function Welcome({ user, onLogout }) {
  const [open, setOpen] = useState(false); //stany do listy rozwijalnej
  const [selectedDevice, setSelectedDevice] = useState(null); //stany do listy rozwijalnej

  const [devices, setDevices] = useState([]);
  useEffect(() => {
    async function pobierzUrzadzenia() {
      const response = await fetch("/app/devices", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const dane = await response.json();

      if (response.ok) {
        setDevices(dane);
      }
    }

    pobierzUrzadzenia();
  }, [user.token]);

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
        {/* Lista rozwijalna */}
        <div className="device-dropdown">
          <button
            className="device-dropdown-button"
            onClick={() => setOpen(!open)}
          >
            {selectedDevice
              ? `📡 ${selectedDevice.deviceName}`
              : "📡 Wybierz urządzenie"}

            <span>{open ? "▲" : "▼"}</span>
          </button>

          {open && (
            <div className="device-dropdown-list">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="device-option"
                  onClick={() => {
                    setSelectedDevice(device);
                    setOpen(false);
                  }}
                >
                  📡 {device.deviceName}
                  {selectedDevice?.id === device.id && <span>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="main-button" onClick={onLogout}>
          Wyloguj się
        </button>

        {/* sprawdzanie tokena  mozna ten button usunać*/}
        {/* <button onClick={sprawdzToken}>Sprawdź JWT</button> */}
      </div>
    </div>
  );
}

export default Welcome;
