const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const cardGrid = document.getElementById('card-grid')

const api = "https://crudcrud.com/api/a6dc04f2964c43538d43f9f7be6dd7ce";

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

async function fetchCards() {
  const data = await fetch(`${api}/cards`);
  const cardData = await data.json();
  displayCard(cardData);
}

function displayCard(cards) {
  cardGrid.innerHTML = "";
  cards.forEach((card) => {
    const col = document.createElement("div");
    const mainCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const title = document.createElement("h4");
    const desc = document.createElement("p");
    const price = document.createElement("div");
    const img = document.createElement("img");
    const cardFooter = document.createElement("div");
    const buyBtn = document.createElement("button");

    col.className = "col-lg-3 col-md-4";
    mainCard.className = "card";
    cardBody.className = "card-body";

    img.className = "card-img-top";
    img.src = card.imgUrl;

    title.innerHTML = card.title;
    title.className = "card-title";

    desc.innerHTML = card.description;
    desc.className = "card-text";

    price.innerHTML = card.price + "$";
    price.className = "card-price";

    cardFooter.className = "card-footer d-flex gap-3";

    buyBtn.className = "btn btn-success";
    buyBtn.innerText = "Add";

    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(desc);

    cardFooter.appendChild(buyBtn);

    mainCard.appendChild(cardBody);
    mainCard.appendChild(cardFooter);
    col.appendChild(mainCard);
    cardGrid.appendChild(col);
  });
}

fetchCards()


