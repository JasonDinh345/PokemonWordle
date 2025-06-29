export const playCry = (url: string, volume: number) => {
    const audio = new Audio(url);
    const result = Math.round((volume / 100) * 100) / 100;
    audio.volume = result
    audio.play().catch(console.error);
};