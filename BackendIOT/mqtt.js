
import mqtt from "mqtt";
import mysql from 'mysql2';

const mqttBroker = "mqtt://192.168.1.13:1999";
const mqttOptions = {
  username: "huy",
  password: "123456",
};
const mqttTopic = "data";

// MySQL Database settings
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'huy311202',
  database: 'backendiot',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Connect to MQTT broker
export const client = mqtt.connect(mqttBroker, mqttOptions);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe([mqttTopic, "device/ledD6", "device/ledD7"]);
});

client.on("message", (topic, message) => {
  if (topic === mqttTopic) {
    const data = JSON.parse(message);
    let { temperature, humidity, light_intensity } = data;

    const query =
      " INSERT INTO sensor (id, temperature, humidity, brightness, datetime) VALUES (NULL, ROUND(?, 2), ?, ?, NOW());"

    const values = [temperature, humidity, light_intensity];

    db.query(query, values, (error, results, fields) => {
      if (error) {
        console.error("Error inserting data into MySQL: ", error);
      } else {
        console.log("Data inserted into MySQL");
      }
    });
  }

});

// Handle errors
client.on("error", (err) => {
  console.error("MQTT error:", err);
});

db.on("error", (err) => {
  console.error("MySQL error:", err);
});
