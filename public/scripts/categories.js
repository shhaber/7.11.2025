let greating = "Hello " + localStorage.getItem('name');
document.getElementById('greating').innerHTML = greating;

let allCategories = [];
let allTasks = [];

async function getCategories() {
    try {
        let res = await fetch('/categories');
        if (res.status == 401) { window.location.href = '/login'; return; }
        let data = await res.json();
        allCategories = data;
        createCategoriesTable(data);
    } catch (err) {
        alert(err);
    }
}

function createCategoriesTable(data) {
    let txt = "";
    for (let c of data) {
        txt += `<tr>
            <td>${c.Name}</td>
            <td><button onclick="deleteCategory(${c.id})">🗑️</button></td>
            <td><button onclick="categoryToEdit(${c.id})">✏️</button></td>
        </tr>`;
    }
    document.getElementById('categoriesTable').innerHTML = txt;
}

async function getTasks() {
    try {
        let res = await fetch('/tasks');
        if (res.status == 401) { window.location.href = '/login'; return; }
        let data = await res.json();
        allTasks = data;
    } catch (err) {
        alert(err);
    }
}

async function addCategory() {
    let Name = document.getElementById('name').value.trim();
    if (!Name) { alert("Enter name"); return; }

    await fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name })
    });
    clearForm();
    await getCategories();
}

async function categoryToEdit(id) {
    let res = await fetch(`/categories/${id}`);
    let data = await res.json();
    document.getElementById('id').value = data.id;
    document.getElementById('name').value = data.Name;
}

async function editCategory(id) {
    let Name = document.getElementById('name').value.trim();
    if (!Name) { alert("Enter name"); return; }

    await fetch(`/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name })
    });

    clearForm();
    await getCategories();
}

async function deleteCategory(id) {
    const ok = confirm(
        "אם תמחק קטגוריה זו, כל המשימות המשויכות אליה יימחקו.\nהאם ברצונך להמשיך?"
    );
    if (!ok) return;

    try {
        const relatedTasks = allTasks.filter(task => task && task.CategoryID == id);
        for (let task of relatedTasks) {
            let resTask = await fetch(`/tasks/${task.id}`, { method: 'DELETE' });
            if (!resTask.ok) {
                let errMsg = await resTask.text();
                throw new Error(`Failed to delete task ${task.id}: ${errMsg}`);
            }
        }

        let resCat = await fetch(`/categories/${id}`, { method: 'DELETE' });
        if (!resCat.ok) {
            let errMsg = await resCat.text();
            throw new Error(`Failed to delete category ${id}: ${errMsg}`);
        }

        await getCategories();
        await getTasks();
    } catch (err) {
        alert("שגיאה במהלך מחיקת הקטגוריה או המשימות: " + err.message);
        console.error(err);
    }
}


function addOrEditCategory() {
    let id = document.getElementById('id').value;
    if (id) { editCategory(id); } else { addCategory(); }
}

function clearForm() {
    document.getElementById('id').value = "";
    document.getElementById('name').value = "";
}

async function init() {
    await getCategories();
    await getTasks();
}

init();
