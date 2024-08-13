// Add a listener for when the action button is clicked
chrome.action.onClicked.addListener((tab) => {
  if (tab.url) {
    try {
      const currentUrl = new URL(tab.url);

      // Regex to match the OSU beatmap page URL pattern
      const regex = /^https:\/\/osu\.ppy\.sh\/beatmapsets\/(\d+)#/;
      const match = currentUrl.href.match(regex);

      if (match) {
        const mapID = match[1];

        // Construct the new URL using the map ID
        const imageUrl = `https://assets.ppy.sh/beatmaps/${mapID}/covers/raw.jpg`;

        // Initiate the download of the image
        chrome.downloads.download(
          {
            url: imageUrl,
            filename: `osu_cover_${mapID}.jpg`, // Name the downloaded file
            conflictAction: 'uniquify', // Ensure unique filenames
          },
          (downloadId) => {
            if (chrome.runtime.lastError) {
              console.error("Download failed:", chrome.runtime.lastError);
            } else {
              console.log("Download started, ID:", downloadId);
            }
          }
        );
      } else {
        console.log("The URL does not match the expected OSU beatmap URL pattern.");
      }
    } catch (error) {
      console.error("Error processing URL:", error);
    }
  }
});
