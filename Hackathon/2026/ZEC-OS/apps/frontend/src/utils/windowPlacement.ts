import { WindowState } from '@/store/windowStore';

const TASKBAR_HEIGHT = 32;
const CASCADE_OFFSET_X = 60;
const CASCADE_OFFSET_Y = 50;
const START_X = 40;
const START_Y = 50;

export function calculateWindowPosition(
  existingWindows: WindowState[],
  newSize: { width: number; height: number },
  screenWidth: number,
  screenHeight: number
): { x: number; y: number } {
  const availableHeight = screenHeight - TASKBAR_HEIGHT;
  const visibleWindows = existingWindows.filter(w => !w.minimized);

  // If no windows, start at initial position
  if (visibleWindows.length === 0) {
    return { x: START_X, y: START_Y };
  }

  // Cascade from last window
  const lastWindow = visibleWindows[visibleWindows.length - 1];
  let newX = lastWindow.position.x + CASCADE_OFFSET_X;
  let newY = lastWindow.position.y + CASCADE_OFFSET_Y;

  // Wrap around if going off screen
  const maxX = screenWidth - newSize.width - 20;
  const maxY = availableHeight - newSize.height - 20;

  if (newX > maxX || newY > maxY) {
    // Reset to start with slight offset based on window count
    const offset = (visibleWindows.length % 5) * 30;
    newX = START_X + offset;
    newY = START_Y + offset;
  }

  // Ensure within bounds
  newX = Math.max(20, Math.min(newX, maxX));
  newY = Math.max(TASKBAR_HEIGHT + 10, Math.min(newY, maxY));

  return { x: newX, y: newY };
}
