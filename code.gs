function updateFollowersCount() {
  // Get my sheet
  const mySheet = SpreadsheetApp.getActiveSheet();
  
  // Get followers count
  const screenName = mySheet.getRange("B1").getValue();
  const apiEndpoint = "https://api.twitter.com/1.1/users/show.json?screen_name=" + screenName;
  const scriptProperties = PropertiesService.getScriptProperties();
  const token = scriptProperties.getProperty("TWITTER_BEARER_TOKEN");
  const requestOptions = {
    "method": "get",
    "headers": {
      "authorization": "Bearer " + token
    }
  }
  const response = JSON.parse(UrlFetchApp.fetch(apiEndpoint, requestOptions))
  const followersCount = response.followers_count;

  // Save to the sheet
  const now = new Date();
  const createdAt = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
  mySheet.appendRow([createdAt, followersCount])
}

