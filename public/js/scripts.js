let receiver = "",
    sender = "";
const host = "http://159.89.206.41:3000";

//    on document load
$(() => {
    let temp = (document.cookie.split('username')[1] != undefined ? document.cookie.split('username')[1].split('=')[1] : '');
    if (temp != '' && temp != undefined && temp != null) {
        temp = decodeURI(temp);
        // console.log(temp)
        sender = temp;
        $('.auth-user').text(sender);
        $('.auth').css({ "display": "block" })
        $('.unauth').css({ "display": "none" })
    } else {
        $('.auth').css({ "display": "none" })
        $('.unauth').css({ "display": "block" })
    }
    // message send button
    $("#send").click(() => {
        // sender = $("#sender").val();
        // receiver = $("#receiver").val();
        let message = $("#message").val();
        // sending message
        sendMessage({
            sender: sender,
            receiver: receiver,
            message: message,
        });
    })
    // register button
    $("#signupBtn").click(() => {
        signup();
    })
    // getAllUsers();
    // getMessages();
    setTimeout(() => {
        location.reload(true);
    }, 1800000)
    if (location.pathname == '/chats') {
        $(".new-message-container").css({ "display": "none" })
        getAllUsers();
    }
})

const notification = (block, msg, style) => {
    $(`.${block}`).append(
        `<div class="conatiner col-sm-12 alert alert-${style}" role="alert">
           ${msg}
            <a href="#" class="close" data-dismiss="alert">&times;</a>
        </div>`
    )
}
