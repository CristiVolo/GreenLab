import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import TransferButton from "../components/TransferButton";
import { SafeAreaView } from "react-native";
import LineGraph from "../components/LineGraph";
import axios from "axios";

const GraphScreen = ({ navigation }) => {

    let parsedReadDate = "";
    let newParsedReadDate = "";
    let parsedMonth = "";
    let parsedDay = "";

    const month = {
        "1": "Jan",
        "2": "Feb",
        "3": "Mar",
        "4": "Apr",
        "5": "May",
        "6": "Jun",
        "7": "Jul",
        "8": "Aug",
        "9": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
    };

    const [airTemperatureDataSwitch, setAirTemperatureDataSwitch] = useState(false);
    const [airHumidityDataSwitch, setAirHumidityDataSwitch] = useState(false);
    const [lightDataSwitch, setLightDataSwitch] = useState(false);
    const [gasConcentrationDataSwitch, setGasConcentrationDataSwitch] = useState(false);
    const [waterLevelDataSwitch, setWaterLevelDataSwitch] = useState(false);
    const [soilMoistureDataSwitch, setSoilMoistureDataSwitch] = useState(false);

    const [airTemperatureLastDay, setAirTemperatureLastDay] = useState([20, 45]);
    const [airHumidityLastDay, setAirHumidityLastDay] = useState([20, 45]);
    const [lightLastDay, setLightLastDay] = useState([20, 45]);
    const [gasConcentrationLastDay, setGasConcentrationLastDay] = useState([20, 45]);
    const [waterLevelLastDay, setWaterLevelLastDay] = useState([20, 45]);
    const [soilMoistureLastDay, setSoilMoistureLastDay] = useState([20, 45]);
    const [readDateLastDay, setReadDateLastDay] = useState(["January", "February"]);

    const [airTemperatureLastWeek, setAirTemperatureLastWeek] = useState([11, 22]);
    const [airHumidityLastWeek, setAirHumidityLastWeek] = useState([11, 22]);
    const [lightLastWeek, setLightLastWeek] = useState([11, 22]);
    const [gasConcentrationLastWeek, setGasConcentrationLastWeek] = useState([11, 22]);
    const [waterLevelLastWeek, setWaterLevelLastWeek] = useState([11, 22]);
    const [soilMoistureLastWeek, setSoilMoistureLastWeek] = useState([11, 22]);
    const [readDateLastWeek, setReadDateLastWeek] = useState(["July", "August"]);

    // D:\xampp\htdocs\greenlab\sensor_data.php
    const wiFiIPv4 = "192.168.0.101";
    const htdocsFolder = "greenlab";
    const manualCommandsPhpFile = "sensor_data.php";
    const fetchCommand =
        "http://" + wiFiIPv4 + "/" + htdocsFolder + "/" + manualCommandsPhpFile;

    useEffect(() => {
        const getDbSensorData = async () => {
            axios
                .get(fetchCommand)
                .then((response) => {
                    console.log("-------------------------------------------");
                    console.log("RESPONSE TO GET");
                    console.log(response.data);
                    console.log("-------------------------------------------");
                    console.log(
                        "~-------------------------------------------~"
                    );

                    // Last day
                    // for (let i = 0; i < response.data.last_day.length; i++) {
                    //     airTemperatureLastDay[i] = response.data.last_day[i].air_temperature;
                    //     airHumidityLastDay[i] = response.data.last_day[i].air_humidity;
                    //     lightLastDay[i] = response.data.last_day[i].light;
                    //     gasConcentrationLastDay[i] = response.data.last_day[i].gas_concentration;
                    //     waterLevelLastDay[i] = response.data.last_day[i].water_level;
                    //     soilMoistureLastDay[i] = response.data.last_day[i].soil_moisture;

                    //     parsedReadDate = response.data.last_day[i].read_date;
                    //     parsedDay = parsedReadDate.slice(9, 10);
                    //     parsedHour = parsedReadDate.slice(11, 13);
                    //     newParsedReadDate = parsedDay + 'h' + parsedHour;
                    //     readDateLastDay[i] = newParsedReadDate;
                    //     console.log(airTemperatureLastDay[i],' ',airHumidityLastDay[i],' ',airHumidityLastDay[i]);
                    // }

                    // // Last week
                    // for (let i = 0; i < response.data.last_week.length; i++) {
                    //     airTemperatureLastWeek[i] = response.data.last_week[i].avg_air_temperature;
                    //     airHumidityLastWeek[i] = response.data.last_week[i].avg_air_humidity;
                    //     lightLastWeek[i] = response.data.last_week[i].avg_light;
                    //     gasConcentrationLastWeek[i] = response.data.last_week[i].avg_gas_concentration;
                    //     waterLevelLastWeek[i] = response.data.last_week[i].avg_water_level;
                    //     soilMoistureLastWeek[i] = response.data.last_week[i].avg_soil_moisture;

                    //     parsedReadDate = response.data.last_week[i].read_date;
                    //     parsedMonth = month[response.data.last_week[i].read_month];
                    //     parsedDay = response.data.last_week[i].read_day;
                    //     newParsedReadDate = parsedMonth + ', ' + parsedDay;
                    //     readDateLastWeek[i] = newParsedReadDate;
                        
                    //     console.log(airTemperatureLastWeek[i],' ',airHumidityLastWeek[i],' ',lightLastWeek[i]);
                    // }

                    
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getDbSensorData();
    }, []);

    return (
        <ScrollView>
            <SafeAreaView>
                <TransferButton
                    onPress={() => navigation.navigate("ActuatorScreen")}
                    style={{
                        marginLeft: 30,
                        marginTop: 70,
                    }}
                    color="lightseagreen"
                />
                <LineGraph
                    onPress={() => {
                        setAirTemperatureDataSwitch(!airTemperatureDataSwitch);
                    }}
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="steelblue"
                    strokeWidth={4}
                    legend={[airTemperatureDataSwitch ? "Air Temperature(day/°C)" : "Air Temperature(hour/°C)" ]}
                    abscissaData={airTemperatureDataSwitch ? readDateLastWeek : readDateLastDay}
                    ordinateData={airTemperatureDataSwitch ? airTemperatureLastWeek : airTemperatureLastDay}
                />
                <LineGraph
                    onPress={() => {
                        setAirHumidityDataSwitch(!airHumidityDataSwitch);
                    }}
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="teal"
                    strokeWidth={4}
                    legend={[airHumidityDataSwitch ? "Air Humidity(day/%)" : "Air Humidity(hour/%)"]}
                    abscissaDataDay={readDateLastDay}
                    ordinateDataDay={airHumidityLastDay}
                    abscissaData={airHumidityDataSwitch ? readDateLastWeek : readDateLastDay}
                    ordinateData={airHumidityDataSwitch ? airHumidityLastWeek : airHumidityLastDay}
                />
                <LineGraph
                    onPress={() => {
                        setLightDataSwitch(!lightDataSwitch);
                    }}
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="orange"
                    strokeWidth={4}
                    legend={[lightDataSwitch ? "Light(day/(0 - light, 1 - dark))" : "Light(hour/(0 - light, 1 - dark))"]}
                    abscissaData={lightDataSwitch ? readDateLastWeek : readDateLastDay}
                    ordinateData={lightDataSwitch ? lightLastWeek : lightLastDay}
                />
                <LineGraph
                    onPress={() => {
                        setGasConcentrationDataSwitch(!gasConcentrationDataSwitch);
                    }}
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="rebeccapurple"
                    strokeWidth={4}
                    legend={[gasConcentrationDataSwitch ? "Gas Concentration(day/ppm)" : "Gas Concentration(hour/ppm)"]}
                    abscissaData={gasConcentrationDataSwitch ? readDateLastWeek : readDateLastDay}
                    ordinateData={gasConcentrationDataSwitch ? gasConcentrationLastWeek : gasConcentrationLastDay}
                />
                <LineGraph
                    onPress={() => {
                        setWaterLevelDataSwitch(!waterLevelDataSwitch);
                    }}
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="skyblue"
                    strokeWidth={4}
                    legend={[waterLevelDataSwitch ? "Water Level(day/%)" : "Water Level(hour/%)"]}
                    abscissaData={waterLevelDataSwitch ? readDateLastWeek : readDateLastDay}
                    ordinateData={waterLevelDataSwitch ? waterLevelLastWeek : waterLevelLastDay}
                />
                <LineGraph
                    onPress={() => {
                        setSoilMoistureDataSwitch(!soilMoistureDataSwitch);
                    }}
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="tan"
                    strokeWidth={4}
                    legend={[soilMoistureDataSwitch ? "Soil Moisture(day/%)" : "Soil Moisture(hour/%)"]}
                    abscissaData={soilMoistureDataSwitch ? readDateLastWeek : readDateLastDay}
                    ordinateData={soilMoistureDataSwitch ? soilMoistureLastWeek : soilMoistureLastDay}
                />
            </SafeAreaView>
        </ScrollView>
    );
};

export default GraphScreen;
