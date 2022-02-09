/*$(document).ready(function () {
$("#btnSubmit").submit(function(e) {
    e.preventDefault();
    var form = $('#my-form')[0];
         
                // FormData object 
                var data = new FormData(form);
         
                // If you want to add an extra field for the FormData
               // data.append("CustomField ", "This is some extra data, testing");
         
                // disabled the submit button
                //$("#btnSubmit").prop("disabled", true);
    $.ajax({
        url: "http://159.89.206.41/addurl",
        type: "POST",
        data: data,
        success: function(data){
            console.log(data);
        },
        error: function (e) {
            
            console.log("ERROR : ", e);
           // $("#btnSubmit").prop("disabled", false);
        }
    });
});
});*/

$(document).ready(function(){
    $("form#my-form").on('submit', function(e){
        e.preventDefault();
        $("#overlay").fadeIn(300);
        var data1 = $('input[name=endpoint]').val();
        console.log('formData Here', data1);
       
        $.ajax({
            type: 'post',
            url: 'http://159.89.206.41:3000/addurl', 
            data: data1
        })
        .done(function(data){
           console.log('success', data);
           $("#overlay").fadeOut(300);
           $('#myModal').modal('toggle');
           window.location = 'http://159.89.206.41:3000/' + data;
        });
    });
});

/*$(document).ready(function () {
    $("#btnSubmit").click(function () {
        var data1 = $('input[name=endpoint]').val();
       $.post("http://localhost:3000/addurl",
          {
             endpoint: data1
            // designation: "Professional gamer"
          },
          function (data, status) {
             console.log(data);
          });
    });
 });*/
