var url = window.location.href;
const backendURL = "https://2d05-115-160-223-174.ngrok-free.app";

// Use the URLSearchParams API to extract the access_token
var urlParams = new URLSearchParams(url.split('#')[1]);
var id_token = urlParams.get('id_token');
var code = urlParams.get('code');

// Print the access_token to the console
console.log(id_token);
console.log(code);

if (id_token && code) {
    fetch(`${backendURL}/api/auth/google/login?code=${code}&id_token=${id_token}`, {
        method: 'GET',
        // body: JSON.stringify({
        //     "requestFor": "LOGIN_REQUEST",
        //     "loginRequestDto": {
        //         "googleToken": accessToken
        //     }
        // }),
        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8',
        // },
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
        }),

    }).then((re) => {
        re.json().then(data => {
            localStorage.setItem("oauthUsername", data['username']);
            localStorage.setItem("oauthJwtToken", data['jwtToken']);
            localStorage.setItem("oauthRefreshToken", data['refreshToken']);
            localStorage.setItem("oauthId", data['userId']);
            window.location.href = "http://localhost:5500/dashboard.html"
        })
    });
}

document.getElementById('loginBtn').addEventListener('click', (e) => {
    // Define the OAuth 2.0 parameters
    e.preventDefault();
    const clientId = '894866480970-rh1o7ggl33mhqfnkit0pd4scon069qgu.apps.googleusercontent.com';
    const redirectUri = `http://${window.location.host}/login.html`;
    const scope = 'email profile https://www.googleapis.com/auth/calendar.events'; // Define the required scopes

    // Construct the authorization URL
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=id_token code`;
    // const authUrl = "http://localhost:4200/auth/login#state=state_parameter_passthrough_value&code=4/0AfJohXmyivnvtLVX9X-FG-VflRCDVq-VHXwodN4NlMC6RpS3cp9YEDwkWbxpAPYR2EVWbg&scope=email%20profile%20https://www.googleapis.com/auth/calendar%20openid%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmNzI1NDEwMWY1NmU0MWNmMzVjOTkyNmRlODRhMmQ1NTJiNGM2ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3MDI1NzExMjkzNDgtaG51cjlnbWQxanN0MHUwOWlxMHQ1NHA2MzY1NDNlc3AuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3MDI1NzExMjkzNDgtaG51cjlnbWQxanN0MHUwOWlxMHQ1NHA2MzY1NDNlc3AuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc5MzU0NzcxMjc3OTA5NzY4MDciLCJoZCI6ImNvZGl0YXMuY29tIiwiZW1haWwiOiJtb2hkLnVzbWFuQGNvZGl0YXMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNfaGFzaCI6IjMzY283N01hY19ab04xclBjZ0NneUEiLCJub25jZSI6ImZJR05QQU5tblJHT0k1RVM0bWJlSWhXaTU4MEs4eXZ3Z0lMWks5cm41b0EiLCJuYmYiOjE2OTU3MDkzNTUsIm5hbWUiOiJNb2hkIFVzbWFuIEJhcmthYXRpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xkdGp3S19YN250VXhtRVc2ZUl4azREUV9VSjZqWHBDSUpFXzhZWFVxOT1zOTYtYyIsImdpdmVuX25hbWUiOiJNb2hkIFVzbWFuIiwiZmFtaWx5X25hbWUiOiJCYXJrYWF0aSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjk1NzA5NjU1LCJleHAiOjE2OTU3MTMyNTUsImp0aSI6IjFhNWM2YzBjZGE4MmRhMWIzNjdhYjA1ZWZhMGM4NDEwNDAzMmVkNjgifQ.KTzJIqPKbfUKNwdi59cG8H4w7f6WNJJQWtcsns3HJN_rPZIRU2nE8c5VsKgvnhfVINYkL2CbCD82DYN_i7w-WVYXb2mJJKduI6BZxna3Bs1tMhGw73kt2h3eIpcQV2Yu-mQvjPD99-CXbgaOR8sWc4pFq1cusHej6JKC2TUYcy__tsWveudqn049KK33b6vtYNc_ZOsJFCBm_Whrdk4M8CKKy5s0QbIdA2u1lKDn3MTHn_bhEneUrRnxbWfuZiFXjgSWNcFsxI91Wpo__rz69xWoy2JzdtoZM6I_4nbmTz5mhPDajuvAT8F7DBWZhGSTkzsd51KuOCP9zjBQavTswA&authuser=0&hd=coditas.com&prompt=none";

    // Redirect the user to the Google OAuth consent screen
    window.location.href = authUrl;
});