# Student Record Management System

## Program Logic Explanation

This C program implements a Student Record Management System using a singly linked list data structure. Here's how it works:

### Data Structure
- Each student is represented by a `struct Student` containing:
  - Student ID (integer)
  - Student Name (character array)
  - Branch (character array)
  - Semester (integer)
  - Marks (float)
  - Pointer to next student node

### Key Operations Implemented

1. **Add New Student**
   - Creates a new node with student details
   - Adds it to the end of the linked list
   - Checks for duplicate IDs to maintain uniqueness

2. **Display All Students**
   - Traverses the linked list from head to tail
   - Displays all student records in a formatted table

3. **Search Student by ID**
   - Traverses the list to find a student with matching ID
   - Returns the student node if found, NULL otherwise

4. **Delete Student**
   - Searches for the student with given ID
   - Removes the node from the linked list
   - Frees the allocated memory

5. **Update Student Record**
   - Finds the student with given ID
   - Allows updating specific fields (name, branch, semester, marks)

### Menu System
- Uses a switch-case structure for menu navigation
- Provides a continuous loop until the user chooses to exit
- Handles invalid inputs gracefully

## Web Frontend Interface

In addition to the C console application, we've also created a web-based frontend interface using HTML, CSS, and JavaScript. This provides a more user-friendly graphical interface for managing student records.

### Features of the Web Interface:
- Tab-based navigation for different operations
- Form validation for all input fields
- Responsive design that works on desktop and mobile devices
- Real-time feedback through success/error messages
- Clean, modern styling with intuitive user interface

### Files Included:
- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `script.js` - Client-side JavaScript functionality
- `server.py` - Simple Python server to serve the files

## Java Version

We have also created a Java version of the Student Record Management System that implements the same functionality as the C version:

### Features of the Java Version:
- Object-oriented design with Student and StudentRecordManager classes
- Linked list data structure to store student records
- Complete implementation of all required operations
- Menu-driven interface with error handling
- Input validation for all operations

### Files Included:
- `StudentRecordSystem.java` - Complete Java implementation

### How to Run the Java Version:
1. Make sure you have Java JDK installed on your system
2. Open terminal/command prompt
3. Navigate to the project directory
4. Compile the program:
   ```
   javac StudentRecordSystem.java
   ```
5. Run the program:
   ```
   java StudentRecordSystem
   ```

## Sample Output (Console Version)

```
===== Student Record Management System =====

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 1

--- Add New Student ---
Enter Student ID: 101
Enter Student Name: John Smith
Enter Branch: Computer Science
Enter Semester: 3
Enter Marks: 85.5
Student record added successfully!

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 1

--- Add New Student ---
Enter Student ID: 102
Enter Student Name: Jane Doe
Enter Branch: Electronics
Enter Semester: 2
Enter Marks: 92.0
Student record added successfully!

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 2

--- Display All Students ---
------------------------------------------------------------
| No. | ID     | Name            | Branch     | Semester | Marks  |
------------------------------------------------------------
| 1   | 101    | John Smith      | Computer Science | 3      | 85.50  |
| 2   | 102    | Jane Doe        | Electronics    | 2      | 92.00  |
------------------------------------------------------------

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 3

--- Search Student ---
Enter Student ID to search: 101
Student Found:
ID: 101
Name: John Smith
Branch: Computer Science
Semester: 3
Marks: 85.50

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 5

--- Update Student ---
Enter Student ID to update: 101
Select field to update:
1. Name
2. Branch
3. Semester
4. Marks
Enter your choice: 4
Enter new marks: 88.0
Student record updated successfully!

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 4

--- Delete Student ---
Enter Student ID to delete: 102
Student with ID 102 deleted successfully!

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 2

--- Display All Students ---
------------------------------------------------------------
| No. | ID     | Name            | Branch     | Semester | Marks  |
------------------------------------------------------------
| 1   | 101    | John Smith      | Computer Science | 3      | 88.00  |
------------------------------------------------------------

===== MENU =====
1. Add New Student
2. Display All Students
3. Search Student by ID
4. Delete Student
5. Update Student Record
6. Exit
================
Enter your choice: 6
Exiting program. Goodbye!
```

## How to Compile and Run (Console Version)

1. Save the code in a file named `student_record_system.c`
2. Open terminal/command prompt
3. Navigate to the directory containing the file
4. Compile the program:
   ```
   gcc student_record_system.c -o student_record_system
   ```
5. Run the program:
   ```
   ./student_record_system     # On Linux/Mac
   student_record_system.exe   # On Windows
   ```

## How to Run the Web Interface

1. Make sure you have Python installed on your system (most systems have it pre-installed)
2. Open terminal/command prompt
3. Navigate to the project directory
4. Run the server:
   ```
   python server.py
   ```
   or
   ```
   python3 server.py
   ```
5. The web browser will automatically open the application at `http://localhost:8000`

## Features

- Dynamic memory allocation for efficient memory usage
- User-friendly menu-driven interface
- Error handling for invalid inputs
- Prevention of duplicate student IDs
- Clean formatted output for better readability
- Modular design with separate functions for each operation
- Web-based frontend with responsive design
- Form validation and user feedback
- Java implementation with object-oriented design