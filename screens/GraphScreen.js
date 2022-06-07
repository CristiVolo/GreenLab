import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import TransferButton from "../components/TransferButton";
import { SafeAreaView } from "react-native";
import LineGraph from "../components/LineGraph";
import axios from "axios";

const GraphScreen = ({ navigation }) => {
    return (
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
        </SafeAreaView>
    );
};

export default GraphScreen;
