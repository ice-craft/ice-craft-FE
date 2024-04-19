import { create } from "zustand";
import { ImageState } from "../types";
import { StaticImageData } from "next/image";
import CamCheck from "@/assets/images/cam_check.svg";

export const useCamClickImageState = create<ImageState>((set) => ({
  imageState: CamCheck as StaticImageData | null,

  setImageState: (newImage: StaticImageData | null) => set({ imageState: newImage })
}));
