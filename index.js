const table = document.getElementById("tableItems");
const addItemButton = document.getElementById("addItem");
const needToBuyText = document.getElementById("needToBuy");
const totalText = document.getElementById("total");

addItemButton.addEventListener("click", addItem);

function addItem() {
    let itemName = document.getElementById("itemNameInput").value;
    let itemPrice = document.getElementById("itemPriceInput").value;

    
    if (itemPrice == "" || itemName == "") {
        return;
    }

    let newRow = document.createElement("tr");
    let newItemName = document.createElement("td");
    newItemName.textContent = itemName;

    let newItemPrice = document.createElement("td");
    newItemPrice.textContent = "$" + itemPrice;

    let newItemBought = document.createElement("td");
    let newItemBoughtCheckBox = document.createElement("input");
    newItemBoughtCheckBox.type = "checkbox";
    newItemBoughtCheckBox.addEventListener("click", updateTotals)

    let newRemove = document.createElement("td");
    let newRemoveButton = document.createElement("button");
    newRemoveButton.type = "button";
    newRemoveButton.textContent = "Remove";
    newRemoveButton.addEventListener("click", function () {
        newRow.remove()
        updateTotals()
    })

    newRow.append(newItemName);
    newRow.append(newItemPrice);
    newItemBought.append(newItemBoughtCheckBox);
    newRow.append(newItemBought);
    newRemove.append(newRemoveButton);
    newRow.append(newRemove);

    table.append(newRow);

    updateTotals()
}

function updateTotals() {
    let rows = table.querySelectorAll("tr");

    let total = 0;
    let buyTotal = 0;
    for (let i = 0; i < rows.length; i++) {
        let price = rows[i].querySelectorAll("td")[1].innerText;
        price = Number(price.replace(/\D/g, ""));
        total += price;

        let checkbox = rows[i].querySelectorAll("td")[2].querySelector("input");
        if (checkbox.checked == false) {
            buyTotal += price;
        }
    }    
    totalText.textContent = "$"+total;
    needToBuyText.textContent = "$"+buyTotal;
}