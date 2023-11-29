const backendURL = "https://2d05-115-160-223-174.ngrok-free.app"
const token = `Bearer ${localStorage.getItem("oauthJwtToken")}`;

document.getElementById("currentUserId").innerText = "Welcome, " + localStorage.getItem("oauthUsername");

document.getElementById("logoutButtonId").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = `https://mohd-usman-coditas.github.io/OAUTHUI/login.html`;
})

function closePopUp() {
    document.getElementsByClassName("inputPopUp")[0].value = "";
    document.getElementsByClassName("inputPopUp")[1].value = "";
    document.getElementsByClassName("inputPopUp")[2].value = "";
    document.getElementsByClassName("inputPopUp")[3].value = "";
    document.getElementsByClassName("inputPopUp")[4].value = "";
    document.getElementsByClassName("inputPopUp")[5].value = "";
    document.getElementById("popUpId").style.display = "none";
}

document.getElementById("cancel-popup").addEventListener("click", (e) => {
    e.preventDefault();
    closePopUp();
})

function fetchAllUsers() {
    var url = `${backendURL}/api/user/getAll?id=${localStorage.getItem("oauthId")}`;
    console.log(url);
    console.log(token);
    fetch(url, {
        method: "GET",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
            "Authorization": token,
        })
    }).then(response => {
        data = response.json()
            .then(data => {
                const userListUl = document.getElementById('userListId');
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<p>${item['username']}</p>`;

                    const button = document.createElement('button');
                    button.innerText = "Schedule";
                    button.classList.add('buttonOver');

                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        document.getElementsByClassName("inputPopUp")[0].value = item['username'];
                        document.getElementById("popUpId").style.display = "block";
                        // Add your button click logic here
                    });

                    listItem.appendChild(button);

                    userListUl.appendChild(listItem);


                })
            })
    })
}

document.getElementById("createEventButtonId").addEventListener("click", (e) => {
    e.preventDefault();
    const receiver1Email = document.getElementsByClassName("inputPopUp")[0].value;
    const receiver2Email = document.getElementsByClassName("inputPopUp")[1].value;
    const summary = document.getElementsByClassName("inputPopUp")[2].value;
    const description = document.getElementsByClassName("inputPopUp")[3].value;
    const startTime = document.getElementsByClassName("inputPopUp")[4].value;
    const endTime = document.getElementsByClassName("inputPopUp")[5].value;

    if (receiver1Email && receiver2Email && summary && startTime && endTime) {
        const url = `${backendURL}/api/user/schedule/event`;
        console.log(url);
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "receiver1Email": receiver1Email,
                "receiver2Email": receiver2Email,
                "summary": summary,
                "endTime": endTime,
                "startTime": startTime
            }),
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
                "Authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            })
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                closePopUp();
            })
        });
    }
    else {
        const message = document.createElement("div").innerText = "Cannot Leave field Null";
        document.getElementById("popUpId").append(message);
    }
});

fetchAllUsers();