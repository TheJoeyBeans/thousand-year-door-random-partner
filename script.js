// Function to generate random text
function generateRandomPartner(currentPartner) {
  const partners = [
    { name: "Gombella", color: "#E68362" },
    { name: "Vivan", color: "#963DA7" },
    { name: "Flurrie", color: "#B7B2E4" },
    { name: "Koops", color: "#089A20" },
    { name: "Shrimp", color: "#D74259" },
  ];

  const filteredPartners = partners.filter((partner) => {
    return partner.name !== currentPartner;
  });

  const randomIndex = Math.floor(Math.random() * filteredPartners.length);
  return filteredPartners[randomIndex];
}

// Sets the random partner
function setRandomPartner(randomTextElement) {
  const currentPartner = randomTextElement.textContent;
  const randomPartner = generateRandomPartner(currentPartner);

  randomTextElement.textContent = randomPartner.name;
  randomTextElement.style.color = randomPartner.color;

  const audioElement = document.getElementById("lucky-sound");
  audioElement.play();
}

// Function to set random timer
function setRandomTimer() {
  const minInterval = 1; // Minimum interval in minutes
  const maxInterval = 5; // Maximum interval in minutes

  const randomMinutes =
    Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
  const milliseconds = randomMinutes * 60 * 1000;
  const randomTextElement = document.getElementById("random-partner");
  if (randomTextElement.innerHTML === "") {
    setRandomPartner(randomTextElement);
  }

  setTimeout(function () {
    setRandomPartner(randomTextElement);

    // Reset timer after generating text
    setRandomTimer();
  }, milliseconds);
}

// Initialize the first random timer
setRandomTimer();
