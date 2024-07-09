function generateRandomPartner(currentPartner, selectedPartners) {
    const partners = [
      { name: "Goombella", color: "#E68362" },
      { name: "Vivian", color: "#963DA7" },
      { name: "Flurrie", color: "#B7B2E4" },
      { name: "Koops", color: "#089A20" },
      { name: "Shrimp", color: "#D74259" },
      { name: "Ms. Mowz", color: "#F32706" },
      { name: "Bobbery", color: "#112273" },
    ];

    const filteredPartners = partners.filter((partner) => {
      return partner.name !== currentPartner && selectedPartners.includes(partner.name);
    });

    if (filteredPartners.length === 0) {
      return { name: "None", color: "#000000" };
    }

    const randomIndex = Math.floor(Math.random() * filteredPartners.length);
    return filteredPartners[randomIndex];
  }

  function setRandomPartner(randomTextElement, selectedPartners) {
    const currentPartner = randomTextElement.textContent;
    const randomPartner = generateRandomPartner(currentPartner, selectedPartners);

    randomTextElement.textContent = randomPartner.name;
    randomTextElement.style.color = randomPartner.color;

    const audioElement = document.getElementById("lucky-sound");
    audioElement.play();
  }

  function setRandomTimer() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedSettings = urlParams.get('settings');
    const settings = JSON.parse(atob(encodedSettings)); // Decode the settings from Base64

    const selectedPartners = settings.partners;
    const minInterval = settings.minInterval;
    const maxInterval = settings.maxInterval;

    const randomMinutes = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
    const milliseconds = randomMinutes * 60 * 1000;
    const randomTextElement = document.getElementById("random-partner");

    if (randomTextElement.innerHTML === "") {
      setRandomPartner(randomTextElement, selectedPartners);
    }

    setTimeout(function () {
      setRandomPartner(randomTextElement, selectedPartners);

      // Reset timer after generating text
      setRandomTimer();
    }, milliseconds);
  }

  // Initialize the first random timer
  setRandomTimer();