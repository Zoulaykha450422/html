/*
Technical Documentation: Smart Budget Tracker JavaScript
Architecture Overview:
1. Captures user input (expense name and amount) via the form.
2. Adds, edits, removes expenses from the list and updates the total dynamically.
3. Uses JavaScript to manipulate the DOM, ensuring real-time updates.

System Components:
- Form Handler: Handles form submission for adding/editing expenses.
- Expense Array: Stores expense objects in memory.
- Functions: Add, edit, remove, and display expenses dynamically.
*/

// Form submission handler
document.getElementById('budget-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents default form submission behavior

    // Captures user input
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    // Validates input
    if (expenseName === '' || isNaN(expenseAmount)) {
        return; // Do nothing if inputs are invalid
    }

    // Check if the form is in "edit" mode
    if (this.dataset.editing === "true") {
        const index = parseInt(this.dataset.editIndex); // Retrieve the index of the expense being edited
        editExpense(index, expenseName, expenseAmount); // Update the expense
        this.dataset.editing = "false"; // Reset form to default mode
        this.dataset.editIndex = ""; // Clear the stored index
    } else {
        // If not editing, add a new expense
        addExpense(expenseName, expenseAmount);
    }

    updateTotal(); // Update the displayed total
    this.reset(); // Clear the form inputs
});

// Array to store expense objects
let expenses = [];

/**
 * Adds a new expense to the expense list.
 * @param {string} name - Name of the expense.
 * @param {number} amount - Amount of the expense.
 */
function addExpense(name, amount) {
    expenses.push({ name, amount }); // Add the new expense object to the array
    displayExpenses(); // Refresh the displayed list
}

/**
 * Edits an existing expense.
 * @param {number} index - Index of the expense to edit in the array.
 * @param {string} name - Updated name for the expense.
 * @param {number} amount - Updated amount for the expense.
 */
function editExpense(index, name, amount) {
    expenses[index] = { name, amount }; // Update the expense at the given index
    displayExpenses(); // Refresh the displayed list
}

/**
 * Renders the expense list on the page.
 */
function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear the list before rendering

    expenses.forEach((expense, index) => {
        const li = document.createElement('li'); // Create a new list item
        li.innerHTML = `
            ${expense.name}: $${expense.amount.toFixed(2)}
            <button onclick="editExpenseForm(${index})">Edit</button>
            <button onclick="removeExpense(${index})">Remove</button>
        `;
        expenseList.appendChild(li); // Add the list item to the DOM
    });
}

/**
 * Prepares the form for editing an existing expense.
 * @param {number} index - Index of the expense to edit.
 */
function editExpenseForm(index) {
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name; // Prefill the name
    document.getElementById('expense-amount').value = expense.amount; // Prefill the amount

    const form = document.getElementById('budget-form');
    form.dataset.editing = "true"; // Set form to edit mode
    form.dataset.editIndex = index; // Store the index of the expense being edited
}

/**
 * Removes an expense from the list.
 * @param {number} index - Index of the expense to remove.
 */
function removeExpense(index) {
    expenses.splice(index, 1); // Remove the expense at the given index
    displayExpenses(); // Refresh the displayed list
    updateTotal(); // Update the displayed total
}

/**
 * Calculates and updates the total expenses.
 */
function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0); // Calculate the total
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`; // Update the DOM
}