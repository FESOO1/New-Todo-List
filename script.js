const output = document.querySelector('.output');
const inputForm = document.querySelector('.input-form');
const inputItself = document.getElementById('inputItself');
const inputDate = document.getElementById('inputDate');
const inputTime = document.getElementById('inputTime');
const inputAddButton = document.getElementById('inputAddButton');
const todosArray = [];
const todoDateArray = [];
const todoTimeArray = [];

// ADD A NEW TODO

function addNewTodo(e) {
    e.preventDefault();

    // MAKING SURE THAT A USER CANNOT ADD A NEW TODO WITHOUT FILLING THE INPUTS
    const errorArray = [];

    if (!inputItself.value.length > 0) {
        errorArray.push('Empty');
        inputForm.classList.add('input-form-error');
        setTimeout(() => {
            inputForm.classList.remove('input-form-error');
        }, 301);
    };

    if (!inputDate.value.length > 0) {
        errorArray.push('Empty');
        inputForm.classList.add('input-form-error');
        setTimeout(() => {
            inputForm.classList.remove('input-form-error');
        }, 301);
    };

    if (!inputTime.value.length > 0) {
        errorArray.push('Empty');
        inputForm.classList.add('input-form-error');
        setTimeout(() => {
            inputForm.classList.remove('input-form-error');
        }, 301);
    };

    if (errorArray.length === 0) {
        // ADDING AN ELEMENT IN RESPONSE CLICKING ON THE ADD BUTTON
        output.innerHTML += `
            <div class="output-itself">
                <p class="output-itself-paragraph">${inputItself.value}</p>
                <h5 class="output-itself-date">${inputDate.value} / ${inputTime.value}</h5>
                <button type="button" class="output-itself-button">DELETE</button>
            </div>
        `;

        // PUSHING THE INPUT INTO AN ARRAY
        todosArray.push(inputItself.value);
        todoDateArray.push(inputDate.value);
        todoTimeArray.push(inputTime.value);
        localStorage.setItem('newTodo', JSON.stringify(todosArray));
        localStorage.setItem('newTodoDate', JSON.stringify(todoDateArray));
        localStorage.setItem('newTodoTime', JSON.stringify(todoTimeArray));

        // RESETTING EVERYTHING
        inputItself.value = '';    
        inputDate.value = '';    
        inputTime.value = '';  
    };


    // DELETE BUTTON
    const outputItself = document.querySelectorAll('.output-itself');
    const deleteOutput = document.querySelectorAll('.output-itself-button');
    for (let i = 0; i < deleteOutput.length; i++) {
        deleteOutput[i].addEventListener('click', () => {
            output.removeChild(outputItself[i]);
            todosArray.splice(i, 1);
            localStorage.setItem('newTodo', JSON.stringify(todosArray));
        });
    };
};

// CHECKING IF THE TIME HAS COME

/* function removeSymbols(symbol) {
    const regex = /[-]/g;
    return symbol.replace(regex, '');
};

setInterval(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate().toString().padStart(2, 0);
    const checkTime = currentYear + currentMonth + currentDay;
    const timeSet = removeSymbols(todoDateArray);
    console.log(timeSet)

    if (Number.parseInt(todoDateArray.includes(checkTime), 10)) {
        alert('The time has come.');
    } else {
        alert('The time has not come yet.');
        console.log(todoDateArray);
    };
}, 5000); */

// INITIALIZING THE BUTTON

inputAddButton.addEventListener('click', addNewTodo);


// LOCAL STORAGE

function displayDataFromLocalStorage() {
    const newTodoLC = JSON.parse(localStorage.getItem('newTodo'));
    const newTodoDateLC = JSON.parse(localStorage.getItem('newTodoDate'));
    const newTodoTimeLC = JSON.parse(localStorage.getItem('newTodoTime'));

    if (newTodoLC) {
        for (let i = 0; i < newTodoLC.length; i++) {
            // ADDING AN ELEMENT IN RESPONSE CLICKING ON THE ADD BUTTON
            output.innerHTML += `
                <div class="output-itself">
                    <p class="output-itself-paragraph">${newTodoLC[i]}</p>
                    <h5 class="output-itself-date">${newTodoDateLC[i]} / ${newTodoTimeLC[i]}</h5>
                    <button type="button" class="output-itself-button">DELETE</button>
                </div>
            `;

            // PUSHING THE INPUT INTO AN ARRAY
            todosArray.push(newTodoLC[i]);
            todoDateArray.push(newTodoDateLC[i]);
            todoTimeArray.push(newTodoTimeLC[i]);
            localStorage.setItem('newTodo', JSON.stringify(todosArray));
            localStorage.setItem('newTodoDate', JSON.stringify(todoDateArray));
            localStorage.setItem('newTodoTime', JSON.stringify(todoTimeArray));

            // DELETE BUTTON
            const outputItself = document.querySelectorAll('.output-itself');
            const deleteOutput = document.querySelectorAll('.output-itself-button');
            for (let i = 0; i < deleteOutput.length; i++) {
                deleteOutput[i].addEventListener('click', () => {
                    output.removeChild(outputItself[i]);
                    todosArray.splice(i, 1);
                    localStorage.setItem('newTodo', JSON.stringify(todosArray));
                });
            };
        };
    };
};

displayDataFromLocalStorage();