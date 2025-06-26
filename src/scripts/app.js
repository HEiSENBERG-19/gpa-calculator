// Main application logic and DOM manipulation

class CGPACalculatorApp {
    constructor() {
        this.currentMode = 'sgpa';
        this.cgpaMode = 'bySgpa'; // 'bySgpa' or 'byMarks'
        this.currentBranch = null;
        this.currentSemester = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderSemesterButtons();
        this.updateUI();
    }

    bindEvents() {
        document.getElementById('sgpa-mode-btn').addEventListener('click', () => this.switchMode('sgpa'));
        document.getElementById('cgpa-mode-btn').addEventListener('click', () => this.switchMode('cgpa'));

        document.getElementById('cgpa-by-sgpa-btn').addEventListener('click', () => this.switchCgpaMode('bySgpa'));
        document.getElementById('cgpa-by-marks-btn').addEventListener('click', () => this.switchCgpaMode('byMarks'));

        document.getElementById('branch-buttons').addEventListener('click', (e) => {
            const btn = e.target.closest('.branch-btn');
            if (btn) {
                this.handleBranchSelect(btn.dataset.branch);
            }
        });

        document.getElementById('semester-buttons').addEventListener('click', (e) => {
            const btn = e.target.closest('.semester-btn');
            if (btn) {
                this.handleSemesterSelect(btn.dataset.semester);
            }
        });
    }

    switchMode(mode) {
        if (this.currentMode === mode) return;
        this.currentMode = mode;
        this.currentBranch = null;
        this.currentSemester = null;
        this.resetCgpaCalc();
        this.updateUI();
    }

    switchCgpaMode(mode) {
        if (this.cgpaMode === mode) return;
        this.cgpaMode = mode;
        this.resetCgpaCalc();
        this.updateUI();

        if (mode === 'byMarks' && this.currentBranch) {
            this.renderAllSemestersForCGPA();
        }
    }

    handleBranchSelect(branch) {
        if (this.currentBranch === branch) return;
        this.currentBranch = branch;
        this.currentSemester = null; // Reset semester when branch changes
        this.resetCgpaCalc();
        this.updateUI();

        if (this.currentMode === 'cgpa' && this.currentBranch) {
            if (this.cgpaMode === 'bySgpa') {
                this.renderSGPAInputs();
            } else {
                this.renderAllSemestersForCGPA();
            }
        }
    }

    handleSemesterSelect(semester) {
        if (this.currentSemester === semester) return;
        this.currentSemester = semester;
        this.updateUI();
        this.loadSubjects(this.currentBranch, this.currentSemester);
    }

    updateUI() {
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            const isActive = btn.id === `${this.currentMode}-mode-btn`;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('bg-gray-300', !isActive);
            btn.classList.toggle('text-gray-700', !isActive);
        });

        // Show/hide and update branch selection
        const branchContainer = document.getElementById('branch-selection-container');
        branchContainer.classList.remove('hidden');
        document.querySelectorAll('.branch-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.branch === this.currentBranch);
        });

        // Show/hide and update semester selection
        const semesterContainer = document.getElementById('semester-selection-container');
        const showSemester = this.currentMode === 'sgpa' && this.currentBranch;
        semesterContainer.classList.toggle('hidden', !showSemester);
        if (showSemester) semesterContainer.classList.add('fade-in');
        document.querySelectorAll('.semester-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.semester === this.currentSemester);
        });

        // Show/hide SGPA calculator
        const sgpaSection = document.getElementById('sgpa-section');
        const showSgpa = this.currentMode === 'sgpa' && this.currentBranch && this.currentSemester;
        sgpaSection.classList.toggle('hidden', !showSgpa);
        if (showSgpa) sgpaSection.classList.add('fade-in');

        // Show/hide CGPA calculator
        const cgpaSection = document.getElementById('cgpa-section');
        const showCgpa = this.currentMode === 'cgpa' && this.currentBranch;
        cgpaSection.classList.toggle('hidden', !showCgpa);
        if (showCgpa) {
            cgpaSection.classList.add('fade-in');
            this.updateCgpaModeUI();
        }
    }

    updateCgpaModeUI() {
        // Update CGPA mode buttons
        document.querySelectorAll('.cgpa-mode-btn').forEach(btn => {
            const isActive = btn.id === `cgpa-${this.cgpaMode}-btn`;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('bg-gray-300', !isActive);
            btn.classList.toggle('text-gray-700', !isActive);
        });

        // Show/hide CGPA entry containers
        const bySgpaContainer = document.getElementById('sgpa-inputs-container');
        const byMarksContainer = document.getElementById('cgpa-marks-entry-container');
        
        bySgpaContainer.classList.toggle('hidden', this.cgpaMode !== 'bySgpa');
        byMarksContainer.classList.toggle('hidden', this.cgpaMode !== 'byMarks');
    }

    renderSemesterButtons() {
        const container = document.getElementById('semester-buttons');
        container.innerHTML = '';
        for (let i = 1; i <= 8; i++) {
            const button = document.createElement('button');
            button.dataset.semester = i;
            button.className = 'semester-btn px-4 py-2 text-center bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors';
            button.textContent = `Semester ${i}`;
            container.appendChild(button);
        }
    }

    loadSubjects(branch, semester) {
        const subjects = getSubjects(branch, semester);
        this.renderSubjectsTable(subjects);
        document.getElementById('sgpa-result').textContent = '0.00';
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
            marksInput.addEventListener('input', () => {
                this.handleMarksInput(index);
            });
        });

        // Update total credits display
        const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
        document.getElementById('total-credits').textContent = totalCredits;
    }

    handleMarksInput(index) {
        const gradeSpan = document.getElementById(`grade-${index}`);
        const pointsSpan = document.getElementById(`points-${index}`);
        const marksInput = document.getElementById(`marks-${index}`);
        const marks = marksInput.value;

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

    resetCgpaCalc() {
        document.getElementById('cgpa-result').textContent = '0.00';
        document.getElementById('all-semesters-accordion').innerHTML = '';
    }

    renderAllSemestersForCGPA() {
        const accordionContainer = document.getElementById('all-semesters-accordion');
        accordionContainer.innerHTML = '';

        for (let sem = 1; sem <= 8; sem++) {
            const subjects = getSubjects(this.currentBranch, sem);
            if (subjects.length === 0) continue;

            const semElement = document.createElement('div');
            semElement.className = 'border border-gray-200 rounded-lg';
            semElement.innerHTML = this.getSemesterAccordionHTML(sem, subjects);
            accordionContainer.appendChild(semElement);

            // Add event listeners
            const header = semElement.querySelector('.accordion-header');
            const content = semElement.querySelector('.accordion-content');
            header.addEventListener('click', () => content.classList.toggle('hidden'));

            subjects.forEach((_, index) => {
                const marksInput = document.getElementById(`cgpa-marks-sem${sem}-idx${index}`);
                marksInput.addEventListener('input', () => this.calculateCGPAByMarks());
            });
        }
    }

    getSemesterAccordionHTML(sem, subjects) {
        const subjectRows = subjects.map((subject, index) => `
            <tr>
                <td class="border border-gray-300 px-2 py-2 text-sm">${subject.name}</td>
                <td class="border border-gray-300 px-2 py-2 text-center">${subject.credits}</td>
                <td class="border border-gray-300 px-2 py-2 text-center">
                    <input type="number" id="cgpa-marks-sem${sem}-idx${index}" class="w-20 p-1 border rounded text-center" min="0" max="100">
                </td>
            </tr>
        `).join('');

        return `
            <div class="accordion-header bg-gray-50 p-4 cursor-pointer flex justify-between items-center rounded-t-lg">
                <h4 class="font-semibold text-gray-700">Semester ${sem}</h4>
                <div class="flex items-center gap-4">
                    <span class="text-sm font-medium text-gray-600">SGPA: 
                        <span id="cgpa-sem-sgpa-${sem}" class="font-bold text-blue-600">0.00</span>
                    </span>
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
            <div class="accordion-content p-4 hidden">
                <table class="w-full border-collapse">
                    <thead><tr>
                        <th class="border px-2 py-2 text-left text-sm">Subject</th>
                        <th class="border px-2 py-2 text-center text-sm">Credits</th>
                        <th class="border px-2 py-2 text-center text-sm">Marks</th>
                    </tr></thead>
                    <tbody>${subjectRows}</tbody>
                </table>
            </div>
        `;
    }

    calculateCGPAByMarks() {
        const allSgpaValues = [];
        for (let sem = 1; sem <= 8; sem++) {
            const subjects = getSubjects(this.currentBranch, sem);
            if (subjects.length === 0) continue;

            const subjectsWithMarks = subjects.map((subject, index) => {
                const marksInput = document.getElementById(`cgpa-marks-sem${sem}-idx${index}`);
                const marks = marksInput ? marksInput.value : '';
                return { ...subject, marks: marks !== '' ? parseFloat(marks) : -1 };
            }).filter(s => s.marks !== -1);

            if (subjectsWithMarks.length > 0) {
                const result = calculator.calculateSGPA(subjectsWithMarks);
                document.getElementById(`cgpa-sem-sgpa-${sem}`).textContent = result.sgpa.toFixed(2);
                if (result.totalCredits > 0) {
                    allSgpaValues.push(result.sgpa);
                }
            } else {
                document.getElementById(`cgpa-sem-sgpa-${sem}`).textContent = '0.00';
            }
        }

        const cgpa = calculator.calculateCGPA(allSgpaValues);
        document.getElementById('cgpa-result').textContent = cgpa;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CGPACalculatorApp();
});