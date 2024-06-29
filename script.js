let card_count = 0;
const card_container = document.querySelector('#card-container');

const pagination_controls = document.querySelector('#pagination-controls')
const prevPageButton = document.querySelector('#prev-page');
const nextPageButton = document.querySelector('#next-page');
const pageInfo = document.querySelector('#page-info');
let currentPage = 1;
const cardsPerPage = 6;   

const select = document.querySelector('#select');
const sorted = document.querySelector('#sorted');

let search = document.querySelector('#search');
let cards = [];

document.querySelector('#cardplus').addEventListener('click', ()=>{
  addNewCard()
});
//select
select.addEventListener('change', (e) => {
let selectvalue = e.target.value;
  cards.forEach(cardElement => {
    let counter = parseInt(cardElement.querySelector('#counter').innerText);
    modyfyfuntion(cardElement, selectvalue, counter);
  })
  saveCardsToLocalStorage()
});

function select_Local(data = null) {
  select.value = data ? data.selectValue : 'Basic';
  selectvalue = select.value
  cards.forEach(cardElement => {
  let counter = parseInt(cardElement.querySelector('#counter').innerText);
  modyfyfuntion(cardElement, selectvalue, counter);
})
saveCardsToLocalStorage()
}
//select



sorted.addEventListener('change', (ev) => {
  let sortvalue = ev.target.value;
  cardsorted(sortvalue)
})


search.addEventListener('input',(el)=>{
  let searchValue = el.target.value.trim();
  filterCardsBySearch(searchValue)
})

function addNewCard(data = null) {

let cardNumber = data ? data.cardNumber : 0;
let counter = data ? data.counter : 0; 
let cardName = data ? data.name : 'Name';
  card_count++;

  const html = ` <div class='m-2 card'>
         <div class="py-4 overflow-hidden bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl h-30 w-80">
           
            <div class="flex justify-between items-center">
              
          <h2 class="text-center px-2">card number <br> <div id='card_counter_number'>${cardNumber || card_count}</div></h2>
          
          <div class='mr-16 flex items-center gap-2'>
          <p id='name' class='text-white text-center'>${cardName}</p>
          <i id='edit-btn' class="fa-regular fa-pen-to-square text-sky-500"></i>
          </div>
          
          
<div class='relative' id='update-inpute-box'>
       
</div>          
              
<div class="relative">
  
      <i id="bars" class="fa-solid fa-bars text-white text-2xl pointer pr-4"></i>
      
      <div id="buttons" class="absolute right-0 top-0 bg-white border rounded-l-lg shadow-lg p-2 duration-1000">
        
        <i id="xmark" class="fa-solid fa-xmark text-2xl pointer px-2.5 py-1 bg-pink-500 rounded-full"></i>
        <button id='update' class="block px-4 py-2 text-left w-full text-green-500 mt-2">Update</button>
        <button id='delete' class="block px-4 py-2 text-left w-full text-red-500">Delete</button>
      </div>
     
    </div>
        
        </div>
           
           <h3 id='counter' class="text-2xl text-center text-white font-semibold">${counter}</h3>
            <div id='extra-input' class='text-center'></div>
          <div class="flex justify-between items-center mt-6 px-2">
           <button id="increment" class="bg-green-400 p-2 rounded-xl w-24" type="submit">increment</button> 
           <button id="decrement" class="bg-pink-400 p-2 rounded-xl w-24" type="submit">decrement </button>
           <button id="reset" class="bg-red-400 p-2 rounded-xl w-24" type="submit">reset</button>
          </div>
         </div>
       </div>`;

const cardElement = document.createElement('div');
cardElement.innerHTML = html;
card_container.appendChild(cardElement);
cards.push(cardElement)

const bars = cardElement.querySelector('#bars');
const buttons = cardElement.querySelector('#buttons');
let xmark = cardElement.querySelector('#xmark');
const deleteb = cardElement.querySelector('#delete')
const update = cardElement.querySelector('#update');
const update_inpute_box = cardElement.querySelector('#update-inpute-box');
const edit_btn = cardElement.querySelector('#edit-btn') 
let name = cardElement.querySelector('#name')

//toggle start
bars.addEventListener('click', () => {
  xmark.style.transform = 'rotate(-360deg)';
  buttons.style.right = '0px';
})
xmark.addEventListener('click', () => {
  xmark.style.transform = 'rotate(360deg)';
  buttons.style.right = '-224px';
})
//toggle endend

//update start
update.addEventListener('click',()=>{
  update_inpute_box_card()
})
edit_btn.addEventListener('click',()=>{
  update_inpute_box_card()
})
function update_inpute_box_card() {
  update_inpute_box.innerHTML = ` <div id='update-input' class='absolute right-0 bg-blue-400 py-4 px-1.5 rounded-xl z-50'>
          <input class="px-1 py-2 border-2 rounded-xl" type="text" placeholder="Enter your name" name="text" id="update-box" value="">
          <div id='update-btn' class='flex justify-around mt-4'>
            <button class='py-1 px-2 bg-red-300 rounded-md' type="submit" id="cancel">cancel</button>
            <button class='py-1 px-2 bg-green-300 rounded-md' type="submit" id="save">save</button>
          </div>
        </div>`;

let cancel = update_inpute_box.querySelector('#cancel');
let save = update_inpute_box.querySelector('#save');
let update_box = update_inpute_box.querySelector('#update-box'); 



cancel.addEventListener('click', () => {
  update_inpute_box.innerHTML = '';
})

save.addEventListener('click',()=>{
  let update_box_value = update_box.value;
  let regx = /^(?!.*\s{2,})(?:(?:[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ'’.-]+)(?:\s|$)){0,12}$/g
  
  let validation  = regx.test(update_box_value);
  
  if (validation || validation !== '') {
    name.innerHTML = update_box_value;
    update_inpute_box.innerHTML = '';
  } else {
    alert('place enter a current name')
  }
  saveCardsToLocalStorage()
})

}
//update end

renderCards()

//delete start
deleteb.addEventListener('click', () => {

  let confirmsmg = confirm('are you sure delete card ?');
  if (confirmsmg) {
    cardElement.remove();
  }
  cards = cards.filter((el) => el !== cardElement)
  if (card_container.children.length === 0) {
    card_count = 0
  }
  saveCardsToLocalStorage()
  //localStorage.removeItem(data)

})
//delete end
modyfyfuntion(cardElement , select.value , counter)
saveCardsToLocalStorage()

}


function modyfyfuntion(cardElement,selectvalue,counter) {
let counterElement = cardElement.querySelector('#counter');
let increment = cardElement.querySelector('#increment')
let decrement = cardElement.querySelector('#decrement')
let reset = cardElement.querySelector('#reset');
let extra_input = cardElement.querySelector('#extra-input');

//clone
let newIncrement = increment.cloneNode(true);
let newDecrement = decrement.cloneNode(true);
let newReset = reset.cloneNode(true);
increment.parentNode.replaceChild(newIncrement, increment);
decrement.parentNode.replaceChild(newDecrement, decrement);
reset.parentNode.replaceChild(newReset, reset);

increment = newIncrement;
decrement = newDecrement;
reset = newReset;

extra_input.innerHTML=''

function counterupdate() {
  counterElement.innerText = counter;
}

let card_counter_number = cardElement.querySelector('#card_counter_number').innerText;

if (select.value === 'basic') {
  increment.addEventListener('click',()=>{
    counter++
    counterupdate()
    saveCardsToLocalStorage()
  });
  decrement.addEventListener('click',()=>{
    counter--
    counterupdate()
    saveCardsToLocalStorage()
  });
  reset.addEventListener('click',()=>{
    counter = 0
    counterupdate()
    saveCardsToLocalStorage()
  })
} else if (select.value === 'medium') {
  
  increment.addEventListener('click', (el) => {
 
  counter += parseInt(card_counter_number)
  counterupdate()
  saveCardsToLocalStorage()
  });
  
  decrement.addEventListener('click',()=>{
    counter -= parseInt(card_counter_number)
    counterupdate()
    saveCardsToLocalStorage()
  })
  
  reset.addEventListener('click', () => {
    counter.innerText = 0;
    counterupdate()
    saveCardsToLocalStorage()
  })
} else if (select.value === 'ultra') {
  
  extra_input.innerHTML = `<input class="px-1 py-2 border-2 rounded-xl" type="text" name="text" id="extra-text" value="">`;
  let extra_text = cardElement.querySelector('#extra-text')
  
let data = 0 || parseInt(card_counter_number);

extra_text.addEventListener('input',(el)=>{
     data = parseInt(el.target.value) || 0;
   })
   
   increment.addEventListener('click', (el) => {
   counter += data
   counterupdate()
   saveCardsToLocalStorage()
    });
    decrement.addEventListener('click', () => {
      counter -= data
      counterupdate()
      saveCardsToLocalStorage()
    });
    reset.addEventListener('click', () => {
      counter = 0;
      counterupdate()
      saveCardsToLocalStorage()
    })
  
}
}

//search
function filterCardsBySearch(searchValue) {
  cards.forEach(cardElement => {
    const cardNumber = cardElement.querySelector('#card_counter_number').innerText;
    if (cardNumber.includes(searchValue)) {
      cardElement.style.display = 'block';
    } else {
      cardElement.style.display = 'none';
    }
  });
}
//cardsorted
function cardsorted(sorted_data = 'sm-to-lg') {
 
    cards.sort((n1,n2)=>{
      
      let counter1 = parseInt(n1.querySelector('#card_counter_number').innerText);
      let counter2 = parseInt(n2.querySelector('#card_counter_number').innerText);
      if (sorted_data === 'sm-to-lg') {
        return counter1 - counter2
      } else if (sorted_data === 'lg-to-sm') {
        return counter2 - counter1
      }
      
    })
cards.forEach(card => card_container.appendChild(card));
}

function saveCardsToLocalStorage(data) {

  let filterdata = cards.map((el)=>{
    let extraInputValue = el.querySelector('#extra-text') ? el.querySelector('#extra-text').value : '';
    return {
      cardNumber : el.querySelector('#card_counter_number').innerText,
      selectValue : select.value,
      name: el.querySelector('#name').innerText,
      sortvalue : sorted.value,
     extraInputValue,
      counter : el.querySelector('#counter').innerText
    }
  })
  localStorage.setItem('filterdata',JSON.stringify(filterdata));
}


window.addEventListener('load',()=>{
  let getdata = JSON.parse(localStorage.getItem('filterdata')) || [];
  
getdata.forEach((data)=>{
    addNewCard(data)
    select_Local(data)
  })
})








//pagination  start

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderCards();
  }
});

nextPageButton.addEventListener('click', () => {
  if (currentPage < Math.ceil(cards.length / cardsPerPage)) {
    currentPage++;
    renderCards();
  }
});

function renderCards() {
  card_container.innerHTML = '';

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, cards.length);
  const cardsToDisplay = cards.slice(startIndex, endIndex);

  // Logging for debugging
  cardsToDisplay.forEach(card => {
    card_container.appendChild(card);
  });

  pageInfo.innerText = `Page ${currentPage} of ${Math.ceil(cards.length / cardsPerPage)}`;
}

//pagenation end