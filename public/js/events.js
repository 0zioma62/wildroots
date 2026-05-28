 const yearSelect = document.getElementById('year-select');
const filterBtns = document.querySelectorAll('.filter-btn');
const eventsGrid = document.getElementById('events-grid');

let currentYear = new Date().getFullYear();
let currentCategory = 'all';

async function loadEvents() {
  let url = `/api/events?year=${currentYear}`;
  if (currentCategory !== 'all') {
    url += `&category=${currentCategory}`;
  }

  const res = await fetch(url);
  const events = await res.json();

  if (events.length === 0) {
    eventsGrid.innerHTML = '<p>No events found for this selection.</p>';
    return;
  }

  eventsGrid.innerHTML = events.map(event => `
    <a href="/events/${event.id}" class="event-card">
      <h3>${event.title}</h3>
      <p class="event-date">📅 ${event.event_date}</p>
      <p>${event.description}</p>
      <span class="badge">${event.category.replace(/_/g, ' ')}</span>
    </a>
  `).join('');
}

yearSelect.addEventListener('change', () => {
  currentYear = yearSelect.value;
  loadEvents();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    loadEvents();
  });
});

loadEvents();
