document.addEventListener('DOMContentLoaded', function () {
    const likedSongsList = document.getElementById('liked-songs-list');
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];

    // Function to render the liked songs
    function renderLikedSongs() {
        likedSongsList.innerHTML = ''; // Clear the list
        if (likedSongs.length === 0) {
            likedSongsList.innerHTML = '<li>Nenhuma música curtida.</li>';
        } else {
            likedSongs.forEach((song, index) => {
                const li = document.createElement('li');
                li.textContent = song;

                // Create a remove button for each song
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.classList.add('remove-song');
                removeButton.addEventListener('click', () => {
                    removeSong(index);
                });

                li.appendChild(removeButton);
                likedSongsList.appendChild(li);
            });
        }
    }

    // Function to remove a song
    function removeSong(index) {
        likedSongs.splice(index, 1); // Remove the song from the array
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs)); // Update localStorage
        renderLikedSongs(); // Re-render the list
    }

    // Initial rendering of liked songs
    renderLikedSongs();
});
