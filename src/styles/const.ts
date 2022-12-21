import { Dimensions, StatusBar } from 'react-native';
import { SCREEN_HEIGHT} from '@gorhom/bottom-sheet';

export const WindowWidth = Dimensions.get("window").width;
export const WindowHeight = Dimensions.get("window").height;
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
export const StatusBarHeight = StatusBar.currentHeight || 24;

export const NavbarHeight = ScreenHeight - WindowHeight + StatusBarHeight;

export const CardHieght = 128;
export const cardBgColors = ["#FEBB39", "#F8503E", "#3C7873"];
export const HighlightColor = "#F8503E";

export const StepComponentHeight = ScreenHeight - CardHieght - StatusBarHeight;

export const TabBarHight = 50;
export const TabHeaderHeight = 100;
export const MainHeight = ScreenHeight - (TabBarHight + TabHeaderHeight) + StatusBarHeight;

export const BottomSheetScreenHeight = SCREEN_HEIGHT;
export const BottomSheetHeight = BottomSheetScreenHeight + StatusBarHeight;