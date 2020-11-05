const tailwindcss = require("tailwindcss");
module.exports = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};
