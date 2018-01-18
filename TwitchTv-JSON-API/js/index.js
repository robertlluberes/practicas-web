$(document).ready(function () {
  GetChannelsInfo();
});

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function GetChannelsInfo() {
  var apiURL;

  channels.forEach(function (channel) {
    apiURL = "https://wind-bow.glitch.me/twitch-api/users/";
    apiURL = apiURL + channel;

    $.getJSON(apiURL, function (channelInfo) {
      ShowChannels(channelInfo);
    });
  });
}

function ShowChannels(data) {
  console.log(data);
  $("#Online")
    .append('<div class="profile">'
    + '<div class="row">'
    + '<div class="col s5 m4 l3">'
    + '<img src=' + (data.logo == undefined ? "https://cdn3.iconfinder.com/data/icons/genicons-interface/512/User-512.png" : data.logo) + ' alt="Profile logo" class="circle" style="width:100px;">'
    + '</div>'
    + '<div class="col s7 m8 l9">'
    + '<p class="valing-wrapper userName">' + data.display_name
    + '<span class="new badge purple darken-1" data-badge-caption="Online"></span>'
    + '</p>'
    + '</br>'
    + '<p class="channelBio">' + (data.bio == null ? "No bio" : data.bio) + '</p> '
    + '</div>'
    );
}