// Student data array (simulating backend storage)
let students = JSON.parse(localStorage.getItem('students')) || [
    { id: 101, name: "John Smith", branch: "Computer Science", semester: 3, marks: 85.5 },
    { id: 102, name: "Jane Doe", branch: "Electronics", semester: 2, marks: 92.0 },
    { id: 103, name: "Michael Johnson", branch: "Mechanical", semester: 4, marks: 78.5 }
];

// DOM Elements
const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const addStudentForm = document.getElementById('addStudentForm');
const studentTableBody = document.getElementById('studentTableBody');
const refreshBtn = document.getElementById('refreshBtn');
const searchBtn = document.getElementById('searchBtn');
const loadUpdateBtn = document.getElementById('loadUpdateBtn');
const updateStudentForm = document.getElementById('updateStudentForm');
const deleteBtn = document.getElementById('deleteBtn');
const searchResult = document.getElementById('searchResult');
const messageArea = document.getElementById('messageArea');

// Tab switching functionality
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Add student form submission
addStudentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('studentId').value);
    const name = document.getElementById('studentName').value;
    const branch = document.getElementById('studentBranch').value;
    const semester = parseInt(document.getElementById('studentSemester').value);
    const marks = parseFloat(document.getElementById('studentMarks').value);
    
    // Validate inputs
    if (!validateInputs(id, name, branch, semester, marks)) {
        return;
    }
    
    // Check if student ID already exists
    if (students.some(student => student.id === id)) {
        showMessage(`Student with ID ${id} already exists!`, 'error');
        return;
    }
    
    // Add new student
    students.push({ id, name, branch, semester, marks });
    
    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(students));
    
    // Show success message
    showMessage('Student added successfully!', 'success');
    
    // Reset form
    addStudentForm.reset();
    
    // Refresh the table if on view tab
    if (document.getElementById('view').classList.contains('active')) {
        renderStudentTable();
    }
});

// Validate input values
function validateInputs(id, name, branch, semester, marks) {
    if (id <= 0) {
        showMessage('Student ID must be greater than 0', 'error');
        return false;
    }
    
    if (name.trim() === '') {
        showMessage('Student name cannot be empty', 'error');
        return false;
    }
    
    if (branch.trim() === '') {
        showMessage('Branch cannot be empty', 'error');
        return false;
    }
    
    if (semester < 1 || semester > 8) {
        showMessage('Semester must be between 1 and 8', 'error');
        return false;
    }
    
    if (marks < 0 || marks > 100) {
        showMessage('Marks must be between 0 and 100', 'error');
        return false;
    }
    
    return true;
}

// Render student table
function renderStudentTable() {
    studentTableBody.innerHTML = '';
    
    if (students.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" style="text-align: center;">No student records found</td>`;
        studentTableBody.appendChild(row);
        return;
    }
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.branch}</td>
            <td>${student.semester}</td>
            <td>${student.marks.toFixed(2)}</td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Refresh button event
refreshBtn.addEventListener('click', renderStudentTable);

// Search functionality
searchBtn.addEventListener('click', () => {
    const searchId = parseInt(document.getElementById('searchId').value);
    searchResult.innerHTML = ''; // Clear previous results
    
    if (isNaN(searchId) || searchId <= 0) {
        showMessage('Please enter a valid student ID', 'error');
        return;
    }
    
    const student = students.find(s => s.id === searchId);
    
    if (student) {
        searchResult.innerHTML = `
            <h3>Student Found</h3>
            <p><strong>ID:</strong> ${student.id}</p>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Branch:</strong> ${student.branch}</p>
            <p><strong>Semester:</strong> ${student.semester}</p>
            <p><strong>Marks:</strong> ${student.marks.toFixed(2)}</p>
        `;
        showMessage('Student found successfully', 'success');
    } else {
        searchResult.innerHTML = '<p>Student not found</p>';
        showMessage(`Student with ID ${searchId} not found`, 'error');
    }
});

// Load student for update
loadUpdateBtn.addEventListener('click', () => {
    const updateId = parseInt(document.getElementById('updateId').value);
    searchResult.innerHTML = ''; // Clear previous results
    
    if (isNaN(updateId) || updateId <= 0) {
        showMessage('Please enter a valid student ID', 'error');
        return;
    }
    
    const student = students.find(s => s.id === updateId);
    
    if (student) {
        // Populate form with student data
        document.getElementById('updateName').value = student.name;
        document.getElementById('updateBranch').value = student.branch;
        document.getElementById('updateSemester').value = student.semester;
        document.getElementById('updateMarks').value = student.marks;
        
        // Show the update form
        updateStudentForm.style.display = 'block';
        
        // Handle update form submission
        updateStudentForm.onsubmit = function(e) {
            e.preventDefault();
            
            const newName = document.getElementById('updateName').value;
            const newBranch = document.getElementById('updateBranch').value;
            const newSemester = parseInt(document.getElementById('updateSemester').value);
            const newMarks = parseFloat(document.getElementById('updateMarks').value);
            
            // Validate inputs
            if (validateInputs(updateId, newName, newBranch, newSemester, newMarks)) {
                // Update student data
                student.name = newName;
                student.branch = newBranch;
                student.semester = newSemester;
                student.marks = newMarks;
                
                // Save to localStorage
                localStorage.setItem('students', JSON.stringify(students));
                
                // Show success message
                showMessage('Student updated successfully!', 'success');
                
                // Hide the form
                updateStudentForm.style.display = 'none';
                
                // Reset the ID field
                document.getElementById('updateId').value = '';
                
                // Refresh the table if on view tab
                if (document.getElementById('view').classList.contains('active')) {
                    renderStudentTable();
                }
            }
        };
    } else {
        showMessage(`Student with ID ${updateId} not found`, 'error');
        updateStudentForm.style.display = 'none';
    }
});

// Delete student functionality
deleteBtn.addEventListener('click', () => {
    const deleteId = parseInt(document.getElementById('deleteId').value);
    
    if (isNaN(deleteId) || deleteId <= 0) {
        showMessage('Please enter a valid student ID', 'error');
        return;
    }
    
    const index = students.findIndex(s => s.id === deleteId);
    
    if (index !== -1) {
        // Remove student from array
        students.splice(index, 1);
        
        // Save to localStorage
        localStorage.setItem('students', JSON.stringify(students));
        
        // Show success message
        showMessage('Student deleted successfully!', 'success');
        
        // Reset the ID field
        document.getElementById('deleteId').value = '';
        
        // Refresh the table if on view tab
        if (document.getElementById('view').classList.contains('active')) {
            renderStudentTable();
        }
    } else {
        showMessage(`Student with ID ${deleteId} not found`, 'error');
    }
});

// Show message function
function showMessage(text, type) {
    messageArea.innerHTML = `<div class="message ${type}">${text}</div>`;
    
    // Auto-hide message after 3 seconds
    setTimeout(() => {
        messageArea.innerHTML = '';
    }, 3000);
}

// Initialize the table on page load
document.addEventListener('DOMContentLoaded', function() {
    renderStudentTable();
});