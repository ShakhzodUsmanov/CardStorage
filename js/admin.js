const userCreateForm = document.getElementById("userCreateForm");
const cardCreateForm = document.getElementById("cardCreateForm");
const userTable = document.getElementById("userTable");
const cardTable = document.getElementById("cardTable");
const api = "https://crudcrud.com/api/65d187174c0d4e458bdc2bfba854a86f";

const updateCardModal = document.getElementById("updateCardModal");
const cardUpdateForm = document.getElementById("cardUpdateForm");
const updateUserModal = document.getElementById("updateUserModal");
const userUpdateForm = document.getElementById("userUpdateForm");

userCreateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(userCreateForm);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  CreateUser(data);
  userCreateForm.reset();
});

cardCreateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(cardCreateForm);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  CreateCard(data);
  cardCreateForm.reset();
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

  fetchUsers();
}

async function CreateCard(cardData) {
  console.log(cardData);

  await fetch(`${api}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });

  fetchCards();
}

async function fetchUsers() {
  const data = await fetch(`${api}/users`);
  const usersData = await data.json();
  displayUser(usersData);
}

async function fetchCards() {
  const data = await fetch(`${api}/cards`);
  const cardData = await data.json();
  displayCard(cardData);
}

function displayUser(users) {
  userTable.innerHTML = "";
  users.forEach((user, i) => {
    const tr = document.createElement("tr");
    const tdN = document.createElement("th");
    const tdName = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdPassword = document.createElement("td");
    const tdActives = document.createElement("td");

    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    tdN.innerText = i + 1;
    tdName.innerText = user.name;
    tdEmail.innerText = user.email;
    tdPassword.innerText = user.pass;

    deleteBtn.className = "btn btn-danger w-50";
    updateBtn.className = "btn btn-warning w-50";

    deleteBtn.innerHTML = "Delete";
    updateBtn.innerHTML = "Update";
    deleteBtn.id = user._id;
    updateBtn.id = user._id;
    deleteBtn.onclick = deleteUser;
    updateBtn.onclick = openUserUpdateModal;

    tdActives.appendChild(deleteBtn);
    tdActives.appendChild(updateBtn);

    tdActives.className = "d-flex gap-3";

    tr.appendChild(tdN);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdPassword);
    tr.appendChild(tdActives);

    userTable.appendChild(tr);
  });
}

function displayCard(cards) {
  cardTable.innerHTML = "";
  cards.forEach((card, i) => {
    const tr = document.createElement("tr");
    const tdN = document.createElement("th");
    const tdTitle = document.createElement("td");
    const tdDesc = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdImgUrl = document.createElement("td");
    const tdActives = document.createElement("td");

    const img = document.createElement("img");

    const deleteBtn = document.createElement("button");
    const updateBtn = document.createElement("button");

    tdN.innerText = i + 1;
    tdTitle.innerText = card.title;
    tdDesc.innerText = card.description;
    tdPrice.innerText = card.price;

    img.src = card.imgUrl;
    img.className = "w-25";
    tdImgUrl.appendChild(img);

    deleteBtn.className = "btn btn-danger w-50";
    updateBtn.className = "btn btn-warning w-50";

    deleteBtn.innerHTML = "Delete";
    updateBtn.innerHTML = "Update";
    deleteBtn.id = card._id;
    updateBtn.id = card._id;
    deleteBtn.onclick = deleteCard;
    updateBtn.onclick = openCardUpdateModal;

    tdActives.appendChild(deleteBtn);
    tdActives.appendChild(updateBtn);

    tdActives.className = "d-flex gap-3";

    tr.appendChild(tdN);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDesc);
    tr.appendChild(tdPrice);
    tr.appendChild(tdImgUrl);
    tr.appendChild(tdActives);

    cardTable.appendChild(tr);
  });
}

async function deleteCard() {
  await fetch(`${api}/cards/${this.id}`, {
    method: "DELETE",
  });
  fetchCards();
}

async function deleteUser() {
  await fetch(`${api}/users/${this.id}`, {
    method: "DELETE",
  });
  fetchUsers();
}

function openUserUpdateModal() {
  const myModal = new bootstrap.Modal(updateUserModal);
  myModal.show();

  updateUserModal.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(userUpdateForm);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    await fetch(`${api}/users/${this.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("update");
    userUpdateForm.reset();
    fetchUsers();
  });
}

function openCardUpdateModal() {
  const myModal = new bootstrap.Modal(updateCardModal);
  myModal.show();

  updateCardModal.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(cardUpdateForm);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    await fetch(`${api}/cards/${this.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("update");
    cardUpdateForm.reset();
    fetchCards();;
  });
}

fetchUsers();
fetchCards();
