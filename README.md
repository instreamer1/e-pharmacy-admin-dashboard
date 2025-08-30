# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


# 💊 e-pharmacy-admin-dashboard

Admin dashboard for managing e-pharmacy orders, products, and users.

---

## 🚀 Getting Started

### 1. Clone the repository


git clone https://github.com/yourusername/e-pharmacy-admin-dashboard.git
cd e-pharmacy-admin-dashboard
2. Install dependencies

npm install
3. Run the development server

npm run dev
The app will be running at http://localhost:5173

🧰 Tech Stack
React with TypeScript

Vite

Tailwind CSS (planned)

ESLint & Prettier

Optionally connected to API/backend (e.g. Node.js / Express / Firebase (planned))

💡 Features
📦 Product management (add/edit/delete)

📋 Orders overview & status updates

👤 User management

📊 Dashboard with statistics and reports

🔐 Authentication 

📱 Responsive layout

📸 Screenshots
Add screenshots here .



e-pharmacy-admin-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── utils/
│   └── main.tsx
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.ts
├── vite.config.ts
└── README.md
🧾 License
This project is licensed under the MIT License.

🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.