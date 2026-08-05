// Async Array Mapping: Write an asynchronous function that takes an array of numbers and returns a new array of Promises where each number is multiplied by 2 after a delay of 500 milliseconds.

function delayArr(arr) {
    return arr.map((num) =>
        new Promise((resolve) => {
            setTimeout(() => resolve(num * 2), 500);
        })
    );
}

async function main() {
    const nums = [1, 2, 3, 4];
    const results = await Promise.all(delayArr(nums));
    console.log(results);
}

main() 
void(0);