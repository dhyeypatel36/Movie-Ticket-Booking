//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
// Use moviesList array for displaing the Name in the dropdown menu
const selectMovie = document.getElementById('selectMovie');

moviesList.forEach((ans) => {
  const select = document.createElement('option');
  selectMovie.appendChild(select);
  select.innerText = ans.movieName;
});

selectMovie.addEventListener('change' , (movie) => {
  const movieName = movie.target.value;

  moviesList.find((check) => {
    if(check.movieName == movieName){
      document.getElementById('movieName').innerText = movieName;
      document.getElementById('moviePrice').innerText = `$ ${check.price}`;
      totalPrice();
    }
  });
});

//Giving seat number to the seats
const seatNumberSeat = document.querySelectorAll('.seatCont .seat');

for(let i = 0; i<seatNumberSeat.length; i++){
  seatNumberSeat[i].setAttribute('data-index' , Number(i+1));
}

//Total Price

function totalPrice(){
  const price = document.querySelector('#moviePrice').textContent;
  const finalPrice = price.replace(/\$/g , "");
  const seat = document.querySelector('#numberOfSeat').textContent;
  let totalPriceh = finalPrice*seat;
  document.querySelector('#totalPrice').innerText = `$ ${totalPriceh}`;
}

function resetPrice(){
  document.querySelector('#numberOfSeat').textContent = 0;
  seatCt = 0;
  document.querySelector('#totalPrice').innerText = `$ 0`;
}

//Add eventLister to each unoccupied seat

const seats = document.querySelectorAll('#seatCont .seat');

seats.forEach((seat) => {
  seat.addEventListener('click' , ()=>{
    if(!seat.classList.contains('selected') && !seat.classList.contains('occupied')){
      if(document.querySelectorAll('.selected').length > 4){
        alert('Only 4 seats are allowed per transaction');
      }else{
        seat.classList.add('selected');
        pushSeat(seat.getAttribute('data-index'));
        seatCount(true);
        totalPrice();
      }
      
    }else if(!seat.classList.contains('occupied') && seat.classList.contains('selected')){
      seat.classList.remove('selected');
      removeSeat();
      seatCount(false);
      totalPrice();
    }
    // const selectedSeats = document.querySelectorAll('.seatCont .selected');
    console.log(selectedSeats);
  });
});

//Push seat number in array
let selectedSeatsNumber = [];
const access = document.querySelector('.selectedSeatsHolder');

function pushSeat(seat){
  selectedSeatsNumber.push(seat);
  rander();
}

function removeSeat(){
  const r = document.querySelectorAll('.seatCont .selected');
  selectedSeatsNumber = [];
  for(let i = 0; i<r.length; i++){
    selectedSeatsNumber.push(r[i].getAttribute('data-index'));
  }

  rander();
}

function rander(){
  if(selectedSeatsNumber.length > 0){
    access.innerHTML = `<span> ${selectedSeatsNumber[0]} </span>`;

    for(let i = 1; i<selectedSeatsNumber.length; i++){
      access.innerHTML += `<span> ${selectedSeatsNumber[i]} </span>`;
    }
  }else{
    access.innerHTML = `<span> no seats selected </span>`;
  }
}

//Number of seats function
let seatCt = 0;

function seatCount(check){
  if(check){
    seatCt++;
  }else{
    seatCt--;
  }
  (document.getElementById('numberOfSeat').innerHTML = seatCt);
}

//Add eventLsiter to continue Button
const conBtn = document.getElementById('proceedBtn');

conBtn.addEventListener('click' , () => {
  const al = document.querySelectorAll('.selected');
  if(al.length <= 1){
    alert('Oops no seat Selected');
  }else{
    for(let i = 1; i<al.length; i++){
      al[i].classList.add('occupied');
      al[i].classList.remove('selected');
    }
    alert('Yayy! Your Seats have been booked');
    resetPrice();
  }
});

//Add eventListerner to Cancel Button

const canBtn = document.getElementById('cancelBtn');

canBtn.addEventListener('click' , () => {
  const al = document.querySelectorAll('#seatCont .selected');

  for(let i = 0; i<al.length; i++){
    al[i].classList.remove('selected');
  }
  resetPrice();
});
