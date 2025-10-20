class PCMProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const input = inputs[0];
    if (input && input[0]) {
      const channelData = input[0]; // Float32 samples
      const int16 = new Int16Array(channelData.length);

      for (let i = 0; i < channelData.length; i++) {
        const s = Math.max(-1, Math.min(1, channelData[i]));
        int16[i] = s * 0x7fff;
      }

      // Send the raw buffer across the port
      this.port.postMessage(int16.buffer, [int16.buffer]);
    }
    return true;
  }
}

registerProcessor("pcm-processor", PCMProcessor);
