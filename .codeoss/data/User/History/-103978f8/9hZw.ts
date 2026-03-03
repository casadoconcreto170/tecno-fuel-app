import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log("Iniciando servidor Tecno Concreto...");
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEinurvieXbEB45oiW0eQd5p_QEiasoLeR9uC8b1wjCSh0kJULtbM3EmwzUfA_DT42Kg/exec";

  app.get("/api/sheet-data", async (req, res) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const sheetData: any = await response.json();
      res.json(sheetData);
    } catch (error) {
      console.error("Erro ao buscar planilha:", error);
      res.status(500).json({ error: "Erro ao conectar com a planilha" });
    }
  });

  app.post("/api/sync", async (req, res) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(req.body),
      });
      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error("Erro ao sincronizar:", error);
      res.status(500).json({ error: "Erro ao salvar na planilha" });
    }
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer();