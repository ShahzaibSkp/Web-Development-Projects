let currentSong = new Audio();
let songs;
let currFolder;
let currentAlbumTitle = "";
let currentAlbumArtist = "";

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder, albumTitle = currentAlbumTitle, artistName = currentAlbumArtist) {
    currFolder = folder;
    currentAlbumTitle = albumTitle;
    currentAlbumArtist = artistName;
    let a = await fetch(`http://192.168.1.9:3000/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            const href = element.href;
            const normalizedFolder = folder.replace(/^\/+|\/+$/g, "");
            const forwardSlashPath = `/${normalizedFolder}/`;
            const backSlashPath = `%5C${normalizedFolder.replaceAll("/", "%5C")}%5C`;

            if (href.includes(forwardSlashPath)) {
                songs.push(href.split(forwardSlashPath)[1]);
            } else if (href.includes(backSlashPath)) {
                songs.push(href.split(backSlashPath)[1]);
            }
        }
    }

    let songsUL = document.querySelector(".songsList").getElementsByTagName("ul")[0];
    songsUL.innerHTML = "";
    for (const song of songs) {
        songsUL.innerHTML = songsUL.innerHTML +
            `<li>
            <div class="info flex items-center">
                <img class="invert flex" src="images/music.svg" alt="music">
                <div class="songDetails flex justify-center">
                    <span>${song.replaceAll("%20", " ")}</span>
                    <span>${currentAlbumArtist || currentAlbumTitle}</span>
                </div>
            </div>
            <div class="playNow flex items-center">
                <span>Play Now</span>
                <img class="flex" src="images/play.svg" alt="play">                
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".songDetails").firstElementChild.innerHTML);
        })
    })

}

const playMusic = (track, pause = false) => {
    currentSong.src = `${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        playSong.src = "images/pause.svg";
    }
    document.querySelector(".songInfo").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let a = await fetch(`http://192.168.1.9:3000/Songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let playlist = document.querySelector(".playlist");
    let array = Array.from(anchors);

    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("%5CSongs%5C")) {
            let folder = decodeURIComponent(e.href.split("/").slice(-2)[0]).split("\\").pop();
            let a = await fetch(`http://192.168.1.9:3000/Songs/${folder}/info.json`);
            if (!a.ok) return;
            let response = await a.json();
            let encodedTitle = encodeURIComponent(response.title || "");
            let encodedArtist = encodeURIComponent(response.artist || "");
            playlist.innerHTML = playlist.innerHTML +
                `<div data-folder="${folder}" data-title="${encodedTitle}" data-artist="${encodedArtist}" class="card flex">
                    <div class="play">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
                            <circle cx="12" cy="12" r="12" fill="#1ed760" />
                            <path
                                d="M9.5 8.75C9.5 8.29 10.02 8.01 10.42 8.26L15.35 11.51C15.72 11.75 15.72 12.25 15.35 12.49L10.42 15.74C10.02 15.99 9.5 15.71 9.5 15.25V8.75Z"
                                fill="#000000" />
                        </svg>
                    </div>
                    <img src="Songs/${folder}/cover.jfif" alt="card Image">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>
                </div>`
        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            await getSongs(
                `Songs/${item.currentTarget.dataset.folder}`,
                decodeURIComponent(item.currentTarget.dataset.title || ""),
                decodeURIComponent(item.currentTarget.dataset.artist || "")
            );
            playMusic(songs[0], true);
        })
    })
}

async function main() {
    await displayAlbums();
    let firstCard = document.querySelector(".card");

    if (firstCard) {
        await getSongs(
            `Songs/${firstCard.dataset.folder}`,
            decodeURIComponent(firstCard.dataset.title || ""),
            decodeURIComponent(firstCard.dataset.artist || "")
        );
        playMusic(songs[0], true);
    }

    playSong.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playSong.src = "images/pause.svg";
        }
        else {
            currentSong.pause();
            playSong.src = "images/play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekBar").addEventListener("click", e => {
        let precent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = precent + "%";
        currentSong.currentTime = ((currentSong.duration) * precent) / 100;
    })

    document.querySelector(".hamburger>img").addEventListener("click", () => {
        document.querySelector(".side-bar").style.left = "0";
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".side-bar").style.left = "-100%";
    })

    previousSong.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            currentSong.pause();
            playMusic(songs[index - 1]);
        }
    })

    nextSong.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            currentSong.pause();
            playMusic(songs[index + 1]);
        }
    })

    range.addEventListener("change", (e) => {
        if (document.querySelector(".volume>img").src.includes("images/mute.svg")) {
            return;
        }
        currentSong.volume = parseInt(e.target.value) / 100;
    })

    document.querySelector(".volume>img").addEventListener("click", (e) => {
        if (e.target.src.includes("images/volume.svg")) {
            e.target.src = e.target.src.replace("images/volume.svg", "images/mute.svg");
            currentSong.volume = 0;
            range.value = 0;
        }

        else {
            e.target.src = e.target.src.replace("images/mute.svg", "images/volume.svg");
            currentSong.volume = .50;
            range.value = 50;
        }
    })
}

main();