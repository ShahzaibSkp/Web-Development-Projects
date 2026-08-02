// The Double Trouble: You are tasked with writing a function that doubles each element in an array. However, there's a catch: if the array contains consecutive duplicate elements, only double one of them.


function double(arr) {
    let arr2 = [];
    let prevWasDoubled = false;

    for (let i = 0; i < arr.length; i++) {
        if (i > 0 && arr[i] === arr[i - 1] && prevWasDoubled) {
            arr2.push(arr[i]);
            prevWasDoubled = false;
        }

        else {
            arr2.push(arr[i] * 2);
            prevWasDoubled = true;
        }
    }

    console.log(arr2);
}

let array = [1, 2, 2, 5];
double(array)