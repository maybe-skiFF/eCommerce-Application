# The Best Store 🛍️🌐

The Best Store is a store that offers a wide selection of food and drinks to suit every taste. You can order urgent delivery, make a pre-order (for a specific time and date) or, after checking the availability of goods, purchase everything in our departments.

# Our purpose 🎯

Our goal is to free you from worries about food. Spend this time with your loved ones and leave all the routine to us. Our chefs are skilled, our couriers are fast, and our support is responsive.

## Our technologies ⚙️

- HTML5
  Used to host our application

---

- CSS3
  Used to decorate our application

---

- Material UI
  Used to decorate our application

---

- TypeScript
  Helps the application to be functional

```
npm run build
npm run lint
```

---

- React ⚛️
  Helps the application to be functional

---

- GitHub
  Helps our team work together no matter where they are

---

- Vite
  Will build our application
  Called:

```
npm run dev
npm run build
npm run preview
```

---

- NPM
  Will build our application

---

- Husky 🐕
  Will check our code before publishing

```
npm run prepare
```

---

- ESLint
  Will check our code before publishing

```
npm run lint
npm run pre-commit
```

---

- Prettier
  Will check our code before publishing

```
npm run format
npm run pre-commit
```

---

- Jest
  Will check our application for errors

```
npm run test
```

---

- CommerceTools 🛠️
  Provides information for our application

---

## Installation 👨‍💻

Use the package manager [npm] (https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) to install The Best Store.

```
npm install -i
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
