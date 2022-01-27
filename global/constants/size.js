import { Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;

// For the crib screen
const headerHeight = 68;
const controlsHeight = (screenHeight - headerHeight) / 3;
const diagnosticsHeight = screenHeight - controlsHeight - headerHeight;

const Size = {
    headerHeight,
    controlsHeight,
    diagnosticsHeight
}

export default Size;