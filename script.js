console.log("Welcome to Spotify");

//initialize the variables
let song_index = 0;
let audio_element = new Audio("songs/1.mp3");

let master_play = document.getElementById('master_play');
let my_progress_bar = document.getElementById('my_progress_bar');
let gif = document.getElementById('gif');
let master_song_name = document.getElementById('master_song_name');
let song_items = Array.from(document.getElementsByClassName('song_item'));

let songs = [
    {song_name: "Main Rang sharbaton ka",file_path: "songs/1.mp3", cover_path: "covers/cover1.jpg"},
    {song_name: "Mahi Aaja",file_path: "songs/2.mp3", cover_path: "covers/cover2.jpg"},
    {song_name: "Sanson Ko Jeene Ka Sahara Mil",file_path: "songs/3.mp3", cover_path: "covers/cover3.jpg"},
    {song_name: "Suraj Hua Maddham",file_path: "songs/4.mp3", cover_path: "covers/cover4.jpg"},
    {song_name: "Wada Raha Sanam",file_path: "songs/5.mp3", cover_path: "covers/cover5.jpg"}
]

song_items.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].cover_path;
    element.getElementsByClassName("song_name")[0].innerText = songs[i].song_name;
})

//audio_element.play();

//handle play/pause click
master_play.addEventListener('click',()=>{
    if(audio_element.paused ||  audio_element.currentTime<=0){
        audio_element.play();
        master_play.classList.remove('fa-play-circle');
        master_play.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audio_element.pause();
        master_play.classList.remove('fa-pause-circle');
        master_play.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to events
audio_element.addEventListener("timeupdate",() => {
    //update seekbar
    progress = parseInt((audio_element.currentTime/audio_element.duration)*100);
    my_progress_bar.value = progress;
})

my_progress_bar.addEventListener('change', ()=>{
    audio_element.currentTime = my_progress_bar.value * audio_element.duration/100;
})

const make_all_plays = ()=>{
    Array.from(document.getElementsByClassName("song_item_play")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("song_item_play")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        make_all_plays();
        song_index = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audio_element.src = `songs/${song_index+1}.mp3`;
        master_song_name.innerText =songs[song_index].song_name;
        audio_element.currentTime =0;
        audio_element.play();
        gif.style.opacity = 1;
        master_play.classList.remove('fa-play-circle');
        master_play.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(song_index>=4){
        song_index = 0
    }
    else{
        song_index+=1;
    }
    audio_element.src = `songs/${song_index + 1}.mp3`;
    master_song_name.innerText =songs[song_index].song_name;
    audio_element.currentTime =0;
    audio_element.play();
    master_play.classList.remove('fa-play-circle');
    master_play.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(song_index<=0){
        song_index = 0
    }
    else{
        song_index-=1;
    }
    audio_element.src = `songs/${song_index+1}.mp3`;
    master_song_name.innerText =songs[song_index].song_name;
    audio_element.currentTime =0;
    audio_element.play();
    master_play.classList.remove('fa-play-circle');
    master_play.classList.add('fa-pause-circle');
})