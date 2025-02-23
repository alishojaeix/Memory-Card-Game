document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg',
        'images/7.jpg',
        'images/8.jpg'
    ];
    const cards = [...cardImages, ...cardImages]; // Duplicate images to create pairs
    let flippedCards = [];
    let matchedCards = [];

    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCard(imageUrl) {
        const card = document.createElement('div');
        card.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('front');
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Card Image';
        front.appendChild(img);

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = '?';

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const img1 = card1.querySelector('.front img').src;
        const img2 = card2.querySelector('.front img').src;

        if (img1 === img2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);

            if (matchedCards.length === cards.length) {
                setTimeout(() => alert('Congratulations! You won!'), 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }

        flippedCards = [];
    }

    function resetGame() {
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedCards = [];
        const shuffledCards = shuffle(cards);
        shuffledCards.forEach(imageUrl => {
            const card = createCard(imageUrl);
            gameBoard.appendChild(card);
        });
    }

    resetButton.addEventListener('click', resetGame);

    resetGame();
});