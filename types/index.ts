export interface MediaDetails {
    id: string;
    url: string,
    height: number,
    width: number,
    position: {
        x: number,
        y: number
    },
    startTime: number,
    endTime: number,
    type: "video" | "image"
}

