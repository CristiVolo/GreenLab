import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";

const ActuatorButton = ({ actuatorName, style, disabled, onPress, state }) => {
    let stateOff = " OFF";
    let stateOn = " ON";

    stateOff = actuatorName + stateOff;
    stateOn = actuatorName + stateOn;

    return (
        <View>
            <SwitchSelector
                initial={0} // Item selected at first render
                disabled={disabled}
                value={disabled ? 0 : null}
                style={[style, { opacity: disabled ? 0.5 : 1 }]}
                onPress={onPress}
                options={[
                    {
                        // Open relay
                        label: stateOff,
                        value: false,
                        activeColor: "tomato",
                    },
                    {
                        // Closed relay
                        label: stateOn,
                        value: true,
                        activeColor: "lightseagreen",
                    },
                ]}
            />
        </View>
    );
};

export default ActuatorButton;
