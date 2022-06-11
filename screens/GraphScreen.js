import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, ScrollView, RefreshControl } from "react-native";
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

    const [refreshing, setRefreshing] = useState(false);

    const [airTemperatureDataSwitch, setAirTemperatureDataSwitch] = useState(false);
    const [airHumidityDataSwitch, setAirHumidityDataSwitch] = useState(false);
    const [lightDataSwitch, setLightDataSwitch] = useState(false);
    const [gasConcentrationDataSwitch, setGasConcentrationDataSwitch] = useState(false);
    const [waterLevelDataSwitch, setWaterLevelDataSwitch] = useState(false);
    const [soilMoistureDataSwitch, setSoilMoistureDataSwitch] = useState(false);

    const [airTemperatureLastDay, setAirTemperatureLastDay] = useState([20, 45, 30]);
    const [airHumidityLastDay, setAirHumidityLastDay] = useState([20, 45, 30]);
    const [lightLastDay, setLightLastDay] = useState([20, 45, 30]);
    const [gasConcentrationLastDay, setGasConcentrationLastDay] = useState([20, 45, 30]);
    const [waterLevelLastDay, setWaterLevelLastDay] = useState([20, 45, 30]);
    const [soilMoistureLastDay, setSoilMoistureLastDay] = useState([20, 45, 30]);
    const [readDateLastDay, setReadDateLastDay] = useState(["January", "February", "march"]);

    const [airTemperatureLastWeek, setAirTemperatureLastWeek] = useState([11, 22, 30]);
    const [airHumidityLastWeek, setAirHumidityLastWeek] = useState([11, 22, 30]);
    const [lightLastWeek, setLightLastWeek] = useState([11, 22, 30]);
    const [gasConcentrationLastWeek, setGasConcentrationLastWeek] = useState([11, 22, 30]);
    const [waterLevelLastWeek, setWaterLevelLastWeek] = useState([11, 22, 30]);
    const [soilMoistureLastWeek, setSoilMoistureLastWeek] = useState([11, 22, 30]);
    const [readDateLastWeek, setReadDateLastWeek] = useState(["July", "August", "march"]);

    // D:\xampp\htdocs\greenlab\sensor_data.php
    const wiFiIPv4 = "192.168.0.101";
    const htdocsFolder = "greenlab";
    const manualCommandsPhpFile = "sensor_data.php";
    const fetchCommand =
        "http://" + wiFiIPv4 + "/" + htdocsFolder + "/" + manualCommandsPhpFile;


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

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
                    for (let i = 0; i < response.data.last_day.length; i++) {
                        airTemperatureLastDay[i] = Number(response.data.last_day[i].air_temperature);
                        airHumidityLastDay[i] = Number(response.data.last_day[i].air_humidity);
                        lightLastDay[i] = Number(response.data.last_day[i].light);
                        gasConcentrationLastDay[i] = Number(response.data.last_day[i].gas_concentration);
                        waterLevelLastDay[i] = Number(response.data.last_day[i].water_level);
                        soilMoistureLastDay[i] = Number(response.data.last_day[i].soil_moisture);

                        parsedReadDate = response.data.last_day[i].read_date;
                        parsedDay = parsedReadDate.slice(8, 10);
                        parsedHour = parsedReadDate.slice(11, 13);
                        newParsedReadDate = parsedDay + 'h' + parsedHour;
                        readDateLastDay[i] = newParsedReadDate;
                    }

                    // // Last week
                    for (let i = 0; i < response.data.last_week.length; i++) {
                        airTemperatureLastWeek[i] = Number(response.data.last_week[i].avg_air_temperature);
                        airHumidityLastWeek[i] = Number(response.data.last_week[i].avg_air_humidity);
                        lightLastWeek[i] = Number(response.data.last_week[i].avg_light);
                        gasConcentrationLastWeek[i] = Number(response.data.last_week[i].avg_gas_concentration);
                        waterLevelLastWeek[i] = Number(response.data.last_week[i].avg_water_level);
                        soilMoistureLastWeek[i] = Number(response.data.last_week[i].avg_soil_moisture);

                        parsedReadDate = response.data.last_week[i].read_date;
                        parsedMonth = month[response.data.last_week[i].read_month];
                        parsedDay = response.data.last_week[i].read_day;
                        newParsedReadDate = parsedMonth + ', ' + parsedDay;
                        readDateLastWeek[i] = newParsedReadDate;
                        
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getDbSensorData();
    }, [refreshing]);

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default GraphScreen;
