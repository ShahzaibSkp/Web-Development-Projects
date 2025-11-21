
const taskInput = document.querySelector("#add-task");
const btn = document.querySelector(".task-btn");
const insertDiv = document.querySelector(".insert");

btn.addEventListener('click', () => {
    const input = taskInput.value.trim();
    if (input === "") return;

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const para = document.createElement('p');
    para.textContent = input;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delete');

    taskDiv.appendChild(para);
    taskDiv.appendChild(delBtn);
    insertDiv.appendChild(taskDiv);

    taskInput.value="";

    delBtn.addEventListener('click', () => {
        taskDiv.remove();
    });
});