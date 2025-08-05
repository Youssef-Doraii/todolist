# 📝 TodoList

A modern, responsive todo list application built with **React + TypeScript**, featuring categories, sections, and visual progress tracking. This is my first React project, created during the start of my internship.

---

## 🚀 Features

- Nested structure: **Lists → Sections → Todos**
- Visual **progress indicators**
- **Dark mode** support
- **Task filtering** (All / Completed / Incomplete)
- **Responsive** UI design
- **Mock backend** with `db.json` server

---

## 🧰 Tech Stack

- **React** with **TypeScript**
- **React Query** for server state and caching
- **Vite** for bundling and fast dev environment
- **CSS** with custom theming (variables)
- **JSON Server** (`db.json`) for mock REST API

---

## 🛠️ Installation & Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/todolist.git
   cd todolist
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start JSON Server:**

   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 📁 Folder Structure (Optional)

```
src/
├── components/
├── pages/
├── hooks/
├── utils/
├── styles/
└── App.tsx
```

---

## 🙋‍♂️ Contributing

Pull requests are welcome! Feel free to fork the repo and submit improvements, new features, or fixes.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## 🧠 Lessons Learned

- Learned to structure a React project using TypeScript
- Gained experience in state management with **React Query** and `useState`
- Designed nested task organization and UI feedback systems
- Practiced responsive layout techniques and visual consistency

---

## 📌 Roadmap / TODO

- [ ] Add user authentication
- [ ] Deploy the project publicly
- [ ] Add drag-and-drop functionality
- [ ] Improve accessibility
