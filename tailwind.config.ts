import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
            "./src/**/*.{js,jsx,ts,tsx}",
            "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
    colors:{
      'primary': {
        '50': '#f4f9f5',
        '100': '#e6f2e7',
        '200': '#cee4d1',
        '300': '#a7ceac',
        '400': '#79af80',
        '500': '#56915e',
        '600': '#43764a',
        '700': '#365c3b',
        '800': '#2f4c33',
        '900': '#283f2b',
        '950': '#122114',
    },
    'secondary': {
        '50': '#f9f6f3',
        '100': '#f0eae4',
        '200': '#e3d7cc',
        '300': '#cdb7a4',
        '400': '#b8967f',
        '500': '#a97d66',
        '600': '#9c6d5a',
        '700': '#82594c',
        '800': '#6a4a42',
        '900': '#573d37',
        '950': '#2e1f1c',
    },
    'white': {
      '50': '#ffffff',
      '100': '#efefef',
      '200': '#dcdcdc',
      '300': '#bdbdbd',
      '400': '#989898',
      '500': '#7c7c7c',
      '600': '#656565',
      '700': '#525252',
      '800': '#464646',
      '900': '#3d3d3d',
      '950': '#292929',
    },
    }
  },
  plugins: [],
} satisfies Config;
