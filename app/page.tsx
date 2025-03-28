"use client"
import { useState } from "react"
import { MediaDetails } from "@/types/index"
import Image from "next/image"
import Canvas from "@/components/Canvas"
import LeftPanel from "@/components/leftPanel"

export default function App() {
  const [isSelected, setIsSelected] = useState<MediaDetails | null>(null)
  const [isOpen, setIsOpen] = useState(false)

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
        <Image src="/hamburger.svg" alt="Menu" width={24} height={24} />
      </button>

      <div
        className={`${isOpen ? "block" : "hidden"
          } md:block w-full md:w-auto absolute md:static top-14 left-0 bg-gray-100 z-10`}
      >
        <button
          className="md:hidden p-2 bottom-10 relative w-full text-right"
          onClick={() => setIsOpen(false)}
        >
          <Image src="/cancel.svg" alt="Close" width={24} height={24} />
        </button>
        <LeftPanel />
      </div>

      <div className="flex-1 md:ml-64 lg:ml-80">
        <Canvas />
      </div>
    </div>
  )
}