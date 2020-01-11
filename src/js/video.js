let videoreview = [
    {
    id: "1",
    name: "Garmin Watch",
    picture: "video1.jpg",
    src: "https://www.youtube.com/embed/zYkt0IrPoAM"
    },
    {
    id: "2",
    name: "Garmin Watch",
    picture: "video2.jpg",
    src: "https://www.g.com/embed/zYkt0IrPoAM"
    },
    {
    id: "3",
    name: "Garmin Watch",
    picture: "video3.jpg",
    src: "https://www.youtube.com/embed/zYkt0IrPoAM"
    },
    {
    id: "4",
    name: "Garmin Watch",
    picture: "video4.jpg",
    src: "https://www.youtube.com/embed/zYkt0IrPoAM"
    },
    {
    id: "5",
    name: "Garmin Watch",
    picture: "video5.jpg",
    src: "https://www.youtube.com/embed/zYkt0IrPoAM"
    }
];

function showVideoReviews(){
    let videoBox = document.querySelector('.video-container');
    for (let i = 0; i < 5; i++){
        switch (i) {
            case 0 : classToAdd = "video-item-first";
            break;
            case 1:
            case 2: classToAdd = "video-item-second-third";
            break;
            default: classToAdd = "video-item";
        }
        let item = createVideoItem(videoreview[i].id, videoreview[i].name, videoreview[i].picture, classToAdd);
        videoBox.appendChild(item);
    }
    videoBox.addEventListener('click', (event)=>{
        let target = event.target.parentElement;
        let videoId = target.getAttribute('data-video-id');
        // console.log(target, videoId);
        let videoWindow = document.querySelector('.videoWindow');
        // console.log(videoWindow);
        videoWindow.addEventListener('click', () => {
            videoWindow.innerHTML = "";
            videoWindow.classList.add('none-displayed');
        })
        videoWindow.classList.remove('none-displayed');
        videoWindow.innerHTML = `<iframe width="100%" height="100%" src="${videoreview[videoId - 1].src}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    })
}

function createVideoItem(id, name, picture, addClass){
    let videoItem = document.createElement('div');
    videoItem.setAttribute('class', addClass);
    videoItem.setAttribute('data-video-id', id);
    videoItem.innerHTML = `<img src="images/videoreview/${picture}" alt="">
                        <p class="video-name">${name}</p>
                        <p class="video-play">Воспроиздведение...</p>`
    return videoItem
}

showVideoReviews();