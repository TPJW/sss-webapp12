# Sustainability Strategy Selector (SSS) - Startup Guide

Welcome to the Sustainability Strategy Selector web app! Because this project is shared as source code (and ignores large dependency folders like `node_modules` via `.gitignore`), you'll need to set up a few things on your computer to run it locally.

## 1. Install Node.js
This application runs on **Node.js**, which also includes `npm` (Node Package Manager).
- Download the **LTS (Long Term Support)** version for your operating system from the official website: [https://nodejs.org/](https://nodejs.org/)
- Run the installer and follow the default prompts. 
- *To verify the installation:* Open your terminal (Command Prompt, PowerShell, or Terminal on Mac) and type `node -v` and `npm -v`. Both should return version numbers.

## 2. Install Project Dependencies
Because the `.gitignore` file intentionally leaves out the bulky `node_modules` folder, you need to download the required code libraries yourself.
1. Open your terminal and navigate to this `sss-webapp` folder. 
   *(Tip: On Windows, you can open the folder in File Explorer, click the top address bar, type `cmd`, and hit Enter).*
2. Run the following command:
   ```bash
   npm install
   ```
   *This will read the `package.json` file and download all necessary packages into a new `node_modules` folder. It may take a minute.*

## 3. Run the Application
Once the installation is complete, start the local development server:
1. In the same terminal window, run:
   ```bash
   npm run dev
   ```
2. The terminal will output a local web address (usually `http://localhost:5173/`).
3. **Ctrl + Click** (or Cmd + Click on Mac) that link, or copy and paste it into your web browser.

You're all set! The web app should now be running on your computer.

---

### Modifying the Content (For Landscape Architects)
If you want to update the questions, weights, or project details, you do not need to touch the code. Just edit these files in the `src/data/` folder:
- **`projectInfo.json`**: Update the client name, architect info, and project numbers.
- **`siteSystems.json`**: Update the prompt questions, available options (Baseline, Enhanced, High Performance), descriptions, and their radar weights.
- **`radarAxes.json`**: Modify the labels that appear on the final review chart.
