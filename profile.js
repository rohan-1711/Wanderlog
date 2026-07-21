// read the 'user' query parameter from the URL
const params = new URLSearchParams(window.location.search);
const userName = params.get('user');

const profileName = document.getElementById('profile-name');
const profileBio = document.getElementById('profile-bio');
const profileTrips = document.getElementById('profile-trips');
const profileEmpty = document.getElementById('profile-empty');

// get all trips from localStorage
const allTrips = JSON.parse(localStorage.getItem('trips')) || [];

// for now, hardcode the profile info (later we could make this more dynamic)
if (userName) {
  profileName.textContent = userName.charAt(0).toUpperCase() + userName.slice(1) + "'s Journal";
  profileBio.textContent = "Explore my travel adventures and the places I've discovered.";
} else {
  profileName.textContent = "No User Selected";
  profileBio.textContent = "Visit profile.html?user=yourname to view a traveler's journal.";
}

// render trips (all trips for now — we'll make this per-user later)
function renderProfileTrips() {
  if (allTrips.length === 0) {
    profileEmpty.style.display = 'block';
    profileTrips.innerHTML = '';
    return;
  }

  profileTrips.innerHTML = '';
  
  allTrips.forEach(function (trip) {
    const card = document.createElement('div');
    card.classList.add('trip-card');
    card.classList.add('profile-trip-card');
    card.innerHTML = `
      ${trip.photo ? `<img src="${trip.photo}" alt="${trip.title}" class="trip-photo">` : ''}
      <h3>${trip.title}</h3>
      <p class="trip-destination">${trip.destination}</p>
      <p class="trip-date">${trip.date}</p>
      <p class="trip-notes">${trip.notes}</p>
    `;
    profileTrips.appendChild(card);
  });
}

renderProfileTrips();
