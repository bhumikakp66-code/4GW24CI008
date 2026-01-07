import java.util.*;

// Student class to represent a student record
class Student {
    int id;
    String name;
    String branch;
    int semester;
    double marks;
    Student next;

    public Student(int id, String name, String branch, int semester, double marks) {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.semester = semester;
        this.marks = marks;
        this.next = null;
    }
}

// Student Record Management System class
class StudentRecordManager {
    private Student head;

    public StudentRecordManager() {
        this.head = null;
    }

    // Add a new student
    public void addStudent(int id, String name, String branch, int semester, double marks) {
        // Check if student with this ID already exists
        if (searchStudent(id) != null) {
            System.out.println("Error: Student with ID " + id + " already exists!");
            return;
        }

        Student newStudent = new Student(id, name, branch, semester, marks);

        if (head == null) {
            head = newStudent;
        } else {
            Student current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newStudent;
        }
        System.out.println("Student record added successfully!");
    }

    // Display all students
    public void displayAllStudents() {
        if (head == null) {
            System.out.println("No student records found!");
            return;
        }

        System.out.println("---------------------------------------------------------------------");
        System.out.printf("| %-5s | %-15s | %-20s | %-8s | %-6s |\n", "ID", "Name", "Branch", "Semester", "Marks");
        System.out.println("---------------------------------------------------------------------");

        Student current = head;
        while (current != null) {
            System.out.printf("| %-5d | %-15s | %-20s | %-8d | %-6.2f |\n", 
                current.id, current.name, current.branch, current.semester, current.marks);
            current = current.next;
        }
        System.out.println("---------------------------------------------------------------------");
    }

    // Search student by ID
    public Student searchStudent(int id) {
        Student current = head;
        while (current != null) {
            if (current.id == id) {
                return current;
            }
            current = current.next;
        }
        return null; // Not found
    }

    // Delete student by ID
    public void deleteStudent(int id) {
        if (head == null) {
            System.out.println("No student records found!");
            return;
        }

        // If first node is to be deleted
        if (head.id == id) {
            head = head.next;
            System.out.println("Student with ID " + id + " deleted successfully!");
            return;
        }

        Student current = head;
        while (current.next != null && current.next.id != id) {
            current = current.next;
        }

        if (current.next == null) {
            System.out.println("Student with ID " + id + " not found!");
            return;
        }

        current.next = current.next.next;
        System.out.println("Student with ID " + id + " deleted successfully!");
    }

    // Update student record
    public void updateStudent(int id, String name, String branch, int semester, double marks) {
        Student student = searchStudent(id);
        if (student == null) {
            System.out.println("Student with ID " + id + " not found!");
            return;
        }

        student.name = name;
        student.branch = branch;
        student.semester = semester;
        student.marks = marks;
        System.out.println("Student record updated successfully!");
    }

    // Update specific field of student record
    public void updateStudentField(int id, int fieldChoice, String newValue) {
        Student student = searchStudent(id);
        if (student == null) {
            System.out.println("Student with ID " + id + " not found!");
            return;
        }

        switch (fieldChoice) {
            case 1:
                student.name = newValue;
                System.out.println("Student name updated successfully!");
                break;
            case 2:
                student.branch = newValue;
                System.out.println("Student branch updated successfully!");
                break;
            case 3:
                try {
                    int semester = Integer.parseInt(newValue);
                    if (semester >= 1 && semester <= 8) {
                        student.semester = semester;
                        System.out.println("Student semester updated successfully!");
                    } else {
                        System.out.println("Invalid semester! Please enter a value between 1 and 8.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid semester format! Please enter a number.");
                }
                break;
            case 4:
                try {
                    double marks = Double.parseDouble(newValue);
                    if (marks >= 0 && marks <= 100) {
                        student.marks = marks;
                        System.out.println("Student marks updated successfully!");
                    } else {
                        System.out.println("Invalid marks! Please enter a value between 0 and 100.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid marks format! Please enter a number.");
                }
                break;
            default:
                System.out.println("Invalid field choice!");
                return;
        }
    }
}

// Main class to run the program
public class StudentRecordSystem {
    private static Scanner scanner = new Scanner(System.in);
    private static StudentRecordManager system = new StudentRecordManager();

    public static void main(String[] args) {
        System.out.println("===== Student Record Management System =====\n");

        while (true) {
            displayMenu();
            System.out.print("Enter your choice: ");
            
            try {
                int choice = scanner.nextInt();
                scanner.nextLine(); // consume newline

                switch (choice) {
                    case 1:
                        addNewStudent();
                        break;
                    case 2:
                        System.out.println("\n--- Display All Students ---");
                        system.displayAllStudents();
                        System.out.println();
                        break;
                    case 3:
                        searchStudent();
                        break;
                    case 4:
                        deleteStudent();
                        break;
                    case 5:
                        updateStudent();
                        break;
                    case 6:
                        System.out.println("Exiting program. Goodbye!");
                        return;
                    default:
                        System.out.println("Invalid choice! Please enter a valid option.\n");
                }
            } catch (InputMismatchException e) {
                System.out.println("Invalid input! Please enter a number.\n");
                scanner.nextLine(); // consume invalid input
            }
        }
    }

    // Display menu options
    private static void displayMenu() {
        System.out.println("===== MENU =====");
        System.out.println("1. Add New Student");
        System.out.println("2. Display All Students");
        System.out.println("3. Search Student by ID");
        System.out.println("4. Delete Student");
        System.out.println("5. Update Student Record");
        System.out.println("6. Exit");
        System.out.println("================");
    }

    // Add new student
    private static void addNewStudent() {
        System.out.println("\n--- Add New Student ---");
        
        System.out.print("Enter Student ID: ");
        int id = scanner.nextInt();
        scanner.nextLine(); // consume newline

        System.out.print("Enter Student Name: ");
        String name = scanner.nextLine();

        System.out.print("Enter Branch: ");
        String branch = scanner.nextLine();

        System.out.print("Enter Semester: ");
        int semester = scanner.nextInt();
        scanner.nextLine(); // consume newline

        System.out.print("Enter Marks: ");
        double marks = scanner.nextDouble();
        scanner.nextLine(); // consume newline

        system.addStudent(id, name, branch, semester, marks);
        System.out.println();
    }

    // Search student by ID
    private static void searchStudent() {
        System.out.println("\n--- Search Student ---");
        System.out.print("Enter Student ID to search: ");
        int id = scanner.nextInt();
        scanner.nextLine(); // consume newline

        Student student = system.searchStudent(id);
        if (student != null) {
            System.out.println("Student Found:");
            System.out.println("ID: " + student.id);
            System.out.println("Name: " + student.name);
            System.out.println("Branch: " + student.branch);
            System.out.println("Semester: " + student.semester);
            System.out.println("Marks: " + String.format("%.2f", student.marks));
            System.out.println();
        } else {
            System.out.println("Student with ID " + id + " not found!\n");
        }
    }

    // Delete student by ID
    private static void deleteStudent() {
        System.out.println("\n--- Delete Student ---");
        System.out.print("Enter Student ID to delete: ");
        int id = scanner.nextInt();
        scanner.nextLine(); // consume newline

        system.deleteStudent(id);
        System.out.println();
    }

    // Update student record
    private static void updateStudent() {
        System.out.println("\n--- Update Student ---");
        System.out.print("Enter Student ID to update: ");
        int id = scanner.nextInt();
        scanner.nextLine(); // consume newline

        Student student = system.searchStudent(id);
        if (student == null) {
            System.out.println("Student with ID " + id + " not found!\n");
            return;
        }

        System.out.println("Select field to update:");
        System.out.println("1. Name");
        System.out.println("2. Branch");
        System.out.println("3. Semester");
        System.out.println("4. Marks");
        System.out.print("Enter your choice: ");

        try {
            int fieldChoice = scanner.nextInt();
            scanner.nextLine(); // consume newline

            if (fieldChoice >= 1 && fieldChoice <= 4) {
                System.out.print("Enter new value: ");
                String newValue = scanner.nextLine();
                system.updateStudentField(id, fieldChoice, newValue);
                System.out.println();
            } else {
                System.out.println("Invalid choice!\n");
            }
        } catch (InputMismatchException e) {
            System.out.println("Invalid input! Please enter a number.\n");
            scanner.nextLine(); // consume invalid input
        }
    }
}