// ----------- Student Management System Logic (Linked List) -----------

class Student {
    constructor(usn, name, marks) {
        this.usn = parseInt(usn);
        this.name = name;
        this.marks = parseInt(marks);
        this.next = null;
    }
}

let head = null;

// ----------- core Functions -----------

function insertStudent(usn, name, marks) {
    const newStudent = new Student(usn, name, marks);

    if (head === null) {
        head = newStudent;
    } else {
        let temp = head;
        while (temp.next !== null) {
            temp = temp.next;
        }
        temp.next = newStudent;
    }
    showNotification("Student added successfully.", "success");
    renderTable();
}

function displayStudents() {
    const students = [];
    let temp = head;
    while (temp !== null) {
        students.push({
            usn: temp.usn,
            name: temp.name,
            marks: temp.marks
        });
        temp = temp.next;
    }
    return students;
}

function searchStudent(usn) {
    let temp = head;
    while (temp !== null) {
        if (temp.usn === parseInt(usn)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
}

function deleteStudent(usn) {
    if (head === null) {
        showNotification("No records to delete.", "error");
        return false;
    }

    if (head.usn === parseInt(usn)) {
        head = head.next;
        showNotification("Student deleted successfully.", "success");
        renderTable();
        return true;
    }

    let temp = head;
    while (temp.next !== null && temp.next.usn !== parseInt(usn)) {
        temp = temp.next;
    }

    if (temp.next === null) {
        showNotification("Student not found.", "error");
        return false;
    } else {
        temp.next = temp.next.next;
        showNotification("Student deleted successfully.", "success");
        renderTable();
        return true;
    }
}

function sortByMarks() {
    if (head === null) return;

    let i, j;
    // Simple Bubble Sort on Linked List values (as in Java code)
    for (i = head; i.next !== null; i = i.next) {
        for (j = head; j.next !== null; j = j.next) {
            if (j.marks > j.next.marks) {
                // Swap marks
                let tempMarks = j.marks;
                j.marks = j.next.marks;
                j.next.marks = tempMarks;

                // Swap usn
                let tempUsn = j.usn;
                j.usn = j.next.usn;
                j.next.usn = tempUsn;

                // Swap name
                let tempName = j.name;
                j.name = j.next.name;
                j.next.name = tempName;
            }
        }
    }
    showNotification("Students sorted by marks.", "success");
    renderTable();
}

// ----------- UI Helpers -----------

function renderTable() {
    const tbody = document.getElementById('student-body');
    const noRecords = document.getElementById('no-records');
    const recordCount = document.getElementById('record-count');
    const table = document.getElementById('student-table');
    
    tbody.innerHTML = '';
    const students = displayStudents();

    if (students.length === 0) {
        noRecords.style.display = 'block';
        table.style.display = 'none';
        recordCount.innerText = '0 students';
    } else {
        noRecords.style.display = 'none';
        table.style.display = 'table';
        recordCount.innerText = `${students.length} student${students.length > 1 ? 's' : ''}`;

        students.forEach(s => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${s.usn}</td>
                <td>${s.name}</td>
                <td>${s.marks}</td>
                <td>
                    <button class="delete-btn" onclick="deleteAndRender(${s.usn})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function deleteAndRender(usn) {
    deleteStudent(usn);
}

// ----------- Event Listeners -----------

document.getElementById('student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const usn = document.getElementById('usn').value;
    const name = document.getElementById('name').value;
    const marks = document.getElementById('marks').value;

    // Check if USN already exists
    if (searchStudent(usn)) {
        showNotification("USN already exists!", "error");
        return;
    }

    insertStudent(usn, name, marks);
    e.target.reset();
});

document.getElementById('btn-search').addEventListener('click', () => {
    const usn = document.getElementById('search-usn').value;
    if (!usn) {
        showNotification("Enter USN to search", "error");
        return;
    }

    const student = searchStudent(usn);
    if (student) {
        alert(`Student Found:\nUSN: ${student.usn}\nName: ${student.name}\nMarks: ${student.marks}`);
    } else {
        showNotification("Student not found.", "error");
    }
});

document.getElementById('btn-delete').addEventListener('click', () => {
    const usn = document.getElementById('delete-usn').value;
    if (!usn) {
        showNotification("Enter USN to delete", "error");
        return;
    }
    deleteStudent(usn);
    document.getElementById('delete-usn').value = '';
});

document.getElementById('btn-sort').addEventListener('click', () => {
    sortByMarks();
});

document.getElementById('btn-clear').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all records?")) {
        head = null;
        renderTable();
        showNotification("All records cleared.", "success");
    }
});

// Initial render
renderTable();
