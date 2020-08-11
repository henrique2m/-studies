function dataValidate(name, weight, height){
    const validate = {};
    validate.fill = true;
    validate.name = true;
    validate.weight = true;
    validate.height = true;

    if (name === '' || weight === '' || height === '') validate.fill = false;
    
    if(!Number.isNaN(name/2)) validate.name = false;
    if(Number.isNaN(weight/2)) validate.weight = false;
    if(Number.isNaN(height/2)) validate.height = false;

    return validate;
}

function factoryPerson(name, weight, height){

    const person = {};

    person.name = name;
    person.weight = person;
    person.height = height;

    function  personIMC(){
        const imc = weight/height**2;
        return imc.toFixed(2);
    }

    person.personIMC = personIMC;

    return person;
    
}

function verifyIMC(IMC) {
    const imc = {};

    if(IMC < 17){
        imc.state = 'Muito abaixo do peso';
        return imc;
    }

    if(IMC < 18.49 ){
        imc.state = 'Abaixo do peso';
        return imc;
    }

    if(IMC < 24.99){
        imc.state = 'Peso normal';
        return imc;
    }

    if(IMC < 29.99){
        imc.state = 'Acima do peso';
        return imc;
    }

    if(IMC < 34.99){
        imc.state = 'Obesidade I';
        return imc;
    }

    if(IMC < 39.99){
        imc.status = 'Obesidade II';
        return imc;
    }


    imc.state = 'Obesidade III';
    return imc;
}

function handleUserIMC(){

    const dataUser = {};
    
    const name = document.getElementById('name').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const info = document.getElementById('info');
    const popup = document.getElementById('popup');

    const validate = dataValidate(name, weight, height);

    if(!validate.fill){
        info.setAttribute('class', 'show');
        info.innerHTML = "<p> Por favor, preencha todos os campos. </p>";
        return
    }

    if(!validate.name){
        info.setAttribute('class', 'show');
        info.innerHTML = "<p> Por favor, informe um nome válido. </p>";
        return
    }

    if(!validate.weight){
        info.setAttribute('class', 'show');
        info.innerHTML = "<p> Por favor, informe um peso válido. </p>";
        return
    }

    if(!validate.height){
        info.setAttribute('class', 'show');
        info.innerHTML = "<p> Por favor, informe uma altura válida. </p>";
        return
    }


    const user = factoryPerson(name, weight, height)
    const imc = user.personIMC();
    const userState = verifyIMC(imc)

    dataUser.imc = imc;
    dataUser.state = userState;
    dataUser.name = user.name;

    info.setAttribute('class', 'hider');
    popup.setAttribute('class', 'show');

    popup.innerHTML = `
        <div class='popup-main'>
            <h2> 
                Olá <strong>${dataUser.name}</strong>, seu IMC é de <strong>${dataUser.imc}</strong>.
                <p>(<strong>${dataUser.state.state}</strong>)</p>
            </h2>    
        </div>
    `;

    return  dataUser;
}