import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import TransferButton from "../components/TransferButton";
import { SafeAreaView } from "react-native";
import LineGraph from "../components/LineGraph";
import axios from "axios";

const GraphScreen = ({ navigation }) => {
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
                    console.log("-------------------------------------------");
                    console.log(response.data);
                    console.log(
                        "~-------------------------------------------~"
                    );
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
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="steelblue"
                    strokeWidth={4}
                    legend={["Air Temperature"]}
                    abscissaData={[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                    ]}
                    ordinateData={[20, 45, 28, 80, 99, 43]}
                />
                <LineGraph
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="teal"
                    strokeWidth={4}
                    legend={["Air Humidity"]}
                    abscissaData={[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                    ]}
                    ordinateData={[20, 45, 28, 80, 99, 43]}
                />
                <LineGraph
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="orange"
                    strokeWidth={4}
                    legend={["Light"]}
                    abscissaData={[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                    ]}
                    ordinateData={[20, 45, 28, 80, 99, 43]}
                />
                <LineGraph
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="rebeccapurple"
                    strokeWidth={4}
                    legend={["Gas Concentration"]}
                    abscissaData={[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                    ]}
                    ordinateData={[20, 45, 28, 80, 99, 43]}
                />
                <LineGraph
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="skyblue"
                    strokeWidth={4}
                    legend={["Water Level"]}
                    abscissaData={[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                    ]}
                    ordinateData={[20, 45, 28, 80, 99, 43]}
                />
                <LineGraph
                    backgroundGradientFrom="ivory"
                    backgroundGradientTo="lavender"
                    color="tan"
                    strokeWidth={4}
                    legend={["Soil Moisture"]}
                    abscissaData={[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                    ]}
                    ordinateData={[20, 45, 28, 80, 99, 43]}
                />
            </SafeAreaView>
        </ScrollView>
    );
};

export default GraphScreen;
