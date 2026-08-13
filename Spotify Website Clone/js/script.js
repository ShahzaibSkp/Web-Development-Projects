console.log("Lets start with script");
let currentSong = new Audio();

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

async function getSongs() {
    let a = await fetch("http://192.168.1.5:3000/Songs");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("%5CSongs%5C")[1]);
        }
    }

    return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = "/Songs/" + track;
    if (!pause) {
        currentSong.play();
        playSong.src = "images/pause.svg";
    }
    document.querySelector(".songInfo").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
}

async function main() {
    let songs = await getSongs();
    playMusic(songs[0], true);

    let songsUL = document.querySelector(".songsList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songsUL.innerHTML = songsUL.innerHTML +
            `<li>
            <div class="info flex items-center">
                <img class="invert flex" src="images/music.svg" alt="music">
                <div class="songDetails flex justify-center">
                    <span>${song.replaceAll("%20", " ")}</span>
                    <span>Atif Aslam</span>
                </div>
            </div>
            <div class="playNow flex items-center">
                <span>Play Now</span>
                <img class="invert flex" src="images/play.svg" alt="play">                
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".songDetails").firstElementChild.innerHTML);
        })
    })

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
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekBar").addEventListener("click", e => {
        console.log(e);
    })
}

main();