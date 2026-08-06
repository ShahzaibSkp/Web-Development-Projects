// The Coffee Machine: In your coffee shop application, you need to simulate the process of brewing coffee asynchronously. Write an async function named brewCoffee that takes the type of coffee and returns a promise. The promise should resolve with a message indicating that the coffee is ready after a random delay.

async function brewCoffee(type){
    const randomDelay = Math.floor(Math.random() * 7) + 1;

    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(`Your ${type} coffee is ready.`);
            console.log(randomDelay);
        }, randomDelay * 1000);
    })
}

async function main() {
    let coffeeType = "Cappuccino";

    let confirmation = await brewCoffee(coffeeType);
    console.log(confirmation);
}

main();