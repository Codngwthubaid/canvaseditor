"use client"
import { useState } from "react"
import { MediaDetails } from "@/types/index"
import Image from "next/image"
import Canvas from "@/components/canvas"
import LeftPanel from "@/components/leftPanel"

export default function App() {
  const [isSelected, setIsSelected] = useState<MediaDetails | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMediaSelect = (file: File) => {
    const url = URL.createObjectURL(file)
    setIsSelected({
      id: Date.now().toString(),
      url,
      height: 320,
      width: 720,
      position: {
        x: 100,
        y: 100
      },
      startTime: 0,
      endTime: 5,
      type: file.type.startsWith("image") ? "image" : "video"
    })
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <button
        className="md:hidden p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`${isOpen ? "block" : "hidden"
          } md:block w-full md:w-auto absolute md:static top-14 left-0 bg-gray-100 z-10`}
      >
        <button
          className="md:hidden p-2 bottom-10 relative w-full text-right"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="w-6 h-6 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <LeftPanel
          selectedMedia={isSelected}
          onMediaSelect={handleMediaSelect}
          onMediaUpdate={setIsSelected}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>

      <div className="flex-1 md:ml-64 lg:ml-80">
        <Canvas
          media={isSelected}
          onMediaUpdate={setIsSelected}
          isPlaying={isPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime} />
      </div>
    </div>
  )
}