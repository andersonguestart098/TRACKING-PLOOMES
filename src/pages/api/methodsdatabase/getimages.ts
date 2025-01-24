import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const queryImg = req.query["img"] as string;
  const querySetor = req.query["setor"];

  res.setHeader("ngrok-skip-browser-warning", "1234");

  try {
    const imagePath = path.join(
      process.cwd(),
      `public/images/uploads/${querySetor}/${queryImg}.png`
    );

    const image = fs.readFileSync(imagePath);

    const imageBase64 = Buffer.from(image).toString("base64");
    res.json({ img: "data:image/png;base64," + imageBase64 });
  } catch (error) {
    const imageBase64 =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
    res.json({ img: imageBase64 });
  }
};
