var display = document.querySelector(".display");
var lastOperationDisplay = document.querySelector(".last-operation");
var buttons = document.querySelectorAll("button");
var operators = ["+", "*", "/", "-", "=", "%"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var dataList = [];
var output = "0";
display.value = output;
var lastOperation = "";
var calculate = function (btnval) {
    if (btnval === "=" && output !== "0") {
        try {
            var result = new Function('return ' + output)();
            lastOperation = output;
            dataList.push(output, result);
            console.log(dataList);
            displayList();
            output = String(result);
        }
        catch (error) {
            output = "Error";
        }
    }
    else if (btnval == "=" || btnval == "$" && output == '0') {
        return;
    }
    else if ((numbers.includes(btnval)) && output == '0') {
        output = btnval;
    }
    else if (btnval === "!") {
        lastOperation = "";
        output = "0";
    }
    else if (btnval === "$" && output != '0') {
        output = output.slice(0, -1);
    }
    else if ((operators.includes(btnval)) && output == '0') {
        output = "0" + btnval;
    }
    else if (btnval === "C") {
        clearArray1(dataList);
        displayList();
    }
    else {
        output = output + btnval;
    }
    display.value = output;
    if (lastOperation !== "") {
        lastOperationDisplay.textContent = lastOperation + " = ";
    }
    else {
        lastOperationDisplay.textContent = "";
    }
};
buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        var target = e.target;
        calculate(target.dataset.value || "");
    });
});
function displayList() {
    var listContainer = document.getElementById('disparr');
    var html = '<ol>';
    dataList.forEach(function (item, index) {
        if (index % 2 == 0) {
            html += "<li>".concat(item, " =</li>");
        }
        else {
            html += "<li>".concat(item, "</li>");
        }
    });
    html += '</ol>';
    listContainer.innerHTML = "Your operations performed: " + html;
}
var clearArray1 = function (arr) {
    arr.length = 0;
    return arr;
};
