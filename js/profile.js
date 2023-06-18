const apiBaseURL = "https://microbloglite.herokuapp.com";

const loggedIn = () => {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || null;
};
const logout = () => {
  const loginData = loggedIn();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("../pages/login.html"); // redirect back to landing page
    });
};

if (loggedIn() !== null) {
  const postText = document.getElementById("createPost");
  const postForm = document.getElementById("postForm");
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", logout);

  const createPost = async (e) => {
    e.preventDefault();
    console.log(postText.value);
    await fetch(apiBaseURL + "/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedIn().token}`,
      },
      body: JSON.stringify({ text: postText.value }),
    });
  };
  postForm.addEventListener("submit", createPost);
} else {
  window.location.assign("../pages/login.html");
}
