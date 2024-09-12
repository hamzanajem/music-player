// target html elements
const image =document.querySelector('img');
const title  = document.getElementById('title');
const artist = document.getElementById('artist');
const music =document.querySelector('audio');
const prevbtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');
const playbtn = document.getElementById('play');
const progresscontainer =document.getElementById('progress-container');
const progress =document.getElementById('progress');
const currenttime =document.getElementById('current-time');
const Duration =document.getElementById('duration');

// global variable 

let plus =0;
let songs =[
    {name:'jacinto-1',displayname:'fjhefef',artist:'jacinto-1'},
   { name:'jacinto-2',displayname:'fjhefef',artist:'jacinto-2'},
   { name:'jacinto-3',displayname:'fjhefef',artist:'jacinto-3'},
   {name:'metric-1',displayname:'fjhefef',artist:'metric-1'},
           ];
let isplaying= false;

// play audio

function playsong(){
    isplaying =true;
    playbtn.classList.replace('fa-play' ,'fa-pause');
    playbtn.setAttribute('title' ,'pause');
    music.play();
}

//pause audio 

function pausesong(){
    isplaying=false ;
    playbtn.classList.replace('fa-pause' ,'fa-play');
    playbtn.setAttribute('title' ,'play');
    music.pause();
   
}

// play pause event

playbtn.addEventListener('click' , ()=>((isplaying ? pausesong() : playsong())));


//ubdate dom 

function loadsong(song){
    title.textContent =song.displayname;
    artist.textContent=song.artist;
    music.src='music/'+song.name +'.mp3' ;
    image.src='img/'+song.name +'.jpg' ;
}


// nextsong

function nextsong(){
    plus++;
if(plus>songs.length -1 ){
plus=0; 
}
 loadsong(songs[plus]);
 playsong();
};

//nextsong event

nextbtn.addEventListener('click' ,nextsong);
function prevsong(){
    plus--;
    if(plus<0){
        plus = songs.length -1;
    }
     loadsong(songs[plus]);
     
     playsong();
   
    };

    //prevsong event

    prevbtn.addEventListener('click' ,prevsong);

    function updateprogressbar(e){
        if(isplaying){
          const { duration ,currentTime} = e.srcElement;
          //console.log(duration , currentTime);
              const progressPercent = currentTime/duration * 100;
progress.style.width=progressPercent +'%';
currenttime.textContent =(currentTime/60).toFixed(2);
Duration.textContent =(duration/60).toFixed(2);
        }

    }

    
//timeupdate event

music.addEventListener('timeupdate', updateprogressbar);




function setprogressbar(e){
    if(!isplaying){
        playsong();
    }
    const width =this.clientWidth;
    const  clickx =e.offsetX;
    const {duration} = music;
    music.currentTime = (clickx / width) * duration ; 

}
// change song time event 
progresscontainer.addEventListener('click', setprogressbar);



// next audio auto

music.addEventListener('ended' ,nextsong);