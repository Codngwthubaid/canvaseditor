"use client"
import { MediaDetails } from "@/types"
import React, { useState, useEffect, useRef, useCallback } from "react"
export default function Resizing(
    media: MediaDetails | null,
    OnMediaUpdate: (media: MediaDetails | null) => void
) {

    const isResizing = useRef(false)
    const startSize = useRef({ Width: 0, Height: 0 })
    const startPosition = useRef({ x: 0, y: 0 })

    const handleResizeMouseDown = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation()
            if (!media) return;

            // setting the size and position of the media by user
            isResizing.current = true;
            startSize.current = {
                Width: media.width,
                Height: media.height
            },
                startPosition.current = {
                    x: event.clientX,
                    y: event.clientY
                }

            // function for setting the width and height for media 
            const handleMouseMove = (event: MouseEvent) => {
                if (!media || !isResizing.current) return;

                const deltaX = event.clientX - startPosition.current.x;
                const deltaY = event.clientY - startPosition.current.y

                const newWidth = Math.max(50, startSize.current.Width + deltaX)
                const newHeight = Math.max(50, startPosition.current.y + deltaY)

                OnMediaUpdate({
                    ...media,
                    width: newWidth,
                    height: newHeight
                })
            }

            // function for setting the mouse movement 
            const handleMouseUp = () => {
                isResizing.current = false;
                document.addEventListener("mousemove", handleMouseMove)
                document.addEventListener("mouseup", handleMouseUp)
            }
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        },
        [media, OnMediaUpdate]
    )

    return { isResizing: isResizing.current, handleResizeMouseDown }
}