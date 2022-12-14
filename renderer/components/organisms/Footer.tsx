/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import type { FC } from "react"
import { useMemo, Fragment } from "react"

import {
  useFontType,
  useFontSize,
  useLineHeight,
  useLineWords,
  useCharCount,
  useSelectedCharCount,
  useDisplayCharCount,
} from "@/hooks"

export const Footer: FC = () => {
  const [ft] = useFontType()

  return (
    <div className={`fixed bottom-0 w-full select-none ${ft}`}>
      <div className="group relative flex h-[4rem] flex-col items-center justify-end gap-2 p-0">
        <Control />
        <CharCount />
      </div>
    </div>
  )
}

const CharCount = () => {
  const [cc] = useCharCount()
  const [scc] = useSelectedCharCount()
  const [display] = useDisplayCharCount()

  const opacity = display ? "opacity-50" : "opacity-0"
  const selected = scc === 0 ? "" : `${scc}/`

  return (
    <span className={`text-sm ${opacity}`}>
      {selected}
      {cc}
    </span>
  )
}

interface ControlType {
  id: string
  label: string
  value: number
  inc: () => void
  dec: () => void
  disabled: { inc: boolean; dec: boolean }
}

const Control: FC = () => {
  const [ft, setFontType] = useFontType()
  const [fs, fsAction] = useFontSize()
  const [lh, lhAction] = useLineHeight()
  const [lw, lwAction] = useLineWords()

  const controlList = useMemo<ControlType[]>(() => {
    return [
      {
        id: "font-size",
        label: "大きさ",
        value: fs * 10,
        inc: fsAction.increment,
        dec: fsAction.decrement,
        disabled: {
          inc: fs >= 2.5,
          dec: fs <= 1,
        },
      },
      {
        id: "line-height",
        label: "行間",
        value: lh * 10,
        inc: lhAction.increment,
        dec: lhAction.decrement,
        disabled: {
          inc: lh >= 2.5,
          dec: lh <= 1.5,
        },
      },
      {
        id: "line-words",
        label: "字数",
        value: lw,
        inc: lwAction.increment,
        dec: lwAction.decrement,
        disabled: {
          inc: lw >= 40,
          dec: lw <= 20,
        },
      },
    ]
  }, [fs, lh, lw])

  const isMincho = ft === "mincho"

  return (
    <div
      className={`absolute -bottom-[7rem] z-20 flex w-full justify-center duration-150 hover:!bottom-0 hover:delay-300 group-hover:-bottom-[calc(7rem-1.5rem)]`}
    >
      <div className="bg-base-200 flex h-[7rem] w-full flex-col items-center">
        <div className="flex h-[1.5rem] w-16 items-center justify-center">
          <span className="h-1 w-full rounded bg-gray-400"></span>
        </div>
        <div className="mr-6 flex h-20 items-center py-1">
          <div className="nested-group flex h-full flex-col justify-end">
            <span className="whitespace-pre text-center opacity-75">
              {isMincho ? "明朝" : "ゴシック"}
            </span>
            <button
              className="ng-hover:opacity-100 opacity-0 transition-opacity"
              onClick={() =>
                setFontType((prev) => (prev === "mincho" ? "gothic" : "mincho"))
              }
            >
              <span
                className={
                  "opacity-50 hover:opacity-100 " +
                  (isMincho ? "gothic" : "mincho")
                }
              >
                {isMincho ? "ゴシック" : "明朝"}
              </span>
            </button>
          </div>
          {controlList.map((control) => (
            <Fragment key={control.id}>
              <span className="mx-3 opacity-25">・</span>
              <CountableControlBox control={control} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

const CountableControlBox: FC<{ control: ControlType }> = ({ control }) => {
  const { label, value, inc, dec, disabled } = control

  return (
    <div className="nested-group flex flex-col items-center">
      <ChevronButton type="inc" onClick={inc} disabled={disabled.inc} />
      <span className="whitespace-pre opacity-75">
        {label}
        <span className="gothic"> {value}</span>
      </span>
      <ChevronButton type="dec" onClick={dec} disabled={disabled.dec} />
    </div>
  )
}

interface ButtonProps {
  type: "inc" | "dec"
  onClick: () => void
  disabled: boolean
}

const ChevronButton: FC<ButtonProps> = ({ type, onClick, disabled }) => {
  const isUp = type === "inc"

  return (
    <button
      className="btn btn-xs btn-ghost no-animation text-base-content w-full !bg-opacity-0 text-opacity-50 transition-none hover:text-opacity-75 active:text-opacity-100"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="ng-hover:opacity-100 h-5 w-5 opacity-0 transition-opacity">
        <ChevronIcon isUp={isUp} />
      </span>
    </button>
  )
}

const ChevronIcon: FC<{
  isUp: boolean
}> = ({ isUp }) => {
  const d = isUp ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-full w-full"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}
