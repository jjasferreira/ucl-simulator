function calculateChances(string, homeCoef, awayCoef) {
  const homeAdvantage = 0.05;
  const drawFactor = 0.025;
  const drawMaxProb = 0.5;

  const homeProb = homeCoef / (homeCoef + awayCoef) + homeAdvantage;

  const drawChance = Math.min(
    drawFactor / Math.abs(2 * homeProb - 1),
    drawMaxProb
  );
  const homeChance = homeProb * (1 - drawChance);
  const awayChance = 1 - drawChance - homeChance;

  const roll = Math.random();
  let result;
  if (roll < drawChance) {
    result = "D";
  } else if (roll < drawChance + homeChance) {
    result = "H";
  } else {
    result = "A";
  }

  console.log(
    string,
    " ",
    homeChance.toFixed(2),
    drawChance.toFixed(2),
    awayChance.toFixed(2),
    " ",
    result
  );
}

calculateChances("MCI-BRE", 148000, 13366); // Very different coefficients
calculateChances("MCI-BAY", 148000, 144000); // Very similar coefficients
calculateChances("RMA-PSG", 136000, 116000); // Still a difference, but not huge
calculateChances("LIV-DOR", 114000, 97000); // Moderate difference
calculateChances("BAR-LEV", 91000, 90000); // Very close coefficients
calculateChances("MIL-PSV", 59000, 54000); // Small difference, low tier teams
calculateChances("SLO-MON", 27000, 24000); // Very low coefficients, minor difference
calculateChances("AVL-GIR", 20860, 17897); // Lower-tier teams with small difference
calculateChances("SHK-BOL", 63000, 18056); // Moderate difference
calculateChances("FEY-BEN", 57000, 79000); // Coefficients flipped, but not a large gap
