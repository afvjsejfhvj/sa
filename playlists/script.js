let playlist = JSON.parse(localStorage.getItem('playlist')) || []

function createPlaylist(){
    const nomePlaylist = document.getElementById('nomePlaylist').value;
    
    //recupera lista de usuários armazenada em local storage ou cria uma lista vazia 
    //de usuários caso não haja nenhum usuario cadastrado
    let playlist = JSON.parse(localStorage.getItem('playlist')) || []


    //criar novo usuário que será armazenado na nossa lista local
    let newPlaylist = {
        id: Date.now(),
        name: nomePlaylist
    }

    //colocando objeto no local Storage
    playlist.push(newPlaylist)

    localStorage.setItem('playlist', JSON.stringify(playlist))

}



function loadPlaylists() {
    const playlistsExibition = document.getElementById('playlists-exibition');
    
    playlistsExibition.innerHTML = '';
    
    playlist.forEach(newPlaylist => {
        const listItem = document.createElement('li');
        listItem.textContent = newPlaylist.name;
        playlistsExibition.innerText(listItem);
    });
}loadPlaylists();