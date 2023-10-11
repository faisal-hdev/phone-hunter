const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  // Display 20 phones only
  phones = phones.slice(0, 20);

  // Display no phones found
  const noPhone = document.getElementById("no-found-msg");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // Display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("col");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card h-100 ">
        <img src="${phone.image}" class="card-img-top p-4" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
            <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additio nal content. This content is a little bit
            longer.
            </p>
        </div>
        </div>
      `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop loader
  toggleSpinner(false);
};

// Handle search button clicked
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);
});

const toggleSpinner = (isLoading) => {
  const loaderElement = document.getElementById("loader");
  if (isLoading) {
    loaderElement.classList.remove("d-none");
  } else {
    loaderElement.classList.add("d-none");
  }
};

// loadPhones();
