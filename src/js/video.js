let videoreview = [
    {
    id: "1",
    name: "GoPro HERO7 Black",
    picture: "video1.jpg",
    src: "https://www.youtube.com/embed/Vb_9aatr2fw"
    },
    {
    id: "2",
    name: "JBL BoomBox",
    picture: "video2.jpg",
    src: "https://www.youtube.com/embed/B3CZu5j-5JY"
    },
    {
    id: "3",
    name: "Garmin Vivoactive 3",
    picture: "video3.jpg",
    src: "https://www.youtube.com/embed/9FcooDZAxDA"
    },
    {
    id: "4",
    name: "ECOVACS ROBOTICS DEEBOT OZMO 950",
    picture: "video4.jpg",
    src: "https://www.youtube.com/embed/E83bLZO1y-g"
    },
    {
    id: "5",
    name: "Xiaomi Ninebot",
    picture: "video5.jpg",
    src: "https://www.youtube.com/embed/0jnOGPlVAhY"
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
        let videoWindow = document.querySelector('.videoWindow');
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