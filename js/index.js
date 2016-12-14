$(document).ready(function(){
  //Initial load of the quote and the color
  RandomColor();
  GetQuote();
  //Load a new quote when click the random button
  $("#randomButton").click(function(){
   RandomColor();
   GetQuote();
  }) 
  
});

//random color function
function RandomColor(){
  //Hexadecimal random color
  var color = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  //Applying color to the elements
  $("html").css("background-color", color);
  $("body").css("background-color", color);
  $(".colored").css("color", color);
}

//Getting the quote from the API
function GetQuote(){
  $.ajax({
  jsonp: "jsonp",
  dataType: "jsonp",
  url: 'http://api.forismatic.com/api/1.0/',
  contentType: 'application/jsonp',
  data: {
    lang: "en",
    method: "getQuote",
    format: "jsonp"
  },
  //OnSuccess  
  success: function (data) {    
    $("#quote").text(data.quoteText);
    //If the quote don't have author then I put "Unknow"
      if(data.quoteAuthor == ""){
          $("#author").text("Unknown");
       }else{
         $("#author").text(data.quoteAuthor);
       }
    //Setting the query to share with twitter
    $("#twiterButton").attr("href","https://twitter.com/intent/tweet?text=" + data.quoteText + "-"  +data.quoteAuthor);
  },
    //OnError
    error: function (data) {
      $("#author").text("Error loading the quote");
      $("#author").text("");
    }
  });

}