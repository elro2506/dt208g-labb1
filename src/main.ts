import './scss/styles.css'

interface courseInformation {
    courseCode: string,
    courseName: string,
    progression: "A" | "B" | "C";
    syllabus: string;
}

const formEl = document.querySelector("form") as HTMLFormElement;
const tbodyEl = document.querySelector("tbody") as HTMLTableSectionElement;
const tableEl = document.querySelector("table") as HTMLTableElement;

let courses: courseInformation[] = [];

function onAddWebsite(e: Event): void {
    e.preventDefault();

    const courseCode = (document.getElementById("courseCode") as HTMLInputElement).value;
    const courseName = (document.getElementById("courseName") as HTMLInputElement).value;
    const progression = (document.getElementById("progression") as HTMLInputElement).value as "A" | "B" | "C";
    const syllabus = (document.getElementById("syllabus") as HTMLInputElement).value;

    const course: courseInformation = {
        courseCode,
        courseName,
        progression,
        syllabus
    };

    courses.push(course);
 

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

function onDeleteRow(e: Event): void {
    const target = e.target as HTMLElement;

    if (!target.classList.contains("deleteBtn")) {
        return;
    }

    target.closest("tr")?.remove();
}

formEl.addEventListener("submit", onAddWebsite);
tableEl.addEventListener("click", onDeleteRow);

