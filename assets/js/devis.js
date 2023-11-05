
const currentDate = new Date();
const bodyTable = document.querySelector("tbody");
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; 
const day = currentDate.getDate();
const totalHTElement = document.querySelector('#total-ht');
const tvaElement = document.querySelector('#tva');
const totalTTCElement = document.querySelector('#total-ttc');
const pdf=document.querySelector("#pdf")
const body=document.querySelector("body")

let totalHT = 0;

function innsertable(){
    const getLocalData = JSON.parse(localStorage.getItem("car-personalization"));
bodyTable.innerHTML = "";

getLocalData.forEach((item) => 
{totalHT += parseInt(item.price);
  const html = `<tr
    class=" bg-slate-100 dark:text-gray-700 border-b  dark:border-gray-700"
  >
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
    >
      ${item.name}
    </th>
    <td class="px-6 py-4"> <input type="number" onchange="calcAmount(event,${item.price})" value="1" id=""></td>
    <td class="px-6 py-4">$ ${item.price}</td>
    <td class="px-6 py-4 cla">$ ${item.price}</td>
    <td class="px-6 py-4 ">${day}/${month }/${year}</td>
    <td class="px-6 py-4 date">${day + 1}/${month }/${year}</td>
  </tr>`;
  bodyTable.insertAdjacentHTML("afterbegin", html);
  
});
}
function calcAmount(event, price) {
  let number = event.target.value;
  const total = number * price;
  const calcDay = parseInt(number) + day;
  event.target.closest('tr').querySelector('.cla').textContent = `$${total.toFixed(3)}`;
  event.target.closest('tr').querySelector('.date').textContent = `${calcDay}/${month }/${year}`;
  totalHT += parseInt(price);

  claculprice()
}
function claculprice() {
    totalHTElement.textContent = `$${totalHT.toFixed(3)}`;
  const tva = (totalHT * 0.2).toFixed(3); 
  tvaElement.textContent = `$${tva}`;
  const totalTTC = totalHT + parseFloat(tva);
  totalTTCElement.textContent = `$${totalTTC}`;
}

innsertable()

claculprice()



pdf.addEventListener("click",function(){
    html2pdf().from(body).save();

    localStorage.setItem("car-personalization",JSON.stringify([]))
    tvaElement.textContent = `$ 0`;
    const totalTTC = 0;
    totalTTCElement.textContent = `$ 0`;
   return setTimeout(innsertable,3000)
    
})




