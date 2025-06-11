# 📚 Learning Space

**Learning Space** is a full-stack web application that helps users manage their learning process by organizing **courses**, **topics**, and **books**. Built with **Express.js**, **EJS**, **React.js**, and **MySQL**, the app combines a powerful backend with a dynamic, user-friendly frontend to support structured study and progress tracking.

---

## 🚀 Features

- 📘 Manage a list of **courses**
- 📂 Track associated **topics** for each course
- 📚 Organize **books** related to topics or courses
- 🔄 Combine server-side rendering (EJS) and dynamic frontend (React)
- 💾 Store and retrieve data from a MySQL database

---

## 🛠️ Tech Stack

| Layer      | Technology       |
|------------|------------------|
| Backend    | Express.js, EJS  |
| Frontend   | React.js         |
| Database   | MySQL            |
| Styling    | CSS / Bootstrap  |
| Runtime    | Node.js          |

---

## 📁 Project Structure

~~~
learning-space/
│
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/                # Express backend with EJS templates
│   ├── controllers/       # Route logic
│   ├── models/            # Database models
│   ├── routes/            # Express routes
│   ├── views/             # EJS templates
│   ├── app.js             # Express app entry point
│   ├── package.json
│   └── ...
│
├── books/                 # Folder for books files (ignored by Git)
├── stor/                  # Another ignored folder (e.g., storage)
├── .env                   # Environment variables (ignored)
├── .gitignore
├── README.md
└── package.json           # (optional, if root dependencies exist)
~~~

Let me know if you'd like to include database schema setup or sample screenshots!