#include <stdio.h>

int main() {
    int n, i, j, choice;
    int at[10], bt[10], pr[10];
    int wt[10], tat[10], ct[10], rem[10], p[10];
    int time = 0, tq, done, min;
    float avg_wt = 0, avg_tat = 0;
    
    // Variables for Gantt chart tracking
    int gantt_chart[1000];
    int gantt_time[1000];
    int gantt_count = 0;

    printf("\nCPU Scheduling Algorithms");
    printf("\n1. FCFS");
    printf("\n2. SJF (Non-Preemptive)");
    printf("\n3. Round Robin");
    printf("\n4. Priority (Non-Preemptive)");
    printf("\n5. Priority (Preemptive)");
    printf("\n6. SRTF (Preemptive SJF)");
    printf("\nEnter your choice: ");
    scanf("%d", &choice);

    printf("\nEnter number of processes: ");
    scanf("%d", &n);

    for (i = 0; i < n; i++) {
        p[i] = i + 1;
        printf("\nProcess P%d", i + 1);
        printf("\nArrival Time: ");
        scanf("%d", &at[i]);
        printf("Burst Time: ");
        scanf("%d", &bt[i]);

        if (choice == 4 || choice == 5)
            scanf("%d", &pr[i]);

        rem[i] = bt[i];
        wt[i] = tat[i] = ct[i] = 0;
    }

    /* FCFS */
    if (choice == 1) {
        time = 0;
        for (i = 0; i < n; i++) {
            if (time < at[i]) time = at[i];
            wt[i] = time - at[i];
            time += bt[i];
            ct[i] = time;
            tat[i] = ct[i] - at[i];
        }
    }

    /* SJF NON-PREEMPTIVE */
    else if (choice == 2) {
        for (i = 0; i < n - 1; i++)
            for (j = i + 1; j < n; j++)
                if (bt[i] > bt[j]) {
                    int t;
                    t = bt[i]; bt[i] = bt[j]; bt[j] = t;
                    t = at[i]; at[i] = at[j]; at[j] = t;
                    t = p[i];  p[i]  = p[j];  p[j]  = t;
                }

        time = 0;
        for (i = 0; i < n; i++) {
            if (time < at[i]) time = at[i];
            wt[i] = time - at[i];
            time += bt[i];
            ct[i] = time;
            tat[i] = ct[i] - at[i];
        }
    }

    /* ROUND ROBIN */
    else if (choice == 3) {
        printf("\nEnter Time Quantum: ");
        scanf("%d", &tq);

        // Track execution segments for Gantt chart
        gantt_count = 0;
        
        time = 0;
        int completed = 0;
        int current_time = 0;
        int remaining_processes = n;
        
        // Initialize remaining time
        for (i = 0; i < n; i++) {
            rem[i] = bt[i];
        }
        
        while (remaining_processes > 0) {
            int process_executed = 0;
            
            for (i = 0; i < n; i++) {
                if (at[i] <= current_time && rem[i] > 0) {
                    int exec_time = (rem[i] < tq) ? rem[i] : tq;
                    
                    // Record for Gantt chart
                    gantt_chart[gantt_count] = p[i];
                    gantt_time[gantt_count] = current_time;
                    gantt_count++;
                    
                    current_time += exec_time;
                    rem[i] -= exec_time;
                    
                    if (rem[i] == 0) {
                        ct[i] = current_time;
                        tat[i] = ct[i] - at[i];
                        wt[i] = tat[i] - bt[i];
                        remaining_processes--;
                    }
                    
                    // Record end time for Gantt chart
                    gantt_time[gantt_count] = current_time;
                    
                    process_executed = 1;
                    break; // Move to next process in round robin
                }
            }
            
            if (!process_executed) {
                current_time++;
            }
        }
        
        time = current_time;
    }

    /* PRIORITY NON-PREEMPTIVE */
    else if (choice == 4) {
        for (i = 0; i < n - 1; i++)
            for (j = i + 1; j < n; j++)
                if (pr[i] > pr[j]) {
                    int t;
                    t = pr[i]; pr[i] = pr[j]; pr[j] = t;
                    t = bt[i]; bt[i] = bt[j]; bt[j] = t;
                    t = at[i]; at[i] = at[j]; at[j] = t;
                    t = p[i];  p[i]  = p[j];  p[j]  = t;
                }

        time = 0;
        for (i = 0; i < n; i++) {
            if (time < at[i]) time = at[i];
            wt[i] = time - at[i];
            time += bt[i];
            ct[i] = time;
            tat[i] = ct[i] - at[i];
        }
    }

    /* PRIORITY PREEMPTIVE */
    else if (choice == 5) {
        pr[9] = 9999;
        rem[9] = 9999;

        for (time = 0; time < 1000; time++) {
            min = 9;
            for (i = 0; i < n; i++)
                if (at[i] <= time && pr[i] < pr[min] && rem[i] > 0)
                    min = i;

            if (min != 9) {
                rem[min]--;
                if (rem[min] == 0) {
                    ct[min] = time + 1;
                    tat[min] = ct[min] - at[min];
                    wt[min] = tat[min] - bt[min];
                }
            }
        }
    }

    /* ✅ SRTF (PREEMPTIVE SJF) */
    else if (choice == 6) {
        int completed = 0;
        while (completed < n) {
            min = -1;
            int min_rem = 9999;

            for (i = 0; i < n; i++) {
                if (at[i] <= time && rem[i] > 0 && rem[i] < min_rem) {
                    min_rem = rem[i];
                    min = i;
                }
            }

            if (min == -1) {
                time++;
                continue;
            }

            rem[min]--;
            time++;

            if (rem[min] == 0) {
                completed++;
                ct[min] = time;
                tat[min] = ct[min] - at[min];
                wt[min] = tat[min] - bt[min];
            }
        }
    }

    else {
        printf("\nInvalid choice");
        return 0;
    }

    // Print simplified single-line Gantt chart
    printf("\nGantt Chart: ");
    if (choice == 3) { // Round Robin - show execution segments
        for (i = 0; i < gantt_count; i++) {
            printf("P%d ", gantt_chart[i]);
        }
    }
    else { // For other algorithms
        // Create timeline for all algorithms except Round Robin
        int timeline[1000];
        int max_time = 0;
        
        // Initialize timeline
        for (i = 0; i < 1000; i++) {
            timeline[i] = -1;
        }
        
        // Fill timeline based on process execution
        for (i = 0; i < n; i++) {
            int start_time = ct[i] - bt[i]; // Calculate start time from completion and burst time
            if (choice == 1 || choice == 2 || choice == 4) { // FCFS, SJF, Priority Non-preemptive
                for (int j = start_time; j < ct[i]; j++) {
                    timeline[j] = p[i];
                    if (j > max_time) max_time = j;
                }
            }
        }
        
        // For non-preemptive algorithms, show the execution order
        if (choice == 5 || choice == 6) { // Priority Preemptive or SRTF - simplified view
            for (i = 0; i < n; i++) {
                printf("P%d ", p[i]);
            }
        } else {
            // Show processes in execution order for non-preemptive algorithms
            int prev_process = -1;
            for (i = 0; i <= max_time; i++) {
                if (timeline[i] != prev_process && timeline[i] != -1) {
                    printf("P%d ", timeline[i]);
                    prev_process = timeline[i];
                }
            }
        }
    }
    printf("\n");

    // Print process table with better alignment (now below the Gantt chart)
    printf("\n");
    printf("+-----+-----+-----+-----+-----+-----+-----+\n");
    printf("| PID | AT  | BT  | CT  | TAT | WT  | RT  |\n");
    printf("+-----+-----+-----+-----+-----+-----+-----+\n");
    for (i = 0; i < n; i++) {
        avg_wt += wt[i];
        avg_tat += tat[i];
        printf("| P%-3d | %-3d | %-3d | %-3d | %-3d | %-3d | %-3d |\n",
               p[i], at[i], bt[i], ct[i], tat[i], wt[i], wt[i]);
    }
    printf("+-----+-----+-----+-----+-----+-----+-----+\n");

    printf("\nAverage Waiting Time = %.2f", avg_wt / n);
    printf("\nAverage Turnaround Time = %.2f\n", avg_tat / n);

    return 0;
}