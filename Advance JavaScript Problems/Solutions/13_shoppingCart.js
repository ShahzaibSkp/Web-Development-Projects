// The Shopping Cart Totalizer: You are working on an e-commerce website, and you need to calculate the total cost of items in the shopping cart. Implement a function named calculateTotal that takes an array of products with prices and quantities and returns the total cost.

function calculateTotal(products) {
    return products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
}

const cart = [
    { name: "Wireless Mouse", price: 29.99, quantity: 2 },
    { name: "Keyboard", price: 49.5, quantity: 1 },
    { name: "USB Cable", price: 9.99, quantity: 3 }
];

console.log(calculateTotal(cart));