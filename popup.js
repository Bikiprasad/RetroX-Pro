document.addEventListener('DOMContentLoaded', () => {
  const accentColorInput = document.getElementById('accentColor');
  const timelineColorInput = document.getElementById('timelineColor');
  const fontFamilyInput = document.getElementById('fontFamily');
  const applyButton = document.getElementById('applyButton');

  // Load saved preferences when the popup is opened
  chrome.storage.sync.get(['accentColor', 'timelineColor', 'fontFamily'], (result) => {
    if (result.accentColor) {
      accentColorInput.value = result.accentColor;
    }
    if (result.timelineColor) {
      timelineColorInput.value = result.timelineColor;
    }
    if (result.fontFamily) {
      fontFamilyInput.value = result.fontFamily;
    }
  });

  // Save and apply preferences when the button is clicked
  applyButton.addEventListener('click', () => {
    const accentColor = accentColorInput.value;
    const timelineColor = timelineColorInput.value;
    const fontFamily = fontFamilyInput.value;

    // Save the new preferences
    chrome.storage.sync.set({
      accentColor,
      timelineColor,
      fontFamily
    }, () => {
      console.log('Theme preferences saved.');
    });

    // Send a message to the active tab to update the theme
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'applyTheme',
          accentColor,
          timelineColor,
          fontFamily
        });
      }
    });
  });
});
