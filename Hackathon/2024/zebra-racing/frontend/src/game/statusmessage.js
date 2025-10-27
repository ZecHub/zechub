export default class StatusMessage {
    constructor(scene, y) {
      this.scene = scene;
      this.y = y;
      this.hideTimer = null; // Reference to the delayedCall timer

      // Create the text object, initially invisible and with a placeholder text
      this.text = this.scene.add.text(0, this.y, '', {
        font: '24px Arial',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      }).setVisible(false);
  
      // Call the method to update the X coordinate
      this.updatePosition();
    }
  
    // Method to set the text content
    setText(message) {
      this.text.setText(message);
      this.updatePosition();  // Recalculate the position when the text changes
    }
  
    // Method to display the message for 10 seconds
    display() {
      this.text.setVisible(true);
  
      if (this.hideTimer) {
        this.hideTimer.remove(false); // Cancel the previous delayedCall
      }

      // Hide the message after 10 seconds
      this.hideTimer = this.scene.time.delayedCall(10000, () => {
        this.text.setVisible(false);
      });
    }
  
    // Method to update the X coordinate to center the text horizontally
    updatePosition() {
      const screenWidth = this.scene.scale.width;
      const textWidth = this.text.width;
      const xPosition = (screenWidth - textWidth) / 2;
  
      this.text.setX(xPosition);
    }
}