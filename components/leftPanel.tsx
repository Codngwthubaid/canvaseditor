"use client"
import { MediaDetails } from "@/types";
import { useState, useEffect } from "react";
import { Upload, Play, Pause } from "lucide-react"
import { FileInput, Button, NumberInput } from "@mantine/core"

interface LeftPanelProps {
    selectedMedia: MediaDetails | null,
    isPlaying: boolean,
    onMediaSelect: (file: File) => void,
    onMediaUpdate: (media: MediaDetails | null) => void,
    setIsPlaying: (playing: boolean) => void
}


export default function LeftPanel({
    selectedMedia,
    onMediaSelect,
    onMediaUpdate,
    isPlaying,
    setIsPlaying
}: LeftPanelProps) {

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)


    useEffect(() => {
        if (selectedMedia) {
            setWidth(selectedMedia.width)
            setHeight(selectedMedia.height)
            setStartTime(selectedMedia.startTime)
            setEndTime(selectedMedia.endTime)
            setCurrentTime(selectedMedia.startTime || 0)
        }
    }, [selectedMedia])

    useEffect(() => {
        let intervel: NodeJS.Timeout | null = null
        if (isPlaying && selectedMedia) {
            intervel = setInterval(() => {
                setCurrentTime((prevTime) => {
                    const newTime = prevTime + 0.1;
                    if (newTime >= endTime) {
                        setTimeout(() => setIsPlaying(false), 0);
                        return endTime;
                    }
                    return newTime;
                });
            }, 100)
        }

        return () => {
            if (intervel) clearInterval(intervel)
        }
    }, [isPlaying, selectedMedia, endTime, setIsPlaying])

    const handleFileChange = (file: File | null) => {
        if (file) {
            onMediaSelect(file)
            setCurrentTime(0)
        }
    }

    const handleDimensionChange = (dimensions: "Width" | "Height", value: number | string) => {
        const newFile = typeof value === "string" ? Number(value) : 0
        if (dimensions === "Width") setWidth(newFile)
        else setHeight(newFile)

        if (selectedMedia) {
            onMediaUpdate({
                ...selectedMedia,
                [dimensions]: newFile
            })
        }
    }


    const handleTimeChange = (timeType: "startTime" | "endTime", value: number | string) => {
        const newTime = typeof value === "string" ? Number(value) : 0
        if (timeType === "startTime") setStartTime(newTime)
        else setEndTime(newTime)

        if (selectedMedia) {
            onMediaUpdate({
                ...selectedMedia,
                [timeType]: newTime
            })
        }
    }


    return (
        <div className="fixed top-0 left-0 h-full w-72 bg-gray-800 text-white p-4 overflow-y-auto">
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Media Controls</h2>

                <FileInput
                    label={<span className="text-gray-300 text-sm">Upload Media</span>}
                    placeholder="Select file"
                    rightSection={<Upload size={16} className="text-gray-400" />}
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="w-full"
                    classNames={{
                        input: "bg-gray-700 border-gray-600 text-white hover:bg-gray-600",
                        label: "mb-1",
                        placeholder: "text-gray-400",
                        wrapper: "mb-4"
                    }}
                />

                {selectedMedia && (
                    <>
                        <div className="space-y-4">
                            <NumberInput
                                label={<span className="text-gray-300 text-sm">Width</span>}
                                value={width}
                                onChange={(value) => handleDimensionChange("Width", value)}
                                min={0}
                                classNames={{
                                    input: "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-600",
                                    label: "mb-1",
                                    control: "text-gray-300 hover:bg-gray-600"
                                }}
                            />
                            <NumberInput
                                label={<span className="text-gray-300 text-sm">Height</span>}
                                value={height}
                                onChange={(value) => handleDimensionChange("Height", value)}
                                min={0}
                                classNames={{
                                    input: "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-600",
                                    label: "mb-1",
                                    control: "text-gray-300 hover:bg-gray-600"
                                }}
                            />
                        </div>

                        <div className="space-y-4">
                            <NumberInput
                                label={<span className="text-gray-300 text-sm">Start Time (seconds)</span>}
                                value={startTime}
                                onChange={(value) => handleTimeChange("startTime", value)}
                                min={0}
                                step={0.1}
                                classNames={{
                                    input: "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-600",
                                    label: "mb-1",
                                    control: "text-gray-300 hover:bg-gray-600"
                                }}
                            />
                            <NumberInput
                                label={<span className="text-gray-300 text-sm">End Time (seconds)</span>}
                                value={endTime}
                                onChange={(value) => handleTimeChange("endTime", value)}
                                min={0}
                                step={0.1}
                                classNames={{
                                    input: "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 focus:bg-gray-600",
                                    label: "mb-1",
                                    control: "text-gray-300 hover:bg-gray-600"
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <Button
                                onClick={() => setIsPlaying(!isPlaying)}
                                leftSection={isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                {isPlaying ? "Pause" : "Play"}
                            </Button>
                            <span className="text-gray-300 text-sm">
                                Time: {currentTime.toFixed(1)}s
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}

