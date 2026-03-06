let isMusicPlaying = false;

window.onload = function() {
    document.body.classList.remove("container");
};

function playPopSound() {
    const sound = document.getElementById('popSound');
    const bgMusic = document.getElementById('bgMusic');
    if (!isMusicPlaying && bgMusic) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
        }).catch(err => console.warn("Nhạc nền bị chặn:", err));
    }
    if (sound) {
        const randomTimes = Math.floor(Math.random() * 2) + 1; 
        let count = 0;
        const interval = 120;
        const playCycle = setInterval(() => {
            sound.pause();
            sound.currentTime = 0;
            sound.volume = (count === 1) ? 0.5 : 1.0;
            sound.play().catch(err => {});
            count++;
            if (count >= randomTimes) clearInterval(playCycle);
        }, interval);
    }
}


document.addEventListener('click', function(e) {
    playPopSound(); 
    const heartCount = 10;
    for (let i = 0; i < heartCount; i++) {
        createHeart(e.pageX, e.pageY);
    }
});
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💗'; 
    heart.style.position = 'absolute';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.userSelect = 'none';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    
    const destinationX = (Math.random() - 0.5) * 300;
    const destinationY = (Math.random() - 0.5) * 300;
    const rotation = Math.random() * 360;
    const delay = Math.random() * 0.2;

    const duration = Math.random() * 0.5 + 1.5; 
    heart.style.transition = `all ${duration}s ease-out`;
    heart.style.transitionDelay = delay + 's';
    heart.style.opacity = '1';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`;
        heart.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000); 
}

const listMsg = [
    "Xin chào Cửm Lê 💖",
    "Ai mà xinh gái thé nhò! 😊",
    "Cục cức thúi cụa anhh! 🌹",
    "Iu Cửm thé nhò! 🥰",
    "Mãi xinh đẹp nhó! ✨",
    "Cảm ơn vì tất cảaa! 💝",
    "Good luck babyyy! 🍀"
];

function createFallingMessage() {
    const container = document.getElementById('messagesContainer');
    if (!container) return;

    const div = document.createElement('div');
    div.classList.add('falling-msg');
    div.innerText = listMsg[Math.floor(Math.random() * listMsg.length)];

   
    const startX = Math.random() * 70 + 5; 
    const duration = Math.random() * 3 + 5; 

    div.style.left = startX + '%';
    div.style.animationDuration = duration + 's';

    container.appendChild(div);

    div.addEventListener('animationend', () => {
        div.remove();
    });
}


setInterval(createFallingMessage, 2500);