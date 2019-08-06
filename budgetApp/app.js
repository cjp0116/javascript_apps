// IIFE private methods that can't be accessed from outside.
// Returns an object with all the funtions that we wrote inside the IIFE.


// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome)* 100);
        } else {
            this.percentage= -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1, 
    };
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(ele, i, arr) {
            sum += ele.value;
        });
        data.totals[type] = sum;
    };

    // The Public Returns
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // ID = last id + 1
            // Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Recreate a new item based on their type(inc or exp) then push it into our data structure, and return the new element.
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(ID, type) {
            var ids, index;
            // id = 6 index= 3
            // ids[1 2 4 6 8 10]
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(ID);
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        testing: function() {
            console.log(data);
        },

        calculateBudget: function() {
            // calculate total income and expenses 
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            if(data.totals.inc > 0 ) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            };

        },
        
        calculatePercentage: function() {
            // a = 20
            // b = 10
            // c = 40
            // tot = 100
            // a = 20/100 = 20%
            // b = 10/100 = 10%
            // c = 40/100 = 40%
            data.allItems['exp'].forEach(function(e, i, arr) {
                e.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPercentages;
            allPercentages = data.allItems.exp.map(function(curr) {
                return curr.getPercentage();
            });
            return allPercentages;  
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
    }

})();

// UI CONTROLLER
var UIcontroller = (function() {
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensesPercentageLabel : ".item__percentage",
        dateLabel: ".budget__title--month"
    };
    var formatNumber = function(num, type) {
        var numSplit, int, decimal, type;
        // + or - before the number exactly to the decimal points
        // comma separating the thousands ex.) 2015.0545 -> 2,015.05
        num = Math.abs(num); // this change the 
        num = num.toFixed(2); //number prototype method (this takes care of the decimal numbers).
        numSplit = num.split('.');
        int = numSplit[0];
        decimal = numSplit[1];
        
        if(int.length > 3) {
            int = int.substr(0, int.length-3) + ',' + int.substr(int.length -3, 3);
        }   // input 23510 -> 23,510
        else if(int.length > 6) {
            int = int.substr(0, int.length - 6) + ',' + int.substr(int.length - 6, int.length -3) + ',' + int.substr(0, int.length - 3) + ',' + int.length(int.length -3, 3);
        }
        return (type === 'exp' ? '-' : '+') +  ' ' + int + '.'+ decimal; 
    };
    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i ++) {
            callback(list[i], list);
        };
    };

    // The Public Return functions.
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value, //will be either inc(income) or exp(expenses)
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        getDOMStrings: function() {
            return DOMStrings;
        },

        addListItem : function(obj, type) {
            var html, element, newHTML;

            // Create HTML string with placeholder text.
            if(type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace placeholder text with some actual data.
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace("%value%", formatNumber(obj.value, type));
            
            // Insert HTML into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        deleteListItem: function(selectorID) {
            var element;
            element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },
        clearFields: function() {
            var fields, fieldsArr;

            // Get the fields and turn it into an array so we can loop through it.
            fields = document.querySelectorAll(DOMStrings.inputDescription +', '+ DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(ele, i, arr) {
                ele.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = "----";
            }
        },
        displayPercentages: function(percentages) {
            var fields, nodeListForEach;
            fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);
            
            nodeListForEach = function(list, callback) {
                for(var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                };
            };
            
            nodeListForEach(fields, function(current, index) {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                }
                else {
                    current.textContent = "---"
                }
            });
        },
        displayMonth: function() {
            var now, year, month, months, date, christmas;
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            months = ['January', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' '+ year;
        },
        changeType: function() {
            var fields = document.querySelectorAll(DOMStrings.inputType + "," + DOMStrings.inputDescription + "," + DOMStrings.inputValue);
            nodeListForEach(fields, function(curr) {
                curr.classList.toggle("red-focus");
            });
            document.querySelector(DOMStrings.inputBtn).classList.toggle("red");
        },
    };
})();


// GLOBAL APP CONTROLLER (This is where we set up the event listeners!)
var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        
        document.addEventListener("keypress", function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changeType);
    };

    var updateBudget = function() {
        var budget;
        // 1. Calcultate the budget
        budgetCtrl.calculateBudget();
        // 2. return the budget.
        budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI.
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentages = function() {
        var percentages;
        budgetCtrl.calculatePercentage();
        percentages = budgetCtrl.getPercentages();
        UICtrl.displayPercentages(percentages);    
    };

    var ctrlAddItem = function() {
        var input, newItem;
        
        //1. Grab the field input data.
        input = UICtrl.getInput();
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller.
            newItem = budgetController.addItem(input.type, input.description, input.value);
            //3. Add the new item to the UI.
            UICtrl.addListItem(newItem, input.type);
            //4. Clear the fields.
            UICtrl.clearFields();
            // 5. Calculate and update the budget.
            updateBudget();
            // 6. Calculate and update the percentage.
            updatePercentages();
        };
    };
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // delete from our data structure
            budgetCtrl.deleteItem(ID, type);
            
            // delete from our UI.
            UICtrl.deleteListItem(itemID);
            
            // update and show the new budget.
            updateBudget();

            // update the percentages
            updatePercentages();
        }
    }

    // THE PUBLIC OBJECTS
    return {
        init: function() {
            console.log("Application has started");
            UICtrl.displayBudget( {
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
            UICtrl.displayMonth();
        }
    }

})(budgetController, UIcontroller);
controller.init();

