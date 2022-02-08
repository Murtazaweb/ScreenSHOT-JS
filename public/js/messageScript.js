// function to get specific user Messages from the API
const getSelectedUserMsg = (user) => {
    // console.log(user)
    receiver = user;
    $.get(`${host}/messagesByUser/${sender}/${user}`, async (data) => {
        await data.forEach(addMessages);
    })
}

// -------------------Messages API----------------------------
// function to fetch the messages from the API
const getMessages = () => {
    $.get(`${host}/messages`, async (data) => {
        await data.forEach(addMessages);
    })
}

// function to post message to the API
const sendMessage = async (message) => {
    await $.post(`${host}/newmessages`, message)
        .then(resp => {
            addMessages(resp)
        }).catch(err => {
            console.log(err)
        })
    // $("#receiver").val("");
    $("#message").val("");

    notification('success-msg', ' Message is Sent Successfully', 'success')


    setTimeout(function () {
        $('.success-msg').fadeOut('fast');
    }, 2000);
}


// function to add New Message in div
const addMessages = async (message) => {
    let html = "";
    let align = "pull-left";
    let clr = "skyblue";
    if (message.sender == sender) {
        align = "pull-right"
        clr = "lightgreen"
    }
    html += `<div class="${align}" style="background-color:${clr};padding:1% 4%;color:white">
    <p>  ${message.message} &emsp; <span class="text-muted text-right">${new Date(message.createdAt).toUTCString()}</span></p>
    </div><hr><br><br>`
    await $("#messages").append(html)
}


