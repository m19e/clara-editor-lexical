import { useRef, useEffect } from "react"
import type { ComponentProps, FC } from "react"

import { Drawer } from "react-daisyui"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"

import { VerticalPlugin } from "@/plugins/VerticalPlugin"

const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
  namespace: "ClaraEditor",
  onError: (error) => console.error(error),
}

export const Editor: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      // containerRef.current.setAttribute(
      //   "style",
      //   `
      //   height: calc(${lw}em + 7rem);
      //   line-height: ${lineHeight};
      //   font-size: ${fontSize}rem;
      //   `
      // )
    }
  }, [])

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Drawer
        side={
          <div className="prose bg-base-100 text-base-content flex h-full w-80 flex-col gap-4 overflow-y-auto p-4">
            drawer open!
          </div>
        }
        open={false}
      >
        <div className="h-full w-full">
          <div
            id="container"
            className="flex h-full w-full flex-col items-center justify-center"
          >
            <div className="w-3/4">
              <div
                className="scrollbar relative overflow-x-auto overflow-y-hidden py-14"
                ref={containerRef}
                style={{
                  height: "calc(20em + 7em)",
                  lineHeight: "1.5",
                  fontSize: "1.25rem",
                }}
              >
                <PlainTextPlugin
                  contentEditable={
                    <ContentEditable className="vertical h-full min-w-full font-serif focus:outline-none" />
                  }
                  placeholder={<Placeholder />}
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <AutoFocusPlugin defaultSelection="rootEnd" />
      <HistoryPlugin />
      <VerticalPlugin />
    </LexicalComposer>
  )
}

const Placeholder: FC = () => {
  return (
    <div className="vertical pointer-events-none absolute top-14 right-0 select-none  font-serif text-gray-500">
      執筆を始める
    </div>
  )
}
