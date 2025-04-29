const dropdownSelects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

for(let select of dropdownSelects) {
 for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "CAD") {
        newOption.selected = "selected";
    } else if(select.name === "to" && currCode === "NPR") {
        newOption.selected = "selected";
    }
    select.append(newOption);
}
select.addEventListener("change", (evt) =>{
    updateFlag(evt.target);
});
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let fromCurrency = document.querySelector(".from select").value.toLowerCase();
    let toCurrency = document.querySelector(".to select").value.toLowerCase();
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    document.querySelector(".msg").innerText = "Loading...";

    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const conversionRate = result[fromCurrency][toCurrency];

        if (!conversionRate) {
            document.querySelector(".msg").innerText = "Conversion rate not available.";
            return;
        }

        const finalAmount = amtValue * conversionRate;
        document.querySelector(".msg").innerText = `${amtValue} ${fromCurrency.toUpperCase()} = ${finalAmount.toFixed(2)} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        document.querySelector(".msg").innerText = "Something went wrong.";
    }
});

