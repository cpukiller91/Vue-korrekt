export interface SlideImage {
    ltr: string
    rtl: string
}

export interface Slide {
    title: string
    text: string
    imageClassic: SlideImage
    imageFull: SlideImage
    imageMobile: SlideImage
}
