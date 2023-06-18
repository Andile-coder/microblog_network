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

const filterByMostLikes = (posts) => {
  return posts.sort((a, b) => b.likes.length - a.likes.length);
};

const getAllposts = () => {
  if (loggedIn() !== null) {
    return fetch(apiBaseURL + "/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedIn().token}`,
      },
    }).then((response) => response.json());
  } else {
    return [];
  }
};
const recentPosts = () => {
  if (loggedIn() !== null) {
    return fetch(apiBaseURL + "/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedIn().token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      });
  } else {
    return [];
  }
};
if (loggedIn() !== null) {
  const postText = document.getElementById("createPost");
  const postForm = document.getElementById("postForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const recentBtn = document.getElementById("recent");
  recentBtn.addEventListener("click", recentPosts);
  logoutBtn.addEventListener("click", logout);

  recentPosts().then((data) => {
    console.log(data);
    postsContainer = document.getElementById("posts");
    data.map((post) => {
      var post1 = document.createElement("div");
      post1.className = "post";

      var postContent1 = document.createElement("div");
      postContent1.className = "post-content";

      postContent1.innerHTML = `<p>${post.text}</p>`;

      var postDetails1 = document.createElement("div");
      postDetails1.className = "post-details";
      postDetails1.innerHTML = `<span class="post-likes">${post.likes.length} likes</span> | <span class="post-author">${post.username}</span> | <span class="post-date">June 1, 2023</span>`;
      var likeBtn = document.createElement("button");

      likeBtn.id = post._id;

      likeBtn.addEventListener("click", () => likePost(post));
      likeBtn.textContent = "Like";

      var dislikeBtn = document.createElement("button");
      dislikeBtn.id = post._id;
      dislikeBtn.addEventListener("click", () => dislikePost(post));
      dislikeBtn.textContent = "Dislike";

      var deleteBtn = document.createElement("button");
      deleteBtn.id = post._id;
      deleteBtn.addEventListener("click", () => deleteUserPost(post));
      deleteBtn.textContent = "Delete";

      post1.appendChild(postContent1);
      post1.appendChild(postDetails1);
      post1.appendChild(likeBtn);
      post1.appendChild(dislikeBtn);
      post1.appendChild(deleteBtn);

      postsContainer.appendChild(post1);
    });
  });
} else {
  // postForm.style.display = "none";
  window.location.assign("../pages/login.html");
}

const likePost = (post) => {
  if (loggedIn() !== null) {
    fetch(apiBaseURL + "/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedIn().token}`,
      },
      body: JSON.stringify({
        postId: post._id,
      }),
    });
  }
};
const dislikePost = (post) => {
  if (loggedIn() !== null) {
    const likeToDelete = post.likes.filter(
      (like) => like.username === loggedIn().username
    );
    if (likeToDelete.length !== 0) {
      fetch(apiBaseURL + `/api/likes/${likeToDelete[0]._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedIn().token}`,
        },
      });
    }
  }
};

const deletePost = (post) => {
  if (loggedIn() !== null) {
    fetch(apiBaseURL + `/api/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedIn().token}`,
      },
    });
  }
};
const deleteUserPost = (post) => {
  //The Api allows any user to delete anypost
  // we change that in this code
  // our code checks if user is author first
  if (loggedIn() !== null && loggedIn().username == post.username) {
    fetch(apiBaseURL + `/api/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedIn().token}`,
      },
    });
  }
};
