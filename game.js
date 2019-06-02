
const gameFieldSection = document.querySelector(`.container`);
const resetGame = document.querySelector(`.reset-game`);
const message = document.querySelector(`.message`);
const winCombinations = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
];
const playerScore = {
    X : [],
    O: []
};
let player = `X`;

/**
 * @return {string} template
 */
const getTemplate = () => {
    return `
    <div class="field">
        <div class="item" data-cell="1"></div>
        <div class="item" data-cell="2"></div>
        <div class="item" data-cell="3"></div>
        <div class="item" data-cell="4"></div>
        <div class="item" data-cell="5"></div>
        <div class="item" data-cell="6"></div>
        <div class="item" data-cell="7"></div>
        <div class="item" data-cell="8"></div>
        <div class="item" data-cell="9"></div>
    </div>`.trim();
};

/**
 * @param {string} template
 * @return {ChildNode}
 */
const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
};

/**
 * @param {Node} section
 */
const renderGameField = (section) => {
    let newField = createElement(getTemplate());
    newField.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        let cell = evt.target;
        if (cell.textContent === ``) {
            let cellNumber = cell.getAttribute(`data-cell`);
            cell.textContent = player;
            playerScore[player].push(+cellNumber);
            if (playerScore[player].length >= 3 && checkWin()) {
                message.textContent = `Выиграл игрок ${player}!`;
            } else {
                player = (player === `X`) ?`O` : `X`;
                message.textContent = `Сейчас ход игрока ${player}`;
            }
        }
    });

    section.insertBefore(newField, resetGame);
};

/**
 * @return {boolean}
 */
const checkWin = () => {
    for (let combination of winCombinations) {
        let count = 0;
        for(let i of combination) {
            if (playerScore[player].indexOf(i) === -1) {
                break;
            } else {
                count++;
                if (count === 3) {
                    return true;
                }
            }
        }
    }
    return false;
};

const clearField = () => {
    message.textContent = `Первым ходит игрок Х`;
    const fieldItems = document.querySelectorAll(`.item`);
    player = `X`;
    playerScore.X = [];
    playerScore.O = [];
    fieldItems.forEach((item) => {
        item.textContent = ``;
    })
};

resetGame.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    clearField();
});

renderGameField(gameFieldSection);
