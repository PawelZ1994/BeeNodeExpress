import express from "express";
import cors from "cors";
import pomiarRoutes from "./routes/pomiarRoutes.js";
import errorHadler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello WORLD");
});

app.get("/dane", async (req, res) => {
  const result = await fetch("https://temperaturyapi2.onrender.com/dane");
  const dane = await result.json();
  const temperatura = dane.map((e) => e.temperatura);
  res.json(temperatura);
});

app.use("/app", pomiarRoutes);
// app.post("/dodaj", async (req, res) => {
//   const temp = parseFloat(req.body.temperatura);
//   const [result] = await db.query(
//     `INSERT INTO pomiary (temperatura) VALUES (?)`,
//     [temp]
//   );

//   res.json({
//     status: "OK",
//     id: result.insertId,
//   });
// });

export default app;

// app.listen(3000, () => {
//   console.log("Serwer działa!");
// });

/*
{
    "apiKey": "a82f91bc77",
    "device": "Salon",
    "temp": 23.4
  }

  app.post("/api/temperature", async (req, res) => {

    const { apiKey, device, temp } = req.body;

    try {

        // tutaj dalsza obsługa

        res.json({
            status: "OK"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server error"
        });
    }

});

//Znalezienie użytkownika po apiKey
const [users] = await db.query(
    "SELECT id FROM users WHERE apiKey = ?",
    [apiKey]
);

if (users.length === 0) {
    return res.status(401).json({
        error: "Invalid apiKey"
    });
}

const userId = users[0].id;
// Szukamy urządzenia
const [devices] = await db.query(
    `
    SELECT id 
    FROM devices
    WHERE userId = ?
    AND name = ?
    `,
    [userId, device]
);


if (devices.length === 0) {

    return res.status(404).json({
        error: "Device not found"
    });

}


const deviceId = devices[0].id;

// Zapis temperatury
await db.query(
    `
    INSERT INTO temperatures
    (deviceId, temp)
    VALUES (?, ?)
    `,
    [
        deviceId,
        temp
    ]
);


app.post("/api/temperature", async (req, res) => {

    const { apiKey, device, temp } = req.body;


    try {

        // 1. znajdź użytkownika

        const [users] = await db.query(
            "SELECT id FROM users WHERE apiKey = ?",
            [apiKey]
        );


        if (users.length === 0) {
            return res.status(401).json({
                error:"Invalid apiKey"
            });
        }


        const userId = users[0].id;



        // 2. znajdź urządzenie

        const [devices] = await db.query(
            `
            SELECT id FROM devices
            WHERE userId = ?
            AND name = ?
            `,
            [
                userId,
                device
            ]
        );


        if (devices.length === 0) {
            return res.status(404).json({
                error:"Device not found"
            });
        }


        const deviceId = devices[0].id;



        // 3. zapisz temperaturę

        await db.query(
            `
            INSERT INTO temperatures
            (deviceId,temp)
            VALUES (?,?)
            `,
            [
                deviceId,
                temp
            ]
        );


        res.json({
            status:"Temperature saved"
        });


    } catch(error) {

        console.log(error);

        res.status(500).json({
            error:"Database error"
        });

    }

});



#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "TwojeWiFi";
const char* password = "HasloWiFi";

const char* server = "http://192.168.1.100:3000/api/temperature";

String apiKey = "a82f91bc77";
String deviceName = "Salon";

void setup() {

  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nPołączono z WiFi");
}

void loop() {

  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;

    http.begin(server);

    http.addHeader("Content-Type", "application/json");

    float temperature = 23.4;

    String json =
      "{"
      "\"apiKey\":\"" + apiKey + "\","
      "\"device\":\"" + deviceName + "\","
      "\"temp\":" + String(temperature, 2) +
      "}";

    Serial.println(json);

    int httpCode = http.POST(json);

    Serial.print("HTTP: ");
    Serial.println(httpCode);

    Serial.println(http.getString());

    http.end();
  }

  delay(10000);
}
*/
