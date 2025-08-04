export const playAudio = (path) => {
  const audio = new Audio(path); // Ensure your files are in public/audio
  audio.play().catch((error) => console.error("Audio play failed:", error));
};
