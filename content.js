// This script is injected into the Twitter/X page.
// It applies a custom theme based on preferences received from the popup.

// Function to apply the CSS styles to the page
function applyStyles(accentColor, timelineColor, fontFamily) {
  // Check if a style element already exists, and remove it if it does
  const existingStyleSheet = document.getElementById('theme-extension-styles');
  if (existingStyleSheet) {
    existingStyleSheet.remove();
  }

  // Create a new style element to hold our CSS.
  const styleSheet = document.createElement("style");
  styleSheet.id = 'theme-extension-styles';

  // Set the inner HTML of the style element with our custom CSS rules.
  // We use `!important` to ensure our styles override Twitter's default ones.
  styleSheet.innerHTML = `
    /* Change the main body background color */
    body {
        background-color: #000000 !important;
    }

    /* Change the background color of the main content timeline */
    div[data-testid="primaryColumn"] {
        background-color: ${timelineColor} !important;
    }

    body, p, span, a, h1, h2, h3, h4, h5, h6 {
        font-family: ${fontFamily} !important;
    }
    
    /*[data-testid="placementTracking"] {*/
    /*    visibility: hidden;*/
    /*    height: 0;*/
    /*    width: 0;*/
    /*}*/
    [data-testid="super-upsell-UpsellCardRenderProperties"] {
        visibility: hidden;
        height: 0;
        width: 0;
    }

    [data-testid="tweet"] {
        color: azure;
        background-color: #00000023;
        border-block-style: initial;
        border-block-color: antiquewhite;
        border-block-width: 5px;
        margin-right: 5px;
    }
    .r-1kkk96v {
        background-color: rgb(255 255 255);
        margin-top: -15px;
        /* border-bottom: rgb(255 255 255); */
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .r-yyyyoo {
        fill: ${accentColor};
    }
    .css-175oi2r {
        border-radius: 0px;
    }

    .r-sdzlij {
      border-bottom-left-radius: 0px !important; 
      border-bottom-right-radius: 0px !important; 
      border-top-left-radius: 0px !important; 
      border-top-right-radius: 0px !important;
    }
    .r-2r9icm
      {
          background-color: rgb(255 64 0);
          color: white;
      }
    .r-1q9bdsx {
      border-radius: 0px !important; 
    }
      .r-qo02w8 {
        border: 0.01em dashed #e74b4b8a;
    /* box-shadow: rgb(231 151 113 / 42%) 0px 0px 15px, rgb(203 109 109 / 0%) 0px 0px 3px 1px; */
    }

    [data-chart=chart-r5] {
    --color-Impressions: hsl(0deg 0% 100%);
    }   
    [data-chart=chart-r9] {
    --color-Follows: hsl(44.17deg 32.12% 81.95%);
    --color-Unfollows: hsl(356deg 100% 72.96%);
    }
    [data-chart=chart-rd] {
    --color-Posts: hsl(34.87deg 46.54% 93.16%);
    --color-Replies: hsl(160deg 100% 77.13%);
    }


  `;

  // Append the style element to the head of the page to apply the styles.
  console.log('hbsh')
  document.head.appendChild(styleSheet);
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'applyTheme') {
    applyStyles(request.accentColor, request.timelineColor, request.fontFamily);
  }
});

// Apply the saved theme on page load
chrome.storage.sync.get(['accentColor', 'timelineColor', 'fontFamily'], (result) => {
  const defaultaccentColor = '#d41f19';
  const defaultTimelineColor = '#000000ff';
  const defaultFontFamily = 'monospace';

  const accentColor = result.accentColor || defaultaccentColor;
  const timelineColor = result.timelineColor || defaultTimelineColor;
  const fontFamily = result.fontFamily || defaultFontFamily;

  applyStyles(accentColor, timelineColor, fontFamily);
});




