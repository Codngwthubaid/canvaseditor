"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { MediaDetails } from "@/types/index"

export default function Dragging(
    elementRef: React.RefObject<HTMLDivElement | null>,
    media: MediaDetails | null,
    OnMediaUpdate: (media: MediaDetails) => void
) {

    const isDragging = useRef(false)
    const startPosition = useRef({ x: 0, y: 0 })

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!media) return

        isDragging.current = true;
        startPosition.current = {
            x: event.clientX - media.position.x,
            y: event.clientY - media.position.y
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (!media || !isDragging.current) return;

            const newX = event.clientX - startPosition.current.x
            const newY = event.clientY - startPosition.current.y

            OnMediaUpdate({
                ...media,
                position: { x: newX, y: newY }
            })
        }

        const handleMouseUp = () => {
            isDragging.current = false
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    }, [media, OnMediaUpdate])
    return { isDragging: isDragging.current, handleMouseDown }
}