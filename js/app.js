// before Search
const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  const showAllElement = document.getElementById("show-all");
  // Display 20 phones only
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAllElement.classList.remove("d-none");
  } else {
    showAllElement.classList.add("d-none");
  }

  // Display no phones found
  const noPhone = document.getElementById("no-found-msg");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // Display all phones
  phones.forEach((phone) => { const phoneDiv = document.createElement("col");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card h-100 ">
        <img src="${phone.image}" class="card-img-top p-4" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
            <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to nal content. This content is a little bit
            longer.
            </p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
        </div>
      `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => { toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// Handle search button clicked
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  processSearch(10);
});

// search input field enter key handler
document.getElementById("search-field").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderElement = document.getElementById("loader");
  if (isLoading) {
    loaderElement.classList.remove("d-none");
  } else {
    loaderElement.classList.add("d-none");
  }
};

// Not the best way to load show all
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name ? phone.name : "Not available";
  const phoneDetailsEl = document.getElementById("phone-details");
  phoneDetailsEl.innerHTML = `
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : "No release date found"}</p>
        <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : "No storage information"}</p>
        <p>Others : ${phone.others ? phone.others.Bluetooth : "No Bluetooth information"}</p>
    `;
};

loadPhones("apple");

