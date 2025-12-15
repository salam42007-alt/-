let currentStage = null;
let currentYear = null;
let maxScore = 20;

const stages = {
  primary: {
    max: 10,
    years: {
      prep: ['رياضيات','عربية','اسلامية'],
      1: ['عربية','رياضيات','اسلامية'],
      2: ['عربية','اسلامية','بدنية','رياضيات'],
      3: ['فرنسية','انجليزية','عربية','رياضيات','بدنية','رسم','امازيغية','موسيقى','تاريخ وجغرافيا','علمية'],
      4: ['فرنسية','انجليزية','عربية','رياضيات','بدنية','رسم','امازيغية','موسيقى','تاريخ وجغرافيا','علمية'],
      5: ['فرنسية','انجليزية','عربية','رياضيات','بدنية','رسم','امازيغية','موسيقى','تاريخ وجغرافيا','علمية']
    }
  },
  middle: {
    max: 20,
    years: {
      1: ['فرنسية','انجليزية','عربية','رياضيات','بدنية','رسم','امازيغية','موسيقى','تاريخ وجغرافيا','علمية','العلوم الطبيعية','الفيزياء','الإعلام الآلي'],
      2: ['فرنسية','انجليزية','عربية','رياضيات','بدنية','رسم','امازيغية','موسيقى','تاريخ وجغرافيا','علمية','العلوم الطبيعية','الفيزياء','الإعلام الآلي'],
      3: ['فرنسية','انجليزية','عربية','رياضيات','بدنية','رسم','امازيغية','موسيقى','تاريخ وجغرافيا','علمية','العلوم الطبيعية','الفيزياء','الإعلام الآلي'],
      4: ['فرنسية','انجليزية','عربية','رياضيات','بدنية','رسم','امازيغية','موسيقى','تاريخ وجغرافيا','علمية','العلوم الطبيعية','الفيزياء','الإعلام الآلي']
    }
  }
};

function loadStage(stageKey, year) {
  currentStage = stages[stageKey];
  currentYear = year;
  maxScore = currentStage.max;

  document.getElementById('stageTitle').textContent = `الطور: ${stageKey} - السنة: ${year}`;

  const tbody = document.querySelector('#subjectsTable tbody');
  tbody.innerHTML = '';

  const subjects = currentStage.years[year];
  for (let subj of subjects) {
    const tr = document.createElement('tr');
    tr.dataset.subject = subj;
    tr.innerHTML = `
      <td>${subj}</td>
      <td><input type="number" min="0" max="${maxScore}"></td>
      <td><input type="number" min="0" max="${maxScore}"></td>
      <td><input type="number" min="0" max="${maxScore}"></td>
    `;
    tbody.appendChild(tr);
  }
}

function toggleSubject(subject) {
  const row = Array.from(document.querySelectorAll('#subjectsTable tbody tr')).find(r => r.dataset.subject === subject);
  if (row) row.style.display = row.style.display === 'none' ? '' : 'none';
}

function calculateResult() {
  if (!currentStage) { alert('اختر الطور أولاً'); return; }

  let total = 0;
  let coefSum = 0;

  const rows = document.querySelectorAll('#subjectsTable tbody tr');
  for (let row of rows) {
    if (row.style.display === 'none') continue;

    const inputs = row.querySelectorAll('input');
    for (let i of inputs) {
      if (i.value === '') { alert('املأ كل الخانات'); return; }
    }

    const values = [...inputs].map(i => Number(i.value));
    const monitoring = (values[0] + values[1]) / 2;
    const avg = monitoring * 0.4 + values[2] * 0.6;

    const key = row.dataset.subject;
    const coef = 1; // معاملات مخفية يمكن تعديلها لكل مادة وسنة
    total += avg * coef;
    coefSum += coef;
  }

  const finalAvg = (total / coefSum).toFixed(2);
  document.getElementById('resultText').textContent = `معدلك هو ${finalAvg} / ${maxScore}`;
  document.getElementById('resultModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('resultModal').style.display = 'none';
}
