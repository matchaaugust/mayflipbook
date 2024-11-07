function startSnowAnimation() {
    // Fungsi untuk animasi salju
    function snow() {
        const canvas = document.getElementById('snow');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const snowflakes = [];

        function createSnowflake() {
            return {
                x: Math.random() * canvas.width,
                y: 0,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 3 + 1
            };
        }

        function drawSnowflake(flake) {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }

        function moveSnowflake(flake) {
            flake.y += flake.speed;
            if (flake.y > canvas.height) {
                flake.y = 0;
            }
        }

        function animateSnow() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snowflakes.forEach(flake => {
                drawSnowflake(flake);
                moveSnowflake(flake);
            });
            requestAnimationFrame(animateSnow);
        }

        for (let i = 0; i < 100; i++) {
            snowflakes.push(createSnowflake());
        }

        animateSnow();
    }

    snow()
}

startSnowAnimation()

// turn page when click next at prev button
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        }
        else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    }
})


// Putar musik otomatis (perhatikan: banyak browser akan memblokir autoplay)
window.addEventListener('load', () => {
    const audio = document.getElementById('bgMusic');
    audio.play().catch(e => console.log("Autoplay was prevented"));
});

// untuk memulai music
document.addEventListener('DOMContentLoaded', function() {
    const playPrompt = document.getElementById('playPrompt');
    const playButton = document.getElementById('playButton');
    const wrapper = document.querySelector('.wrapper');
    const bgMusic = document.getElementById('bgMusic');

    playButton.addEventListener('click', function() {
        bgMusic.play();
        playPrompt.style.display = 'none';
        wrapper.style.display = 'block';
    });
});

// create reverse index function
const pages = document.querySelectorAll('.book-page.page-right')
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

// back profile button when click
const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500)

        }, (index + 1) * 200 + 100)
    })
}

// opening animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

// opening animation (cover right animation)
setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800)

// opening animation (page left or profile page animation)
setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3200)

// opening animation (all page right animation)
pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
        }, 500)

    }, (index + 1) * 200 + 2100)
})
