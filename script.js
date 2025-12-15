function toggleSubject(subject) {
const row = document.querySelector(`tr[data-subject="${subject}"]`);
if (row) {
row.style.display = row.style.display === 'none' ? '' : 'none';
}
}


function calculateResult() {
const rows = document.querySelectorAll('#subjectsTable tbody tr');
let total = 0;
let count = 0;


for (let row of rows) {
if (row.style.display === 'none') continue;


const inputs = row.querySelectorAll('input');
let values = [];


for (let input of inputs) {
if (input.value === '') {
alert('من فضلك املأ كل الخانات');
return;
}
values.push(Number(input.value));
}


const monitoring = (values[0] + values[1]) / 2;
const subjectAvg = monitoring * 0.4 + values[2] * 0.6;


total += subjectAvg;
count++;
}


const finalAvg = (total / count).toFixed(2);
const resultText = document.getElementById('resultText');


resultText.textContent = `معدلك هو ${finalAvg} / 20`;
document.getElementById('resultModal').style.display = 'block';
}


function closeModal() {
document.getElementById('resultModal').style.display = 'none';
}


function openStage(stage) {
alert('تم اختيار طور: ' + stage);
}