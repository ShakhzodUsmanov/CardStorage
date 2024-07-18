const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const api = "https://crudcrud.com/api/1e77f61792b242789197805dacb2e171";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetchUsers(data);
  loginForm.reset();
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  CreateUser(data);
  registerForm.reset();
});

async function CreateUser(userData) {
  userData.cart = [];
  console.log(userData);

  await fetch(`${api}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
}

async function fetchUsers(user) {
  const data = await fetch(`${api}/users`);
  const usersData = await data.json();

  usersData.forEach((elem) => {
    if (elem.email == user.email) {
      console.log(user.email, "correct!");
    } else {
      console.log("user email is wrong");
    }
  });
}
