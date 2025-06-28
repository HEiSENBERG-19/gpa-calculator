// Grade conversion table
const GRADE_SCALE = {
    90: { grade: 'O', points: 10 },
    80: { grade: 'A+', points: 9 },
    70: { grade: 'A', points: 8 },
    60: { grade: 'B+', points: 7 },
    55: { grade: 'B', points: 6 },
    50: { grade: 'C', points: 5 },
    40: { grade: 'P', points: 4 },
    0: { grade: 'F', points: 0 }
};

// Function to get grade and points based on marks
function getGradeInfo(marks) {
    if (marks >= 90) return GRADE_SCALE[90];
    if (marks >= 80) return GRADE_SCALE[80];
    if (marks >= 70) return GRADE_SCALE[70];
    if (marks >= 60) return GRADE_SCALE[60];
    if (marks >= 55) return GRADE_SCALE[55];
    if (marks >= 50) return GRADE_SCALE[50];
    if (marks >= 40) return GRADE_SCALE[40];
    return GRADE_SCALE[0];
}

// CSE Subjects Data
const CSE_SUBJECTS = {
    1: [
        { code: 'BMATS101', name: 'Mathematics-I for CSE Stream', credits: 4 },
        { code: 'BPHYS102', name: 'Applied Physics for CSE Stream', credits: 4 },
        { code: 'BPOPS103', name: 'Principles of Programming Using C', credits: 3 },
        { code: 'BESCK104x', name: 'Engineering Science Course-I', credits: 3 },
        { code: 'BETCK105x/BPLCK105x', name: 'Emerging Technology Course-I/Programming Languages Course-I', credits: 3 },
        { code: 'BENGK106/BPWSK106', name: 'Communicative English/Professional Writing Skills in English', credits: 1 },
        { code: 'BKSKK107/BKBKK107/BICOK107', name: 'Samskrutika Kannada/Balake Kannada/Indian Constitution', credits: 1 },
        { code: 'BIDTK158/BSFHK158', name: 'Innovation and Design Thinking/Scientific Foundations of Health', credits: 1 }
    ],
    2: [
        { code: 'BMATS201', name: 'Mathematics-II for CSE Stream', credits: 4 },
        { code: 'BCHES202', name: 'Applied Chemistry for CSE Stream', credits: 4 },
        { code: 'BCEDK203', name: 'Computer-Aided Engineering Drawing', credits: 3 },
        { code: 'BESCK204x', name: 'Engineering Science Course-II', credits: 3 },
        { code: 'BETCK205x/BPLCK205x', name: 'Emerging Technology Course-II/Programming Languages Course-II', credits: 3 },
        { code: 'BENGK206/BPWSK206', name: 'Communicative English/Professional Writing Skills in English', credits: 1 },
        { code: 'BKSKK207/BKBKK207/BICOK207', name: 'Samskrutika Kannada/Balake Kannada/Indian Constitution', credits: 1 },
        { code: 'BIDTK258/BSFHK258', name: 'Innovation and Design Thinking/Scientific Foundations of Health', credits: 1 }
    ],
    3: [
        { code: 'BCS301', name: 'Mathematics for Computer Science', credits: 4 },
        { code: 'BCS302', name: 'Digital Design & Computer Organization', credits: 4 },
        { code: 'BCS303', name: 'Operating Systems', credits: 4 },
        { code: 'BCS304', name: 'Data Structures and Applications', credits: 3 },
        { code: 'BCSL305', name: 'Data Structures Lab', credits: 1 },
        { code: 'BCS306x', name: 'ESC/ETC/PLC', credits: 3 },
        { code: 'BSCK307', name: 'Social Connect and Responsibility', credits: 1 },
        { code: 'BCS358x', name: 'Ability Enhancement Course', credits: 1 }
    ],
    4: [
        { code: 'BCS401', name: 'Analysis & Design of Algorithms', credits: 3 },
        { code: 'BCS402', name: 'Microcontrollers', credits: 4 },
        { code: 'BCS403', name: 'Database Management Systems', credits: 4 },
        { code: 'BCSL404', name: 'Analysis & Design of Algorithms Lab', credits: 1 },
        { code: 'BCS405x', name: 'ESC/ETC/PLC', credits: 3 },
        { code: 'BCS456x', name: 'Ability Enhancement Course', credits: 1 },
        { code: 'BBOC407', name: 'Biology For Computer Engineers', credits: 2 },
        { code: 'BUHK408', name: 'Universal Human Values Course', credits: 1 }
    ],
    5: [
        { code: 'BCS501', name: 'Software Engineering & Project Management', credits: 4 },
        { code: 'BCS502', name: 'Computer Networks', credits: 4 },
        { code: 'BCS503', name: 'Theory of Computation', credits: 4 },
        { code: 'BCSL504', name: 'Web Technology Lab', credits: 1 },
        { code: 'BCS515x', name: 'Professional Elective Course', credits: 3 },
        { code: 'BCS586', name: 'Mini Project', credits: 2 },
        { code: 'BRMK557', name: 'Research Methodology and IPR', credits: 3 },
        { code: 'BCS508', name: 'Environmental Studies and E-waste Management', credits: 1 }
    ],
    6: [
        { code: 'BCS601', name: 'Cloud Computing (Open Stack / Google)', credits: 4 },
        { code: 'BCS602', name: 'Machine Learning', credits: 4 },
        { code: 'BXX613x', name: 'Professional Elective Course', credits: 3 },
        { code: 'BXX654x', name: 'Open Elective Course', credits: 3 },
        { code: 'BCS685', name: 'Project Phase I', credits: 2 },
        { code: 'BCSL606', name: 'Machine Learning Lab', credits: 1 },
        { code: 'BCS657x', name: 'Ability Enhancement Course', credits: 1 }
    ],
    7: [
        { code: 'BCS701', name: 'Internet of Things', credits: 4 },
        { code: 'BCS702', name: 'Parallel Computing', credits: 4 },
        { code: 'BCS703', name: 'Cryptography & Network Security', credits: 4 },
        { code: 'BCS714x', name: 'Professional Elective Course', credits: 3 },
        { code: 'BCS755x', name: 'Open Elective Course', credits: 3 },
        { code: 'BCS786', name: 'Major Project Phase-II', credits: 6 }
    ],
    8: [
        { code: 'BCS801x', name: 'Professional Elective (Online Courses)', credits: 3 },
        { code: 'BCS802x', name: 'Open Elective (Online Courses)', credits: 3 },
        { code: 'BCS803', name: 'Internship (Industry/Research)', credits: 10 }
    ]
};

// ECE Subjects Data
const ECE_SUBJECTS = {
    1: [
        { code: 'BMATE101', name: 'Mathematics-I for EES', credits: 4 },
        { code: 'BCHEE102', name: 'Chemistry for EES Stream', credits: 4 },
        { code: 'BCEDK103', name: 'Computer-Aided Engineering Drawing', credits: 3 },
        { code: 'BESCK104x', name: 'Engineering Science Course-I', credits: 3 },
        { code: 'BETCK105x/BPLCK105x', name: 'Emerging Technology Course-I/Programming Languages Course-I', credits: 3 },
        { code: 'BENGK106/BPWSK106', name: 'Communicative English/Professional Writing Skills in English', credits: 1 },
        { code: 'BKSKK107/BKBKK107/BICOK107', name: 'Samskrutika Kannada/Balake Kannada/Indian Constitution', credits: 1 },
        { code: 'BIDTK158/BSFHK158', name: 'Innovation and Design Thinking/Scientific Foundations of Health', credits: 1 }
    ],
    2: [
        { code: 'BMATE201', name: 'Mathematics-II for EES Stream', credits: 4 },
        { code: 'BPHYE202', name: 'Applied Physics for EES Stream', credits: 4 },
        { code: 'BEEE203/BBEE203', name: 'Elements of Electrical Engineering/Basic Electronics', credits: 3 },
        { code: 'BESCK204x', name: 'Engineering Science Course-II', credits: 3 },
        { code: 'BETCK205x/BPLCK205x', name: 'Emerging Technology Course-II/Programming Languages Course-II', credits: 3 },
        { code: 'BENGK206/BPWSK206', name: 'Communicative English/Professional Writing Skills in English', credits: 1 },
        { code: 'BKSKK207/BKBKK207/BICOK207', name: 'Samskrutika Kannada/Balake Kannada/Indian Constitution', credits: 1 },
        { code: 'BIDTK258/BSFHK258', name: 'Innovation and Design Thinking/Scientific Foundations of Health', credits: 1 }
    ],
    3: [
        { code: 'BMATEC301', name: 'Mathematics-III for EC Engineering', credits: 3 },
        { code: 'BEC302', name: 'Digital System Design using Verilog', credits: 4 },
        { code: 'BEC303', name: 'Electronic Principles and Circuits', credits: 4 },
        { code: 'BEC304', name: 'Network Analysis', credits: 3 },
        { code: 'BECL305', name: 'Analog and Digital Systems Design Lab', credits: 1 },
        { code: 'BEC306x', name: 'ESC/ETC/PLC', credits: 3 },
        { code: 'BSCK307', name: 'Social Connect and Responsibility', credits: 1 },
        { code: 'BEC358x', name: 'Ability Enhancement Course', credits: 1 }
    ],
    4: [
        { code: 'BEC401', name: 'Electromagnetics Theory', credits: 3 },
        { code: 'BEC402', name: 'Principles of Communication Systems', credits: 4 },
        { code: 'BEC403', name: 'Control Systems', credits: 4 },
        { code: 'BECL404', name: 'Communication Lab', credits: 1 },
        { code: 'BEC405x', name: 'ESC/ETC/PLC', credits: 3 },
        { code: 'BEC456x', name: 'Ability Enhancement Course', credits: 1 },
        { code: 'BBOK407', name: 'Biology For Engineers', credits: 3 },
        { code: 'BUHK408', name: 'Universal Human Values Course', credits: 1 }
    ],
    5: [
        { code: 'BEC501', name: 'Technological Innovation and Management Entrepreneurship', credits: 3 },
        { code: 'BEC502', name: 'Digital Signal Processing', credits: 4 },
        { code: 'BEC503', name: 'Digital Communication', credits: 4 },
        { code: 'BECL504', name: 'Digital Communication Lab', credits: 1 },
        { code: 'BEC515x', name: 'Professional Elective Course', credits: 3 },
        { code: 'BEC586', name: 'Mini Project', credits: 2 },
        { code: 'BRMK557', name: 'Research Methodology and IPR', credits: 3 },
        { code: 'BESK508', name: 'Environmental Studies', credits: 2 }
    ],
    6: [
        { code: 'BEC601', name: 'Embedded System Design', credits: 4 },
        { code: 'BEC602', name: 'VLSI Design and Testing', credits: 4 },
        { code: 'BEC613x', name: 'Professional Elective Course', credits: 3 },
        { code: 'BEC654x', name: 'Open Elective Course', credits: 3 },
        { code: 'BEC685', name: 'Major Project Phase I', credits: 2 },
        { code: 'BECL606', name: 'VLSI Design and Testing Lab', credits: 1 },
        { code: 'BEC657x', name: 'Ability Enhancement Course', credits: 1 }
    ],
    7: [
        { code: 'BEC701', name: 'Microwave Engineering and Antenna Theory', credits: 4 },
        { code: 'BEC702', name: 'Computer Networks and Protocols', credits: 4 },
        { code: 'BEC703', name: 'Wireless Communication Systems', credits: 4 },
        { code: 'BEC714x', name: 'Professional Elective Course', credits: 3 },
        { code: 'BEC755x', name: 'Open Elective Course', credits: 3 },
        { code: 'BEC786', name: 'Major Project Phase-II', credits: 6 }
    ],
    8: [
        { code: 'BEC801x', name: 'Professional Elective (Online Courses)', credits: 3 },
        { code: 'BEC802x', name: 'Open Elective (Online Courses)', credits: 3 },
        { code: 'BEC803', name: 'Internship (Industry/Research)', credits: 10 }
    ]
};

// Function to get subjects based on branch and semester
function getSubjects(branch, semester) {
    const subjects = branch === 'cse' ? CSE_SUBJECTS : ECE_SUBJECTS;
    return subjects[parseInt(semester)] || [];
}

// Function to calculate total credits for a semester
function getTotalCredits(branch, semester) {
    const subjects = getSubjects(branch, semester);
    return subjects.reduce((total, subject) => total + subject.credits, 0);
}