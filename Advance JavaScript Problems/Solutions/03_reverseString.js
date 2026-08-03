// The Mirror Mirror: Imagine you have a string, and you need to create a new string that is a mirror image of the original. Write a function that appends the reversed version of the original string to itself.

function reverseString(string) {
    // 1st Approach
    // const reversed = string.split('').reverse().join('');

    // 2nd Approach
    let arr = string.split("");
    let newArr = [];

    for (let a = arr.length - 1; a >= 0; a--) {
        newArr.push(arr[a]);
    }
    let reversed = newArr.join("");

    return string + reversed;
}

let output = reverseString("shahzaib");
console.log(output);