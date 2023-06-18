const username = document.getElementById("username");
const fullname = document.getElementById("fullname");
const password = document.getElementById("password");
const submitForm = document.getElementById("loginForm");
const loader = document.getElementById("loader_cont");
const apiBaseURL = "https://microbloglite.herokuapp.com";

const loginUser = async (e) => {
  e.preventDefault();

  const loginData = {
    username: username.value,
    password: password.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  await fetch(apiBaseURL + "/auth/login", options).then(async (response) => {
    if (response.status != "200" || response.status != "200") {
      console.log(response);
      throw new Error(response);
    } else {
      let responseData = await response.json();
      window.localStorage.setItem("login-data", JSON.stringify(responseData));
      window.location.assign("../pages/posts.html"); // redirect

      return loginData;
    }
  });
};

submitForm.addEventListener("submit", loginUser);
