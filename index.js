function draw() {
    const inputValue = document.getElementById("textarea").value;
    const figuresDescription = parseInputValue(inputValue);
    drawFigures(figuresDescription);
}

function parseInputValue(userString) {
    return userString
        .split('\n')
        .map(figureDescription => ({
                figure: getFirstWord(figureDescription),
                coordinates: finalCoordinates(parseValueByParameter(figureDescription, "p")),
                color: parseValueByParameter(figureDescription, "c"),
                background: parseValueByParameter(figureDescription, "b"),
                radius: parseValueByParameter(figureDescription, "r"),
                radius1: parseValueByParameter(figureDescription, "r1"),
                radius2: parseValueByParameter(figureDescription, "r2"),
        }));
}

function drawFigures(figuresDescription) {
    figuresDescription.forEach(figureDescription => {
        drawFigure(figureDescription);
    });
}

function drawFigure(figureDescription) {
    switch (figureDescription.figure) {
        case 'line':
            drawLine(figureDescription.coordinates, figureDescription.color, figureDescription.background);
            break;
        case 'rectangle':
            drawRectangle(figureDescription.coordinates, figureDescription.color, figureDescription.background);
            break;
        case 'triangle':
            drawTriangle(figureDescription.coordinates, figureDescription.color, figureDescription.background);
            break;
        case 'circle':
            drawCircle(figureDescription.coordinates, figureDescription.color, figureDescription.background, figureDescription.radius);
            break;
        case 'ellipse':
            drawEllipse(figureDescription.coordinates, figureDescription.color, figureDescription.background, figureDescription.radius1, figureDescription.radius2);
            break;
        default:
            alert('Фигура не найдена');
    }
}



function getFirstWord(customString) {
    return customString.split(' ')[0];
}

function parseValueByParameter(customString, parameter) {
    const LENGTH_PARAMETER = 3;
    const indexOfBegin = customString.indexOf(`-${parameter}`) + LENGTH_PARAMETER;
    const sliceStart = customString.slice(indexOfBegin);
    const indexOfLastSymbolOfParameter = parameter === "b" ? sliceStart.indexOf(")") + 1 : sliceStart.indexOf("-") - 1;
    return sliceStart.slice(0, indexOfLastSymbolOfParameter);
}

function finalCoordinates(rawCoordinates) {
    rawCoordinates = rawCoordinates.replace(/] \[/g, "], [");
    const validToJsonString = `[${rawCoordinates}]`;
    return arrCoordinates = JSON.parse(validToJsonString);

}


function drawLine(coordinates, color, background) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();       // Начинает новый путь
    ctx.moveTo(coordinates[0][0], coordinates[0][1]);    // Рередвигает перо в точку (30, 50)
    ctx.lineTo(coordinates[1][0], coordinates[1][1]);  // Рисует линию до точки (150, 100)

    colorFigure(ctx, color, background);
}

function drawRectangle(coordinates, color, background) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();       // Начинает новый путь
    ctx.rect(coordinates[0][1], coordinates[1][0], coordinates[1][0], coordinates[1][1]);
    ctx.lineTo(coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]);


    colorFigure(ctx, color, background);
}

function drawTriangle(coordinates, color, background) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');


    ctx.beginPath();       // Начинает новый путь

    coordinates.forEach((coordinates, index) => {
        if (index === 0) {
            ctx.moveTo(coordinates[0], coordinates[1]);
        } else {
            ctx.lineTo(coordinates[0], coordinates[1]);
        }
    });
    ctx.lineTo(coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]);
    ctx.closePath();

    colorFigure(ctx, color, background);
}

function drawCircle(coordinates, color, background, radius) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();       // Начинает новый путь
    ctx.arc(coordinates[0][0], coordinates[0][1], radius, 0, Math.PI * 2, false);

    colorFigure(ctx, color, background);
}

function drawEllipse(coordinates, color, background, radius1, radius2) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.ellipse(coordinates[0][0], coordinates[0][1], radius1, radius2, Math.PI, 0, 2 * Math.PI);

    colorFigure(ctx, color, background);
}

function colorFigure(ctx, color, background) {
    ctx.strokeStyle = color;
    ctx.fillStyle = background;
    ctx.fill();
    ctx.stroke();
}
