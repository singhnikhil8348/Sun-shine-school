async function loadNotices(){

try{

const res = await fetch("http://localhost:5000/api/notices")

const data = await res.json()

const container = document.getElementById("notices")

container.innerHTML = ""

data.forEach(n => {

container.innerHTML += `

<div class="card bg-white p-6 rounded shadow hover:shadow-lg transition">

<h3 class="text-xl font-bold text-blue-700 mb-2">
${n.title}
</h3>

<p class="text-sm text-gray-500 mb-2">
${n.date}
</p>

<p class="text-gray-700">
${n.description}
</p>

</div>

`

})

}catch(err){

console.log("Error loading notices:", err)

document.getElementById("notices").innerHTML = `
<p class="text-center text-red-500 col-span-2">
Unable to load notices
</p>
`

}

}

loadNotices()