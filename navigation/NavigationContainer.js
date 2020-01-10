import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/HomeScreen";
import PlayerScreen from "../screens/PlayerScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import StartUpScreen from "../screens/StartUpScreen";
import MyVideosScreen from "../screens/MyVideosScreen";
import AddVideoScreen from "../screens/AddVideoScreen";
import TakeImageScreen from "../screens/TakeImageScreen";
//
import ModalScreen from "../screens/ModalScreens/ModalScreen";

const MainStack = createStackNavigator({
    StartUp: StartUpScreen,
    MyVideos: MyVideosScreen,
    AddVideo: AddVideoScreen,
    Login: LoginScreen,
    Register:RegisterScreen,
    Home: HomeScreen,
    Player: PlayerScreen,
    Account: ModalScreen,
    TakeImage: TakeImageScreen
})

const RootStack = createStackNavigator({
    Main: {
        screen: MainStack,
    },
    Account: {
        screen: ModalScreen,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
        backgroundColor: "transparent",
        opacity: 1
    }
});

export default createAppContainer(RootStack)