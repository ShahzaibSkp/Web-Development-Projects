// The Asynchronous Shopper: Imagine you are building an online shopping application. Write an asynchronous function called placeOrder that simulates placing an order and returns a promise. The promise should resolve with an order confirmation message after a random delay.

async function placeOrder(item) {
	const delay = Math.floor(Math.random() * 3000) + 1000;

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`Order confirmed for ${item}. It will arrive soon.`);
		}, delay);
	});
}

async function main() {
    let order = "new laptop";

	const confirmation = await placeOrder(order);
	console.log(confirmation);
}

main();