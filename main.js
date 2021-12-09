const inputElement = (type, name, title, req = '') => {
    return `
        <div class='${type}'>
            <label for='${name}'>${title}</label>
            <input type='${type}' name='${name}' ${req}>
        </div>
    `;
}
const selectElement = (type, name, title, options) => {
    let optionsToSelect = '';
    for (const o of options) {
        optionsToSelect += `
            <option>
                ${o}
            </option>
        `;
    }

    return `
        <div>
          <label for='${name}'>${title}</label>
          <${type} name='${name}'>
            ${optionsToSelect}
            </${type}>
        </div>
    `;
}

const formFields = [
    {
        type: 'text',
        name: 'firstName',
        label: 'Keresztneved'
    },
    {
        type: 'email',
        name: 'personalEmail',
        label: 'Email cimed',
        req: 'required'
    },
    {
        type: 'file',
        name: 'profilePicture',
        label: 'Profilkeped'
    },
    {
        type: 'checkbox',
        name: 'newsLetter',
        label: 'Hírlevelet szeretnél kapni'
    },
    {
        type: 'checkbox',
        name: 'terms',
        label: 'Elfogadom a felhasználási feltételeket'
    }
]

const anotherFormFields = [
    {
        type: 'text',
        name: 'street',
        label: 'kozterulet'
    },
    {
        type: 'number',
        name: 'houseNumber',
        label: 'hazszam'
    },
    {
        type: 'number',
        name: 'zipcode',
        label: 'Iranyitoszam'
    },
    {
        type: 'text',
        name: 'city',
        label: 'Telepules neve'
    }
];

const selectFields = {
    type: 'select',
    name: 'where',
    label: 'Hol hallottal rolunk?',
    options:[
        'interneten',
        'ismerostol',
        'egyeb'
    ]
};

const processCountries = async () => {
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();


    // ures tomb letrehozas
    // for of-al vegig iteralni a coutryArray-t
    // [i].name.official -> Push
    // return

    let countries = [];
    for (const c of countryArr) {
        countries.push(c.name.official);
    }
    return countries;
}
console.log(processCountries());

const anotherSelectFields = async () =>{
    return {
        type: 'select',
        name: 'countries',
        label: 'Orszag',
        // options:['Spanyol','Olaszorszag']
        options: await processCountries()
    };
}

const formElement = (ffs, id, sel) => {
    let inputs = '';

    for (const ff of ffs) {
        inputs += inputElement(ff.type, ff.name, ff.label, ff.req)
    }
    return `
    <form id='${id}'>
        ${inputs}
        ${selectElement(sel.type, sel.name, sel.label,sel.options)}
        <button>Küldés</button>
    </form>
    `;
}

const formSubmit = (event) => {
    event.preventDefault();
    const et = event.target;
    console.log(et)
    event.target.classList.add('submitted');

    let selectValue = et.querySelector('select[name="where"]').value;

    console.log(selectValue)
}

const inputUpdate = (event) => {
    if (event.target.getAttribute('name') === 'firstName') {
        document.getElementById('inputValue').innerHTML = event.target.value;
    }
    if (event.target.getAttribute('name') === 'profilePicture') {
        console.log(event.target.files[0]);

        const image = URL.createObjectURL(event.target.files[0]);
        document.getElementById('inputValue').insertAdjacentHTML("beforeend", `
        <img src='${image}'>
        `)
    }
    console.log(event.target.closest('#form'))
}

async function loadEvent() {
    const root = document.getElementById('root');
    const waitForAnotherSelectField = await anotherSelectFields();
    root.insertAdjacentHTML('afterbegin', formElement(anotherFormFields, 'form', selectFields));
    root.insertAdjacentHTML('afterbegin', formElement(formFields, 'form', waitForAnotherSelectField));
    root.insertAdjacentHTML('afterbegin', `
        <div id='inputValue'></div>
    `);
    

    const form = document.getElementById('form');
    form.addEventListener('submit', formSubmit)
    form.insertAdjacentHTML('afterbegin', `
        <div>w7 Form Template</div>
    `)

    const inputList = form.querySelectorAll('input');

    for (const input of inputList) {
        input.addEventListener('input', inputUpdate)
    }
}

window.addEventListener('load', loadEvent);