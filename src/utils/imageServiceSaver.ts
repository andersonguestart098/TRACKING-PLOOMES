import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

interface MetadataApi {
  setor: string;
}

export function SaverImage(
  req: NextApiRequest,
  res: NextApiResponse,
  metadata: MetadataApi
) {
  const uploadDir = path.join(process.cwd(), metadata.setor);
  const form = new formidable.IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Erro no upload:", err);
      res.status(500).json({ message: "Erro no servidor" });
      return;
    }
  });
}
