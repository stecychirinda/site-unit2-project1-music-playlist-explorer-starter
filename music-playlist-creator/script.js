const playList = document.querySelector(".playlist-cards");  


function renderPlaylists(){
playList.innerHTML = "";
playlists.forEach(playlist => {
    let isLiked = false                           
    const card = document.createElement('div');    
    card.className = "playlist_card";

    const header = document.createElement("div");         
    header.className="playlist_header";

    const art = document.createElement("img");       
    art.src= playlist.playlist_art;
    art.alt= playlist.playlist_name;
    art.width = 200;
    art.className ="playlist_art";

    const info = document.createElement("div");       
    info.className ="playlist_info";

    const name= document.createElement("h3");       
    name.className = "playlist_name";               
    name.textContent = playlist.playlist_name;

    const creator = document.createElement("p");
    creator.className = "playlist_creator";
    creator.textContent = `By ${playlist.playlist_creator}`;   

    const likes = document.createElement("p");
    likes.className = "playlist_likes";
    likes.textContent = `${playlist.likeCount} Likes`;

    const likeBtn = document.createElement("button");
    likeBtn.className = "like-button";
    likeBtn.textContent = "❤️";

    likeBtn.addEventListener("click", (e) =>{
        e.stopPropagation();                  // Prevents modal from opening when clicking like button
        
        if (!isLiked) {
            playlist.likeCount++;
            likeBtn.textContent = "💔";
            likeBtn.classList.add("liked")
        }
        else {
            playlist.likeCount--;
            likeBtn.textContent= "❤️";
            likeBtn.classList.remove("liked")
        }    
        
        isLiked = !isLiked;
        likes.textContent = `${playlist.likeCount} likes`;
    });

    info.appendChild(name);                  
    info.appendChild(creator);
    info.appendChild(likes);
    info.appendChild(likeBtn);

    header.appendChild(art);
    header.appendChild(info);

    card.addEventListener("click", (event)=> {   
    
        openModal(playlist);
    })
    card.appendChild(header);
    playList.appendChild(card);
    }
);
}
renderPlaylists();


const modal = document.querySelector('.modal');  

function openModal(playlist){           
    //console.log(playlist)
    //console.log(playlist.playlist_name)

    const new_playlist_title = document.getElementById("playlist_title") 
    new_playlist_title.innerText = playlist.playlist_name

    //console.log(playlist.playlist_art) 

    const new_creator_name = document.getElementById("creator_name")
    new_creator_name.innerText = playlist.playlist_creator

    const new_picture = document.getElementById("playlist_img"); 
    new_picture.src = playlist.playlist_art;



    //Songs inside playlist 
    const my_songList = document.querySelector(".playlistss")
    //console.log("songs here", playlist.songs);
    my_songList.innerHTML = " ";

    const songList = document.createElement('ul');               
    songList.className= "songList";

    playlist.songs.forEach(song => {                           
        const item = document.createElement('li');
        item.className = "song-item";

        const cover = document.createElement("img");
        cover.src = song.cover_art;
        cover.alt= song.title;
        cover.width =200; 
        cover.className = "cover_art";

        
        const songInfo = document.createElement("div"); 
        songInfo.className ="song_info";

        const songTitle = document.createElement("strong");
        songTitle.className = "song_title";
        songTitle.textContent = song.title;

        

        const artistName = document.createElement("p");
        artistName.className= "song_artist";
        artistName.textContent = `Artist: ${song.artist}`;

        
        const albumName = document.createElement("p");
        albumName.className= "song_album";
        albumName.textContent = `Album: ${song.album}`;

        
        const durationE = document.createElement("p");
        durationE.className= "song_duration";
        durationE.textContent = `${song.duration}`;

        songInfo.appendChild(songTitle);
        songInfo.appendChild(artistName);
        songInfo.appendChild(albumName);
        songInfo.appendChild(durationE);

        // item.appendChild(cover);
        // item.appendChild(songInfo);

        const cover_div = document.createElement("div")
        cover_div.className = "coversong"

        cover_div.append(cover)

        const song_div = document.createElement("div")
        song_div.className = "songdiv"

        song_div.append(songInfo)

        item.appendChild(cover_div)
        item.appendChild(song_div)

        
        songList.appendChild(item);      
        //console.log(songList)
        my_songList.append(songList);
    });
   
    //modal.style.display = "flex";
    //console.log( modal.style.display);
    modal_overlay.classList.remove("hidden");
}

const modal_overlay = modal;
console.log(modal_overlay);

    function closeModal(){
       modal_overlay.classList.add("hidden");
}
    modal_overlay.addEventListener("click", (event) =>{
        //console.log(modal_overlay.style.display);
         console.log("You clicked:", event.target);
        if (event.target === modal_overlay){
             console.log("Clicked on the overlay – closing modal.");
            closeModal();
        }
});


function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i-- ){
        const j = Math.floor(Math.random() * (i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
}


    document.getElementById("shuffle-btn").addEventListener("click",(e)=>{
        e.stopPropagation();
        playList.innerHTML= "";
    
        playlists.forEach(playlist =>{
        playlist.songs = shuffleArray(playlist.songs);
    });
    

    renderPlaylists();

    if (!modal_overlay.classList.contains("hidden")) {
        const currentPlaylistName = document.getElementById("playlist_title").innerText;
        const currentPlaylist = playlists.find(playlist => playlist.playlist_name === currentPlaylistName);
        if (currentPlaylist) {
            openModal(currentPlaylist);
        }
    }

});

function showRandomFeaturedPlaylist(){
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const playlist = playlists[randomIndex];
    localStorage.setItem("featuredPlaylistIndex", randomIndex);
    window.location.href = "featured.html";
}

// function renderFeturedPlaylist(playlists){
//     const randomIndex = parseInt(localStorage.getItem("featuredPlaylistIndex"));
//     const playlist = playlists[randomIndex];
//     const container = document.getElementById("featured-playlist");
//     container.innerHTML=""

//     const left = document.createElement("div");
//     left.className = "featured-left";

//     const cover = document.createElement("img");
//     cover.src = playlist.playlist_art;
//     cover.alt = playlist.playlist_name;

//     const name = document.createElement("p");
//     name.className = "featured-name";
//     name.textContent = playlist.playlist_name;

//     left.appendChild(cover);
//     left.appendChild(name);

//     const right = document.createElement("div");
//     right.className = "featured-right";

//     const ul = document.createElement("ul");

//     playlist.songs.forEach(song => {
//         const li = document.createElement("li");
//         li.innerHTML =
//         ` <strong>${song.title}</strong> <br>
//         ${song.artist} * ${song.album} * ${song.duration} `;

//         ul.appendChild(li);
//     });
//     right.appendChild(ul);

//     container.appendChild(left);
//     container.appendChild(right);

// }

//     renderFeturedPlaylist(playlists);

