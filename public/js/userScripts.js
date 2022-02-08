
// -------------------Users API----------------------------
// function to fetch the users from the API
const getAllUsers = () => {
    $.get(`${host}/user/getall`, async (response) => {
        await response.data.forEach(appendUsers);
    })
}

// function to post new users to the API
const createUser = async (user) => {
    await $.post(`${host}/user/register`, user)
        .then(resp => {
            notification('notification', resp.message, (resp.status == 201 || resp.status == 200 ? 'success' : 'warning'));
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            notification('notification', err.responseJSON.message, 'warning');
        })

}


// on submit of new user form this function is called
const signup = async () => {
    try {
        // get username
        let username = $("#username");
        let password = $("#password");
        let repeatPassword = $("#repeat-password");

        if (username.val() == "") {
            notification('notification', 'Username cannot be blanked', 'danger');
            password.val("");
            repeatPassword.val("");
        }
        else if (password.val() != repeatPassword.val()) {
            notification('notification', 'Passwords and Confirm Password does not Match', 'danger');
            password.val("");
            repeatPassword.val("");
        }
        else if (password.val() == repeatPassword.val() && username.val() != "") {
            // send it to server
            await createUser({
                username: username.val(),
                password: password.val(),
            })
            username.val("");
            password.val("");
            repeatPassword.val("");
            // window.location.href("/signin")
        }
    } catch (err) {
        console.log(JSON.stringify(err))
        notification('notification', err.message, 'warning');
    }

}


// function to add New User 
const appendUsers = (user) => {
    if (user.username != sender) {
        let html = "";
        html += `<li class="list-group-item list-group-item-primary"><a class="btn btn-block btn-info" onclick='onUserSelected(this.innerHTML);'>${user.username ? user.username : user}</a></li>`;
        $("#users").append(html);
    }
}

// on click of User Name
const onUserSelected = (username) => {
    $(".new-message-container").css({ "display": "block" })
    $("#messages").html("")
    // if (receiver != username)
    getSelectedUserMsg(username)
    // save selected user in global variable
    receiver = username;
    $(`#receiver`).text(receiver);
}


