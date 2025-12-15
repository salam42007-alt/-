let currentStage = null;
let maxScore = 20;


const stages = {
primary: {
title: 'الطور الابتدائي',
max: 10,
subjects: {
arabic: { name: 'اللغة العربية', coef: 1 },
math: { name: 'الرياضيات', coef: 1 },
science: { name: 'العلوم', coef: 1 },
amazigh: { name: 'الأمازيغية', coef: 1 },
music: { name: 'الموسيقى', coef: 1 },
art: { name: 'الرسم', coef: 1 }
}
},
middle: {
title: 'الطور المتوسط',
max: 20,
subjects: {
arabic: { name: 'اللغة العربية', coef: 3 },
math: { name: 'الرياضيات', coef: 3 },
science: { name: 'العلوم', coef: 2 },
physics: { name: 'الفيزياء', coef: 2 },
amazigh: { name: 'الأمازيغية', coef: 1 },
music: { name: 'الموسيقى', coef: 1 },
art: { name: 'الرسم', coef: 1 }
}
}
};


function loadStage(stageKey) {
currentStage = stages[stageKey];
maxScore = currentStage.max;


document.getElementById('stageTitle').textContent = currentStage.title;


const tbody = document.querySelector('#subjectsTable tbody');
tbody.innerHTML = '';


for (let key in currentStage.subjects) {
const s = currentStage.subjects[key];
const tr = document.createElement('tr');
tr.dataset.subject = key;
tr.innerHTML = `
<td>${s.name}</td>
<td><input type="number" min="0" max="${maxScore}"></td>
<td><input type="number" min="0" max="${maxScore}"></td>
<td><input type="number" min="0" max="${maxScore}"></td>
`;
tbody.appendChild(tr);
}
}


function toggleSubject(subject) {
const row = document.querySelector(`tr[data-subject="${subject}"]`);
if (row) row.style.display = row.style.display === 'none' ? '' : 'none';
}


function calculateResult() {
if (!currentStage) {
alert('اختر الطور أولاً');
return;
}


let total = 0;
let coefSum = 0;


const rows = document.querySelectorAll('#subjectsTable tbody tr');


for (let row of rows) {
if (row.style.display === 'none') continue;


const inputs = row.querySelectorAll('input');
for (let i of inputs) {
if (i.value === '') {
alert('املأ كل الخانات');
return;
}
}


const values = [...inputs].map(i => Number(i.value));
const monitoring = (values[0] + values[1]) / 2;
const avg = monitoring * 0.4 + values[2] * 0.6;


}