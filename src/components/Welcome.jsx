import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Welcome.css";

function Welcome({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [devices, setDevices] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [temperatures, setTemperatures] = useState([]);

  // Pobieranie urządzeń
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

  // Pobieranie temperatur
  async function pobierzTemperature(date) {
    if (!selectedDevice) return;

    const response = await fetch(
      `/app/devices/${selectedDevice.id}/temperatures?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const dane = await response.json();

    if (response.ok) {
      setTemperatures(dane);
    } else {
      setTemperatures([]);
      console.log(dane);
    }
  }

  // Przygotowanie danych do wykresu
  const chartData = temperatures.map((pomiar) => ({
    czas: new Date(pomiar.measuredAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),

    temperatura: Number(pomiar.temperature),
  }));

  return (
    <div className="page">
      <div className="card">
        <h1>Witaj, {user.login}!</h1>

        <p className="subtitle">Zalogowano pomyślnie</p>

        {/* API KEY */}
        <div className="api-key">
          <p>Twój apiKey to:</p>
          <strong>{user.apiKey}</strong>
        </div>

        {/* LISTA URZĄDZEŃ */}
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

                    setSelectedDate("");
                    setTemperatures([]);
                  }}
                >
                  📡 {device.deviceName}
                  {selectedDevice?.id === device.id && <span>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WYBÓR DNIA */}
        {selectedDevice && (
          <div className="date-section">
            <label>Wybierz dzień:</label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                const date = e.target.value;

                setSelectedDate(date);
                pobierzTemperature(date);
              }}
            />
          </div>
        )}

        {/* WYKRES */}
        {temperatures.length > 0 && (
          <div className="temperature-chart">
            <h3>Temperatura — {selectedDevice.deviceName}</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="czas" />

                <YAxis unit="°C" />

                <Tooltip formatter={(value) => [`${value}°C`, "Temperatura"]} />

                <Line
                  type="monotone"
                  dataKey="temperatura"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* BRAK POMIARÓW */}
        {selectedDate && temperatures.length === 0 && (
          <p className="no-data">Brak pomiarów dla wybranego dnia.</p>
        )}

        {/* WYLOGOWANIE */}
        <button className="main-button" onClick={onLogout}>
          Wyloguj się
        </button>
      </div>
    </div>
  );
}

export default Welcome;
