/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],
  },
});
