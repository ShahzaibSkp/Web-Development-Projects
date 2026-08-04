// The Vowel Counter: You need to create a function that counts the number of vowels in a given string. Consider both uppercase and lowercase vowels.

function vowelCounter(string) {
    let arr = string.split("");
    let count = 0;
    let vowels = "aeiouAEIOU"

    for (const element of arr) {
        if (vowels.includes(element)) {
            count++;
        }
    }

    return count;
}

let string = 'shahzaib';
console.log(vowelCounter(string));