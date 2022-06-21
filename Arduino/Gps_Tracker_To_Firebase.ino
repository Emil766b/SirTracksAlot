#include <Arduino_MKRGPS.h>
#include "Firebase_Arduino_WiFiNINA.h"

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""

// Firebase dataobject
FirebaseData firebaseData;
// Firebase path
String path ="/LocationData";
// Use json
String jsonStr;

void setup() {
  // initialize serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // If GPS does not begin print error

  if (!GPS.begin()) {
    Serial.println("Failed to initialize GPS!");
    while (1);
  }

  // Print to console
  Serial.println("Connecting to WIFI");
  // Get WiFi status
  int status = WL_IDLE_STATUS;

  // While WiFi is not connected
  while(status != WL_CONNECTED)
  {
    // Connect to WiFi
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    // Print to console
    Serial.print("Tracking down WiFi\n");
    delay(500);
  }
  // Print Ip address to console
  Serial.print(" Forbundet til ip:");
  Serial.println(WiFi.localIP());
  
  // Begin firebase connection
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, WIFI_SSID, WIFI_PASSWORD);
  // Reconnect WiFi if lost
  Firebase.reconnectWiFi(true);
  }


void loop() {
  // check if there is new GPS data available
  if (GPS.available()) {
    // read GPS values
    float latitude   = GPS.latitude();
    float longitude  = GPS.longitude();
    float altitude   = GPS.altitude();
    float speed      = GPS.speed();
    int   satellites = GPS.satellites();
    
    // SetFloat of path and GPS values
    // Print data path and GPS values
    if (Firebase.setFloat(firebaseData, path + "/Latitude", latitude)) {
      Serial.println(firebaseData.dataPath() + " = " + latitude);
    }
    if (Firebase.setFloat(firebaseData, path + "/Longitude", longitude)) {
      Serial.println(firebaseData.dataPath() + " = " + longitude);
    }
    if (Firebase.setFloat(firebaseData, path + "/Altitude", altitude)) {
      Serial.println(firebaseData.dataPath() + " = " + altitude);
    }
    if (Firebase.setFloat(firebaseData, path + "/Speed", speed)) {
      Serial.println(firebaseData.dataPath() + " = " + speed);
    }
    if (Firebase.setFloat(firebaseData, path + "/Satellites", satellites)) {
      Serial.println(firebaseData.dataPath() + " = " + satellites);
    }
    // Format GPS data as json
    jsonStr = "{\"Latitude\":" + String(latitude, 7) + 
              ",\"Longitude\":" + String(longitude, 7) +
              ",\"Altitude\":" + String(altitude, 2) +
              ",\"Speed\":" + String(speed, 2) +
              ",\"Satellites\":" + String(satellites) +"}";
    // Push json formatted data to PastData in firebase
    if (Firebase.pushJSON(firebaseData, path + "/PastData", jsonStr)) {
      // Print firebase dataPath and pushName
      Serial.println(firebaseData.dataPath() + " = " + firebaseData.pushName());
    }
    else {
      // Print error
      Serial.println("Error: " + firebaseData.errorReason());
    }

    Serial.println();
    delay(2000);

    // print GPS values
    Serial.print("Location: ");
    Serial.print(latitude, 7);
    Serial.print(", ");
    Serial.println(longitude, 7);

    Serial.print("Altitude: ");
    Serial.print(altitude);
    Serial.println("m");

    Serial.print("Ground speed: ");
    Serial.print(speed);
    Serial.println(" km/h");

    Serial.print("Number of satellites: ");
    Serial.println(satellites);

    Serial.println();
  }
}
