
const tripForm = document.getElementById('trip-form');
const grid = document.getElementById('destinations-grid');


tripForm.addEventListener('submit', function (e) {
  e.preventDefault(); // stop page from reloading

  
  const newTrip = {
    id: Date.now(), // simple unique id using timestamp
    title: document.getElementById('title').value,
    destination: document.getElementById('destination').value,
    date: document.getElementById('date').value,
    notes: document.getElementById('notes').value
  };

  
  const trips = JSON.parse(localStorage.getItem('trips')) || [];

  // adding new trip
  trips.push(newTrip);

  
  localStorage.setItem('trips', JSON.stringify(trips));

  tripForm.reset();
  renderTrips();

  console.log('Trip saved:', newTrip);
  console.log('All trips:', trips);
});

function renderTrips() {
  const trips = JSON.parse(localStorage.getItem('trips')) || [];

 
  grid.innerHTML = '';

  if (trips.length === 0) {
    grid.innerHTML = '<p class="empty-state">No trips yet. Add your first one above!</p>';
    return;
  }


  trips.forEach(function (trip) {
    const card = document.createElement('div');
    card.classList.add('trip-card');
    card.innerHTML = `
      <h3>${trip.title}</h3>
      <p class="trip-destination">${trip.destination}</p>
      <p class="trip-date">${trip.date}</p>
      <p class="trip-notes">${trip.notes}</p>
    `;
    grid.appendChild(card);
  });
}

renderTrips();