// Priority CPU Scheduling (Non-Preemptive)

#include <stdio.h>

int main() {
    int n;
    int at[10], bt[10], pr[10];
    int ct[10], tat[10], wt[10];
    int completed[10] = {0};
    int time = 0, done = 0;
    float avg_tat = 0, avg_wt = 0;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    // Input Arrival Time, Burst Time, Priority
    // NOTE: Lower priority number = Higher priority
    for (int i = 0; i < n; i++) {
        printf("Enter Arrival Time, Burst Time and Priority for P%d: ", i + 1);
        scanf("%d %d %d", &at[i], &bt[i], &pr[i]);
    }

    // Priority Scheduling (Non-Preemptive)
    while (done < n) {
        int idx = -1;
        int min_pr = 9999;

        for (int i = 0; i < n; i++) {
            if (at[i] <= time && !completed[i]) {
                if (pr[i] < min_pr) {
                    min_pr = pr[i];
                    idx = i;
                }
            }
        }

        if (idx == -1) {
            time++;   // CPU idle
        } else {
            time += bt[idx];
            ct[idx] = time;
            completed[idx] = 1;
            done++;
        }
    }

    // Calculate TAT and WT
    for (int i = 0; i < n; i++) {
        tat[i] = ct[i] - at[i];
        wt[i] = tat[i] - bt[i];
        avg_tat += tat[i];
        avg_wt += wt[i];
    }

    avg_tat /= n;
    avg_wt /= n;

    // Output
    printf("\nProcess\tAT\tBT\tPR\tCT\tTAT\tWT\n");
    for (int i = 0; i < n; i++) {
        printf("P%d\t%d\t%d\t%d\t%d\t%d\t%d\n",
               i + 1, at[i], bt[i], pr[i], ct[i], tat[i], wt[i]);
    }

    printf("\nAverage Turnaround Time = %.2f", avg_tat);
    printf("\nAverage Waiting Time = %.2f\n", avg_wt);

    return 0;
}
