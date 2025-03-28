"use client"

import { MediaDetails } from "@/types/index"
import { useEffect, useRef } from "react"
import Dragging from "@/hooks/useDragable"
import Resizing from "@/hooks/useResizing"
import Image from "next/image"


interface canvasProps {
    media: MediaDetails | null;
    onMediaUpdate: (media: MediaDetails | null) => void;
    isPlaying: boolean;
    currentTime: number;
    setCurrentTime: (time: number) => void;
}

export default function Canvas({
    media,
    onMediaUpdate,
    isPlaying,
    currentTime,
    setCurrentTime
}: canvasProps) {

    const mediaRef = useRef<HTMLDivElement>(null)
    const { handleMouseDown } = Dragging(mediaRef, media, onMediaUpdate)
    const { handleResizeMouseDown } = Resizing(mediaRef, media, onMediaUpdate)

    useEffect(() => {
        let animatedFrame: number;
        let startTime: number


        const updateTimer = (timeStamp: number) => {
            if (!startTime) startTime = timeStamp
            const time_pass = (timeStamp - startTime) / 1000
            setCurrentTime(time_pass)

            if (isPlaying) {
                animatedFrame = requestAnimationFrame(updateTimer)
            }

        }
        if (isPlaying) {
            animatedFrame = requestAnimationFrame(updateTimer)
        }

        return () => {
            if (animatedFrame) {
                cancelAnimationFrame(animatedFrame)
            }
        }
    }, [isPlaying, setCurrentTime])

    const isVisible = media && currentTime >= media.startTime && currentTime <= media.endTime


    return (
        <div className="h-screen bg-white relative overflow-hidden">
            {media && isVisible && (
                <div
                    ref={mediaRef}
                    className="absolute cursor-move"
                    style={{
                        left: media.position.x,
                        top: media.position.y,
                        width: media.width,
                        height: media.height,
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {media.type === "video" ? (
                        <video
                            src={media.url}
                            style={{ width: "100%", height: "100%" }}
                            controls={false}
                        />
                    ) : (
                        <Image
                            src={media.url}
                            style={{ width: "100%", height: "100%" }}
                            alt="Uploaded media"
                        />
                    )}
                    <div
                        className="absolute bottom-right w-4 h-4 bg-blue-500 cursor-se-resize"
                        onMouseDown={handleResizeMouseDown}
                    />
                </div>
            )}
        </div>
    )
}