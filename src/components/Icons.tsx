import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";

export const NextCard = () => <Svg width="48" height="29" viewBox="0 0 48 29" fill="none">
  <Path d="M0 27.399H44.566L33.285 19.999" stroke="white" strokeWidth="2"/>
  <Path d="M12.5 19C17.7467 19 22 14.7467 22 9.5C22 4.25329 17.7467 0 12.5 0C7.25329 0 3 4.25329 3 9.5C3 14.7467 7.25329 19 12.5 19Z" fill="white"/>
  <Path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#929292" strokeWidth="2"/>
</Svg>;

export const Cross = () => <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  <Rect x="18" y="1" width="2" height="24" rx="1" transform="rotate(45 18 1)" fill="#303030"/>
  <Rect width="2" height="24" rx="1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 17.9707 19)" fill="#303030"/>
</Svg>;

export const Plus = () => <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
  <Path d="M9.71973 15L9.71973 1C9.71973 0.447715 9.2541 0 8.67973 0C8.10535 0 7.63973 0.447715 7.63973 1L7.63973 15C7.63973 15.5523 8.10535 16 8.67973 16C9.2541 16 9.71973 15.5523 9.71973 15Z" fill="white"/>
  <Path d="M1.4 9.00101L15.96 9.00101C16.5344 9.00101 17 8.55329 17 8.00101C17 7.44872 16.5344 7.00101 15.96 7.00101L1.4 7.00101C0.825624 7.00101 0.360001 7.44872 0.360001 8.00101C0.360001 8.55329 0.825624 9.00101 1.4 9.00101Z" fill="white"/>
</Svg>;

export const Down = () => <Svg width="13" height="9" viewBox="0 0 13 9" fill="none">
  <Path d="M6.06209 8.5L-8.75275e-05 1.0627e-07L12.1243 -9.53674e-07L6.06209 8.5Z" fill="black"/>
</Svg>


export default {};
