window.addEventListener("DOMContentLoaded", (event) => {
  const button = document.querySelector("#btn");

  if (!button) {
    console.error("Button not found");
    return;
  }

  button.addEventListener("mouseover", () => {
    const audio = new Audio("/assets/fart2.MP3");
    audio.onerror = () => {
      console.error("Failed to load audio file");
    };
    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
    });
  });
});
