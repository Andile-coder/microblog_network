const username = document.getElementById("username");
const fullname = document.getElementById("fullname");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const submitBtn = document.getElementById("btn");
const loader = document.getElementById("loader_cont");

const submitForm = document.getElementById("submitForm");
const registerUser = async (e) => {
  e.preventDefault();

  if (password.value === confirmPassword.value) {
    loader.style.display = "flex";
    await fetch("https://microbloglite.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password.value,
        username: username.value,
        fullName: fullname.value,
      }),
    })
      .then((e) => {
        window.location.assign("../pages/login.html");
      })
      .catch((e) => console.error(e));
  } else {
    //
    window.alert("Passwords does not match!");
  }
};

submitForm.addEventListener("submit", registerUser);
