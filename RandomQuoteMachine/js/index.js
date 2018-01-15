$(document).ready(function(){
  //Initial load of the quote and the color
  $("#quote, #author").fadeIn('slow'); 
  GetQuote();   
});

  
$("#randomButton").click(function(){
   $("#quote, #author").fadeOut('slow');
   GetQuote();  
})

//Getting the quote from the API
function GetQuote(){
  $.ajax({
    jsonp: "jsonp",
    dataType: "jsonp",
    url: 'https://api.forismatic.com/api/1.0/',
    contentType: 'application/jsonp',
    data: {
      lang: "en",
      method: "getQuote",
      format: "jsonp"
    },
    success: function (data){
      $("#quote").fadeOut('slow').html(data.quoteText).hide().fadeIn('slow'); 
      if(data.quoteAuthor === ""){
        $("#author").fadeIn('slow').text("Unknown");
      }else{
        $("#author").fadeOut('slow').text(data.quoteAuthor).hide().fadeIn('slow');
      }    
    
      RandomColor();
      
      $('#twiterButton').attr("href",'https://twitter.com/intent/tweet?text=' +  encodeURIComponent(data.quoteText)  + '-'  + data.quoteAuthor);
    },
    error: function (data) {
      $("#author").text("Error loading the quote");
      $("#author").text("");
    }
  });
}

function RandomColor(){
  var color = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  $("html,body").css("background-color", color);
  $("#quote,.fa").css("color", color);
}