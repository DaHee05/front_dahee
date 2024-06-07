document.getElementById('comment-link').addEventListener('click', function() {
    window.location.href = '/comment.html';
});

document.getElementById('comment-link-to').addEventListener('click', function() {
    window.location.href = '/comment.html';
});

// URL 리디렉션을 설정
if (window.location.pathname === '/comment') {
    window.location.replace('/comment.html');
}

const frame = document.querySelector(".left-panel section");
const lists = frame.querySelectorAll("article");
const next = document.querySelector(".btnNext");
let i = 0; 
let active = 0; 

function activation(index, lists) {
    for (let i = 0; i < lists.length; i++) {
        let pic = lists[i].querySelector(".pic");
        switch(i % 3) {
            case 0:
                pic.style.backgroundImage = `url('/img/20240508_161202.jpg')`;
                break;
            case 1:
                pic.style.backgroundImage = `url('/img/20240606_151408015.jpg')`;
                break;
            case 2:
                pic.style.backgroundImage = `url('/img/20240606_151324746.jpg')`;
                break;
        }
    }
    for(let el of lists) {
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}


function nextImage() {
    (active == lists.length - 1) ? active = 0 : active++;
    activation(active, lists);
}

//article의 개수만큼 반복 
for(let el of lists) {  
    let pic = el.querySelector(".pic");  
    pic.style.backgroundImage = `url('/img/20240508_161202.jpg')`;
    i++;
}

// 이미지 자동 전환 기능 추가
setInterval(nextImage, 5000); // 3초마다 이미지 자동 전환
