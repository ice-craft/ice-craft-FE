import { create } from "zustand";
import { ImageState } from "../types";
import { StaticImageData } from "next/image";
import CamCheck from "@/assets/images/cam_check.png";

export const useCamClickImageState = create<ImageState>((set) => ({
  imageState: CamCheck,

  setImageState: (newImage: StaticImageData) => set({ imageState: newImage })
}));
