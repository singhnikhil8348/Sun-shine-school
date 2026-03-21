# 🎓 Sun Shine Public School Website

A full-stack school management website built using **Node.js, Express, MongoDB** and a responsive **HTML, CSS, JavaScript frontend**.

---

## 🚀 Features

### 👨‍🎓 User Side
- Admission Form Submission
- View Notices
- Gallery Section
- Teachers Information
- Contact Form

### 🔐 Admin Panel
- Admin Login
- Add / Delete Notices
- View Admission Requests
- Manage Teachers (Add/Delete)
- Upload & Manage Gallery Images
- View Contact Messages
- Update Website Stats (Students, Teachers, etc.)

---

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3 (Tailwind CSS)
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Mongoose)

---

## Project Structure

## 📁 Project Structure

Sun-shine-school/
│
├── routes/ # API routes
├── models/ # MongoDB models
├── uploads/ # Uploaded images
├── public/ or frontend files (HTML/CSS/JS)
│
├── server.js # Main backend file
├── package.json
└── README.md

---

## ⚙️ Installation & Setup (Run Locally)

### 1️⃣ Clone the Repository

git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

cd YOUR-REPO-NAME

---

### 2️⃣ Install Dependencies


npm install


---

### 3️⃣ Start MongoDB

Make sure MongoDB is running locally:

mongodb://127.0.0.1:27017/schoolDB


---

### 4️⃣ Run the Server

node server.js

Server will start at :

http://localhost:5000


---

### 5️⃣ Run Frontend

- Open `index.html` directly  
OR  
- Use **Live Server (VS Code Extension)**

---

## 🌐 API Endpoints

### Admissions
- `POST /api/apply`
- `GET /api/admissions`

### Notices
- `POST /api/add-notice`
- `GET /api/notices`
- `DELETE /api/delete-notice/:id`

### Teachers
- `POST /api/add-teacher`
- `GET /api/teachers`
- `DELETE /api/delete-teacher/:id`

### Gallery
- `POST /api/upload-image`
- `GET /api/gallery`
- `DELETE /api/delete-image/:id`

### Contact
- `POST /api/contact`
- `GET /api/contact`

### Stats
- `GET /api/stats`
- `POST /api/update-stats`

---

## 🔐 Admin Access

Admin panel is handled via frontend login system.

👉 Open:

admin.html


---

## ⚠️ Important Notes

- Do NOT upload:
  - `node_modules/`
  - `.env`
  - `uploads/` (optional)

- Backend must be running for full functionality.

---

## 🚀 Future Improvements

- Deploy backend (Render / Railway)
- Connect frontend with live APIs
- Add authentication (JWT)
- Improve UI/UX
- Add search & filters

---

## 👨‍💻 Author

Developed by **Nikhil Singh**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
