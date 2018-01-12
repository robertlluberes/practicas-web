$(document).ready(function () {
  $("#random").on("click", function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  $("#search").on("change paste keyup", function () {
    Search();
  });

  function Search() {
    $.ajax({
      method: "GET",
      dataType: 'jsonp',
      contentType: 'application/json',
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        action: "opensearch",
        search: $("#search").val(),
        namespace: "0",
        limit: "3",
        format: "json"
      },
      success: function (data) {
        $(".results").empty();
        for (var i = 0; i < data[1].length; i++) {
          $(".results").append("<article><h2 id='title'><a href=" + data[3][i] + " target='_blank'>" + data[1][i] + "</a></h2> <p id='content'>" + data[2][i] + "</p></article>");
          $("article").append("");
        }
      }
    }
    );
  }
});