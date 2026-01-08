import java.util.Scanner;

public class StudentManagementSystem {

    // ----------- Student Node (Linked List) -----------
    static class Student {
        int usn;
        String name;
        int marks;
        Student next;

        Student(int usn, String name, int marks) {
            this.usn = usn;
            this.name = name;
            this.marks = marks;
            this.next = null;
        }
    }

    // Head of the linked list
    static Student head = null;

    // ----------- Insert Student -----------
    static void insertStudent(int usn, String name, int marks) {
        Student newStudent = new Student(usn, name, marks);

        if (head == null) {
            head = newStudent;
        } else {
            Student temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newStudent;
        }
        System.out.println("Student added successfully.");
    }

    // ----------- Display Students -----------
    static void displayStudents() {
        if (head == null) {
            System.out.println("No student records found.");
            return;
        }

        Student temp = head;
        System.out.println("\nUSN\tName\tMarks");
        System.out.println("-------------------------");
        while (temp != null) {
            System.out.println(temp.usn + "\t" + temp.name + "\t" + temp.marks);
            temp = temp.next;
        }
    }

    // ----------- Search Student (Linear Search) -----------
    static void searchStudent(int usn) {
        Student temp = head;

        while (temp != null) {
            if (temp.usn == usn) {
                System.out.println("Student Found:");
                System.out.println("USN   : " + temp.usn);
                System.out.println("Name  : " + temp.name);
                System.out.println("Marks : " + temp.marks);
                return;
            }
            temp = temp.next;
        }
        System.out.println("Student not found.");
    }

    // ----------- Delete Student -----------
    static void deleteStudent(int usn) {
        if (head == null) {
            System.out.println("No records to delete.");
            return;
        }

        if (head.usn == usn) {
            head = head.next;
            System.out.println("Student deleted successfully.");
            return;
        }

        Student temp = head;
        while (temp.next != null && temp.next.usn != usn) {
            temp = temp.next;
        }

        if (temp.next == null) {
            System.out.println("Student not found.");
        } else {
            temp.next = temp.next.next;
            System.out.println("Student deleted successfully.");
        }
    }

    // ----------- Sort by Marks (Bubble Sort) -----------
    static void sortByMarks() {
        if (head == null) return;

        Student i, j;
        for (i = head; i.next != null; i = i.next) {
            for (j = head; j.next != null; j = j.next) {
                if (j.marks > j.next.marks) {

                    // Swap marks
                    int tempMarks = j.marks;
                    j.marks = j.next.marks;
                    j.next.marks = tempMarks;

                    // Swap usn
                    int tempUsn = j.usn;
                    j.usn = j.next.usn;
                    j.next.usn = tempUsn;

                    // Swap name
                    String tempName = j.name;
                    j.name = j.next.name;
                    j.next.name = tempName;
                }
            }
        }
        System.out.println("Students sorted by marks.");
    }

    // ----------- Main Method -----------
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n--- Student Management System ---");
            System.out.println("1. Add Student");
            System.out.println("2. Display Students");
            System.out.println("3. Search Student");
            System.out.println("4. Delete Student");
            System.out.println("5. Sort by Marks");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");

            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter USN: ");
                    int usn = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Marks: ");
                    int marks = sc.nextInt();
                    insertStudent(usn, name, marks);
                    break;

                case 2:
                    displayStudents();
                    break;

                case 3:
                    System.out.print("Enter USN to search: ");
                    searchStudent(sc.nextInt());
                    break;

                case 4:
                    System.out.print("Enter USN to delete: ");
                    deleteStudent(sc.nextInt());
                    break;

                case 5:
                    sortByMarks();
                    break;

                case 6:
                    System.out.println("Exiting program.");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }
        } while (choice != 6);

        sc.close();
    }
}
