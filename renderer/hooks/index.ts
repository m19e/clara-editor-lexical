import { useRecoilState } from "recoil"

import {
  fontTypeState,
  fontSizeState,
  lineHeightState,
  lineWordsState,
} from "@/store"

type ReturnType = [number, { increment: () => void; decrement: () => void }]

export const useFontType = () => useRecoilState(fontTypeState)

export const useFontSize = (): ReturnType => {
  const [fs, setFS] = useRecoilState(fontSizeState)
  const increment = () => setFS((prev) => prev + 0.1)
  const decrement = () => setFS((prev) => prev - 0.1)

  return [fs, { increment, decrement }]
}

export const useLineHeight = (): ReturnType => {
  const [lh, setLH] = useRecoilState(lineHeightState)
  const increment = () => setLH((prev) => prev + 0.1)
  const decrement = () => setLH((prev) => prev - 0.1)

  return [lh, { increment, decrement }]
}

export const useLineWords = (): ReturnType => {
  const [lw, setLW] = useRecoilState(lineWordsState)
  const increment = () => setLW((prev) => prev + 1)
  const decrement = () => setLW((prev) => prev - 1)

  return [lw, { increment, decrement }]
}