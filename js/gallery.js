/* =========================
   LOAD GALLERY FROM SERVER
========================= */

const API_BASE_URL = window.API_BASE_URL || "http://localhost:5000"

fetch(`${API_BASE_URL}/api/gallery`)

.then(res => res.json())

.then(data => {

const container = document.getElementById("gallery")

container.innerHTML=""

data.forEach(img => {

container.innerHTML += `

<img src="${API_BASE_URL}/uploads/${encodeURIComponent(img.image)}" 
class="gallery-img rounded shadow cursor-pointer">

`

})

enableLightbox()

})


/* =========================
   IMAGE LIGHTBOX
========================= */

function enableLightbox(){

document.querySelectorAll(".gallery-img").forEach(img => {

img.addEventListener("click", () => {

const overlay = document.createElement("div")

overlay.style.position = "fixed"
overlay.style.top = "0"
overlay.style.left = "0"
overlay.style.width = "100%"
overlay.style.height = "100%"
overlay.style.background = "rgba(0,0,0,0.85)"
overlay.style.display = "flex"
overlay.style.alignItems = "center"
overlay.style.justifyContent = "center"
overlay.style.zIndex = "2000"

const image = document.createElement("img")

image.src = img.src
image.style.maxWidth = "90%"
image.style.maxHeight = "90%"
image.style.borderRadius = "10px"
image.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)"

overlay.appendChild(image)

overlay.addEventListener("click", () => {
overlay.remove()
})

document.body.appendChild(overlay)

})

})

}
