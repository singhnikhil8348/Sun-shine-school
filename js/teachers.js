const API_BASE_URL = window.API_BASE_URL || "http://localhost:5000"

function escapeHTML(value){
return String(value ?? "").replace(/[&<>"']/g, char => ({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
"\"":"&quot;",
"'":"&#39;"
}[char]))
}

fetch(`${API_BASE_URL}/api/teachers`)

.then(res=>res.json())

.then(data=>{

const container = document.getElementById("teachersContainer")

container.innerHTML=""

data.forEach(t=>{

container.innerHTML += `

<div class="bg-white p-6 rounded shadow text-center">

<img src="${API_BASE_URL}/uploads/${encodeURIComponent(t.photo)}" 
class="w-40 h-40 mx-auto object-cover rounded-full mb-4">

<h3 class="text-xl font-bold">${escapeHTML(t.name)}</h3>

<p class="text-blue-600">${escapeHTML(t.subject)}</p>

<p>${escapeHTML(t.qualification)}</p>

<p>${escapeHTML(t.experience)}</p>

</div>

`

})

})
