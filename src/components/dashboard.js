
  // 🔧 Example structure for fetching realtime updates
  async function loadWildlifeUpdates() {
    const res = await fetch('/api/wildlife/updates'); // Replace with actual endpoint
    const data = await res.json();
    const container = document.getElementById('dashboard-cards');
    container.innerHTML = ''; // Clear old data

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'dashboard-card';
      card.setAttribute('data-type', item.type);

      card.innerHTML = `
        <div class="indicator ${item.type}"></div>
        <div class="card-info">
          <strong>${item.animal}</strong> ${item.message}
          <span class="time-badge">${item.time}</span>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // Call on load
  loadWildlifeUpdates();
  // Or setup polling every x seconds:
  // setInterval(loadWildlifeUpdates, 10000);

