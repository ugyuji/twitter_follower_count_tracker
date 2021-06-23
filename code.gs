function updateFollowersCount() {
  // Get my sheet
  const my_sheet = SpreadsheetApp.getActiveSheet();
  
  // Get followers count
  const screen_name = my_sheet.getRange("B1").getValue();
  const api_endpoint = "https://api.twitter.com/1.1/users/show.json?screen_name=" + screen_name;
  const script_properties = PropertiesService.getScriptProperties();
  const token = script_properties.getProperty("TWITTER_BEARER_TOKEN");
  const request_options = {
    "method": "get",
    "headers": {
      "authorization": "Bearer " + token
    }
  }
  const response = JSON.parse(UrlFetchApp.fetch(api_endpoint, request_options))
  const followers_count = response.followers_count;

  // Save to the sheet
  const now = new Date();
  const created_at = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
  my_sheet.appendRow([created_at, followers_count])
}

