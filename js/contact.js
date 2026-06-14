document.getElementById("contactForm").addEventListener("submit", async function(e){

e.preventDefault()

const data = {

name:document.getElementById("name").value,
email:document.getElementById("email").value,
phone:document.getElementById("phone").value,
message:document.getElementById("message").value

}

const API_BASE_URL = window.API_BASE_URL || "http://localhost:5000"

const res = await fetch(`${API_BASE_URL}/api/contact`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

const result = await res.json()

alert(result.message)

document.getElementById("contactForm").reset()

})
