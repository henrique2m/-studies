verifyDisplayWidth = (display, value, limit) => {

    const oldText = display.textContent;
    const displayLength = display.textContent.length;

    if( displayLength === limit){
        let toArray = new Array();
        const str = display.textContent;
        toArray = str.split("");
    
        display.textContent =  oldText+'E';
        return false
    }

    if(displayLength === 16) return false;

    if(value !== null) display.textContent = oldText == 0 ? value : oldText+value;
    
    return true;       
}


handleClickNumber = (number) => {
    const display = document.getElementById('display');
    verifyDisplayWidth(display, number, 15);
}

handleClickOperation = (operation) => {
    const display = document.getElementById('display');

    if(!verifyDisplayWidth(display, null, 15)) return;

    const oldText = display.textContent;
    let displayLength = display.textContent.length;
    
    function verifyOperations() {
        let screenArray = new Array();
        const screenStr = display.textContent;
        screenArray = screenStr.split("");

        const operations = ['/', 'X', '+', '-'];

        keyNumber = displayLength-1;

        const verifyOperations = operations.filter((key) => {
            return key === screenArray[keyNumber];
        });

        if(verifyOperations.length === 0) return true;

        return false;
    }
    

    switch (operation) {
        case 4:
            console.log(verifyOperations());

            if(verifyOperations()) display.textContent = oldText == 0 ? 0 : oldText+'/'; 
            break
        case 8:
            if(verifyOperations()) display.textContent = oldText == 0 ? 0 : oldText+'X';
            break
        case 12:
            if(verifyOperations()) display.textContent = oldText == 0 ? 0 : oldText+'+';
            break
        case 16:
            if(verifyOperations()) display.textContent = oldText == 0 ? 0 : oldText+'-';
            break
    }

}

handleCalculator = () => {
    const boxButtons = document.getElementById('box-numbers');

    let number = 0; 
    let keyOperations = 0;
    const operations = ['/', 'X', '+', '-'];

    for (let i =  1; i <= 16 ; i++) {
        const button = document.createElement("LI");
        
        if( i % 4 === 0 ){
            button.setAttribute('class', 'operations');
            button.setAttribute('onclick', `handleClickOperation(${i})`);
            button.innerText = operations[keyOperations];
            boxButtons.appendChild(button);
            keyOperations++;
        }else{
            if(i >= 13 && i <=15 ){
                switch (i) {
                    case 13: 
                        button.setAttribute('class', 'delete');
                        button.setAttribute('onclick', `handleClickDelete()`);
                        button.innerHTML = `<img src='https://openmoji.org/data/color/svg/1F644.svg', alt='back' width='48' />`;
                        boxButtons.appendChild(button);
                        break
                    case 14:
                        button.setAttribute('class', 'number');
                        button.setAttribute('onclick', `handleClickNumber(${0})`);
                        button.innerText = 0;
                        boxButtons.appendChild(button);
                        break
                    case 15:
                        button.setAttribute('class', 'calculate');
                        button.setAttribute('onclick', `handleClickCalculate()`);
                        button.innerHTML = `<img src='https://openmoji.org/data/color/svg/1F914.svg', alt='thinking-face' width='48' />`;
                        boxButtons.appendChild(button);
                        break
                }
                
            }else{
                number++;
                button.setAttribute('class', 'number');
                button.setAttribute('onclick', `handleClickNumber(${number})`);
                button.innerText = number;
                boxButtons.appendChild(button);
            }
        }
    }
}

handleClickCalculate = () => {
    const display = document.getElementById('display');

    let expressionArray = new Array();            
    const expressionStr = display.textContent;
    expressionArray = expressionStr.split("");

    if(expressionArray.length === 16) expressionArray.pop();
    
    const transcription = expressionArray.map((key) => {
        return key === 'X' ? '*' : key;
    });

    try {
        let result = eval(transcription.join(''));
    
        result = Number.isInteger(result) ? result : result.toFixed(2); 

        if ( result < 0 ) {
            display.style.color = '#ff5555';
        }else {
            display.style.color = '#282a36';
        }

        display.textContent = result; 

    } catch (error) {
        console.warn('Erro: operação invalida.')
    }

              
}

handleClickDelete = () => {
    const display = document.getElementById('display');
    
    let expressionArray = new Array();            
    const expressionStr = display.textContent;

    expressionArray = expressionStr.split("");

    if(expressionArray.length === 1){
        display.textContent = 0;
        return;
    }

    expressionArray.pop();
    display.textContent = expressionArray.join('');
}
