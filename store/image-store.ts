import { create } from "zustand";
import { ImageState } from "../types";
import { StaticImageData } from "next/image";
import CamCheck from "@/assets/images/cam_check.svg";

const useCamClickImageState = create<ImageState>((set) => ({
  imageState: CamCheck as StaticImageData | null,
  setImageState: (newImage: StaticImageData | null) => set({ imageState: newImage })
}));

export const useJobImageState = () => useCamClickImageState((state) => state.imageState);
export const useJobImageAction = () => useCamClickImageState((state) => state.setImageState);
