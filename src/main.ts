import './scss/styles.css'

const formEl = document.querySelector("form");
      const tbodyEl = document.querySelector("tbody");
      const tableEl = document.querySelector("table");
      function onAddWebsite(e) {
        e.preventDefault();
        const courseCode = document.getElementById("courseCode").value;
        const courseName = document.getElementById("courseName").value;
        const progression = document.getElementById("progression").value;
        const syllabus = document.getElementById("syllabus").value;
        tbodyEl.innerHTML += `
            <tr>
                <td>${courseCode}</td>
                <td>${courseName}</td>
                <td>${progression}</td>
                <td>${syllabus}</td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `;
      }

      function onDeleteRow(e) {
        if (!e.target.classList.contains("deleteBtn")) {
          return;
        }

        const btn = e.target;
        btn.closest("tr").remove();
      }

      formEl.addEventListener("submit", onAddWebsite);
      tableEl.addEventListener("click", onDeleteRow);