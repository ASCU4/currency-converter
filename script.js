const converterFrom =document.getElementById("converter-from");
const fromCurrency =document.getElementById("from-currency");
const toCurrency =document.getElementById("to-currency");
const amountInput =document.getElementById("amount");
const resultDiv =document.getElementById("result");

window.addEventListener("load", fetchCurrencies);

converterFrom.addEventListener("submit", convertCurrency);
    
async function fetchCurrencies(){
 //https://api.exchangerate-api.com/v4/latest/INR
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
    const data = await response.json();
  
    console.log(data);
    const currencyOption = Object.keys(data.rates);


    currencyOption.forEach((currency) => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });
}
   
async function convertCurrency(e){
    e.preventDefault()

    const amount =parseFloat(amountInput.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if(amount <0){
        alert("Please enter a valid amount");
        return;
    }
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
    const data = await response.json();

    const rate = data.rates[toCurrencyValue];
    const result = (amount * rate).toFixed(2);
    resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${result} ${toCurrencyValue}`;

}
