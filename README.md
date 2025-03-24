# ChatterBox 💬

**ChatterBox** is a sleek, real-time chat application built using **React**, **Node.js**, and **Stream Chat API**, designed with elegant UI/UX and responsive layouts. It supports real-time messaging, threads, reactions, user authentication, and more.

---

### 🔗 Live Demo

- **Frontend**: [ChatterBox Frontend](https://uynvu078.github.io/ChatterBox/)
- **Backend**: [ChatterBox Backend](https://chatterbox-p9vd.onrender.com)

---

### 🚀 Features

- Real-time messaging (powered by Stream Chat)  
- Login & signup functionality  
- Create/edit/delete group channels  
- Start direct messages (1-on-1 only)  
- Leave or delete chats  
- Responsive design (mobile sidebar, smooth transitions)  
- Styled with a soft, elegant UI theme  
- Typing indicator, reactions, and message threads

---

### 🛠️ Tech Stack

- **Frontend**: React, CSS Modules, Stream Chat React
- **Backend**: Node.js, Express, Stream Chat Server SDK
- **Deployment**:
  - Frontend: GitHub Pages
  - Backend: Render

---

### Screenshots

| Desktop View | Mobile View |
|--------------|-------------|
| ![desktop](screenshots/desktop.png) | ![mobile](screenshots/mobile.png) |

---

### ⚙️ Installation (Local)

#### 1. Clone the repository

```bash
git clone https://github.com/uynvu078/ChatterBox.git
cd ChatterBox
```

#### 2. Install dependencies

```bash
# For frontend
cd client
npm install

# For backend
cd ../server
npm install
```

#### 3. Add `.env` files

- In `/client`:
  ```
  REACT_APP_STREAM_KEY=your_stream_app_key
  REACT_APP_API_URL=http://localhost:5000
  ```

- In `/server`:
  ```
  STREAM_API_KEY=your_stream_app_key
  STREAM_API_SECRET=your_stream_secret
  ```

#### 4. Start the servers

```bash
# Backend (port 5000)
cd server
node index.js

# Frontend (port 3000)
cd ../client
npm start
```

---

### License

This project is open-source and available under the [MIT License](LICENSE).

---

> *“Built with purpose — ChatterBox connects more than just messages. 💬”*
