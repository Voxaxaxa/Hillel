let arrayInfo = [];

function loadLocalStorageData() {
    if (localStorage.getItem("key")) {
        arrayInfo = JSON.parse(localStorage.getItem("key"));

        for (const obj of arrayInfo) {
            const elemResult = document.querySelector(".result-categories");

            const divElem = document.createElement('div');
            divElem.classList.add("result-categories-info");

            const nameProduct = document.createElement("p");
            const price = document.createElement("p");
            const dateProduct = document.createElement("p");
            const btn = document.createElement("button");
            const btnDel = document.createElement("button");

            btn.textContent = "Деталі";
            btnDel.textContent = "Видалити";

            nameProduct.textContent = obj.name;
            price.textContent = obj.price;
            dateProduct.textContent = obj.data;

            divElem.append(nameProduct, dateProduct, btn, btnDel);
            elemResult.append(divElem);
            deletElementsResult(divElem, btnDel, obj.id);
            infoElementsResult(btn, divElem, price);
        }
    }
}


function showCategories () {
    const $container = document.querySelector(".creation-categories");
    $container.innerHTML = "";

    for(let i = 0; i < data.length; i++){
        const elem = document.createElement("div");
        elem.textContent = data[i].name;
        elem.setAttribute("data-category", i);
        elem.addEventListener("click", showProducts);
        $container.appendChild(elem);
    }
}


function showProducts (event) {
    const categoryIndex = event.target.getAttribute("data-category");
    const products = data[categoryIndex].product;
    const $container = document.querySelector(".products");
    $container.innerHTML = "";
    clearTable();
    const elemMassage = document.querySelector(".success-message");
    if (elemMassage) {
        elemMassage.remove();
    }

    for(let i = 0; i < products.length; i++){
        const elem = document.createElement("div"); 
        elem.textContent = products[i].name;
        elem.setAttribute("data-category", categoryIndex);
        elem.setAttribute("data-product", i);
        elem.addEventListener("click", showDetails);
        $container.appendChild(elem);
    }
}


function showDetails (event) {
    const categoryIndex = event.target.getAttribute("data-category");
    const productIndex = event.target.getAttribute("data-product");
    const $container = document.querySelector(".details");
    $container.innerHTML = "";
    const nameProduct = document.createElement("h2");
    const description = document.createElement("p");
    const price = document.createElement("p");
    const btn = document.createElement("button");

    nameProduct.textContent = data[categoryIndex].product[productIndex].name;
    description.textContent = data[categoryIndex].product[productIndex].description;
    price.textContent = data[categoryIndex].product[productIndex].prece;
    btn.textContent = "Купить!";
    btn.setAttribute("data-category", categoryIndex);
    btn.setAttribute("data-product", productIndex);

    btn.addEventListener("click", showReselt);
    
    $container.appendChild(nameProduct);
    $container.appendChild(description);
    $container.appendChild(price);
    $container.appendChild(btn);
}


function showReselt(event) {
    const categoryIndex = event.target.getAttribute("data-category");
    const productIndex = event.target.getAttribute("data-product");
    const $container = document.querySelector(".reselt");
    const nameProduct = document.createElement("p");
    nameProduct.textContent = data[categoryIndex].product[productIndex].name;

    const elem = document.createElement("div");
    elem.innerHTML = "Ви успішно купили " + nameProduct.textContent;

    const existingMessage = $container.querySelector(".success-message");
    if (existingMessage) {
        existingMessage.remove();
    }

    elem.classList.add("success-message");
    $container.prepend(elem);

    const includeForms = document.querySelector(".forms");
    includeForms.classList.remove("forms");
    includeForms.classList.add("new__forms");

    const $productsContainer = document.querySelector(".products");
    const $detailsContainer = document.querySelector(".details");
    $productsContainer.innerHTML = "";
    $detailsContainer.innerHTML = "";
    
    const description = document.createElement("p");
    const price = document.createElement("p");
    nameProduct.textContent = data[categoryIndex].product[productIndex].name;
    description.textContent = data[categoryIndex].product[productIndex].description;
    price.textContent = data[categoryIndex].product[productIndex].prece;
    creatingElementsResult (nameProduct, price, description);
    showCategories();
}


const $form = document.forms.myForm;
const $button = document.querySelector(".form__button");
const $name = document.getElementById("input__name");
const $selectCiti = document.getElementById("select__city");
const $selectDepartment = document.getElementById("select__department");
const $numberOfGoods = document.getElementById("input__num");
const $table = document.querySelector(".table");


$button.addEventListener("click", function(){
    clearTable();
    checkRecquaired([$name, $numberOfGoods]);
    checkLength($name, 3, 18);
    checkLengthNum($numberOfGoods, 1, 20);
    pushName();
    selectionFrom ($selectCiti);
    selectionFrom ($selectDepartment);
    radioForm ();
    pushNum($numberOfGoods);
    pushText();
    checkForm ($name, $numberOfGoods);
})


function clearTable() {
    while ($table.firstChild) {
        $table.removeChild($table.firstChild);
    }
}


function changeOfClass () {
    const includeForms = document.querySelector(".new__forms");
    includeForms.classList.remove("new__forms");
    includeForms.classList.add("forms");
}


function checkRecquaired (arr) {
    arr.forEach(input => {
        if(input.value.trim() === ""){
            colorRedError(input);
        } else {
            colorRedSucces(input);
        }
    });
}


function colorRedError(input) {
    const formControl = input.parentElement;
    const inputForm = formControl.querySelector("input");
    inputForm.style.border = "3px solid red";
}


function colorRedSucces(input) {
    const formControl = input.parentElement;
    const inputForm = formControl.querySelector("input");
    inputForm.style.border = "3px solid green";
}


function checkLength (input, min, max) {
    if(input.value.length < min) {
        colorRedError(input);
    } else if (input.value.length > max) {
        colorRedError(input);
    } else {
        colorRedSucces(input);
    }
}


function checkLengthNum(input, min, max){
    const elem = input.value;
        if(elem < min){
            colorRedError(input);
            } else if (elem > max) {
            colorRedError(input);
            } else if (isNaN(elem)) {
                colorRedError(input);
            } else {
            colorRedSucces(input);
        }
}


function creatingTable (elem) {
    const creatinNewTable = document.createElement("tr");
    creatinNewTable.innerHTML = elem;
    $table.appendChild(creatinNewTable);
}


function pushName () {
    const elem = $name.value;
    creatingTable(elem);
}


function selectionFrom(elem) {
    const selectedOptions = elem.options;
    for (let i = 0; i < selectedOptions.length; i++) {
        if (selectedOptions[i].selected) {
            const elem = selectedOptions[i].textContent;
            creatingTable(elem);
        }
    }
}


function radioForm () {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (selectedPayment) {
        const paymentValue = selectedPayment.value;
        creatingTable(paymentValue);
    } else {
        const massege = "Оберіть спосіб оплати.";
        creatingTable(massege);
    }
}


function pushNum (input) {
    const elem = input.value;
    let message = "Вибрана кількість товару: ";
    message += elem;
    creatingTable(message);
}


function pushText() {
    const textAreaValue = document.getElementById("text").value;
    let message = "Коментар: ";
    message += textAreaValue;
    creatingTable(message);
}


function checkForm(elemName, elemNum) {
    if (elemName.value === "" || elemNum.value === "") {
        $form.reset();
        clearTable();
        colorRedError($name);
        colorRedError($numberOfGoods);
    } else {
        const includeForms = document.querySelector(".new__forms");
        includeForms.classList.remove("new__forms");
        includeForms.classList.add("forms");
        $form.reset();
    }
}


const $buttonOrders = document.querySelector(".button-categories");
$buttonOrders.addEventListener("click", function(){
    changeCategoryToOrder ();
    toggleButtons();
    changeCategory ();
    changeResult ();
})


const $createPurchasesButton = document.querySelector(".button-categories-shopping");
$createPurchasesButton.addEventListener("click", function () {
    toggleButtons();
    changeCategoryToOrder ();
    changeCategory ();
    changeResult ();
})


function toggleButtons() {
    const creationOrder = document.querySelector(".creation-categories");
    const isButtonCategoriesVisible = window.getComputedStyle(creationOrder).display !== "block";
    const isCreationOrderVisible = window.getComputedStyle(creationOrder).display !== "none";

    if (isButtonCategoriesVisible) {
        creationOrder.style.display = "block";
    } else if (isCreationOrderVisible) {
        creationOrder.style.display = "none";
    }
}


function changeCategoryToOrder() {
    const creationOrder = document.querySelector(".button-categories-shopping");
    const isButtonCategoriesVisible = window.getComputedStyle(creationOrder).display !== "block";
    const isCreationOrderVisible = window.getComputedStyle(creationOrder).display !== "none";

    if (isButtonCategoriesVisible) {
        creationOrder.style.display = "block";
    } else if (isCreationOrderVisible) {
        creationOrder.style.display = "none";
    }
}


function changeCategory () {
    const changeCategory = document.querySelector(".button-categories");

    const isButtonCategoriesVisible = window.getComputedStyle(changeCategory).display !== "block";
    const isCreationOrderVisible = window.getComputedStyle(changeCategory).display !== "none";

    if (isButtonCategoriesVisible) {
        changeCategory.style.display = "block";
    } else if (isCreationOrderVisible) {
        changeCategory.style.display = "none";
    }
}


function changeResult () {
    const result = document.querySelector(".result-categories");

    const isResultVisible = window.getComputedStyle(result).display !== "block";
    const isResultInvisible = window.getComputedStyle(result).display !== "none";

    if (isResultVisible) {
        result.style.display = "block";
    } else if (isResultInvisible) {
        result.style.display = "none";
    }
}


function creatingElementsResult (categoryIndex, productIndex, description) {
    const elemResult = document.querySelector(".result-categories");
    let date = new Date();
    date = date.getDate()+'.'+(date.getMonth() + 1)+'.'+date.getFullYear();

    const divElem = document.createElement('div');
    divElem.classList.add("result-categories-info");

    const nameProduct = document.createElement("p");
    const price = document.createElement("p");
    const dateProduct = document.createElement("p");
    const btn = document.createElement("button");
    const btnDel = document.createElement("button");

    btn.textContent = "Деталі";
    btnDel.textContent = "Видалити";

    nameProduct.textContent = categoryIndex.textContent;
    price.textContent = productIndex.textContent + "  " + description.textContent;
    dateProduct.textContent = date;

    divElem.append(nameProduct, dateProduct, btn, btnDel);
    elemResult.append(divElem);
    deletElementsResult (divElem, btnDel);
    infoElementsResult (btn, divElem, price);

    const radomId = Math.random() * 100000;
    divElem.setAttribute("data-id", radomId.toFixed(0));

    const cteateItemObj = (arr) => {
    const itemObj = {};
    itemObj.name = nameProduct.textContent;
    itemObj.data = dateProduct.textContent;
    itemObj.price = price.textContent;
    itemObj.id = divElem.getAttribute("data-id");

    arr.push(itemObj);
    }

    cteateItemObj(arrayInfo);
    localStorage.setItem("key", JSON.stringify(arrayInfo));
}


function deletElementsResult(item, btn, itemId) {
    btn.addEventListener("click", function () {
        arrayInfo = JSON.parse(localStorage.getItem("key"));
        const neaArray = arrayInfo.filter(obj => obj.id !== itemId);

        item.remove();
        localStorage.setItem("key", JSON.stringify(neaArray));
    });
}


function infoElementsResult(btn, item, info) {
    btn.addEventListener("click", function () {
        if (!item.contains(info)) {
            item.appendChild(info);
        } else {
            info.remove();
        }
    });
}


showCategories();
loadLocalStorageData();