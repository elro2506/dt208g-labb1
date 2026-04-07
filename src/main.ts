import './css/styles.css'

//Definierar hur en kurs ska vara upplagd. Vid progression krävs antingen A, B eller C
interface courseInformation {
    courseCode: string,
    courseName: string,
    progression: "A" | "B" | "C";
    syllabus: string;
}

//Hämtar elementen och berättar vad de är
const formEl = document.querySelector("form") as HTMLFormElement;
const tbodyEl = document.querySelector("tbody") as HTMLTableSectionElement;
const tableEl = document.querySelector("table") as HTMLTableElement;

//skapar en array som lagrar kurserna
let courses: courseInformation[] = [];

//Hämtar sparade kurser från localStorage
const savedCourses = localStorage.getItem("courses");
if (savedCourses) {
    courses = JSON.parse(savedCourses);

    //Skriver ut sparade kurser i tabellen
    courses.forEach(course => {
        tbodyEl.innerHTML += `
            <tr>
                <td>${course.courseCode}</td>
                <td>${course.courseName}</td>
                <td>${course.progression}</td>
                <td>${course.syllabus}</td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `;
    });
}

//När formuläret skickas så körs denna funktion
function onAddWebsite(e: Event): void {
    e.preventDefault(); //Förhindrar att sidan laddar om

    const courseCode = (document.getElementById("courseCode") as HTMLInputElement).value.trim().toUpperCase();
    const courseName = (document.getElementById("courseName") as HTMLInputElement).value;
    const progression = (document.getElementById("progression") as HTMLInputElement).value as "A" | "B" | "C";
    const syllabus = (document.getElementById("syllabus") as HTMLInputElement).value;

    //Skapar ett nytt kursobjekt i tabellen enligt interface-regler
    const course: courseInformation = {
        courseCode,
        courseName,
        progression,
        syllabus
    };

    //Validerar och kontrollerar att kursen inte redan finns. Ej känsligt för stora/små bokstäver
    if (courses.some(course => course.courseCode.toUpperCase() === courseCode)) {
        alert("Kursen finns redan!");
        return;
    }

    //Lägg till kursen i arrayen
    courses.push(course);

    //Gör så att listan blir sparad i localStorage
    localStorage.setItem("courses", JSON.stringify(courses));

//Lägger till kursen i tabellen med en DOM-manipulation
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

//Denna funktion raderar en kurs
function onDeleteRow(e: Event): void {
    const target = e.target as HTMLElement;

    //Klicket gäller delete-knappen vilken har id deleteBtn
    if (!target.classList.contains("deleteBtn")) return;

    //Hämtar raden som ska tas bort
    const row = target.closest("tr") as HTMLTableRowElement;

    //Hämtar index för raden, minus headern
    const index = row.rowIndex - 1;

    //Tar bort kursen från arrayen
    courses.splice(index, 1);

    //Uppdaterar localStorage efter detta
    localStorage.setItem("courses", JSON.stringify(courses));

    //Tar bort raden i det visuella, dvs tabellen
    row.remove();
}
//Lyssnar på submit för att lägga till kurs
formEl.addEventListener("submit", onAddWebsite);
//Lyssnar på klick för att ta bort
tableEl.addEventListener("click", onDeleteRow);

