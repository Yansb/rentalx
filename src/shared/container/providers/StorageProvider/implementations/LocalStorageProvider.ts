import { IStorageProvider } from "../IStorageProvider";
import fs from "fs";
import { resolve } from "path";
import upload from "@config/upload";

export class LocalStorageProvider implements IStorageProvider {
  async saveFile(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }
  async deleteFile(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filename);
  }
}
