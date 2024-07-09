const partners = [
  { name: "Goombella", color: "#E68362" },
  { name: "Vivian", color: "#963DA7" },
  { name: "Flurrie", color: "#B7B2E4" },
  { name: "Koops", color: "#089A20" },
  { name: "Shrimp", color: "#D74259" },
  { name: "Ms. Mowz", color: "#F32706" },
  { name: "Bobbery", color: "#112273" },
];

document.addEventListener("DOMContentLoaded", function () {
  const partnerForm = document.getElementById("partner-form");

  partners.forEach((partner) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "partner";
    checkbox.value = partner.name;
    checkbox.checked = true;

    const span = document.createElement("span");
    span.textContent = partner.name;
    span.style.color = partner.color;
    span.style.textShadow = `
  -1px -1px 0 white,  
   1px -1px 0 white,
  -1px  1px 0 white,
   1px  1px 0 white
`;

    label.appendChild(checkbox);
    label.appendChild(span);
    partnerForm.appendChild(label);
    partnerForm.appendChild(document.createElement("br"));
  });

  document
    .getElementById("generate-randomizer")
    .addEventListener("click", function () {
      const selectedPartners = getSelectedPartners();
      const { minInterval, maxInterval } = getTimerIntervals();

      const settings = {
        partners: selectedPartners,
        minInterval: minInterval,
        maxInterval: maxInterval,
      };

      const encodedSettings = btoa(JSON.stringify(settings)); // Encode the settings as Base64

      const newUrl = `randomizer.html?settings=${encodedSettings}`;
      window.open(newUrl, "_blank");
    });

  function getSelectedPartners() {
    const checkboxes = document.querySelectorAll(
      "#partner-form input[type='checkbox']"
    );
    const selectedPartners = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedPartners.push(checkbox.value);
      }
    });
    return selectedPartners;
  }

  function getTimerIntervals() {
    const minInterval = parseInt(
      document.getElementById("min-interval").value,
      10
    );
    const maxInterval = parseInt(
      document.getElementById("max-interval").value,
      10
    );
    return { minInterval, maxInterval };
  }
});

