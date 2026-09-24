let list = []

window.addEventListener("DOMContentLoaded", async () => {
    await loadItems();
    updateTable();
    updateTotal();
});

const addItemButton = document.getElementById("addItem");


addItemButton.addEventListener("click", function() {
    let name = document.getElementById("itemNameInput").value;
    let price = Number(document.getElementById("itemPriceInput").value);
    addItem(name, price);
})

class item {
    constructor(itemName, itemPrice) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.bought = false;
    }
}

function addItem(itemName, itemPrice) {
    if (itemName == "" || itemPrice == "") {
        return;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].itemName == itemName) {
            return;
        }
    }


    let newItem = new item(itemName, itemPrice);
    list.push(newItem);
    updateTable();
    saveItems();
    updateTotal();
}

function removeItem(itemName) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].itemName == itemName) {
            list.splice(i, 1);
            updateTable();
            saveItems();
            updateTotal();
            return;
        }
    }
}

function updateTable() {
    let table = document.getElementById("tableItems");
    table.replaceChildren();

    for (let i = 0; i < list.length; i++) {
        let row = document.createElement("tr");

        let name = document.createElement("td");
        name.textContent = list[i].itemName;

        let price = document.createElement("td");
        price.textContent = "$"+list[i].itemPrice;

        let bought = document.createElement("td");
        let boughtCheckbox = document.createElement("input");
        boughtCheckbox.type = "checkbox";
        boughtCheckbox.checked = list[i].bought;
        boughtCheckbox.id = "boughtCheckbox";
        boughtCheckbox.addEventListener("click", function() {
            if (list[i].bought == false) {
                list[i].bought = true;
            }
            else if (list[i].bought == true) {
                list[i].bought = false;
            }
            updateTotal();
        })

        let remove = document.createElement("td");
        let removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.id = "removeButton";
        removeButton.addEventListener("click", function() {
            removeItem(list[i].itemName);
        });

        bought.append(boughtCheckbox);
        remove.append(removeButton);
        row.append(name, price, bought, remove);
        table.append(row);
    }
}

function updateTotal() {
    let totalElement = document.getElementById("total");
    let needToBuyElement = document.getElementById("needToBuy");

    let total = 0;
    let needToBuy = 0;

    for (let i = 0; i < list.length; i++) {
        total += list[i].itemPrice;
        if (list[i].bought == false) {
            needToBuy += list[i].itemPrice;
        }
    }

    totalElement.textContent = "$"+total;
    needToBuyElement.textContent = "$"+needToBuy;
}

async function saveItems() {
    await fetch(
        "https://car-part-logger-default-rtdb.firebaseio.com/items.json",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        }
    );
}

async function loadItems() {
    const response = await fetch(
        "https://car-part-logger-default-rtdb.firebaseio.com/items.json"
    );

    const data = await response.json();

    list = data || [];

    console.log(list);
}