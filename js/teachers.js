fetch("http://localhost:5000/api/teachers")

.then(res=>res.json())

.then(data=>{

const container = document.getElementById("teachersContainer")

container.innerHTML=""

data.forEach(t=>{

container.innerHTML += `

<div class="bg-white p-6 rounded shadow text-center">

<img src="http://localhost:5000/uploads/${t.photo}" 
class="w-40 h-40 mx-auto object-cover rounded-full mb-4">

<h3 class="text-xl font-bold">${t.name}</h3>

<p class="text-blue-600">${t.subject}</p>

<p>${t.qualification}</p>

<p>${t.experience}</p>

</div>

`

})

})