let currentStage = "primary";

const data = {
  primary: {
    max: 10,
    years: {
      "تحضيري": [
        { name: "العربية", coef: 1 },
        { name: "الرياضيات", coef: 1 },
        { name: "التربية الإسلامية", coef: 1 }
      ],

      "ابتدائي 1": [
        { name: "العربية", coef: 2 },
        { name: "الرياضيات", coef: 2 },
        { name: "التربية الإسلامية", coef: 1 }
      ],

      "ابتدائي 2": [
        { name: "العربية", coef: 2 },
        { name: "الرياضيات", coef: 2 },
        { name: "التربية الإسلامية", coef: 1 },
        { name: "التربية البدنية", coef: 1 }
      ],

      "ابتدائي 3": [
        { name: "العربية", coef: 2 },
        { name: "الرياضيات", coef: 2 },
        { name: "الفرنسية", coef: 1 },
        { name: "الإنجليزية", coef: 1 },
        { name: "العلوم", coef: 1 },
        { name: "تاريخ وجغرافيا", coef: 1 },
        { name: "أمازيغية", coef: 1, optional: true },
        { name: "موسيقى", coef: 1, optional: true },
        { name: "رسم", coef: 1, optional: true }
      ],

      "ابتدائي 4": "same",
      "ابتدائي 5": "same"
    }
  },

  middle: {
    max: 20,
    years: {
      "1 متوسط": [
        { name: "العربية", coef: 2 },
        { name: "الرياضيات", coef: 3 },
        { name: "العلوم الطبيعية", coef: 2 },
        { name: "الفيزياء", coef: 2 },
        { name: "التاريخ", coef: 1 },
        { name: "الجغرافيا", coef: 1 },
        { name: "الإعلام الآلي", coef: 1 },
        { name: "أمازيغية", coef: 1, optional: true }
      ],

      "2 متوسط": "same",
      "3 متوسط": "same",
      "4 متوسط": "same"
    }
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

function getSubjects(stage, year) {
  let subjects = data[stage].years[year];
  if (subjects === "same") {
    const prevYear = Object.keys(data[stage].years)
      .find(y => data[stage].years[y] !== "same");
    subjects = data[stage].years[prevYear];
  }
  return subjects;
}

function loadSubjects() {
  const year = document.getElementById("yearSelect").value;
  const subjects = getSubjects(currentStage, year);
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

  const year = document.getElementById("yearSelect").value;
  const subjects = getSubjects(currentStage, year);

  rows.forEach((row, i) => {
    const nums = row.querySelectorAll("input[type='number']");
    const skip = row.querySelector("input[type='checkbox']");

    if (skip && skip.checked) return;

    const values = [...nums].map(n => Number(n.value));
    if (values.some(v => isNaN(v))) return;

    const avg = (values[0] + values[1] + values[2]) / 3;
    total += avg * subjects[i].coef;
    coefSum += subjects[i].coef;
  });

  if (coefSum === 0) {
    alert("أدخل النقاط");
    return;
  }

  document.getElementById("resultBox").innerText =
    `📊 معدلك هو: ${(total / coefSum).toFixed(2)}`;
}

setStage("primary");
