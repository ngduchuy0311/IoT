#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>

// Định nghĩa chân cảm biến
#define DHTPIN D5
#define DHTTYPE DHT11
#define LIGHT_SENSOR_PIN A0

// Khởi tạo cảm biến
DHT_Unified dht(DHTPIN, DHTTYPE);

// Thông tin WiFi và MQTT
const char *ssid = "Huy Shin";
const char *password = "khongchoday";
const char *mqtt_server = "192.168.1.13";
const int mqtt_port = 1999;
const char *mqtt_username = "huy";
const char *mqtt_password = "123456";
const char *topic = "data";

// Khởi tạo WiFi và MQTT client
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
float temp, hum, light, windSpeed;

void setup_wifi() {
  Serial.println();
  Serial.print("Đang kết nối tới ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
  }

  Serial.println("");
  Serial.println("WiFi đã kết nối");
  Serial.println("Địa chỉ IP: ");
  Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Tin nhắn đã đến [");
  Serial.print(topic);
  Serial.print("] ");

  char payloadChar[length + 1];
  memcpy(payloadChar, payload, length);
  payloadChar[length] = '\0';

  Serial.print("Nội dung: ");
  Serial.println(payloadChar);

  if (strcmp(payloadChar, "off") == 0) {
    if (strcmp(topic, "device/ledD6") == 0) {
      digitalWrite(D6, LOW);
      publishToHistory("off", "Đèn D6");
    } else if (strcmp(topic, "device/ledD7") == 0) {
      digitalWrite(D7, LOW);
      publishToHistory("off", "Đèn D7");
    } else if (strcmp(topic, "device/led") == 0) {
      digitalWrite(D6, LOW);
      digitalWrite(D7, LOW);
      publishToHistory("off", "Đèn D6, D7");
    }
  } else if (strcmp(payloadChar, "on") == 0) {
    if (strcmp(topic, "device/ledD6") == 0) {
      digitalWrite(D6, HIGH);
      publishToHistory("on", "Đèn D6");
    } else if (strcmp(topic, "device/ledD7") == 0) {
      digitalWrite(D7, HIGH);
      publishToHistory("on", "Đèn D7");
    } else if (strcmp(topic, "device/led") == 0) {
      digitalWrite(D6, HIGH);
      digitalWrite(D7, HIGH);
      publishToHistory("on", "Đèn D6, D7");
    }
  }
}

void publishToHistory(const char *status, const char *device) {
  // Tạo đối tượng JSON
  StaticJsonDocument<200> doc;
  doc["status"] = status;
  doc["device"] = device;

  // Chuyển đổi đối tượng JSON sang chuỗi
  String jsonString;
  serializeJson(doc, jsonString);

  // Gửi dữ liệu tới MQTT
  client.publish("history", jsonString.c_str());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Đang cố gắng kết nối MQTT...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("đã kết nối");
      client.subscribe("device/ledD6");
      client.subscribe("device/ledD7");
      client.subscribe("device/led");
      client.subscribe("history");
    } else {
      Serial.print("thất bại, rc=");
      Serial.print(client.state());
      Serial.println(" thử lại sau 5 giây");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);

  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);

  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;

    // Đọc nhiệt độ
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (!isnan(event.temperature)) {
      Serial.print(F("Nhiệt độ: "));
      Serial.print(event.temperature);
      Serial.println(F(" °C"));
      temp = round(event.temperature * 10) / 10.0; // Làm tròn nhiệt độ đến số thập phân thứ nhất
    }

    // Đọc độ ẩm
    dht.humidity().getEvent(&event);
    if (!isnan(event.relative_humidity)) {
      Serial.print(F("Độ ẩm: "));
      Serial.print(event.relative_humidity);
      Serial.println(F(" %"));
      hum = event.relative_humidity;
    }

    // Đọc cường độ ánh sáng
    int lightValue = analogRead(LIGHT_SENSOR_PIN);
    light = map(lightValue, 0, 1023, 0, 1000);


    Serial.print("Ánh sáng: ");
    Serial.print(light);
    Serial.println(F(" lux"));

    // Tạo giá trị ngẫu nhiên cho tốc độ gió từ 0 đến 51
    // windSpeed = random(0, 52); // random(x, y) tạo giá trị ngẫu nhiên từ x đến y-1
    // Serial.print("Tốc độ gió: ");
    // Serial.print(windSpeed);
    // Serial.println(F(" m/s"));

    // Tạo đối tượng JSON
    StaticJsonDocument<200> doc;
    doc["temperature"] = temp;
    doc["humidity"] = hum;
    doc["light_intensity"] = light;
    // doc["wind_speed"] = windSpeed;

    // Chuyển đổi đối tượng JSON sang chuỗi
    String jsonString;
    serializeJson(doc, jsonString);

    // Gửi dữ liệu tới MQTT
    client.publish(topic, jsonString.c_str());

    delay(10);
  }
}
