document.addEventListener('DOMContentLoaded', async () => {
  const candidates = await fetchCandidates();
  const container = document.getElementById('kandidatContainer');

  // --- 🌟 Tambahan ini: sesuaikan grid jika kandidat cuma 2 ---
  if (candidates.length === 2) {
    container.className = 'flex justify-center gap-8 flex-wrap z-10';
  } else {
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl px-6 w-full z-10';
  }
  // -------------------------------------------------------------

  candidates.forEach(c => {
    const card = document.createElement('div');
    card.className = 'card bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center space-y-4 border border-green-100';
    card.innerHTML = `
      <img src="${c.foto_url}" alt="${c.nama}" class="w-36 h-36 rounded-full object-cover border-4 border-green-600 shadow-md">
      <h2 class="text-xl font-bold text-green-700">${c.nama}</h2>
      <p class="text-sm text-gray-600 italic line-clamp-3">${c.visi.slice(0, 100)}...</p>
      <button class="voteBtn bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-4 py-2 rounded-full w-full font-semibold transition-all duration-200" data-id="${c.id}">
        Pilih Kandidat
      </button>
    `;
    container.appendChild(card);
  });

  container.addEventListener('click', async e => {
    if (!e.target.matches('.voteBtn')) return;
    const candidate_id = e.target.dataset.id;
    if (!confirm('Yakin memilih kandidat ini?')) return;

    const res = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ candidate_id })
    });

    if (res.ok) {
      alert('Voting berhasil! Terima kasih sudah berpartisipasi.');
      window.location.href = 'thankyou.html';
    } else {
      const { message } = await res.json();
      alert('Gagal: ' + message);
    }
  });
});
