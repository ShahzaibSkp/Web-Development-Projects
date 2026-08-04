// The Sum Selector: You are working on a function that should sum all numbers in an array until it encounters a negative number. Write a function that performs this summation.

function sumArray(arr) {
    let sum = 0;

    for (let a = 0; a < arr.length; a++) {
        if (arr[a] < 0) {
            break;
        }
        sum = sum + arr[a];
    }
    return sum;
}

let arr = [2, 70, 5, -6, 7, 9,];

console.log(sumArray(arr));