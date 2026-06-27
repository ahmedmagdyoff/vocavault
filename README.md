<div align="center">

# 📚 VocaVault

### Learn English vocabulary through real videos.

An open-source English vocabulary learning platform built with **Next.js**, **Laravel**, and **MySQL**.

[🌐 Live Demo](https://vocavault.ahmedmagdy.cloud) •
[⚙️ API](https://api.vocavault.ahmedmagdy.cloud)

</div>

---

## 📖 About

VocaVault is an open-source platform that helps learners build their English vocabulary using real-world videos, categorized words, and structured word forms.

The project is split into independent repositories:

- 🖥 **Frontend** (Next.js)
- ⚙️ **Backend API** (Laravel)
- 📚 **Documentation**

---

# 📦 Repository Structure

```
VocaVault
│
├── docs/
│
├── vocavault-web/
│   └── Next.js Frontend
│
└── vocavault-api/
    └── Laravel REST API
```

---

# 🏗 Architecture

```
             Browser
                 │
                 ▼
         Next.js Frontend
                 │
             REST API
                 ▼
          Laravel Backend
                 │
                 ▼
               MySQL
```

---

# ✨ Features

- 🔐 Authentication
- 📚 Vocabulary Management
- 🎥 Video Lessons
- 📝 Word Forms
- 🗂 Categories
- 🔍 Search
- 🌙 Dark Mode
- 📱 Responsive Design
- ⚡ REST API
- 🚀 Automatic Deployment

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios

## Backend

- Laravel 12
- PHP 8

## Database

- MySQL

## Deployment

- GitHub Actions
- PM2
- Nginx
- Ubuntu
- CloudPanel

---

# 🚀 Getting Started

Clone the repository.

```bash
git clone --recursive https://github.com/ahmedmagdyoff/vocavault.git
```

If you already cloned it:

```bash
git submodule update --init --recursive
```

---

# 📂 Repositories

| Repository        | Description      |
| ----------------- | ---------------- |
| **vocavault-web** | Next.js frontend |
| **vocavault-api** | Laravel backend  |

---

# 📚 Documentation

Project documentation is available inside the **docs** directory.

```
docs/
```

---

# 🗺 Roadmap

- [x] Authentication
- [x] Vocabulary Management
- [x] Video Lessons
- [x] Categories
- [x] Word Forms
- [x] Automatic Deployment
- [ ] Quiz System
- [ ] Progress Tracking
- [ ] Mobile Application
- [ ] AI Features

---

# 🤝 Contributing

Contributions are welcome.

Please open an Issue before submitting large changes.

---

# 📄 License

This project is licensed under the MIT License.
