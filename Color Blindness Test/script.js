/*Menu variables*/
var menuWhats = document.getElementById('menu-whats');
var menuTest = document.getElementById('menu-test');
var menuType = document.getElementById('menu-type');

/*Tabs variables*/

var tabTest = document.getElementById('tab-test-pick');
var tabWhats = document.getElementById('tab-whats-colorblindness');
var tabType = document.getElementById('tab-commom-types');

/*Test variables*/
var testCounterP = document.getElementById('counter');
var testCounter = 1;
var testMissRed = 0;
var testMissYellow = 0;
var testMissGreen = 0;

var testDrawnFirst = 0;
var testDrawnSecond = 0;
var testDrawnThird = 0;

var testFirst = document.getElementById('first');
var testSecond = document.getElementById('second');
var testThird = document.getElementById('third');

var testSelectedFirst = document.getElementById('select-1');
var testSelectedSecond = document.getElementById('select-2');
var testSelectedThird = document.getElementById('select-3');

var testButtonNext = document.getElementById('next');

document.addEventListener('DOMContentLoaded', function() {
    openWhats();
    menuWhats.addEventListener('click', openWhats);
    menuTest.addEventListener('click', openTest);
    menuType.addEventListener('click', openType);
    testButtonNext.addEventListener('click', playTest);
});

function drawColor() {
    return Math.ceil(Math.random() * 100) % 3;
}

function menuHighlight(tab, backgroundColor, color) {
    tab.style.backgroundColor = backgroundColor;
    tab.style.color = color;
}

function openWhats() {
    menuHighlight(menuWhats, '#f5f5f5', '#242323');
    menuHighlight(menuTest, '#242323', 'bisque');
    menuHighlight(menuType, '#242323', 'bisque');

    tabWhats.style.display = 'block';
    tabTest.style.display = 'none';
    tabType.style.display = 'none';
}

function openType() {
    menuHighlight(menuType, '#f5f5f5', '#242323');
    menuHighlight(menuTest, '#242323', 'bisque');
    menuHighlight(menuWhats, '#242323', 'bisque');

    tabWhats.style.display = 'none';
    tabTest.style.display = 'none';
    tabType.style.display = 'block';
}

function drawTest(){
    testDrawnFirst = drawColor();
    testDrawnSecond = drawColor();
    testDrawnThird = drawColor();

    setColorTest(testFirst, testDrawnFirst);
    setColorTest(testSecond, testDrawnSecond);
    setColorTest(testThird, testDrawnThird);
}

function openTest() {
    menuHighlight(menuTest, '#f5f5f5', '#242323');
    menuHighlight(menuWhats, '#242323', 'bisque');
    menuHighlight(menuType, '#242323', 'bisque');

    tabWhats.style.display = 'none';
    tabTest.style.display = 'block';
    tabType.style.display = 'none';

    testCounter = 1;
    testMissRed = 0;
    testMissYellow = 0;
    testMissGreen = 0;
    testCounterP.innerText = testCounter.toString() + '/5';
    
    drawTest();

}

function setColorTest(div, drawn){
    if (drawn == 0){ //Red
        div.style.backgroundColor = '#FF2414';
    } else if (drawn == 1){ //Green
        div.style.backgroundColor = '#18FF14';
    } else { //Yellow
        div.style.backgroundColor = '#F7FF14';
    }
}

function colorMissVerifierCounter(test){
    switch (test){
        case 0:
            testMissRed += 1;
            break;
        case 1:
            testMissGreen += 1;
            break;
        case 2:
            testMissYellow += 1;
            break;
    }
}

function playTest(){
    if (testSelectedFirst.value != testDrawnFirst){
        colorMissVerifierCounter(testDrawnFirst);
    }

    if (testSelectedSecond.value != testDrawnSecond){
        colorMissVerifierCounter(testDrawnSecond);
    }

    if (testSelectedThird.value != testDrawnThird){
        colorMissVerifierCounter(testDrawnThird);
    }

    testCounter += 1;

    if (testCounter < 6){
        testCounterP.innerText = testCounter.toString() + '/5';
        drawTest();
    } else{

        console.log(testMissRed);
        console.log(testMissGreen);
        console.log(testMissYellow);
        let result = '';
        if ((testMissRed+testMissGreen+testMissYellow) > 0){
            result = 'Infelizmente provavelmente você daltonica(o), procure um médico para um teste mais preciso.'

            if (testMissYellow > 0 && testMissRed > 0 && testMissGreen > 0){
                result = result + '\n Você errou todas as cores pelo menos uma vez, não é possível indicar qual o tipo.';
            } else if (testMissYellow > 0){
                result = result + '\n Você errou algum amarelo e algum vermelho, indica um possível Tritanopia.';
            } else{
                result = result + '\n O mais provavel é que possua Protanopia ou Deuteranotopia';
            }

        } else{
            result = 'Você acertou todas as cores, felizmente a possibilidade de ser daltonica(o) é baixo.'
        }

        alert(result);
        openTest();
        
    }

}
