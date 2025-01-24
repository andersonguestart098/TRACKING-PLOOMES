import requestApi from "~/services/requestApi";

export async function imageSuporteSetor(
  result: any,
  path: string,
  imageNotFound = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
) {
  let imgS: any = [];
  let collector: any = [];
  for (const imgSearch of result) {
    if (imgSearch.images == null) {
      imgS.push(imageNotFound);
    } else {
      let img = [];
      const imgSplit = imgSearch.images
        .replaceAll(" ", "")
        .replaceAll(".png", "")
        .split(",");
      for (const imagesCollection of imgSplit) {
        const d = await requestApi(
          `/api/methodsdatabase/getimages?setor=${path}&img=${imagesCollection}`
        );
        img.push(d.data.img);

        collector[0] = img;
      }
      imgS.push(collector[0]);
      img = [];
    }
  }
  return imgS;
}
