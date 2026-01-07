class CPUScheduler {
    constructor() {
        this.processes = [];
        this.algorithm = 'fcfs';
        this.timeQuantum = 4;
        this.results = null;
    }

    setAlgorithm(algorithm) {
        this.algorithm = algorithm;
        this.updateQuantumVisibility();
    }

    updateQuantumVisibility() {
        const quantumLabel = document.getElementById('quantum-label');
        const quantumInput = document.getElementById('quantum');

        if (this.algorithm === 'roundrobin') {
            quantumLabel.style.display = 'block';
            quantumInput.style.display = 'block';
        } else {
            quantumLabel.style.display = 'none';
            quantumInput.style.display = 'none';
        }
    }

    getTimeQuantum() {
        return parseInt(document.getElementById('quantum').value) || 4;
    }

    parseProcesses() {
        const tbody = document.getElementById('process-table-body');
        const rows = tbody.querySelectorAll('tr');
        const processes = [];

        for (let i = 0; i < rows.length; i++) {
            const inputs = rows[i].querySelectorAll('input');
            processes.push({
                id: `P${i}`,
                arrival: parseInt(inputs[0].value),
                burst: parseInt(inputs[1].value),
                priority: parseInt(inputs[2].value)
            });
        }
        return processes;
    }

    /* ================= FCFS ================= */
    fcfsScheduling() {
        const procs = [...this.processes].sort((a, b) => a.arrival - b.arrival);
        let time = 0;
        const timeline = [];

        const processes = procs.map(p => {
            if (time < p.arrival) {
                timeline.push({ pid: 'IDLE', start: time, end: p.arrival });
                time = p.arrival;
            }
            const start = time;
            time += p.burst;
            timeline.push({ pid: p.id, start, end: time });
            return {
                ...p,
                start,
                completion: time,
                turnaround: time - p.arrival,
                waiting: time - p.arrival - p.burst
            };
        });
        return { processes, timeline };
    }

    /* ================= SJF NON-PREEMPTIVE ================= */
    sjfScheduling() {
        const p = [...this.processes];
        const n = p.length;
        const done = Array(n).fill(false);
        const res = [];
        const timeline = [];
        let time = 0;

        while (res.length < n) {
            let idx = -1, min = Infinity;

            for (let i = 0; i < n; i++) {
                if (!done[i] && p[i].arrival <= time && p[i].burst < min) {
                    min = p[i].burst;
                    idx = i;
                }
            }

            if (idx === -1) {
                const nextArrival = Math.min(...p.filter((_, i) => !done[i]).map(x => x.arrival));
                timeline.push({ pid: 'IDLE', start: time, end: nextArrival });
                time = nextArrival;
                continue;
            }

            const start = time;
            time += p[idx].burst;
            timeline.push({ pid: p[idx].id, start, end: time });

            res.push({
                ...p[idx],
                start,
                completion: time,
                turnaround: time - p[idx].arrival,
                waiting: time - p[idx].arrival - p[idx].burst
            });

            done[idx] = true;
        }
        return { processes: res, timeline };
    }

    /* ================= ✅ SRTF (PREEMPTIVE SJF) ================= */
    srtfScheduling() {
        const p = [...this.processes].map(x => ({ ...x, remaining: x.burst }));
        const n = p.length;
        const timeline = [];
        let time = 0, completed = 0;
        let lastPid = null;

        while (completed < n) {
            let idx = -1, min = Infinity;

            for (let i = 0; i < n; i++) {
                if (p[i].arrival <= time && p[i].remaining > 0 && p[i].remaining < min) {
                    min = p[i].remaining;
                    idx = i;
                }
            }

            if (idx === -1) {
                if (lastPid !== 'IDLE') {
                    timeline.push({ pid: 'IDLE', start: time, end: time + 1 });
                } else {
                    timeline[timeline.length - 1].end++;
                }
                lastPid = 'IDLE';
                time++;
                continue;
            }

            if (lastPid !== p[idx].id) {
                timeline.push({ pid: p[idx].id, start: time, end: time + 1 });
            } else {
                timeline[timeline.length - 1].end++;
            }
            lastPid = p[idx].id;

            p[idx].remaining--;
            time++;

            if (p[idx].remaining === 0) {
                p[idx].completion = time;
                p[idx].turnaround = time - p[idx].arrival;
                p[idx].waiting = p[idx].turnaround - p[idx].burst;
                completed++;
            }
        }
        return { processes: p, timeline };
    }

    /* ================= PRIORITY NON-PREEMPTIVE ================= */
    priorityNonPreemptiveScheduling() {
        const p = [...this.processes];
        const n = p.length;
        const done = Array(n).fill(false);
        const res = [];
        const timeline = [];
        let time = 0;

        while (res.length < n) {
            let idx = -1, min = Infinity;

            for (let i = 0; i < n; i++) {
                if (!done[i] && p[i].arrival <= time && p[i].priority < min) {
                    min = p[i].priority;
                    idx = i;
                }
            }

            if (idx === -1) {
                const nextArrival = Math.min(...p.filter((_, i) => !done[i]).map(x => x.arrival));
                timeline.push({ pid: 'IDLE', start: time, end: nextArrival });
                time = nextArrival;
                continue;
            }

            const start = time;
            time += p[idx].burst;
            timeline.push({ pid: p[idx].id, start, end: time });

            res.push({
                ...p[idx],
                start,
                completion: time,
                turnaround: time - p[idx].arrival,
                waiting: time - p[idx].arrival - p[idx].burst
            });

            done[idx] = true;
        }
        return { processes: res, timeline };
    }

    /* ================= PRIORITY PREEMPTIVE ================= */
    priorityPreemptiveScheduling() {
        const p = [...this.processes].map(x => ({ ...x, remaining: x.burst }));
        const n = p.length;
        const timeline = [];
        let time = 0, completed = 0;
        let lastPid = null;

        while (completed < n) {
            let idx = -1, min = Infinity;

            for (let i = 0; i < n; i++) {
                if (p[i].arrival <= time && p[i].remaining > 0 && p[i].priority < min) {
                    min = p[i].priority;
                    idx = i;
                }
            }

            if (idx === -1) {
                if (lastPid !== 'IDLE') {
                    timeline.push({ pid: 'IDLE', start: time, end: time + 1 });
                } else {
                    timeline[timeline.length - 1].end++;
                }
                lastPid = 'IDLE';
                time++;
                continue;
            }

            if (lastPid !== p[idx].id) {
                timeline.push({ pid: p[idx].id, start: time, end: time + 1 });
            } else {
                timeline[timeline.length - 1].end++;
            }
            lastPid = p[idx].id;

            p[idx].remaining--;
            time++;

            if (p[idx].remaining === 0) {
                p[idx].completion = time;
                p[idx].turnaround = time - p[idx].arrival;
                p[idx].waiting = p[idx].turnaround - p[idx].burst;
                completed++;
            }
        }
        return { processes: p, timeline };
    }

    /* ================= ROUND ROBIN ================= */
    roundRobinScheduling() {
        const p = [...this.processes].map(x => ({ ...x, remaining: x.burst }));
        const n = p.length;
        const timeline = [];
        let time = 0, completed = 0;
        const q = [];
        const inQueue = Array(n).fill(false);

        // Initial processes at time 0
        p.forEach((proc, i) => {
            if (proc.arrival <= time) {
                q.push(i);
                inQueue[i] = true;
            }
        });

        while (completed < n) {
            if (q.length === 0) {
                const nextArr = Math.min(...p.filter(x => x.remaining > 0).map(x => x.arrival));
                timeline.push({ pid: 'IDLE', start: time, end: nextArr });
                time = nextArr;
                p.forEach((proc, i) => {
                    if (proc.arrival <= time && proc.remaining > 0 && !inQueue[i]) {
                        q.push(i);
                        inQueue[i] = true;
                    }
                });
                continue;
            }

            const i = q.shift();
            inQueue[i] = false;
            const exec = Math.min(this.getTimeQuantum(), p[i].remaining);

            timeline.push({ pid: p[i].id, start: time, end: time + exec });
            time += exec;
            p[i].remaining -= exec;

            // Check for new arrivals during execution
            p.forEach((proc, j) => {
                if (proc.arrival <= time && proc.remaining > 0 && !inQueue[j] && i !== j) {
                    q.push(j);
                    inQueue[j] = true;
                }
            });

            if (p[i].remaining === 0) {
                p[i].completion = time;
                p[i].turnaround = time - p[i].arrival;
                p[i].waiting = p[i].turnaround - p[i].burst;
                completed++;
            } else {
                q.push(i);
                inQueue[i] = true;
            }
        }
        return { processes: p, timeline };
    }

    /* ================= MAIN CALCULATOR ================= */
    calculateScheduling() {
        this.processes = this.parseProcesses();

        let res;
        switch (this.algorithm) {
            case 'fcfs': res = this.fcfsScheduling(); break;
            case 'sjf': res = this.sjfScheduling(); break;
            case 'srtf': res = this.srtfScheduling(); break;
            case 'priority_nonpreemptive': res = this.priorityNonPreemptiveScheduling(); break;
            case 'priority_preemptive': res = this.priorityPreemptiveScheduling(); break;
            case 'roundrobin': res = this.roundRobinScheduling(); break;
        }

        const avgWT = res.processes.reduce((s, p) => s + p.waiting, 0) / res.processes.length;
        const avgTAT = res.processes.reduce((s, p) => s + p.turnaround, 0) / res.processes.length;

        return { processes: res.processes, timeline: res.timeline, avgWaiting: avgWT, avgTurnaround: avgTAT };
    }
}

// Initialize the application
window.addEventListener('DOMContentLoaded', () => {
    const scheduler = new CPUScheduler();

    // Get DOM elements
    const algorithmSelect = document.getElementById('algorithm');
    const numProcessesInput = document.getElementById('num-processes');
    const generateBtn = document.getElementById('generate-btn');
    const sampleBtn = document.getElementById('sample-btn');
    const resetBtn = document.getElementById('reset-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const compareBtn = document.getElementById('compare-btn');

    // Set algorithm when selection changes
    algorithmSelect.addEventListener('change', () => {
        scheduler.setAlgorithm(algorithmSelect.value);
    });

    // Generate process table
    generateBtn.addEventListener('click', () => {
        const numProcesses = parseInt(numProcessesInput.value) || 4;
        generateProcessTable(numProcesses);
        document.getElementById('process-table-container').style.display = 'block';
    });

    // Load sample data
    sampleBtn.addEventListener('click', () => {
        loadSampleData();
        document.getElementById('process-table-container').style.display = 'block';
    });

    // Reset the application
    resetBtn.addEventListener('click', () => {
        resetApplication();
    });

    // Calculate scheduling
    calculateBtn.addEventListener('click', () => {
        const results = scheduler.calculateScheduling();
        displayResults(results);
    });

    // Compare all algorithms
    compareBtn.addEventListener('click', () => {
        compareAlgorithms();
    });

    // Function to generate process table
    function generateProcessTable(numProcesses) {
        const tbody = document.getElementById('process-table-body');
        tbody.innerHTML = '';

        for (let i = 0; i < numProcesses; i++) {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>P${i}</td>
                <td><input type="number" class="arrival-time" value="${i}" min="0"></td>
                <td><input type="number" class="burst-time" value="${Math.floor(Math.random() * 10) + 1}" min="1"></td>
                <td><input type="number" class="priority" value="${Math.floor(Math.random() * 10) + 1}" min="1"></td>
            `;

            tbody.appendChild(row);
        }
    }

    // Function to load sample data
    function loadSampleData() {
        document.getElementById('num-processes').value = 4;
        generateProcessTable(4);

        // Set sample values
        const rows = document.querySelectorAll('#process-table-body tr');
        const sampleData = [
            { arrival: 0, burst: 5, priority: 3 },
            { arrival: 1, burst: 3, priority: 1 },
            { arrival: 2, burst: 8, priority: 4 },
            { arrival: 3, burst: 6, priority: 2 }
        ];

        rows.forEach((row, i) => {
            const inputs = row.querySelectorAll('input');
            inputs[0].value = sampleData[i].arrival;
            inputs[1].value = sampleData[i].burst;
            inputs[2].value = sampleData[i].priority;
        });
    }

    // Function to reset application
    function resetApplication() {
        document.getElementById('process-table-container').style.display = 'none';
        document.getElementById('gantt-chart').innerHTML = '<p class="placeholder">Gantt chart will appear here after calculation</p>';
        document.getElementById('results-table-body').innerHTML = '<tr><td colspan="6" class="placeholder">Results will appear here after calculation</td></tr>';
        document.getElementById('avg-waiting-time').textContent = '-';
        document.getElementById('avg-turnaround-time').textContent = '-';
        document.getElementById('comparison-results').style.display = 'none';
    }

    // Function to display results
    function displayResults(results) {
        if (!results || !results.processes || results.processes.length === 0) {
            alert('No results to display. Please check your input data.');
            return;
        }

        // Display results in the table
        const tbody = document.getElementById('results-table-body');
        tbody.innerHTML = '';

        results.processes.forEach(process => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${process.id}</td>
                <td>${process.arrival}</td>
                <td>${process.burst}</td>
                <td>${process.completion}</td>
                <td>${process.turnaround}</td>
                <td>${process.waiting}</td>
            `;
            tbody.appendChild(row);
        });

        // Display average metrics
        document.getElementById('avg-waiting-time').textContent = results.avgWaiting.toFixed(2);
        document.getElementById('avg-turnaround-time').textContent = results.avgTurnaround.toFixed(2);

        // Generate and display Gantt chart
        generateGanttChart(results.timeline);
    }

    // Function to generate Gantt chart (Single Line)
    function generateGanttChart(timeline) {
        const ganttChart = document.getElementById('gantt-chart');
        ganttChart.innerHTML = '';

        if (!timeline || timeline.length === 0) return;

        const container = document.createElement('div');
        container.classList.add('gantt-timeline');

        // Create the Gantt bar segments
        const segmentsDiv = document.createElement('div');
        segmentsDiv.className = 'gantt-segments';

        // Create the time markers row
        const labelsDiv = document.createElement('div');
        labelsDiv.className = 'gantt-labels';

        let totalDuration = timeline[timeline.length - 1].end;

        // Add start label (0)
        const startLabel = document.createElement('span');
        startLabel.className = 'time-label';
        startLabel.textContent = '0';
        startLabel.style.left = '0%';
        labelsDiv.appendChild(startLabel);

        timeline.forEach(segment => {
            const segmentEl = document.createElement('div');
            // Calculate width considering the gaps (4px gap in CSS)
            // But for percentage alignment of labels, we use the raw duration
            const duration = segment.end - segment.start;
            const width = (duration / totalDuration) * 100;

            segmentEl.className = segment.pid === 'IDLE' ? 'gantt-segment idle' : 'gantt-segment';
            segmentEl.style.flex = `${duration}`; // Use flex instead of percentage for better gap handling
            segmentEl.style.backgroundColor = segment.pid === 'IDLE' ? '#e9ecef' : getColorForProcess(segment.pid);
            segmentEl.textContent = segment.pid === 'IDLE' ? '-' : segment.pid;
            segmentEl.title = `${segment.pid}: ${segment.start} - ${segment.end}`;
            segmentsDiv.appendChild(segmentEl);

            // Add end time label
            const label = document.createElement('span');
            label.className = 'time-label';
            label.textContent = segment.end;
            label.style.left = `${(segment.end / totalDuration) * 100}%`;
            labelsDiv.appendChild(label);
        });

        container.appendChild(segmentsDiv);
        container.appendChild(labelsDiv);
        ganttChart.appendChild(container);
    }

    // Helper function to get color for process
    function getColorForProcess(processId) {
        const colors = [
            '#4361ee', '#3f37c9', '#4895ef', '#4cc9f0',
            '#f72585', '#7209b7', '#b5179e', '#560bad',
            '#3a0ca3', '#3d348b'
        ];

        // Extract number from process ID (e.g., P0, P1, etc.)
        const num = parseInt(processId.replace(/\D/g, ''));
        return colors[num % colors.length];
    }

    // Function to compare all algorithms
    function compareAlgorithms() {
        const originalProcesses = scheduler.parseProcesses();

        if (!originalProcesses || originalProcesses.length === 0) {
            alert('Please generate or load process data first.');
            return;
        }

        const algorithms = [
            { name: 'FCFS', key: 'fcfs' },
            { name: 'SJF', key: 'sjf' },
            { name: 'SRTF', key: 'srtf' },
            { name: 'Priority (Non-preemptive)', key: 'priority_nonpreemptive' },
            { name: 'Priority (Preemptive)', key: 'priority_preemptive' },
            { name: 'Round Robin', key: 'roundrobin' }
        ];

        const comparisonResults = [];

        algorithms.forEach(algo => {
            // Temporarily set algorithm
            scheduler.algorithm = algo.key;
            scheduler.processes = originalProcesses;

            try {
                const result = scheduler.calculateScheduling();
                comparisonResults.push({
                    name: algo.name,
                    avgWaiting: result.avgWaiting,
                    avgTurnaround: result.avgTurnaround
                });
            } catch (e) {
                console.error(`Error calculating ${algo.name}:`, e);
            }
        });

        // Restore original algorithm
        scheduler.algorithm = document.getElementById('algorithm').value;

        // Display comparison results
        displayComparisonResults(comparisonResults);
    }

    // Function to display comparison results
    function displayComparisonResults(results) {
        const tbody = document.getElementById('comparison-table-body');
        tbody.innerHTML = '';

        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.name}</td>
                <td>${result.avgWaiting.toFixed(2)}</td>
                <td>${result.avgTurnaround.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById('comparison-results').style.display = 'block';
    }
});

