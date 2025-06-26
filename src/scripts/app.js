// Main application logic and DOM manipulation

class CGPACalculatorApp {
    constructor() {
        this.currentMode = 'sgpa';
        this.currentBranch = '';
        this.currentSemester = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showMode('sgpa');
    }

    bindEvents() {
        // Mode switching
        document.getElementById('sgpa-mode-btn').addEventListener('click', () => {
            this.switchMode('sgpa');
        });

        document.getElementById('cgpa-mode-btn').addEventListener('click', () => {
            this.switchMode('cgpa');
        });

        // SGPA section events
        document.getElementById('branch-select').addEventListener('change', (e) => {
            this.handleBranchChange(e.target.value);
        });

        document.getElementById('semester-select').addEventListener('change', (e) => {
            this.handleSemesterChange(e.target.value);
        });

        // CGPA section events
        document.getElementById('cgpa-branch-select').addEventListener('change', (e) => {
            this.handleCGPABranchChange(e.target.value);
        });
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        const sgpaBtn = document.getElementById('sgpa-mode-btn');
        const cgpaBtn = document.getElementById('cgpa-mode-btn');
        
        if (mode === 'sgpa') {
            sgpaBtn.classList.add('active');
            sgpaBtn.classList.remove('bg-gray-300', 'text-gray-700');
            cgpaBtn.classList.remove('active');
            cgpaBtn.classList.add('bg-gray-300', 'text-gray-700');
            this.showMode('sgpa');
        } else {
            cgpaBtn.classList.add('active');
            cgpaBtn.classList.remove('bg-gray-300', 'text-gray-700');
            sgpaBtn.classList.remove('active');
            sgpaBtn.classList.add('bg-gray-300', 'text-gray-700');
            this.showMode('cgpa');
        }
    }

    showMode(mode) {
        const sgpaSection = document.getElementById('sgpa-section');
        const cgpaSection = document.getElementById('cgpa-section');

        if (mode === 'sgpa') {
            sgpaSection.classList.remove('hidden');
            cgpaSection.classList.add('hidden');
        } else {
            sgpaSection.classList.add('hidden');
            cgpaSection.classList.remove('hidden');
        }
    }

    handleBranchChange(branch) {
        this.currentBranch = branch;
        const semesterSelect = document.getElementById('semester-select');
        
        if (branch) {
            semesterSelect.disabled = false;
            semesterSelect.value = '';
            this.hideSubjectsContainer();
        } else {
            semesterSelect.disabled = true;
            semesterSelect.value = '';
            this.hideSubjectsContainer();
        }
    }

    handleSemesterChange(semester) {
        this.currentSemester = semester;
        
        if (semester && this.currentBranch) {
            this.loadSubjects(this.currentBranch, semester);
        } else {
            this.hideSubjectsContainer();
        }
    }

    loadSubjects(branch, semester) {
        const subjects = getSubjects(branch, semester);
        
        if (subjects.length > 0) {
            this.renderSubjectsTable(subjects);
            this.showSubjectsContainer();
        } else {
            this.hideSubjectsContainer();
        }
    }

    renderSubjectsTable(subjects) {
        const tableBody = document.getElementById('subjects-table-body');
        tableBody.innerHTML = '';

        subjects.forEach((subject, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-300 px-4 py-2 font-mono text-sm">${subject.code}</td>
                <td class="border border-gray-300 px-4 py-2">${subject.name}</td>
                <td class="border border-gray-300 px-4 py-2 text-center font-semibold">${subject.credits}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <input type="number" 
                           id="marks-${index}" 
                           class="w-20 p-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                           min="0" 
                           max="100" 
                           placeholder="0-100"
                           data-subject-index="${index}">
                </td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <span id="grade-${index}" class="font-semibold">-</span>
                </td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <span id="points-${index}" class="font-semibold">-</span>
                </td>
            `;
            tableBody.appendChild(row);

            // Add event listener for marks input
            const marksInput = document.getElementById(`marks-${index}`);
            marksInput.addEventListener('input', (e) => {
                this.handleMarksInput(index, e.target.value, subject);
            });
        });

        // Update total credits display
        const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
        document.getElementById('total-credits').textContent = totalCredits;
    }

    handleMarksInput(index, marks, subject) {
        const gradeSpan = document.getElementById(`grade-${index}`);
        const pointsSpan = document.getElementById(`points-${index}`);

        if (marks === '' || isNaN(marks)) {
            gradeSpan.textContent = '-';
            pointsSpan.textContent = '-';
            gradeSpan.className = 'font-semibold';
        } else {
            const numMarks = parseFloat(marks);
            if (numMarks >= 0 && numMarks <= 100) {
                const gradeInfo = getGradeInfo(numMarks);
                gradeSpan.textContent = gradeInfo.grade;
                pointsSpan.textContent = gradeInfo.points;
                gradeSpan.className = `font-semibold ${calculator.getGradeClass(gradeInfo.grade)}`;
            } else {
                gradeSpan.textContent = 'Invalid';
                pointsSpan.textContent = '-';
                gradeSpan.className = 'font-semibold text-red-500';
            }
        }

        // Recalculate SGPA
        this.calculateCurrentSGPA();
    }

    calculateCurrentSGPA() {
        const subjects = getSubjects(this.currentBranch, this.currentSemester);
        const subjectsWithMarks = [];

        subjects.forEach((subject, index) => {
            const marksInput = document.getElementById(`marks-${index}`);
            const marks = marksInput ? marksInput.value : '';
            
            subjectsWithMarks.push({
                ...subject,
                marks: marks !== '' ? parseFloat(marks) : 0
            });
        });

        const result = calculator.calculateSGPA(subjectsWithMarks);
        document.getElementById('sgpa-result').textContent = result.sgpa.toFixed(2);
    }

    showSubjectsContainer() {
        const container = document.getElementById('subjects-container');
        container.classList.remove('hidden');
        container.classList.add('fade-in');
    }

    hideSubjectsContainer() {
        const container = document.getElementById('subjects-container');
        container.classList.add('hidden');
        document.getElementById('sgpa-result').textContent = '0.00';
    }

    handleCGPABranchChange(branch) {
        const inputsContainer = document.getElementById('sgpa-inputs-container');
        
        if (branch) {
            this.renderSGPAInputs();
            inputsContainer.classList.remove('hidden');
            inputsContainer.classList.add('fade-in');
        } else {
            inputsContainer.classList.add('hidden');
            document.getElementById('cgpa-result').textContent = '0.00';
        }
    }

    renderSGPAInputs() {
        const container = document.getElementById('sgpa-inputs-container').querySelector('.grid');
        container.innerHTML = '';

        for (let sem = 1; sem <= 8; sem++) {
            const inputDiv = document.createElement('div');
            inputDiv.innerHTML = `
                <label class="block text-sm font-medium text-gray-700 mb-2">Semester ${sem}</label>
                <input type="number" 
                       id="sgpa-sem-${sem}" 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center" 
                       min="0" 
                       max="10" 
                       step="0.01"
                       placeholder="0.00-10.00">
            `;
            container.appendChild(inputDiv);

            // Add event listener for SGPA input
            const sgpaInput = document.getElementById(`sgpa-sem-${sem}`);
            sgpaInput.addEventListener('input', () => {
                this.calculateCurrentCGPA();
            });
        }
    }

    calculateCurrentCGPA() {
        const sgpaValues = [];
        
        for (let sem = 1; sem <= 8; sem++) {
            const input = document.getElementById(`sgpa-sem-${sem}`);
            if (input && input.value !== '') {
                const sgpa = parseFloat(input.value);
                if (calculator.isValidSGPA(sgpa)) {
                    sgpaValues.push(sgpa);
                }
            }
        }

        const cgpa = calculator.calculateCGPA(sgpaValues);
        document.getElementById('cgpa-result').textContent = cgpa;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CGPACalculatorApp();
});

// Add some utility functions for enhanced user experience
function clearAllInputs() {
    // Clear SGPA inputs
    const marksInputs = document.querySelectorAll('input[type="number"][id^="marks-"]');
    marksInputs.forEach(input => {
        input.value = '';
        const index = input.dataset.subjectIndex;
        const gradeSpan = document.getElementById(`grade-${index}`);
        const pointsSpan = document.getElementById(`points-${index}`);
        if (gradeSpan) gradeSpan.textContent = '-';
        if (pointsSpan) pointsSpan.textContent = '-';
    });

    // Clear CGPA inputs
    for (let sem = 1; sem <= 8; sem++) {
        const input = document.getElementById(`sgpa-sem-${sem}`);
        if (input) input.value = '';
    }

    // Reset results
    document.getElementById('sgpa-result').textContent = '0.00';
    document.getElementById('cgpa-result').textContent = '0.00';
}

// Add keyboard shortcuts for better UX
document.addEventListener('keydown', (e) => {
    // Ctrl + R to reset all inputs
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        clearAllInputs();
    }
    
    // Ctrl + S to switch to SGPA mode
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('sgpa-mode-btn').click();
    }
    
    // Ctrl + C to switch to CGPA mode
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        document.getElementById('cgpa-mode-btn').click();
    }
});