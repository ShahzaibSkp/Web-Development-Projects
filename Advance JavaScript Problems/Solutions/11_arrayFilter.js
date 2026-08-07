// The Array Filterer: You are building a search feature for your e-commerce site. Write a function named filterProducts that takes an array of product objects and a filter criterion. The function should return a new array containing only the products that match the filter criterion.

function filterProducts(arr, criterion) {
    if (typeof criterion === "function") {
        return arr.filter(criterion);
    }

    if (criterion && typeof criterion === "object") {
        return arr.filter((product) => {
            return Object.entries(criterion).every(([key, value]) => product[key] === value);
        });
    }

    return arr.slice();
}


const products = [
    { id: 101, name: "Wireless Mouse", price: 29.99, inStock: true },
    { id: 102, name: "Mechanical Keyboard", price: 89.99, inStock: false },
    { id: 103, name: "4K Monitor", price: 349.99, inStock: true }
];

console.log(filterProducts(products, { inStock: true }));