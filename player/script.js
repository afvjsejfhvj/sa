document.addEventListener('DOMContentLoaded', function () {
    const playPauseButton = document.getElementById('play-pause');
    const audio = document.getElementById('audio');
    const progressBar = document.getElementById('progress-bar');
    const playlistItems = document.querySelectorAll('#playlist li');
    const likeBtn = document.getElementById('like-btn');
    const albumImage = document.querySelector('.album-info img');
    let isPlaying = false;
    let currentSongIndex = 0;
    let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];

    function loadSong(index) {
        const selectedSong = playlistItems[index];
        const songSrc = selectedSong.getAttribute('data-src');
        const songImg = selectedSong.getAttribute('data-img');
        audio.src = songSrc;
        audio.load();
        document.querySelector('.album-info h2').textContent = selectedSong.textContent.split(' - ')[1];
        document.querySelector('.album-info p').textContent = selectedSong.textContent.split(' - ')[0];
        albumImage.src = songImg;
        playPauseButton.innerHTML = '<i class="ri-play-fill"></i>';
        isPlaying = false;
        updateActiveSong(index);
        updateLikeButton();
    }

    function updateActiveSong(index) {
        playlistItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function updateLikeButton() {
        const currentSong = playlistItems[currentSongIndex].textContent;
        if (likedSongs.includes(currentSong)) {
            likeBtn.innerHTML = '<i class="ri-heart-fill"></i>';
        } else {
            likeBtn.innerHTML = '<i class="ri-heart-line"></i>';
        }
    }

    loadSong(currentSongIndex);

    playPauseButton.addEventListener('click', function () {
        if (isPlaying) {
            audio.pause();
            playPauseButton.innerHTML = '<i class="ri-play-fill"></i>';
        } else {
            audio.play();
            playPauseButton.innerHTML = '<i class="ri-pause-fill"></i>';
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', updateProgress);

/*Parte Ramon 
const playlistSelect = document.getElementById('playlist-select');
const newPlaylistInput = document.getElementById('new-playlist');
const createPlaylistBtn = document.getElementById('create-playlist-btn');

// Função para carregar playlists do localStorage
function loadPlaylists() {
    // Obter playlists do localStorage ou iniciar com objeto vazio
    const playlists = JSON.parse(localStorage.getItem('playlists')) || {};

    // Limpar o select e adicionar a opção padrão
    playlistSelect.innerHTML = '<option value="">Selecione uma playlist</option>';

    // Adicionar cada playlist ao dropdown
    for (const playlistName in playlists) {
        const option = document.createElement('option');
        option.value = playlistName;
        option.textContent = playlistName;
        playlistSelect.appendChild(option);
    }
}

// Função para criar uma nova playlist
createPlaylistBtn.addEventListener('click', function() {
    const newPlaylistName = newPlaylistInput.value.trim();
    if (!newPlaylistName) {
        alert("Por favor, insira um nome para a nova playlist.");
        return;
    }

    // Obter playlists do localStorage ou iniciar com objeto vazio
    const playlists = JSON.parse(localStorage.getItem('playlists')) || {};

    // Verificar se a playlist já existe
    if (playlists[newPlaylistName]) {
        alert("Uma playlist com este nome já existe.");
        return;
    }

    // Criar uma nova playlist vazia e salvar no localStorage
    playlists[newPlaylistName] = [];
    localStorage.setItem('playlists', JSON.stringify(playlists));

    // Atualizar a lista de playlists no select
    loadPlaylists();

    // Limpar o campo de input
    newPlaylistInput.value = '';
});

// Função para adicionar/remover a música na playlist selecionada
playlistBTN.addEventListener('click', function () {
    const currentSong = playlistItems[currentSongIndex].textContent;
    const selectedPlaylist = playlistSelect.value;

    if (selectedPlaylist === "") {
        alert("Por favor, selecione uma playlist.");
        return;
    }

    // Obter playlists do localStorage
    const playlists = JSON.parse(localStorage.getItem('playlists')) || {};

    // Verificar se a playlist selecionada existe
    if (!playlists[selectedPlaylist]) {
        alert("A playlist selecionada não existe.");
        return;
    }

    // Adicionar ou remover a música da playlist selecionada
    if (playlists[selectedPlaylist].includes(currentSong)) {
        playlists[selectedPlaylist] = playlists[selectedPlaylist].filter(song => song !== currentSong);
    } else {
        playlists[selectedPlaylist].push(currentSong);
    }

    // Salvar a playlist atualizada no localStorage
    localStorage.setItem('playlists', JSON.stringify(playlists));

    // Atualizar a interface do botão de like
    updateLikeButton();
});

// Carregar playlists quando a página é carregada
document.addEventListener('DOMContentLoaded', loadPlaylists);

/*Fim parte Ramon */

    function updateProgress() {
        const { duration, currentTime } = audio;
        const percent = (currentTime / duration) * 100;
        progressBar.style.width = `${percent}%`;
    }

    document.getElementById('progress-container').addEventListener('click', function (event) {
        const width = this.clientWidth;
        const clickX = event.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    document.getElementById('next').addEventListener('click', function () {
        currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
        loadSong(currentSongIndex);
        audio.play();
    });

    document.getElementById('prev').addEventListener('click', function () {
        currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
        loadSong(currentSongIndex);
        audio.play();
    });

    likeBtn.addEventListener('click', function () {
        const currentSong = playlistItems[currentSongIndex].textContent;
        if (likedSongs.includes(currentSong)) {
            likedSongs = likedSongs.filter(song => song !== currentSong);
        } else {
            likedSongs.push(currentSong);
        }
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
        updateLikeButton();
    });

    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audio.play();
        });
    });
});
