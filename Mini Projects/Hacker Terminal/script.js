const addItem = async (item) => {
    await randomDelay();
    let txt = document.createElement("h2");
    txt.innerHTML = item;
    document.querySelector(".items").append(txt);
}

const randomDelay = () => {
    return new Promise((resolve, reject) => {
        let timeout = Math.floor(Math.random() * 7) + 1;
        setTimeout(() => {
            resolve();
        }, timeout * 1000);
    })
}

async function main() {
    let t = setInterval(() => {
        let last = document.querySelector(".items").lastElementChild;
        if (last.innerHTML.endsWith("...")) {
            last.innerHTML = last.innerHTML.slice(0, last.innerHTML.length - 3);
        }

        else {
            last.innerHTML = last.innerHTML + ".";
        }
    }, 400);

    let text = ["Initializing Hacking", "Reading your Files and IP Address", "Password files Detected", "Sending all passwords and personal files to server", "Cleaning up"];

    for (const item of text) {
        await addItem(item);
    }
    await randomDelay();

    clearInterval(t);
}

main();