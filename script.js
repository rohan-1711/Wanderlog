let editingTripId = null;

const tripForm = document.getElementById('trip-form');
const grid = document.getElementById('destinations-grid');

tripForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const trips = JSON.parse(localStorage.getItem('trips')) || [];

  if (editingTripId !== null) {
    // UPDATE mode
    const tripIndex = trips.findIndex(t => t.id === editingTripId);
    if (tripIndex !== -1) {
      trips[tripIndex] = {
        id: editingTripId,
        title: document.getElementById('title').value,
        destination: document.getElementById('destination').value,
        date: document.getElementById('date').value,
        notes: document.getElementById('notes').value
      };
    }
    editingTripId = null;
  } else {
    // CREATE mode
    trips.push({
      id: Date.now(),
      title: document.getElementById('title').value,
      destination: document.getElementById('destination').value,
      date: document.getElementById('date').value,
      notes: document.getElementById('notes').value
    });
  }

  localStorage.setItem('trips', JSON.stringify(trips));
  tripForm.reset();
  tripForm.querySelector('button[type="submit"]').textContent = 'Save Trip';
  renderTrips();
  
});

// EDIT button listener - OUTSIDE form submit
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('edit-btn')) {
    const tripId = parseInt(e.target.getAttribute('data-id'));
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    const tripToEdit = trips.find(t => t.id === tripId);

    if (tripToEdit) {
      document.getElementById('title').value = tripToEdit.title;
      document.getElementById('destination').value = tripToEdit.destination;
      document.getElementById('date').value = tripToEdit.date;
      document.getElementById('notes').value = tripToEdit.notes;
      editingTripId = tripId;
      tripForm.querySelector('button[type="submit"]').textContent = 'Update Trip';
    }
  }
});
// DELETE button listener
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const tripId = parseInt(e.target.getAttribute('data-id'));
    
    if (confirm('Are you sure you want to delete this trip?')) {
      let trips = JSON.parse(localStorage.getItem('trips')) || [];
      trips = trips.filter(t => t.id !== tripId);
      localStorage.setItem('trips', JSON.stringify(trips));
      renderTrips();
    }
  }
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
      <button class="edit-btn" data-id="${trip.id}">Edit</button>
      <button class="delete-btn" data-id="${trip.id}">Delete</button>
    `;
    grid.appendChild(card);
  });
}

renderTrips();