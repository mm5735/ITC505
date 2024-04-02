function convertToPounds() {
    var kg = parseFloat(document.getElementById("kgInput").value);
    if (!isNaN(kg)) {
        var pounds = kg * 2.20462; // 1 kilogram = 2.20462 pounds
        document.getElementById("result").innerHTML = kg + " kilograms is equal to " + pounds.toFixed(2) + " pounds.";
    } else {
        document.getElementById("result").innerHTML = "Please enter a valid number for kilograms.";
    }
}

var x = document.lastModified;
document.getElementById('lastModified').textContent = x;
