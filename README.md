# 📚 VocaVault

> Learn English vocabulary through real videos with structured word forms and interactive lessons.

VocaVault is an open-source vocabulary learning platform designed to help learners build their English vocabulary in a practical way using videos, categorized words, and different word forms.

---

## ✨ Features

- 🔐 User Authentication
- 📚 Vocabulary Management
- 🎥 Learn from Videos
- 📝 Word Forms (Verb, Noun, Adjective...)
- 🗂 Word Categories
- 🔍 Fast Search
- 🌙 Dark Mode
- 📱 Responsive Design
- ⚡ REST API
- 🚀 Automatic Deployment with GitHub Actions

---

## 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Laravel 12
- PHP 8
- REST API

### Database

- MySQL

### Deployment

- GitHub Actions
- PM2
- Nginx
- Ubuntu
- CloudPanel

---

## 🏗 Architecture

```

Next.js Frontend
│
│ REST API
▼
Laravel Backend
│
▼
MySQL Database

```

---

## 🚀 Live Demo

Frontend

https://vocavault.ahmedmagdy.cloud

API

https://api.vocavault.ahmedmagdy.cloud

---

## 📂 Project Structure

### Frontend

```

app/
components/
contexts/
hooks/
lib/
public/

```

### Backend

```

app/
routes/
database/
app/Models/
app/Http/
resources/

```

---

## ⚙️ Getting Started

### Clone the repositories

```bash
git clone https://github.com/ahmedmagdyoff/vocavault-web.git

git clone https://github.com/ahmedmagdyoff/vocavault-api.git
```

---

### Frontend

```bash
npm install
npm run dev
```

---

### Backend

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

---

## 🚀 Deployment

The project is automatically deployed using GitHub Actions.

Deployment flow:

```

Push
↓
GitHub Actions
↓
SSH
↓
VPS
↓
Build
↓
PM2 Restart

```

---

## 🗺 Roadmap

- [x] Authentication
- [x] Video Lessons
- [x] Vocabulary Management
- [x] Word Forms
- [x] Automatic Deployment
- [ ] Quiz System
- [ ] Spaced Repetition
- [ ] Progress Tracking
- [ ] Admin Dashboard
- [ ] Mobile Application

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open an Issue or submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.