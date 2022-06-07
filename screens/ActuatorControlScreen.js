import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import TransferButton from "../components/TransferButton";
import { SafeAreaView } from "react-native";
import ActuatorButton from "../components/ActuatorButton";
import { useState } from "react";
import axios from "axios";

const ActuatorControlScreen = ({ navigation }) => {
    // Next line is put in use by the "Auto mode" switch only
    const [autoMode, setAutoMode] = useState(false);

    // States for each switch
    const [waterPump, setWaterPump] = useState(false);
    const [heater, setHeater] = useState(false);
    const [entryFan, setEntryFan] = useState(false);
    const [exitFan, setExitFan] = useState(false);
    const [ledMatrix, setLedMatrix] = useState(false);
    // D:\xampp\htdocs\greenlab\manual_commands.php
    const wiFiIPv4 = "192.168.0.101";
    const htdocsFolder = "greenlab";
    const manualCommandsPhpFile = "manual_commands.php";
    const fetchCommand =
        "http://" + wiFiIPv4 + "/" + htdocsFolder + "/" + manualCommandsPhpFile;
    // const postManualState = () => {
    //     fetch(fetchCommand, {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             auto_mode_manual_switch: autoMode,
    //             water_pump_manual_switch: waterPump,
    //             heater_manual_switch: heater,
    //             entry_fan_manual_switch: entryFan,
    //             exit_fan_manual_switch: exitFan,
    //             led_matrix_manual_switch: ledMatrix,
    //         }),s
    //     });
    // };
    useEffect(() => {
        const postManualState = async () => {
            axios
                .post(
                    fetchCommand,
                    JSON.stringify({
                        auto_mode_manual_switch: autoMode,
                        water_pump_manual_switch: waterPump,
                        heater_manual_switch: heater,
                        entry_fan_manual_switch: entryFan,
                        exit_fan_manual_switch: exitFan,
                        led_matrix_manual_switch: ledMatrix,
                    })
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        postManualState();
    }, [autoMode, waterPump, heater, entryFan, exitFan, ledMatrix]);

    return (
        <SafeAreaView>
            <ScrollView>
                <TransferButton
                    onPress={() => navigation.goBack()}
                    style={{
                        marginLeft: 30,
                        marginTop: 70,
                    }}
                    color="lightseagreen"
                />
                <ActuatorButton
                    actuatorName="Auto mode"
                    onPress={() => {
                        setAutoMode(!autoMode);
                    }}
                    style={styles.selectorStyle}
                />
                <ActuatorButton
                    actuatorName="Water pump"
                    disabled={autoMode}
                    onPress={() => {
                        setWaterPump(!autoMode && !waterPump);
                    }}
                    style={styles.selectorStyle}
                />
                <ActuatorButton
                    actuatorName="Heater"
                    disabled={autoMode}
                    onPress={() => {
                        setHeater(!autoMode && heater);
                    }}
                    style={styles.selectorStyle}
                />
                <ActuatorButton
                    actuatorName="Entry fan"
                    disabled={autoMode}
                    onPress={() => {
                        setEntryFan(!autoMode && !entryFan);
                    }}
                    style={styles.selectorStyle}
                />
                <ActuatorButton
                    actuatorName="Exit fan"
                    disabled={autoMode}
                    onPress={() => {
                        setExitFan(!autoMode && !exitFan);
                    }}
                    style={styles.selectorStyle}
                />
                <ActuatorButton
                    actuatorName="LED matrix"
                    disabled={autoMode}
                    onPress={() => {
                        setLedMatrix(!autoMode && !ledMatrix);
                    }}
                    style={styles.selectorStyle}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ActuatorControlScreen;

const styles = StyleSheet.create({
    selectorStyle: {
        justifyContent: "center",
        alignSelf: "center",
        width: 350,
        marginTop: 50,
        position: "relative",
    },
    autoModeSwitchStyle: {
        justifyContent: "center",
        alignSelf: "center",
        width: 350,
        marginTop: 50,
        position: "relative",
    },
});
