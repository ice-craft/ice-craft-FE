import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    { path: "./PretendardVariable.otf", weight: "400 700" },
    { path: "./Pretendard-Regular.woff", weight: "400" },
    { path: "./Pretendard-Bold.woff", weight: "700" }
  ],
  display: "swap"
});

export const designer = localFont({
  src: "./Designer.otf",
  display: "swap",
  weight: "400 700"
});
