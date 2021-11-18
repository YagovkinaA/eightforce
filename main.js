document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('textarea, input').forEach(function(e) {
        if(e.value === '') e.value = window.localStorage.getItem(e.name, e.value);
        e.addEventListener('input', function() {
            window.localStorage.setItem(e.name, e.value);
        })
    })
});

$(document).ready(function (){
    PopUpHide();
});

function popshow(){
    $("#ppup").show();
    chckpapram();
    history.pushState(null, null, '#ppup');
    $(window).on('popstate', hidePopup);
}


function hidePopup() {
    $(window).off('popstate', hidePopup);
    $('#ppup').removeClass('active');
    PopUpHide();
}

function PopUpEnd(){
    if(history.state === 'popup-open')  {
        window.history.back();
    }
    hidePopup();
}
function PopUpHide(){
    $("#ppup").hide();
}

function chckpapram(){
    let name = $('#name').val();
    let email = $('#email').val();
    let msg = $('#msg').val();
    localStorage.name = name;
    localStorage.email = email;
    localStorage.msg = msg;
    if(name.length !== 0 && email.length !== 0 && msg.length !== 0 && $('#check').prop("checked")){
        $('#send').removeAttr('disabled');
    }
    else{
        $('#send').attr('disabled', 'disabled');
    }
}

$(function(){
    $(".ajaxForm").submit(function(e){

        e.preventDefault();

        let href = $(this).attr("action");

        $.ajax({

            type: "POST",

            dataType: "json",

            url: href,

            data: $(this).serialize(),

            success: function(response){

                if(response.status === "success"){
                    alert("We0got0your0Pray000THX!!!");
                    localStorage.clear();
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("msg").value = "";
                    PopUpEnd();
                }else{
                    alert("An error occurred: " + response.message);

                }
            }
        });
    });
});
