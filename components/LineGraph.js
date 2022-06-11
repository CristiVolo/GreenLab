import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SwitchSelector from "react-native-switch-selector";

const LineGraph = ({
    onPress,
    backgroundGradientFrom,
    backgroundGradientTo,
    color,
    strokeWidth,
    legend,
    abscissaData,
    ordinateData
}) => {
    let data = {
        labels: abscissaData,
        datasets: [
            {
                data: ordinateData,
                color: () => color, //`rgba(0, 0, 255, ${opacity})`,
                strokeWidth: strokeWidth, // optional
            }
        ],
        legend: legend, // optional
    };
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: backgroundGradientFrom,
        backgroundGradientTo: backgroundGradientTo,
        // fillShadowGradientFrom: backgroundGradientFrom,
        // fillShadowGradientTo: backgroundGradientTo,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
            <SwitchSelector
                initial={0}
                style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    width: 300,
                    marginTop: 50,
                    position: "relative",
                }}
                onPress={onPress}
                options={[
                    {
                        // Most recent week
                        label: "24-Hour span",
                        value: false,
                        activeColor: "deepskyblue",
                    },
                    {
                        // Most recent day
                        label: "7-Day span",
                        value: true,
                        activeColor: "dodgerblue",
                    },
                ]}
            />
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
