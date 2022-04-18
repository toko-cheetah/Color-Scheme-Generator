document.getElementById("color-picker").addEventListener("submit", (event) => {
  event.preventDefault();
  const pickedColor = document.getElementById("eye-dropper").value;
  const selectedMode = document.getElementById("select-menu").value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${pickedColor.slice(
      1
    )}&mode=${selectedMode}&count=4`
  )
    .then((response) => response.json())

    .then((data) => {
      const returnedColors = data.colors.map((num) => num.hex.value);

      document.getElementById("colors-result").innerHTML = colorPalette(
        pickedColor,
        returnedColors
      );
    });
});

function colorPalette(firstColor, otherColors) {
  const arr = [div(firstColor)];

  for (let color of otherColors) {
    arr.push(div(color));
  }

  return arr.join("");
}

function div(item) {
  item = item.toUpperCase();

  return `
    <div style="background: ${item};" onclick="copyHex('${item}')">
      <div class="copied-hex" id="hex-${item.slice(1).toLowerCase()}">
        <p>Copied: ${item}</p>
      </div>
      <div class="hex">
        <p>${item}</p>
      </div>
    </div>
  `;
}

function copyHex(element) {
  navigator.clipboard.writeText(element);

  const copyConfirmed = document.getElementById(
    "hex-" + element.slice(1).toLowerCase()
  );

  copyConfirmed.style.animation = "disappear ease 1.5s";

  setTimeout(() => {
    copyConfirmed.style.animation = "none";
  }, 1500);
}
