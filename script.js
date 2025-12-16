let currentStage = "primary";

const data = {
  primary: {
    years: {
      "تحضيري": [
        { name: "العربية", coef: 1 },
        { name: "الرياضيات", coef: 1 },
        { name: "التربية الإسلامية", coef: 1 }
      ],
      "ابتدائي 3": [
        { name: "العربية", coef: 2 },
        { name: "الرياضيات", coef: 2 },
        { name: "الفرنسية", coef: 1 },
        { name: "العلوم", coef: 1 },
        { name: "تاريخ وجغرافيا", coef: 1 },
        { name: "أمازيغية", coef: 1, optional: true },
        { name: "موسيقى", coef: 1, optional: true },
        { name: "رسم", coef: 1, optional: true }
      ]
    },
    max: 10
  },

  middle: {
    years: {
      "1 متوسط": [
        { name: "العربية", coef: 2 },
        { name: "الرياضيات", coef: 3 },
        { name: "العلوم الطبيعية", coef: 2 },
        { name: "الفيزياء", coef: 2 },
        { name: "الإعلام الآلي", coef: 1 },
        { name: "أمازيغية", coef: 1, optional: true }
      ]
    },
    max: 20
  }
};

function setStage(stage) {
  currentStage = stage;
  const yearSelect = document.getElementById("yearSelect");
  yearSelect.innerHTML = "";
  for (let year in data[stage].years) {
    yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
  }
  loadSubjects();
}

function loadSubjects() {
  const year = document.getElementById("yearSelect").value;
  const subjects = data[currentStage].years[year];
  const max = data[currentStage].max;

  let html = `<table>
    <tr>
      <th>المادة</th>
      <th>الفرض</th>
      <th>التقويم</th>
      <th>الاختبار</th>
      <th>❌</th>
    </tr>`;

  subjects.forEach((s, i) => {
    html += `
    <tr data-index="${i}">
      <td>${s.name}</td>
      <td><input type="number" min="0" max="${max}"></td>
      <td><input type="number" min="0" max="${max}"></td>
      <td><input type="number" min="0" max="${max}"></td>
      <td>${s.optional ? `<input type="checkbox">` : ""}</td>
    </tr>`;
  });

  html += "</table>";
  document.getElementById("tableContainer").innerHTML = html;
}

function calculate() {
  const rows = document.querySelectorAll("tr[data-index]");
  let total = 0;
  let coefSum = 0;

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input[type='number']");
    const skip = row.querySelector("input[type='checkbox']");

    if (skip && skip.checked) return;

    const values = [...inputs].map(i => Number(i.value));
    if (values.some(v => isNaN(v))) return;

    const avg = (values[0] + values[1] + values[2]) / 3;
    const index = row.dataset.index;
    const subject = data[currentStage].years[
      document.getElementById("yearSelect").value
    ][index];

    total += avg * subject.coef;
    coefSum += subject.coef;
  });

  if (coefSum === 0) {
    alert("أدخل النقاط أولاً");
    return;
  }

  const result = (total / coefSum).toFixed(2);
  document.getElementById("resultBox").innerText =
    `📊 معدلك هو: ${result}`;
}

setStage("primary");
