function renderFeaturedPlaylist(){
    const randomIndex = parseInt(localStorage.getItem("featuredPlaylistIndex"));
    const playlist = playlists[randomIndex];
    const container = document.getElementById("featured-playlist");
    container.innerHTML="";

    const left = document.createElement("div");
    left.className = "featured-left";

    const cover = document.createElement("img");
    cover.src = playlist.playlist_art;
    cover.alt = playlist.playlist_name;

    const name = document.createElement("p");
    name.className = "featured-name";
    name.textContent = playlist.playlist_name;

    left.appendChild(cover);
    left.appendChild(name);

    const right = document.createElement("div");
    right.className = "featured-right";

    const ul = document.createElement("ul");

    playlist.songs.forEach(song => {
        const li = document.createElement("li");
        li.innerHTML =
        ` <strong>${song.title}</strong> <br>
        ${song.artist} * ${song.album} * ${song.duration} `;

        ul.appendChild(li);
    });
    right.appendChild(ul);

    container.appendChild(left);
    container.appendChild(right);
}

document.addEventListener("DOMContentLoaded", function() {
    renderFeaturedPlaylist();
});

const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});