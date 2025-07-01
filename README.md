# SWIGGY-FIRE 🍽️

An advanced food ordering web app that replicates core functionality of Swiggy. Built using **React**, **Parcel**, and **Cloudflare Workers** to handle CORS issues seamlessly.

![Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7eaTHYrwbIDLDcu6q9UGxpa6vZ8aRoMzfQ&s)

---

## 🚀 Live Demo

[View Live App](https://swiggy-proxy.gagansalian04102005.workers.dev)

*(replace above with your deployed frontend link if you have one)*

---

## 📦 Tech Stack

- **Frontend**: React, Parcel, Tailwind CSS
- **Backend Proxy**: Cloudflare Workers
- **API**: Swiggy public APIs (proxied via Cloudflare to avoid CORS)
- **Hosting**: Cloudflare Workers, GitHub Pages (optional)

---

## ✨ Features

✅ Browse a list of restaurants based on location  
✅ Search for restaurants by name  
✅ View restaurant menus  
✅ Filter restaurants by top ratings  
✅ Fully responsive UI  
✅ Cloudflare proxy to handle CORS  
✅ Clean, modern design

---

## ⚙️ Project Structure

SWIGGY-FIRE/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ ├── hooks/
│ ├── utils/
│ ├── App.js
│ └── index.js
├── swiggy-proxy/
│ ├── wrangler.toml
│ └── src/index.js
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🛠️ How to Run Locally

Clone the repo:

```bash
git clone https://github.com/GaganSalian/SWIGGY-FIRE.git
cd SWIGGY-FIRE
npm install
npm start

