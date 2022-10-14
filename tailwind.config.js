/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'tableImage': "url('./img/PinkBG-1080p.jpg')",
        'Bgimage': "url('./BGblue.png')",
        'tableImageTheme2': "url('./img/tableBlack.jpg')",
        'BgimageTheme2': "url('./img/blackGoldBG.jpg')",
      }
    },
  },
  plugins: [],
};
