import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: any, res: any): Promise<void> => {
  let uploadedFilesCount = 0;
  await fs
    .access(`public/images/uploads/${req.query["setor"]}`)
    .then(() => {
      console.log("A pasta já existe.");
    })
    .catch(async () => {
      try {
        await fs.mkdir(`public/images/uploads/${req.query["setor"]}`, {
          recursive: true,
        });
        console.log("A pasta foi criada com sucesso.");
      } catch (error) {
        console.error("Erro ao criar a pasta:", error);
      }
    });

  const upload = multer({
    dest: `public/images/uploads/${req.query["setor"]}`,
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ["image/jpeg", "image/png"];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Tipo de arquivo não permitido."));
      }
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `public/images/uploads/${req.query["setor"]}`);
      },
      filename: async (req, file, cb) => {
        uploadedFilesCount++;
        const extname = path.extname(file.originalname);
        const filename = `${req.query["name"]}_${uploadedFilesCount}.png`;

        cb(null, filename);
      },
    }),
  });

  if (req.method === "POST") {
    upload.array("files", 10)(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao fazer upload dos arquivos." });
      }

      const files = req.files;

      const fileInformation = files.map((file: any) => ({
        originalFilename: file.originalname,
        savedFilename: file.filename,
      }));

      res.status(200).json({
        message: "Upload concluído com sucesso",
        files: fileInformation,
      });
    });
  } else {
    res.status(405).end();
  }
};

export default handler;
