// /** @type {import('tailwindcss').config} */

// export default{
//     content:['./index.html','./src/**/*.{vue.js.jsx,ts,tsx}'],
//     theme:{
//     extend:{
//         colors:{
//             primary:"#f59e0b",
//             secondary:"#ec4899"
//         }
//     }    
//     },
//     plugins:[]
// }

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
                primary:"#f59e0b",
                secondary:"#ec4899"
                }
      },
    },
    plugins: [],
  };
  