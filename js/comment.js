const host = "http://34.201.238.254:8085";
const commentContainer = document.querySelector('.container .cards');

function getComments() {
    axios.get(`${host}/comment`).then(Response => {
        console.log(Response.data);
        renderComments(Response.data.comments);
    })
    .catch(error => {
        console.error('Error Fetching comments:', error);
    });
}

function renderComments(comments){
    commentContainer.innerHTML='';
    comments.forEach(comment => {
        const commentCard = document.createElement('div');
        commentCard.classList.add('card');

        // 닉네임 보여주기
        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = comment.nickname;

        // 작성 시간 보여주기
        const cardDate = document.createElement('p');
        cardDate.classList.add('date');
        cardDate.textContent = new Date(comment.time).toLocaleString();

        // 방명록 내용 보여주기
        const cardDescription = document.createElement('p');
        cardDescription.classList.add('description');
        cardDescription.textContent = comment.content;

        // 삭제
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.dataset.id = comment.id;

        deleteBtn.addEventListener('click', function() {
            const commentId = deleteBtn.dataset.id;
            deleteComment(commentId, commentCard);
        });

        cardDescription.appendChild(deleteBtn);

        commentCard.appendChild(cardTitle);
        commentCard.appendChild(cardDate);
        commentCard.appendChild(cardDescription);
        commentContainer.appendChild(commentCard); 
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getComments();
})

// 내용 추가
document.getElementById('submit-btn').addEventListener('click', function() {
    const nicknameInput = document.querySelector('.nickname-input');
    const contentInput = document.querySelector('.content-input');
    const currenTime = new Date().toISOString();

    const nickname = nicknameInput.value.trim();
    const content = contentInput.value.trim();

    if (nickname === '' || content === '') {
        alert ("닉네임과 내용을 모두 입력해주세요.");
        return;
    }

    let commentData = {
        id: 0,
        nickname: nickname,
        content: content,
        time: currenTime
    };

    axios.post(`${host}/comment`, commentData).then(Response => {
        nicknameInput.value = '';
        contentInput.value = '';
        getComments();
    })
    .catch(error => {
        console.error('Error adding comment: ', error);
    });
});

// 삭제
function deleteComment(commentId, commentCard) {
    axios.delete(`${host}/comment/${commentId}`).then(response => {
        console.log(response.data);
        commentCard.remove(); // 카드 삭제
    })
    .catch(error => {
        console.error('Error deleting comment:', error);
    });
}

// 다시 홈으로 돌아가기
function goBack() {
    //window.history.back();
    window.location.href = '/index.html';
}