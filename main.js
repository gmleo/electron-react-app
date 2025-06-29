const { app, BrowserWindow } = require("electron/main");
const isDev = require("electron-is-dev");
const path = require("path");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  const startURL = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  win.loadURL(startURL);

  win.on("closed", () => (win = null));
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
