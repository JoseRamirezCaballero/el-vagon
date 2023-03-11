npx create-next-app@latest

√ What is your project named? nextjs-tailwind-pgcrud
√ Would you like to use TypeScript with this project? No
√ Would you like to use ESLint with this project? Yes
√ Would you like to use `src/` directory with this project? Yes
√ Would you like to use experimental `app/` directory with this project?  No
√ What import alias would you like configured? @/*

cd .\nextjs-tailwind-pgcrud\

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

## global.css
@tailwind base;
@tailwind components;
@tailwind utilities;

## tailwind.config
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


npm install standard -D

## .eslintrc.json
{
  "extends": ["./node_modules/standard/eslintrc.json","next/core-web-vitals"]
}
