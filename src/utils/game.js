// Check horizontal and vertical lines
const checkLines = (card, marked) => {
  // Check horizontal lines (rows)
  for (let row = 0; row < 5; row++) {
    let isComplete = true;
    for (let col = 0; col < 5; col++) {
      const num = card[row][col]; // card is [B, I, N, G, O] columns
      if (num !== "FREE" && !marked.has(num)) {
        isComplete = false;
        break;
      }
    }

    if (isComplete) return "regular_horizontal";
  }

  // Check vertical lines (columns)
  for (let col = 0; col < 5; col++) {
    let isComplete = true;
    for (let row = 0; row < 5; row++) {
      const num = card[col][row];
      if (num !== "FREE" && !marked.has(num)) {
        isComplete = false;
        break;
      }
    }
    if (isComplete) return "regular_vertical";
  }

  return false;
};

// Check both diagonal lines
const checkDiagonal = (card, marked) => {
  // Top-left to bottom-right
  let diag1Complete = "regular_tlbr-diagonal";
  for (let i = 0; i < 5; i++) {
    const num = card[i][i];
    if (num !== "FREE" && !marked.has(num)) {
      diag1Complete = false;
      break;
    }
  }

  // Top-right to bottom-left
  let diag2Complete = "regular_trbl-diagonal";
  for (let i = 0; i < 5; i++) {
    const num = card[4 - i][i];
    if (num !== "FREE" && !marked.has(num)) {
      diag2Complete = false;
      break;
    }
  }

  return diag1Complete || diag2Complete;
};

// Check four corners
const checkCorners = (card, marked) => {
  const isComplete =
    marked.has(card[0][0]) && // B column, first number
    marked.has(card[4][0]) && // O column, first number
    marked.has(card[0][4]) && // B column, last number
    marked.has(card[4][4]); // O column, last number
  if (isComplete) return "regular_corners";
  return false;
};

// Add these pattern checkers to your game.js file
const checkX = (card, marked) => {
  // Both diagonals must be complete
  let diag1 = true;
  let diag2 = true;

  for (let i = 0; i < 5; i++) {
    // Top-left to bottom-right
    if (card[i][i] !== "FREE" && !marked.has(card[i][i])) diag1 = false;
    // Top-right to bottom-left
    if (card[i][4 - i] !== "FREE" && !marked.has(card[i][4 - i])) diag2 = false;
  }

  return diag1 && diag2 ? "special_X" : false;
};

const checkT = (card, marked) => {
  // Top row and middle column
  let topRow = true;
  let middleCol = true;

  for (let i = 0; i < 5; i++) {
    // Check top row
    if (card[0][i] !== "FREE" && !marked.has(card[0][i])) topRow = false;
    // Check middle column (N column)
    if (card[i][2] !== "FREE" && !marked.has(card[i][2])) middleCol = false;
  }

  return topRow && middleCol ? "special_T" : false;
};

const checkU = (card, marked) => {
  // U-shape: Top row and both side columns (excluding bottom)
  let valid = true;

  // Check top row
  for (let col = 0; col < 5; col++) {
    if (card[0][col] !== "FREE" && !marked.has(card[0][col])) return false;
  }

  // Check left and right columns (rows 0-3)
  for (let row = 0; row < 4; row++) {
    if (card[row][0] !== "FREE" && !marked.has(card[row][0])) return false;
    if (card[row][4] !== "FREE" && !marked.has(card[row][4])) return false;
  }

  return true;
};

const checkDiamond = (card, marked) => {
  // Diamond pattern positions
  const diamondPositions = [
    [1, 2],
    [2, 1],
    [2, 3],
    [3, 2], // Outer diamond
    [0, 2],
    [2, 0],
    [2, 4],
    [4, 2], // Extended points
  ];

  return diamondPositions.every(
    ([row, col]) => card[row][col] === "FREE" || marked.has(card[row][col])
  )
    ? "special_diamond"
    : false;
};

// Updated checkWin function (needs card and marked)
export const checkWin = (card, marked) => {
  return (
    checkLines(card, marked) ||
    checkDiagonal(card, marked) ||
    checkCorners(card, marked)
  );
};

// Generate valid Bingo cards
export const generateCards = (count) => {
  const cards = [];
  const ranges = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
  ];

  for (let c = 0; c < count; c++) {
    // Generate columns first
    const columns = [];
    for (let col = 0; col < 5; col++) {
      const [min, max] = ranges[col];
      const columnNumbers = new Set();
      while (columnNumbers.size < 5) {
        columnNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      columns.push([...columnNumbers]);
    }

    // Convert columns to rows (transpose the matrix)
    const rows = [];
    for (let rowIdx = 0; rowIdx < 5; rowIdx++) {
      const row = columns.map((column) => column[rowIdx]);
      rows.push(row);
    }

    // Add free space at center (N column, 3rd row)
    rows[2][2] = "FREE"; // Now [row][column] notation

    cards.push(rows);
  }
  return cards;
};

export const getLightColor = (number, opacity) => {
  if (number >= 1 && number <= 15) {
    return {
      bgColor: `bg-b-light`,
      textColor: "text-b-light",
      borderColor: "border-b-light",
      bgTransparent: `bg-b-light/10`,
      bgGradient: `bg-gradient-to-b from-b-light to-b-dark`,
    };
  } else if (number >= 16 && number <= 30) {
    return {
      bgColor: "bg-i-light",
      textColor: "text-i-light",
      borderColor: "border-i-light",
      bgTransparent: "bg-i-light/10",
      bgGradient: "bg-gradient-to-b from-i-light to-i-dark",
    };
  } else if (number >= 31 && number <= 45) {
    return {
      bgColor: "bg-n-light",
      textColor: "text-n-light",
      borderColor: "border-n-light",
      bgTransparent: "bg-n-light/10",
      bgGradient: "bg-gradient-to-b from-n-light to-n-dark",
    };
  } else if (number >= 46 && number <= 60) {
    return {
      bgColor: "bg-g-light",
      textColor: "text-g-light",
      borderColor: "border-g-light",
      bgTransparent: "bg-g-light/10",
      bgGradient: "bg-gradient-to-b from-g-light to-g-dark",
    };
  } else if (number >= 61 && number <= 75) {
    return {
      bgColor: "bg-o-light",
      textColor: "text-o-light",
      borderColor: "border-o-light",
      bgTransparent: "bg-o-light/10",
      bgGradient: "bg-gradient-to-b from-o-light to-o-dark",
    };
  }
};

export const getDarkColor = (number, opacity) => {
  if (number >= 1 && number <= 15) {
    return {
      bgColor: `bg-b-dark`,
      textColor: "text-b-dark",
      borderColor: "border-b-dark",
      bgTransparent: `bg-b-dark/10`,
      bgGradient: `bg-gradient-to-b from-b-light to-b-dark`,
    };
  } else if (number >= 16 && number <= 30) {
    return {
      bgColor: "bg-i-dark",
      textColor: "text-i-dark",
      borderColor: "border-i-dark",
      bgTransparent: "bg-i-dark/10",
      bgGradient: "bg-gradient-to-b from-i-light to-i-dark",
    };
  } else if (number >= 31 && number <= 45) {
    return {
      bgColor: "bg-n-dark",
      textColor: "text-n-dark",
      borderColor: "border-n-dark",
      bgTransparent: "bg-n-dark/10",
      bgGradient: "bg-gradient-to-b from-n-light to-n-dark",
    };
  } else if (number >= 46 && number <= 60) {
    return {
      bgColor: "bg-g-dark",
      textColor: "text-g-dark",
      borderColor: "border-g-dark",
      bgTransparent: "bg-g-dark/10",
      bgGradient: "bg-gradient-to-b from-g-light to-g-dark",
    };
  } else if (number >= 61 && number <= 75) {
    return {
      bgColor: "bg-o-dark",
      textColor: "text-o-dark",
      borderColor: "border-o-dark",
      bgTransparent: "bg-o-dark/10",
      bgGradient: "bg-gradient-to-b from-o-light to-o-dark",
    };
  }
};

export const getBingoLetter = (number) => {
  if (number >= 1 && number <= 15) {
    return "b";
  } else if (number >= 16 && number <= 30) {
    return "i";
  } else if (number >= 31 && number <= 45) {
    return "n";
  } else if (number >= 46 && number <= 60) {
    return "g";
  } else if (number >= 61 && number <= 75) {
    return "o";
  }
};
