import Phaser from "phaser";
export type ControlSet = { cursors: Phaser.Types.Input.Keyboard.CursorKeys; wasd?: Record<string, Phaser.Input.Keyboard.Key>; };
export function initControls(scene: Phaser.Scene): ControlSet {
  const cursors = scene.input.keyboard!.createCursorKeys();
  // TODO: WASD
  return { cursors };
}
