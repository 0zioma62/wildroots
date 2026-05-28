 const input = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');

input.addEventListener('input', async () => {
  const q = input.value.trim();

  if (q.length < 2) {
    resultsDiv.innerHTML = '';
    return;
  }

  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();

  if (data.length === 0) {
    resultsDiv.innerHTML = '<p style="color:white;">No results found.</p>';
    return;
  }

  resultsDiv.innerHTML = data.map(item => `
    <a href="/habitats/${item.habitat_id}" class="result-card">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <small>${item.habitat_name}</small>
    </a>
  `).join('');
});
