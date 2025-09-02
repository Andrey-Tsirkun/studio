import { DM_Sans, Audiowide } from "next/font/google"

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900","1000"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans"
})

export const audioWide = Audiowide({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-audio-wide",
  weight: ["400"]
})
