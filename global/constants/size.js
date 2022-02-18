import { Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// For the crib screen

// These three heights should equal the height of the entire screen
const headerHeight = 68;
const controlsHeight = (screenHeight - headerHeight) / 3;
const diagnosticsHeight = screenHeight - controlsHeight - headerHeight;

// These heights are contained within diagnostics
const marginWidthTotal = screenWidth * 0.1;
const videoHeight = diagnosticsHeight * 0.5 - 20;
const heartbeatHeight = diagnosticsHeight - videoHeight - 100;
const heartWidth = heartbeatHeight * 0.63;
const barLength = screenWidth - marginWidthTotal - heartWidth - 70;

const Size = {
    headerHeight,
    controlsHeight,
    diagnosticsHeight,
    videoHeight,
    heartbeatHeight,
    heartWidth,
    barLength
}

export default Size;