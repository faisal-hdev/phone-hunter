const loadPhones = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("col");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
        <img src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Phone Name ${phone.phone_name}</h5>
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
};

loadPhones();
