class GradeCalculator {
    constructor() {
        this.currentSubjects = [];
        this.sgpaHistory = [];
    }

    // Calculate SGPA for given subjects and marks
    calculateSGPA(subjectsWithMarks) {
        let totalGradePoints = 0;
        let totalCredits = 0;
        let results = [];

        subjectsWithMarks.forEach(subject => {
            const marks = parseFloat(subject.marks) || 0;
            const gradeInfo = getGradeInfo(marks);
            const gradePoints = gradeInfo.points * subject.credits;

            totalGradePoints += gradePoints;
            totalCredits += subject.credits;

            results.push({
                ...subject,
                marks: marks,
                grade: gradeInfo.grade,
                gradePoints: gradeInfo.points,
                totalGradePoints: gradePoints
            });
        });

        const sgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

        return {
            subjects: results,
            totalCredits: totalCredits,
            totalGradePoints: totalGradePoints,
            sgpa: parseFloat(sgpa)
        };
    }

    // Calculate CGPA from array of SGPA values
    calculateCGPA(sgpaValues) {
        const validSgpas = sgpaValues.filter(sgpa => !isNaN(sgpa) && sgpa > 0);
        
        if (validSgpas.length === 0) {
            return 0;
        }

        const total = validSgpas.reduce((sum, sgpa) => sum + parseFloat(sgpa), 0);
        return (total / validSgpas.length).toFixed(2);
    }

    // Validate marks input
    isValidMarks(marks) {
        const numMarks = parseFloat(marks);
        return !isNaN(numMarks) && numMarks >= 0 && numMarks <= 100;
    }

    // Validate SGPA input
    isValidSGPA(sgpa) {
        const numSgpa = parseFloat(sgpa);
        return !isNaN(numSgpa) && numSgpa >= 0 && numSgpa <= 10;
    }

    // Get grade class for styling
    getGradeClass(grade) {
        const gradeClasses = {
            'O': 'grade-o',
            'A+': 'grade-a-plus',
            'A': 'grade-a',
            'B+': 'grade-b-plus',
            'B': 'grade-b',
            'C': 'grade-c',
            'P': 'grade-p',
            'F': 'grade-f'
        };
        return gradeClasses[grade] || '';
    }

    // Calculate grade distribution (for future analytics)
    getGradeDistribution(subjects) {
        const distribution = {
            'O': 0, 'A+': 0, 'A': 0, 'B+': 0,
            'B': 0, 'C': 0, 'P': 0, 'F': 0
        };

        subjects.forEach(subject => {
            if (subject.grade) {
                distribution[subject.grade]++;
            }
        });

        return distribution;
    }

    // Get performance insights
    getPerformanceInsights(sgpa) {
        if (sgpa >= 9.5) {
            return {
                level: 'Outstanding',
                message: 'Excellent performance! Keep it up!',
                color: 'text-green-600'
            };
        } else if (sgpa >= 8.5) {
            return {
                level: 'Very Good',
                message: 'Great work! You\'re doing very well.',
                color: 'text-blue-600'
            };
        } else if (sgpa >= 7.5) {
            return {
                level: 'Good',
                message: 'Good performance. Keep improving!',
                color: 'text-indigo-600'
            };
        } else if (sgpa >= 6.5) {
            return {
                level: 'Above Average',
                message: 'You can do better. Focus on improvement.',
                color: 'text-yellow-600'
            };
        } else if (sgpa >= 5.5) {
            return {
                level: 'Average',
                message: 'Need more effort. Plan your studies better.',
                color: 'text-orange-600'
            };
        } else {
            return {
                level: 'Below Average',
                message: 'Significant improvement needed. Seek help if required.',
                color: 'text-red-600'
            };
        }
    }

    // Reset calculator state
    reset() {
        this.currentSubjects = [];
        this.sgpaHistory = [];
    }
}

// Create global calculator instance
const calculator = new GradeCalculator();