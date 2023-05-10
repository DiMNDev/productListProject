//Define product array
let myProducts = [];

//Define DOM elements
const productBox = document.getElementById("productInput");
const quantityBox = document.getElementById("quantityInput");
const createNewButton = document.getElementById("createNewButton");
const listOfProducts = document.querySelector("#productList");
const instructions = document.querySelector("#instructions");
//Error handling function
const errorThrow = (box, placeholderText, bool) => {
  if (bool === true) {
    box.classList.add("error");
    box.setAttribute("placeholder", placeholderText);
  } else {
    box.classList.remove("error");
    box.setAttribute("placeholder", placeholderText);
  }
};

//Create an event listener for add product button
createNewButton.addEventListener("click", appendListItem);

//Create an event listener for enter button to trigger click listener above
quantityBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    console.log(+quantityBox.value);
    event.preventDefault;
    createNewButton.click();
  }
});

//Create an event listener to focus on next input field
productBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault;
    if (productBox.value !== "") quantityBox.focus();
  }
});

//Define a function to execute when button is clicked
function appendListItem(e) {
  e.preventDefaults;

  //Error handling -- refer to log
  if (productBox.value === "") {
    errorThrow(productBox, "Enter a product", true);
    console.log("Missing product name");
    setTimeout(() => errorThrow(productBox, "Product", false), 3500);
  } else if (quantityBox.value === "") {
    errorThrow(quantityBox, "Enter a quantity", true);
    console.log("Missing a quantity");
    setTimeout(() => errorThrow(quantityBox, "Quantity", false), 3500);
  } else if (
    !Number.isInteger(+quantityBox.value) === true &&
    quantityBox.value !== 0
  ) {
    quantityBox.value = "";
    errorThrow(quantityBox, "Enter a number", true);
    console.log("Not a number");
    setTimeout(() => errorThrow(quantityBox, "Quantity", false), 3500);
  } else if (+quantityBox.value === 0) {
    quantityBox.value = "";
    errorThrow(quantityBox, "You don't need it?", true);
    console.log("Zero??");
    setTimeout(() => errorThrow(quantityBox, "Quantity", false), 3500);
  } else {
    //SUCCESS!
    //Append product object to product array
    myProducts.push({
      product: productBox.value,
      quantity: quantityBox.value,
      strike: false,
    });
    reloadDOM();
    //Reset DOM input values
    productBox.value = "";
    quantityBox.value = "";
    productBox.focus();
  }
}

//A function to reload the DOM to reflect changes in array
const reloadDOM = () => {
  //Get product list DOM element and set to empty
  listOfProducts.innerHTML = "";
  //Create list elements from array of products
  for (let i = 0; i < myProducts.length; i++) {
    let product = myProducts[i].product;
    let quantity = myProducts[i].quantity;
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${capIt(product)} : ${quantity}`));
    li.setAttribute("onclick", "removeProduct(this)");
    li.id = i;
    if (myProducts[i].strike === true) {
      li.style.textDecoration = "line-through";
    }
    listOfProducts.appendChild(li);
  }
  //Load instructions if items exist
  if (myProducts.length === 0) {
    instructions.innerHTML = "No items";
  } else {
    instructions.innerHTML = "Click an item to strike, click again to remove.";
  }
};
//A function to strike out after one click and delete after striked out
const removeProduct = (self) => {
  if (self.style.textDecoration === "line-through") {
    console.log(self.id);
    myProducts.splice(self.id, 1);
    reloadDOM();
  } else {
    myProducts[self.id].strike = true;
    reloadDOM();
  }
};

//A function to capitalize the first letter of the string
const capIt = (string) => {
  let capitalizedWord = string.charAt(0).toUpperCase() + string.slice(1);
  return capitalizedWord;
};
