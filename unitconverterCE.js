const inputEl = document.getElementById("input")
const submitBtn = document.getElementById("Submit")
const saveBtn = document.getElementById("Save")
const clearBtn = document.getElementById("Clear")

const massconversionEl = document.getElementById("massconversion")
const lengthconversionEl = document.getElementById("lengthconversion")
const volumeconversionEl = document.getElementById("volumeconversion")

const saveListEl = document.getElementById("savelist")
const clearLastBtn = document.getElementById("clearlast")
const clearAllBtn = document.getElementById("clearall")

let inputValue = 0
let pounds = 0
let kilograms = 0
let miles = 0
let kilometers = 0
let gallons = 0
let liters = 0

submitBtn.addEventListener("click", function() {
    inputValue = inputEl.value
    convert()
    addConversion()
})

clearBtn.addEventListener("click", function() {
    inputValue = 0
    pounds = 0
    kilograms = 0
    miles = 0
    kilometers = 0
    gallons = 0
    liters = 0
    inputEl.value = ""
    addConversion()
})

function convert() {
    kilograms = inputValue / 2.205
    pounds = inputValue * 2.205
    kilometers = inputValue * 1.609
    miles = inputValue / 1.609
    liters = inputValue * 3.785
    gallons = inputValue / 3.785
}

function addConversion() {
    massconversionEl.textContent = `${inputValue} Pound(s) = ${kilograms.toFixed(3)} Kilogram(s) | ${inputValue} Kilogram(s) = ${pounds.toFixed(3)} Pound(s)`
    lengthconversionEl.textContent = `${inputValue} Mile(s) = ${kilometers.toFixed(3)} Kilometer(s) | ${inputValue} Kilometer(s) = ${miles.toFixed(3)} Mile(s)`
    volumeconversionEl.textContent = `${inputValue} Gallon(s) = ${liters.toFixed(3)} Liter(s) | ${inputValue} Liter(s) = ${gallons.toFixed(3)} Gallon(s)`
}

let savedValues = []

function addValue() {
    let conversions = `
    ${inputValue} Pound(s) = ${kilograms.toFixed(3)} Kilogram(s) | ${inputValue} Kilogram(s) = ${pounds.toFixed(3)} Pound(s)<br>
    ${inputValue} Mile(s) = ${kilometers.toFixed(3)} Kilometer(s) | ${inputValue} Kilometer(s) = ${miles.toFixed(3)} Mile(s)<br>
    ${inputValue} Gallon(s) = ${liters.toFixed(3)} Liter(s) | ${inputValue} Liter(s) = ${gallons.toFixed(3)} Gallon(s)`
    savedValues.push(conversions)
    localStorage.setItem("conversions", JSON.stringify(savedValues))
}

function addToList() {
    let str = ""
    for (let i = 0; i < savedValues.length; i++) {
        str += `<li> ${savedValues[i]} </li>`
    }
    saveListEl.innerHTML = str
}

saveBtn.addEventListener("click", function() {
    addValue()
    addToList()
})

clearLastBtn.addEventListener("click", function() {
    if(savedValues.length > 0) {
        if(savedValues.length == 1) {
            savedValues = []
            addToList()
            localStorage.clear()
        } else {
            savedValues.pop()
            localStorage.setItem("conversions", JSON.stringify(savedValues))
            addToList()
        }
    }
})

clearAllBtn.addEventListener("click", function() {
    savedValues = []
    addToList()
    localStorage.clear()
})

window.onload = function () {
  let value = JSON.parse(localStorage.getItem("conversions"));
  if (value) {
    savedValues = value
    addToList()
  }
};