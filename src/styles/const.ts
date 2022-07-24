import { Dimensions, StatusBar } from 'react-native';

export const WindowWidth = Dimensions.get("window").width;
export const WindowHeight = Dimensions.get("window").height;
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
export const StatusBarHeight = StatusBar.currentHeight || 24;

export const navbarHeight = ScreenHeight - WindowHeight + StatusBarHeight;


export const CardDistance = 25;
export const CardHieght = 166;
export const CardWidth = ScreenWidth - (CardDistance * 2);
export const cardBgColors = ["#FEBB39", "#F8503E", "#3C7873"];
export const HighlightColor = "#F8503E";

export const ContainerHeight = ScreenHeight - CardHieght;
export const ActiveContainerHeight = ContainerHeight + 20;
