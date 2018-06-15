

  $(document).on("click", ".btn", function(){
    
    $.getJSON("/news", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#news").append(`<p data-id= ${data[i]._id}> ${data[i].headline} <a href="${data[i].link}"> Click Me </a> </p> `);
      } 
      $("#wrapper").show();

    });

  })
  
  
  $(document).on("click", "p", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/news/" + thisId
    })
      .then(function(data) {
        console.log(data);

        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        if (data.notes) {
          $("#bodyinput").val(data.notes.body);
          
        }
      });
  });
  
  $(document).on("click", "#savenote", function() {
    
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/news/" + thisId,
      data: {
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#bodyinput").empty();
      });
  
    
    $("#bodyinput").val("");
  });
  
 