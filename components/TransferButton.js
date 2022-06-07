import React from "react";
import { TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const TransferButton = ({ onPress, style, color }) => {
    return (
        <View style={style}>
            <TouchableOpacity onPress={onPress}>
                <Feather name={"menu"} color={color} size={40} />
            </TouchableOpacity>
        </View>
    );
};

export default TransferButton;
