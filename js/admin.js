const userCreateForm = document.getElementById("userCreateForm");
const cardCreateForm = document.getElementById("cardCreateForm");
const userTable = document.getElementById("userTable");
const cardTable = document.getElementById("cardTable");
const api = "https://crudcrud.com/api/6f2c09b313244ef3bd57405bde59c4cc";

const updateCardModal = document.getElementById("createCardModal")

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

// cardUpdateForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const formData = new FormData(cardCreateForm);

//   const data = {};
//   formData.forEach((value, key) => {
//     data[key] = value;
//   });

//   CreateCard(data);
//   cardCreateForm.reset();
// });

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
  cardData.cart = [];
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
  cardTable.innerHTML = ''
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
    deleteBtn.id = card._id
    deleteBtn.onclick = deleteCard
    updateBtn.onclick = openModal

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

function openModal() {
  console.log('open modal');
  const myModal = new bootstrap.Modal(updateCardModal);
  myModal.show();
}

fetchUsers();
fetchCards();
