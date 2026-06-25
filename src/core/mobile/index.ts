export type { LayoutMode, ScreenSize } from './mobile_layout_adapter';
export { detectScreenSize, adaptLayout, isMobileDevice, getSafeAreaInsets } from './mobile_layout_adapter';

export type { TouchGesture, TouchHandler } from './touch_interaction_layer';
export { attachTouchHandlers } from './touch_interaction_layer';
