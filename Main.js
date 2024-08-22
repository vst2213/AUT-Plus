// Hello World Program
// Test1

// Simple JavaScript code to print a message
console.log("Hello, World!");

// Function to greet a user with their name
function greetUser(name) {
    console.log("Hello, " + name + "! Welcome to the world of JavaScript.");
}

// Define a user's name
let userName = "Alice";

// Call the greetUser function with the user's name
greetUser(userName);

// Example of a simple arithmetic operation
let a = 7;
let b = 3;
let sum = a + b;

// Display the result of the arithmetic operation
console.log("The sum of " + a + " and " + b + " is: " + sum);

// Function to calculate the difference between two numbers
function calculateDifference(x, y) {
    return x - y;
}

// Define two numbers for difference calculation
let num1 = 10;
let num2 = 4;
let difference = calculateDifference(num1, num2);

// Display the result of the difference calculation
console.log("The difference between " + num1 + " and " + num2 + " is: " + difference);

// Example of using a loop to display numbers
console.log("Numbers from 1 to 5:");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// Function to check if a number is even or odd
function isEven(number) {
    return number % 2 === 0;
}

// Test the isEven function
let testNumber = 8;
if (isEven(testNumber)) {
    console.log(testNumber + " is even.");
} else {
    console.log(testNumber + " is odd.");
}
