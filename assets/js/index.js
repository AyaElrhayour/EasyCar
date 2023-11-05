const dataCar = [];
function fetchdata() {
  fetch("/assets/js/cars.json")
    .then((response) => response.json())
    .then((data) => {
      dataCar.push(...data.cars);
      featchCard(data.cars);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

const cards = document.querySelector("#cards");
const icons = document.querySelectorAll(".icons");

let page = 1;
let limitpage = 6;

let icon = "grid-outline";

icons.forEach((items) => {
  items.addEventListener("click", (event) => {
    icon = event.target.name;

    fetchdata();
  });
});

function featchCard(data) {
  let beginpage = limitpage * (page - 1);
  let endpage = limitpage * page - 1;
  const styleCalss =
    icon == "grid-outline"
      ? "grid lg:grid-cols-3 justify-center md:grid-cols-3 sm:grid-cols-2 md:-my-1  gap-6 pb-8"
      : "flex flex-col gap-3 justify-center ml-50 pb-8";

  cards.innerHTML = "";

  cards.setAttribute("class", styleCalss);

  data.forEach((element, key) => {
    if (key >= beginpage && key <= endpage) {
      const html = `
        <div class="  px-1    p-2 bg-white rounded-xl transform transition-all  ${
          icon === "grid-outline"
            ? "row-span-1 col-span-1 w-64"
            : "flex flex-row w-4/5"
        } ">
        <img
          class="h-40  object-cover w-full rounded-xl"
          src="${element.image}"
          alt="voiture"
        />
        <div class="card-detail ">
        <div class="p-2">
          <h2 class="font-bold text-lg">${element.make}</h2>
          <h3 class="mb-1 text-xl font-medium text-gray-900 ">${
            element.name
          }</h3>
          
          <p class="text-sm text-gray-600">
          ${element.description}
          </p>
        </div>
    
        <div class="m-2">
        <button onclick="addToModal(${
          element.id
        })" class="py-1 px-3 bg-[#15211B] text-white font-semibold rounded-lg shadow-md ${
        icon !== "grid-outline" ? "w-full" : ""
      } ">Add to Cart</button>
   
        </div>
        </div>
      </div>
        `;
      cards.insertAdjacentHTML("beforeend", html);
    }
  });

  pagination(data);
}

function pagination(data) {
  let count = Math.ceil(data.length / limitpage);
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = " ";
  for (let i = 1; i <= count; i++) {
    const htmlPaginate = `<li>
    <button
      class="h-10 px-4  rounded-lg  ${
        i == page
          ? " text-white bg-[#15211B] border-[#15211B]"
          : " text-[#15211B] border-solid border-2 border-white"
      }transition-colors duration-150 focus:shadow-outline hover:text-[#15211B] hover:bg-indigo-100"
      onclick="event.preventDefault(); changePage(${i});" >
  
      ${i}
    </button>
  </li>`;

    pagination.insertAdjacentHTML("beforeend", htmlPaginate);
  }
}

function changePage(index) {
  page = index;

  fetchdata();
}

fetchdata();

const navLinks = document.querySelector(".nav-links");
function ontoggleMenu(e) {
  e.name = e.name === "menu-outline" ? "close-outline" : "menu-outline";
  navLinks.classList.toggle("top-[14.7%]");
  navLinks.classList.toggle("bg-slate-50/20");
}

const modal = document.querySelector(".Modal");

const hiddenMadal = document.querySelectorAll(".close-modal");
const imgModal = document.querySelector(".img-modal");
const markModal = document.querySelector(".marke-modal");
const nameModal = document.querySelector(".name-modal");
const priceModal = document.querySelector(".price-modal");
const descriptionModal = document.querySelector(".discription-modal");

hiddenMadal.forEach((item) => {
  item.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
});

const btnFilter = document.querySelectorAll(".btn-filter");
const btnRemove = document.querySelector(".btn-remove");
const applyCar = document.querySelector(".apply-car");
const countItem = document.querySelector(".count-item");

let listPanier = document.querySelector("#list-panier");

const countTotal = document.querySelector(".count-Total");

function addToModal(items) {
  const infoCar = dataCar.find((car) => car.id === items);
  modal.classList.remove("hidden");
  console.log(infoCar);
  imgModal.setAttribute("src", infoCar.image);
  markModal.textContent = infoCar.make;
  nameModal.textContent = infoCar.name;
  priceModal.textContent = infoCar.price;
  descriptionModal.textContent = infoCar.description;
  applyCar.dataset.indexNumber = infoCar.id;
}
btnFilter.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let namecar = e.target.name;
    const data = dataCar.filter((item) => item.category === namecar);
    featchCard(data);
    btnRemove.classList.remove("hidden");
  });
});

btnRemove.addEventListener("click", () => {
  fetchdata();
  btnRemove.classList.add("hidden");
});

const dropDown = document.querySelector("#dropdownMenuButton1d");
const menuButton1d = document.querySelector("#MenuButton1d");
const closeDropdown = document.querySelector(".close-dropdown");

dropDown.addEventListener("click", function () {
  menuButton1d.classList.toggle("hidden");
});

closeDropdown.addEventListener("click", function () {
  menuButton1d.classList.add("hidden");
});

const localData = JSON.parse(localStorage.getItem("car-personalization")) || [];

applyCar.addEventListener("click", function () {
  const idCar = this.dataset.indexNumber;
  const car = dataCar.find((item) => item.id == idCar);

  localData.push(car);
  localStorage.setItem("car-personalization", JSON.stringify(localData));
  addToCart();

  modal.classList.add("hidden");
});

let total = 0;


function addToCart() {
  countItem.textContent = `${localData.length} item`;

  console.log(localData);
  dropDown.insertAdjacentHTML(
    "beforeend",
    ` <div class="absolute  inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 right-0 dark:border-gray-900">${localData.length}</div> `
  );
  if (localData.length > 0) {
    listPanier.innerHTML = "";
    localData.forEach((item) => {
      listPanier.insertAdjacentHTML(
        "afterbegin",
        `  <li class="flex items-center gap-2 px-2 py-4">

       
        
        <img src="${item.image}" alt="Car Image" class="w-10 h-10">
        
        <div class="flex justify-between items-center gap-3 w-full">
           <span class="text-sm font-medium text-neutral-900">${item.name}</span>
           <ion-icon onclick="removeItem(${item.id})" class="text-red-500 text-lg cursor-pointer hover:text-red-600"name="close-circle-outline"></ion-icon>
           </div>
   </li>`
      );
    });

    localData.forEach((item) => {
      total += parseInt(item.price); 
    });
    
    countTotal.textContent=total

    toggleDevis()
    
  } else {

  
    listPanier.innerHTML = "";

    listPanier.insertAdjacentHTML(
      "afterbegin",
      `   <p class="mx-2">cart is Empty</p>`
    );
  }
}

addToCart();
function removeItem(id) {
  const index = localData.findIndex((item) => item.id === id);
  localData.forEach((item) => {
    total -= parseInt(item.price); 
    
  });
  
  countTotal.textContent=total
  
  console.log(index);
  if (index !== -1) {
    localData.splice(index, 1);

    localStorage.setItem("car-personalization", JSON.stringify(localData));

    addToCart();

  }    toggleDevis()
}


const toggleDevis=()=>{
  const devis=document.querySelector(".devis")

  console.log(devis);

  if (total>0) {
    devis.classList.remove("hidden")
  }else{
    devis.classList.add("hidden")
  }

}