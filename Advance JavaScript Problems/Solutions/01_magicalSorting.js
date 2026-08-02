// The Magical Sorting Hat: Imagine you are creating a magical sorting hat for a wizard school. Implement a JavaScript function that takes an array of student names and assigns them to one of the four houses (Jinnah (length less than 6), Iqbal (length less than 8), Liaquat (length less than 12), or Sir Syed (length greater than or equal to 12)) based on the length of their names.

let students = ["Ahmed", "Zainab", "Ayesha", "Khadija", "Shahjahan", "Mustafa", "Salahuddin", " Anwar-ul-Hassan", "Zeeshan", "Asif", "Muzammil Hussain"];

let houses = [];

for (const student of students) {
    if(student.length < 6){
        houses.push("Jinnah");
    }

    else if(student.length < 8){
        houses.push("Iqbal");
    }

    else if(student.length < 12){
        houses.push("Liaquat");
    }

    else{
        houses.push("Sir Syed");
    }
}

console.log(houses);