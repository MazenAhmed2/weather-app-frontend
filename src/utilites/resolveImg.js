import fs from "fs";
import path, { join } from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { icons } from "./iconsCodes.js";
export default async function resolveImg(iconCodes) {
  const streamPipeline = promisify(pipeline);

  for (let iconCode of Object.values(iconCodes)) {
    const dayIconUrl = `https://cdn.weatherapi.com/weather/128x128/day/${iconCode}.png`;

    const nightIconUrl = `https://cdn.weatherapi.com/weather/128x128/night/${iconCode}.png`;

    const assestsPath = path
      .join(import.meta.dirname, "..", "assests")
      .replace("file:/", "");

    const dayIconFile = fs.createWriteStream(
      path.join(assestsPath, `${iconCode}.day.png`),
    );
    const nightIconFile = fs.createWriteStream(
      path.join(assestsPath, `${iconCode}.night.png`),
    );
    const dayResponse = await fetch(dayIconUrl);
    const nightResponse = await fetch(nightIconUrl);
    await streamPipeline(dayResponse.body, dayIconFile);
    await streamPipeline(nightResponse.body, nightIconFile);
    console.log(`Done ${iconCode}`);
  }
}

resolveImg(icons);
