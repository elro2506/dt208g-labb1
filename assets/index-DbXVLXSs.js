(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`form`),t=document.querySelector(`tbody`),n=document.querySelector(`table`),r=[],i=localStorage.getItem(`courses`);i&&(r=JSON.parse(i),r.forEach(e=>{t.innerHTML+=`
            <tr>
                <td>${e.courseCode}</td>
                <td>${e.courseName}</td>
                <td>${e.progression}</td>
                <td>${e.syllabus}</td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `}));function a(e){e.preventDefault();let n=document.getElementById(`courseCode`).value.trim().toUpperCase(),i=document.getElementById(`courseName`).value,a=document.getElementById(`progression`).value,o=document.getElementById(`syllabus`).value,s={courseCode:n,courseName:i,progression:a,syllabus:o};if(r.some(e=>e.courseCode.toUpperCase()===n)){alert(`Kursen finns redan!`);return}r.push(s),localStorage.setItem(`courses`,JSON.stringify(r)),t.innerHTML+=`
            <tr>
                <td>${n}</td>
                <td>${i}</td>
                <td>${a}</td>
                <td>${o}</td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `}function o(e){let t=e.target;if(!t.classList.contains(`deleteBtn`))return;let n=t.closest(`tr`),i=n.rowIndex-1;r.splice(i,1),localStorage.setItem(`courses`,JSON.stringify(r)),n.remove()}e.addEventListener(`submit`,a),n.addEventListener(`click`,o);