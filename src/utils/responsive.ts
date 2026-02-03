import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Converts width percentage to DP.
 * @param widthPercent The percentage of screen width (0-100)
 */
export const wp = (widthPercent: number | string) => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
};

/**
 * Converts height percentage to DP.
 * @param heightPercent The percentage of screen height (0-100)
 */
export const hp = (heightPercent: number | string) => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
};

/**
 * Scales size based on screen width.
 * @param size The size to scale
 */
export const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Scales size based on screen height.
 * @param size The size to scale
 */
export const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Moderated scale (useful for fonts and moderate scaling).
 * @param size The size to scale
 * @param factor The moderation factor (default 0.5)
 */
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
