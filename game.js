
const gameFieldSection = document.querySelector(`.container`);
const getTemplate = () => {
    return `
    <div class="field">
        <div class="item cell-1"></div>
        <div class="item cell-2"></div>
        <div class="item cell-3"></div>
        <div class="item cell-4"></div>
        <div class="item cell-5"></div>
        <div class="item cell-6"></div>
        <div class="item cell-7"></div>
        <div class="item cell-8"></div>
        <div class="item cell-9"></div>
    </div>`.trim();
};

const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
};

let player = `X`;

const renderGameField = (section) => {
    let newField = createElement(getTemplate());
    newField.addEventListener('click', (evt) => {
        evt.preventDefault();
        let cell = evt.target;
        if (cell.textContent === ``) {
            cell.textContent = player;
            player = (player === `X`) ?`O` : `X`;
        }
    });

    section.appendChild(newField);
};

renderGameField(gameFieldSection);
