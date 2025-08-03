# 🌐 Disaster Management System (DMS) — Backend (Django + MySQL)

![Django 5](https://img.shields.io/badge/Django-5.0-092E20?logo=django&logoColor=white&style=for-the-badge)
![MySQL 9.1](https://img.shields.io/badge/MySQL-9.1-4479A1?logo=mysql&logoColor=white&style=for-the-badge)
![Python 3.13](https://img.shields.io/badge/Python-3.13.1-3776AB?logo=python&logoColor=white&style=for-the-badge)
![Postman](https://img.shields.io/badge/Tested%20with-Postman-FF6C37?logo=postman&logoColor=white&style=for-the-badge)

> 📦 **Backend completely implemented & tested** — ready for frontend integration.

---

## 🧪 Installed Libraries

```bash
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install python-decouple
pip install mysqlclient
````

These packages support:

* 🔐 JWT-based authentication
* 🔄 API routing via DRF
* 🔐 Environment variable management
* 🌐 CORS policy setup for frontend communication
* 🛢️ MySQL database integration

---

## 📊 Live Progress Tracker

| Module         | Status      |
| -------------- | ----------- |
| ✅ Backend APIs | Completed   |
| ✅ Django Admin | Completed   |
| ✅ MySQL Setup  | Connected   |
| ⏳ Frontend     | Coming Next |

---

## 🚀 Project Setup

### 🔧 Requirements

* Python 3.13+
* MySQL 8.0+ / 9.0+
* MySQL Workbench
* Postman
* Git

---

### 📥 Installation & Setup

```bash
git clone https://github.com/your-username/dms-backend.git
cd dms-backend
python -m venv env
env\Scripts\activate  # Windows
pip install -r requirements.txt  # Or use manual install as above
```

---

### ⚙️ MySQL + Django Integration

Update your `settings.py` like this:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dms_db',
        'USER': 'dms_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

---

### 🛠️ Run Core Commands

```bash
# Migrate DB
python manage.py makemigrations
python manage.py showmigrations notifications
python manage.py migrate

# Create superuser for admin panel
python manage.py createsuperuser

# Start server
python manage.py runserver
```

✅ At this point, all tables will be created and visible in MySQL Workbench under the schema `dms_db`.

---

## ✅ Completed Modules

✅ **Authentication (JWT)**
✅ **Users with Role Support**
✅ **Incidents + Filtering**
✅ **Notifications + Status**
✅ **Updates + Incident Linkage**
✅ **Authorities + Zones**
✅ **Government Bodies**
✅ **Admin Dashboard Summary API**
✅ **Django Admin Panel Setup**

---

## 🔎 API Testing

Tested with **Postman**:

* 🔐 Auth endpoints
* 🧾 Auth-protected modules
* 📡 200 OK / 401 / 403 responses
* 🔁 Relational data linking validated

---

## 🗃️ Project Structure

```plaintext
dms-backend/
├── apps/
│   ├── users/
│   ├── incidents/
│   ├── notifications/
│   ├── updates/
│   ├── authorities/
│   ├── govt_body/
│   └── admin_ops/
├── dms_core/
│   ├── settings.py
│   ├── urls.py
├── manage.py
└── requirements.txt
```

---

## 🛢️ MySQL Status

✅ `dms_db` schema created
✅ `dms_user` MySQL user added with correct privileges
✅ Tables auto-generated from Django models
✅ ORM working and relations verified

---

## 🧠 Learning Highlights

* Django 5 + MySQL connection & setup
* JWT + DRF security
* Modular architecture using Django apps
* Django admin panel usage
* CORS & Token refresh setup
* Migrations and MySQL validation

---

## 📌 Next Up: Frontend with React


# npm create vite@latest dms-frontend  -- --template react


# cd dms-frontend

# npm install axios react-router-dom@6

<!-- Remove-Item -Recurse -Force node_modules, package-lock.json
 -->

# npm install -D tailwindcss postcss autoprefixer  or   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# npx tailwindcss init -p :- 
Created tailwind.config.js
Created postcss.config.js



🛠️ Will use:

* **Vite + Tailwind CSS**
* **Axios with JWT**
* **Component-based structure**
* **Token refresh, route protection, dynamic dashboards**

📦 New README and issue tracking will begin in `frontend/` repo folder.

---

## 🪪 License

This project is open-source and available under the [MIT License](./LICENSE)

---

> Built with 💙 by [Madhav P](https://www.linkedin.com/in/madhav-p-156b9b290/)