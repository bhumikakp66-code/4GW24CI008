#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure to represent a student record
struct Student {
    int id;
    char name[50];
    char branch[30];
    int semester;
    float marks;
    struct Student* next;
};

// Function prototypes
struct Student* createStudent(int id, char name[], char branch[], int semester, float marks);
void addStudent(struct Student** head, int id, char name[], char branch[], int semester, float marks);
void displayAllStudents(struct Student* head);
struct Student* searchStudent(struct Student* head, int id);
void deleteStudent(struct Student** head, int id);
void updateStudent(struct Student* head, int id);
void displayMenu();
int isValidId(struct Student* head, int id);

int main() {
    struct Student* head = NULL;
    int choice, id, semester;
    char name[50], branch[30];
    float marks;
    
    printf("===== Student Record Management System =====\n\n");
    
    while(1) {
        displayMenu();
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch(choice) {
            case 1:
                printf("\n--- Add New Student ---\n");
                printf("Enter Student ID: ");
                scanf("%d", &id);
                
                // Check if ID already exists
                if(!isValidId(head, id)) {
                    printf("Error: Student with ID %d already exists!\n\n", id);
                    break;
                }
                
                printf("Enter Student Name: ");
                fflush(stdin);
                fgets(name, sizeof(name), stdin);
                name[strcspn(name, "\n")] = 0; // Remove newline
                
                printf("Enter Branch: ");
                fflush(stdin);
                fgets(branch, sizeof(branch), stdin);
                branch[strcspn(branch, "\n")] = 0; // Remove newline
                
                printf("Enter Semester: ");
                scanf("%d", &semester);
                
                printf("Enter Marks: ");
                scanf("%f", &marks);
                
                addStudent(&head, id, name, branch, semester, marks);
                printf("Student record added successfully!\n\n");
                break;
                
            case 2:
                printf("\n--- Display All Students ---\n");
                displayAllStudents(head);
                break;
                
            case 3:
                printf("\n--- Search Student ---\n");
                printf("Enter Student ID to search: ");
                scanf("%d", &id);
                struct Student* found = searchStudent(head, id);
                if(found != NULL) {
                    printf("Student Found:\n");
                    printf("ID: %d\n", found->id);
                    printf("Name: %s\n", found->name);
                    printf("Branch: %s\n", found->branch);
                    printf("Semester: %d\n", found->semester);
                    printf("Marks: %.2f\n\n", found->marks);
                } else {
                    printf("Student with ID %d not found!\n\n", id);
                }
                break;
                
            case 4:
                printf("\n--- Delete Student ---\n");
                printf("Enter Student ID to delete: ");
                scanf("%d", &id);
                deleteStudent(&head, id);
                break;
                
            case 5:
                printf("\n--- Update Student ---\n");
                printf("Enter Student ID to update: ");
                scanf("%d", &id);
                updateStudent(head, id);
                break;
                
            case 6:
                printf("Exiting program. Goodbye!\n");
                exit(0);
                
            default:
                printf("Invalid choice! Please enter a valid option.\n\n");
        }
    }
    
    return 0;
}

// Function to create a new student node
struct Student* createStudent(int id, char name[], char branch[], int semester, float marks) {
    struct Student* newStudent = (struct Student*)malloc(sizeof(struct Student));
    newStudent->id = id;
    strcpy(newStudent->name, name);
    strcpy(newStudent->branch, branch);
    newStudent->semester = semester;
    newStudent->marks = marks;
    newStudent->next = NULL;
    return newStudent;
}

// Function to add a new student
void addStudent(struct Student** head, int id, char name[], char branch[], int semester, float marks) {
    struct Student* newStudent = createStudent(id, name, branch, semester, marks);
    
    // If list is empty
    if(*head == NULL) {
        *head = newStudent;
        return;
    }
    
    // Traverse to the end of the list
    struct Student* temp = *head;
    while(temp->next != NULL) {
        temp = temp->next;
    }
    
    // Add new student at the end
    temp->next = newStudent;
}

// Function to display all students
void displayAllStudents(struct Student* head) {
    if(head == NULL) {
        printf("No student records found!\n\n");
        return;
    }
    
    struct Student* temp = head;
    int count = 1;
    
    printf("------------------------------------------------------------\n");
    printf("| %-3s | %-6s | %-15s | %-10s | %-8s | %-6s |\n", "No.", "ID", "Name", "Branch", "Semester", "Marks");
    printf("------------------------------------------------------------\n");
    
    while(temp != NULL) {
        printf("| %-3d | %-6d | %-15s | %-10s | %-8d | %-6.2f |\n", 
               count, temp->id, temp->name, temp->branch, temp->semester, temp->marks);
        temp = temp->next;
        count++;
    }
    printf("------------------------------------------------------------\n\n");
}

// Function to search a student by ID
struct Student* searchStudent(struct Student* head, int id) {
    struct Student* temp = head;
    
    while(temp != NULL) {
        if(temp->id == id) {
            return temp;
        }
        temp = temp->next;
    }
    
    return NULL; // Not found
}

// Function to delete a student by ID
void deleteStudent(struct Student** head, int id) {
    // If list is empty
    if(*head == NULL) {
        printf("No student records found!\n\n");
        return;
    }
    
    struct Student* temp = *head;
    
    // If first node is to be deleted
    if(temp->id == id) {
        *head = temp->next;
        free(temp);
        printf("Student with ID %d deleted successfully!\n\n", id);
        return;
    }
    
    // Search for the node to be deleted
    struct Student* prev = NULL;
    while(temp != NULL && temp->id != id) {
        prev = temp;
        temp = temp->next;
    }
    
    // If ID not found
    if(temp == NULL) {
        printf("Student with ID %d not found!\n\n", id);
        return;
    }
    
    // Unlink the node and free memory
    prev->next = temp->next;
    free(temp);
    printf("Student with ID %d deleted successfully!\n\n", id);
}

// Function to update a student record
void updateStudent(struct Student* head, int id) {
    struct Student* temp = searchStudent(head, id);
    
    if(temp == NULL) {
        printf("Student with ID %d not found!\n\n", id);
        return;
    }
    
    int choice;
    printf("Select field to update:\n");
    printf("1. Name\n");
    printf("2. Branch\n");
    printf("3. Semester\n");
    printf("4. Marks\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);
    
    switch(choice) {
        case 1:
            printf("Enter new name: ");
            fflush(stdin);
            fgets(temp->name, sizeof(temp->name), stdin);
            temp->name[strcspn(temp->name, "\n")] = 0;
            break;
            
        case 2:
            printf("Enter new branch: ");
            fflush(stdin);
            fgets(temp->branch, sizeof(temp->branch), stdin);
            temp->branch[strcspn(temp->branch, "\n")] = 0;
            break;
            
        case 3:
            printf("Enter new semester: ");
            scanf("%d", &temp->semester);
            break;
            
        case 4:
            printf("Enter new marks: ");
            scanf("%f", &temp->marks);
            break;
            
        default:
            printf("Invalid choice!\n");
            return;
    }
    
    printf("Student record updated successfully!\n\n");
}

// Function to display menu
void displayMenu() {
    printf("===== MENU =====\n");
    printf("1. Add New Student\n");
    printf("2. Display All Students\n");
    printf("3. Search Student by ID\n");
    printf("4. Delete Student\n");
    printf("5. Update Student Record\n");
    printf("6. Exit\n");
    printf("================\n");
}

// Function to check if ID is valid (not duplicate)
int isValidId(struct Student* head, int id) {
    return searchStudent(head, id) == NULL;
}