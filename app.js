const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');

let ticketPrice = movieSelect.value;

let SEAT_SELECTED_BY_USER = 0;
let TOTAL_TICKET_PRICE = 0;

//save selected movie index and value/price-: check in google chrome application
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('SelectedMovieIndex', JSON.stringify(movieIndex));
  localStorage.setItem('SelectedMoviePrice', JSON.stringify(moviePrice));
}

// //update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((s) => {
    return [...seats].indexOf(s);
  });
  console.log(seatsIndex);

  //store selected seat index data in local storage-:-------------------
  localStorage.setItem('UserSelectedSeats', JSON.stringify(seatsIndex));
  //--------------------------------------------------------------------

  const selectedSeatsCount = selectedSeats.length;

  SEAT_SELECTED_BY_USER = selectedSeatsCount;
  TOTAL_TICKET_PRICE = selectedSeatsCount * ticketPrice;
}

/*
//Get selected seat data from local storage and populate UI
function populateUI() {
  const User_selectedSeats = JSON.parse(localStorage.getItem('UserSelectedSeats'));
}
*/

//movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

//seat click event
container.addEventListener('click', (el) => {
  if (el.target.classList.contains('seat') && !el.target.classList.contains('occupied')) {
    el.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

document.getElementById('btn').addEventListener('click', function () {
  document.getElementById(
    'dv'
  ).innerHTML = `<p>You have selected <span class="s1">${SEAT_SELECTED_BY_USER}</span> seats for a price of<span class= "s1"> ₹${TOTAL_TICKET_PRICE}</span></p>`;
});
