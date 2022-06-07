import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineGraph = ({
    backgroundGradientFrom,
    backgroundGradientTo,
    color,
    strokeWidth,
    legend,
    abscissaData,
    ordinateData,
}) => {
    const data = {
        labels: abscissaData,
        datasets: [
            {
                data: ordinateData,
                color: () => color, //`rgba(0, 0, 255, ${opacity})`,
                strokeWidth: strokeWidth, // optional
            },
            {
                data: ordinateData,
                color: () => color, //`rgba(0, 0, 255, ${opacity})`,
                strokeWidth: strokeWidth, // optional
            },
        ],
        legend: legend, // optional
    };
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: backgroundGradientFrom,
        backgroundGradientTo: backgroundGradientTo,
        fillShadowGradientFrom: backgroundGradientFrom,
        fillShadowGradientTo: backgroundGradientTo,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "steelblue",
        },
    };

    return (
        <View>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    );
};

export default LineGraph;
