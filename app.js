console.log('sss')

const cols = document.querySelectorAll('.col')
const buttons = document.querySelectorAll('.btn')
const titles = document.querySelectorAll('.title')

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF'
    let color = ''

    for (let i = 0; i < 6; i++) {
        color = color + hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return '#' + color
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? '#000' : '#FFF';

}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function updateColorHash(colors = []) {
    document.location.hash = colors.map(color => color.toString().substring(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color)
    }

    return []
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, index) => {

        const text = col.querySelector('.title');
        const btn = col.querySelector('.btn');
        const isLocked = btn.querySelector('i').classList.contains('fa-lock')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }


        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();


        if (!isInitial) {
            colors.push(color)
        }

        col.style.background = color;
        text.textContent = color;


        setTextColor(text, color);
        setTextColor(btn, color);

    });
    updateColorHash(colors)
};

setRandomColors(true)

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        icon.classList.toggle('fa-lock');
        icon.classList.toggle('fa-lock-open');
    })
})

titles.forEach(title => {
    title.addEventListener('click', () => {
        copyToClickboard(title.textContent)
    })
})



