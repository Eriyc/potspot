import {Dimensions, Platform} from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;

export const INITIAL_POS: [number, number] = [
  11.605112551760044, 57.637770511076575,
];
