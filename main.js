/*
function functionName(parameter){
    parameter === 'argument as a string'
};
functionName('argument as a string');

const argument = 'argument saved in a variable';
const functionName = function (parameter){
    
    paremeter === 'argument saved in a variable';

};
functionName(argument);

const functionName = (parameter1, parameter2) {
    parameter1 === 1;
    parameter2 === 2;
};
functionName(1,2);

 */

const inputElement = (type, name, title) =>{
    return `
        <div>
            <label for='${name}'>${title}</label>
            <input type='${type}' name='${name}'>
        </div>
    `;
}
const selectElement = (type, name, title, options) =>{
    let optionsToSelect = '';
    for (const o of options) {
        optionsToSelect += `
            <option>
                ${o}
            </option>
        `;
    }
    console.log(optionsToSelect)
    
    return `
        <div>
          <label for='${name}'>${title}</label>
          <${type} name='${name}'>
            ${optionsToSelect}
            </${type}>
        </div>
    `;
}
/* 
    const formElement = '<form>' + inputElement('text', 'firstName') + inputElement('file', 'profilePicture') + inputElement('email', 'personalEmail') + inputElement('radio', 'newsLetter') + inputElement('checkbox', 'terms') + '</form>';

*/
// const test = 'valami' 'valami2'

const formElement = `
    <form id='form'>
        ${inputElement('text', 'firstName', 'Keresztneved')}
        ${inputElement('email', 'personalEmail', 'Email címed')}
        ${inputElement('file', 'profilePicture', 'Profilképed')}
        ${inputElement('checkbox', 'newsLetter', 'Hírlevelet szeretnél kapni')}
        ${inputElement('checkbox', 'terms', 'Elfogadom a felhasználási feltételeket')}
        ${selectElement('select', 'where', 'Hol hallotal rolunk?',['interneten', 'ismerostol', 'egyeb'])}
        <button>Ok</button>
    </form>
`;
const formSubmit = (event) =>{
    event.preventDefault();
    const et = event.target;
    console.log(et)
    event.target.classList.add('submitted');
    let selectValue = et.querySelector('select[name="where"]').value;
    console.log(selectValue)
}

const inputUpdate = (event) =>{
    if (event.target.getAttribute('name') === 'firstName') {
        document.getElementById('inputValue').innerHTML = event.target.value;
    }
    console.log(event.target.closest('#form'))
}

function loadEvent() {
    const root = document.getElementById('root');
    root.insertAdjacentHTML('afterbegin', formElement);
    root.insertAdjacentHTML('afterbegin', `
        <div id='inputValue'></div>
    `);

    const form = document.getElementById('form');
    form.addEventListener('submit', formSubmit)
    
    const inputList = form.querySelectorAll('input');
    
    for (const input of inputList) {
        input.addEventListener('input', inputUpdate)
    }
}

window.addEventListener('load', loadEvent);