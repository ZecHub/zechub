function initOrionColorPicker() {
  const toggle = document.getElementById('orion-toggle-picker');
  const picker = document.getElementById('orion-dropdown-panel');
  const swatches = document.querySelectorAll('.orion-swatch');
  const preview = document.getElementById('orion-preview');
  const hiddenInput = document.getElementById('orion-hidden-input');
  const confirmBtn = document.getElementById('orion-confirm-btn');
  const hashtagIcon = document.getElementById('orion-hashtag-icon');
  const colorInputField = document.getElementById('orion-text-input');
  const eyedropperIcon = document.getElementById('orion-eyedropper-icon');

  // Toggle dropdown
  if (toggle && picker) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      picker.style.display = picker.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Click swatches
  swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      if (preview) preview.style.backgroundColor = color;
      if (hiddenInput) hiddenInput.value = color;
    });
  });

  // Confirm button
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (picker) picker.style.display = 'none';
    });
  }

  // Click outside to close
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.orion-dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      if (picker) picker.style.display = 'none';
    }
  });

  // Hashtag icon → text input
  if (hashtagIcon && colorInputField) {
    hashtagIcon.addEventListener('click', () => {
      hashtagIcon.style.display = 'none';
      colorInputField.style.display = 'inline-block';
      colorInputField.focus();
      colorInputField.value = '#';
    });

    colorInputField.addEventListener('input', () => {
      const val = colorInputField.value;
      if (/^#[0-9a-fA-F]{3,6}$/.test(val)) {
        if (preview) preview.style.backgroundColor = val;
        if (hiddenInput) hiddenInput.value = val;
      }
    });
  }

  // Eyedropper tool
  if (eyedropperIcon) {
    eyedropperIcon.addEventListener('click', async () => {
      if ('EyeDropper' in window) {
        try {
          const eyeDropper = new EyeDropper();
          const result = await eyeDropper.open();
          const pickedColor = result.sRGBHex;
          if (preview) preview.style.backgroundColor = pickedColor;
          if (hiddenInput) hiddenInput.value = pickedColor;
          if (colorInputField) {
            colorInputField.value = pickedColor;
            colorInputField.style.display = 'inline-block';
          }
          if (hashtagIcon) hashtagIcon.style.display = 'none';
        } catch (err) {
          console.warn('Eyedropper canceled:', err);
        }
      } else {
        alert('Eyedropper API not supported in this browser.');
      }
    });
  }
}
