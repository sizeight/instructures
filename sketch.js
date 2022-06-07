"use strict"
/*
 * INSTRUCTURES
 * by Herman Pretorius
 * 2022
 * @sizeight
 * www.sizeight.com
 */

const { colour, grid, parts } = manMachine;
const { palettes } = colour;
const { gridUtils } = grid;
const { alphabet03_alt } = parts;

let frameCycleTotal = 16;
let canvasSize = 0;
let showMeta = true;
let showInstructions = false;
let showHelp = false;
let showAbout = false;
let showInfo = false;
let firstDrawComplete = false;
let traits = {};
let initialTraits = {};

const newPalettes = [
  {
    name: "Earth",
    styles: [
      // Perfect
      "SCREENPRINT:4",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
    ],
    special: [
      "FREEHAND",
      "PILOTLINES",
      "REGERROR",
      "GRIDLINES",
    ],
  },
  {
    name: "Fifteen",
    styles: [
      // Perfect
      "SCREENPRINT:1",
      "SCREENPRINT:1",
      "SCREENPRINT:1",
      "SCREENPRINT:1",
      "SCREENPRINT:2",
      "SCREENPRINT:2",
      "SCREENPRINT:3",
      "STENCIL:1",
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "LINE",
      "ETCH:INVERSE",
      "TRACE:2",
    ],
    special: [
      "FREEHAND",
      "PILOTLINES",
      "REGERROR",
      "GRIDLINES",
    ],
  },
  {
    name: "SIZEIGHT",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ILLUSTRATE:4",
      "ETCH:INVERSE",
      "TRACE:2",
    ],
    special: [
      "FREEHAND",
      "PILOTLINES",
      "DARKSIDE",
      "REGERROR",
      "GRIDLINES",
    ],
  },
  {
    name: "Pierneef",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "TRACE:2",
      "LINE:INVERSE",
      "ETCH",
      "TRACE:2",
    ],
    special: [
      "PILOTLINES",
      "FREEHAND",
      "REGERROR",
    ],
  },
  {
    name: "Hokusai",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "TRACE:2",
      "LINE",
      "LINE",
      "ETCH",
    ],
    special: [
      "PILOTLINES",
      "FREEHAND",
      "DARKSIDE",
      "REGERROR",
    ],
  },
  {
    name: "Shin-hanga",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ILLUSTRATE:4",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "TRACE:2",
      "LINE",
      "LINE",
      "ETCH",
    ],
    special: [
      "PILOTLINES",
      "FREEHAND",
      "REGERROR",
    ],
  },
  {
    name: "Herge",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ILLUSTRATE:4",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "LINE",
    ],
    special: [
      "PILOTLINES",
      "FREEHAND",
      "DARKSIDE",
      "REGERROR",
    ],
  },
  {
    name: "Stern",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "ILLUSTRATE:5",
      "TRACE:2",
      "LINE",
      "ETCH",
      "TRACE:2",
    ],
    special: [
      "PILOTLINES",
      "FREEHAND",
      "REGERROR",
    ],
  },
  {
    name: "McLaughlin",
    styles: [
      // Perfect
      "SCREENPRINT:2",
      "SCREENPRINT:3",
      "STENCIL:2",
      "STENCIL:3",
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ILLUSTRATE:5",
      "LINE",
      "ETCH",
      "TRACE:2",
    ],
    special: [
      "PILOTLINES",
      "FREEHAND",
      "DARKSIDE",
      "REGERROR",
    ],
  },
  {
    name: "CRT",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:3",
      "ILLUSTRATE:4",
      "ETCH",
    ],
    special: [
      "PILOTLINES",
      "GRIDLINES",
    ],
  },
  {
    name: "CLI",
    styles: [
      // Perfect
      "ILLUSTRATE:2",
      "ILLUSTRATE:4",
      "SCREENPRINT:1",
      "STENCIL:1",
      "TRACE",
    ],
    special: [
      "PILOTLINES",
      "REGERROR",
      "FREEHAND",
    ],
  },
];

window.addEventListener("load", (event) => {
  setup();
  draw();
});

let baseMatrix;

function setup() {
  gridUtils.createCanvas();
  window.onresize = resizeCanvas;
  startKeypressListener();
  setupTraits();
}

function setupTraits() {
  const paletteOpts = [
    /*
    "Earth",
    */
    "Fifteen", "Fifteen",
    "SIZEIGHT", "SIZEIGHT",
    "Herge", "Herge",
    "McLaughlin", "McLaughlin",
    "Hokusai", "Hokusai", "Hokusai",
    "Shin-hanga", "Shin-hanga", "Shin-hanga",
    "Stern", "Stern",
    "Pierneef", "Pierneef", "Pierneef",
    "CRT",
    "CLI",
  ];

  traits.token = fxhash;

  let randIdx;
  traits.dimSize = 15;

  // Angle
  const angleOpts = [0, 0, 0, 0, 1, 2, 2, 2, 2, 3];
  const frameIncOpts = [0, 4, 8, 12];
  randIdx = Math.floor(fxrand() * angleOpts.length);
  traits.angle = angleOpts[randIdx];
  randIdx = Math.floor(fxrand() * frameIncOpts.length);
  traits.frameCount = traits.angle + frameIncOpts[randIdx];

  // 1x 2x 3x 4x 5x
  const zoomLevelOpts = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5];
  randIdx = Math.floor(fxrand() * zoomLevelOpts.length);
  traits.zoomLevel = zoomLevelOpts[randIdx];
  const incr = 8;
  traits.gridSizeOpts = [
    traits.dimSize - incr,        // 5x    8
    traits.dimSize - (incr / 2),  // 4x   12
    traits.dimSize,               // 3x   16
    traits.dimSize + incr,        // 2x   24
    traits.dimSize + incr + incr, // 1x   32
  ];
  traits.gridSize = traits.gridSizeOpts[traits.zoomLevel - 1] + 1;

  // Cube size
  traits.cubeWidth = getCubeWidth();

  // Stroke width
  const lineWidthMultiplierOpts = [2, 3.5, 5];
  randIdx = Math.floor(fxrand() * lineWidthMultiplierOpts.length);
  traits.lineWidthMultiplier = lineWidthMultiplierOpts[randIdx];
  traits.lineWidth = getLineWidth(traits.lineWidthMultiplier);

  // Pilot line width
  traits.pilotLineWidth = getLineWidth(2);

  // Border type
  const borderTypeOpts = [0, 1, 1, 2, 2]; // None, Thin, Thick
  randIdx = Math.floor(fxrand() * borderTypeOpts.length);
  traits.borderType = borderTypeOpts[randIdx];
  traits.borderWidths = getBorderWidths();

  // Architecture
  // 0 = brutalist, 1 = art deco, 2 = modern, 3 = cubist
  const architectureOpts = [0, 1, 2, 3];
  randIdx = Math.floor(fxrand() * architectureOpts.length);
  traits.architecture = architectureOpts[randIdx];

  // Palette
  randIdx = Math.floor(fxrand() * paletteOpts.length);
  const paletteName = paletteOpts[randIdx];
  traits.paletteDef = newPalettes.find((palette) => palette.name === paletteName);
  traits.palette = palettes.get(paletteName);

  // Style
  randIdx = Math.floor(fxrand() * traits.paletteDef.styles.length);
  traits.style = traits.paletteDef.styles[randIdx];

  // Special traits
  // Display grid lines
  traits.showGridLines = false;
  if (traits.paletteDef.special.findIndex(x => x === "GRIDLINES") > -1) {
    traits.showGridLines = fxrand() > 0.975; // 2.5% chance
  }

  // Display pilot lines
  const pilotLineOpts = [0, 1, 2];
  traits.pilotLineType = pilotLineOpts[0];
  if (traits.paletteDef.special.findIndex(x => x === "PILOTLINES") > -1) {
    randIdx = fxrand();
    if (randIdx > 0.5 && (traits.style.startsWith("LINE") || traits.style.startsWith("ETCH") || traits.style.startsWith("ILLUSTRATE") || traits.style.startsWith("TRACE")) ) {
      traits.pilotLineType = pilotLineOpts[1];
    }
    if (randIdx > 0.8 && (traits.style.startsWith("SCREENPRINT") || traits.style.startsWith("STENCIL")) ) {
      traits.pilotLineType = pilotLineOpts[1];
    }
    if (randIdx > 0.95) { // Should almost never happen
      traits.pilotLineType = pilotLineOpts[2];
    }
  }

  // Freehand drawing
  traits.freehand = false;
  if (traits.paletteDef.special.findIndex(x => x === "FREEHAND") > -1) {
    if (fxrand() > 0.7) { // 30% chance
      traits.freehand = true;
    }
  }

  // Registration error
  traits.regError = false;
  if (traits.paletteDef.special.findIndex(x => x === "REGERROR") > -1) {
    if (traits.style.startsWith("ILLUSTRATE")) {
      if (fxrand() > 0.81) { // 19% chance
        traits.regError = true;
      }
    }
  }

  // Dark side
  traits.darkSide = false;
  if (traits.paletteDef.special.findIndex(x => x === "DARKSIDE") > -1) {
    if (traits.style.startsWith("ILLUSTRATE") || traits.style.startsWith("SCREENPRINT") || traits.style.startsWith("STENCIL")) {
      if (fxrand() > 0.9) { // 10% chance
        traits.darkSide = true;
      }
    }
  }

  // Framed
  traits.framed = false;
  if (fxrand() > 0.5) { // 50% chance
    traits.framed = true;
  }

  // Transparent
  traits.transparent = false;
  if (traits.style.startsWith("STENCIL")) {
    if (fxrand() > 0.85) { // Should happen too often
      traits.transparent = true;
    }
  }

  // Colors
  traits.colors = getColors(traits.palette, traits.style, traits.darkSide, traits.framed, traits.transparent);

  // Generate the structure
  baseMatrix = gridUtils.getNewEmptyMatrix(traits.dimSize, traits.dimSize, traits.dimSize);

  // A) Compile recipe of instructions (3-6 instructions / recipe)
  let instructionCount = 4 + Math.floor(fxrand() * 4); // 4-8
  const cmdOptsFirstRound = ["STACK", "PLANE", "SCULPT"];
  const cmdOpts = ["STACK", "PILE", "PLANE", "SCULPT"];
  const axisOpts = ["x", "y", "z"];
  const dirOpts = [""]//["", "", "", "", "", "+", "-"]; // Mostly both directions
  let recipeArr = [{
    cmd: "START",
    cubeCount: 1,
    instruction: "START",
    instructionTxt: "START(1)",
    stepTxtArr: [`1)START(1)`, "   Place a # bottom center."],
  }];

  let cmd;
  let axis;
  let axis2;
  let dir;
  let dir2;
  let axis2Opts;
  let recipeObj = {};
  let factor;
  for (let i = 0; i < instructionCount; i++) {
    recipeObj = {};

    if (i === 0) {
      // Do not PILE directly after start
      randIdx = Math.floor(fxrand() * cmdOptsFirstRound.length);
      cmd = cmdOptsFirstRound[randIdx];
    } else {
      randIdx = Math.floor(fxrand() * cmdOpts.length);
      cmd = cmdOpts[randIdx];
    }
    dir = "";
    randIdx = Math.floor(fxrand() * axisOpts.length);
    axis = axisOpts[randIdx];
    randIdx = Math.floor(fxrand() * dirOpts.length);
    dir = dirOpts[randIdx];

    // Ensure 2nd axis not same as first
    axis2Opts = axisOpts.filter(item => item !== axis);
    randIdx = Math.floor(fxrand() * axis2Opts.length);
    axis2 = axis2Opts[randIdx];
    randIdx = Math.floor(fxrand() * dirOpts.length);
    dir2 = dirOpts[randIdx];

    // 3rd axis for plane instructions
    let axis3 = axis2Opts.filter(item => item !== axis2)[0]

    const dirDisplayLookup = {
      "x":  "to the LFT/RGT of",
      "x-": "to the LFT of",
      "x+": "to the RGT of",
      "y":  "BHND/IFO",
      "y-": "BHND",
      "y+": "IFO",
      "z":  "ABV/BEL",
      "z-": "ABV",
      "z+": "BEL",
    };
    const dirName = `${axis}${dir}`;
    const dirDisplay = dirName !== "" ? dirDisplayLookup[dirName] : "";
    const dirName2 = `${axis2}${dir2}`;
    const dir2Display = dirName2 !== "" ? dirDisplayLookup[dirName2] : "";
    const dirName3 = axis3;
    const dir3Display = dirName3 !== "" ? dirDisplayLookup[dirName3] : "";

    let stepTxtArr = [];
    let instructionTxt;
    if (cmd === "STACK") {
      let lockTxt;
      if (axis === "x") {
        lockTxt = "y and z";
      } else if (axis === "y") {
        lockTxt = "x and z";
      } else if (axis === "z") {
        lockTxt = "x and y";
      }
      stepTxtArr = [
        `   Pick a #, note ${lockTxt} values. Place #'s `,
        `   ${dirDisplay} any # with same ${lockTxt} values.`,
      ];
      instructionTxt = `${cmd}(${axis}`;
      factor = 3;
      recipeObj = { cmd, axis, dir };

    } else if (cmd === "PILE") {
      stepTxtArr = [
        `   Place #'s ${dirDisplay} any #.`,
      ];
      instructionTxt = `${cmd}(${axis}`;
      factor = 4;
      recipeObj = { cmd, axis, dir };
    } else if (cmd === "PLANE") {
      stepTxtArr = [
        `   Pick a #, note ${axis} value. Place #'s ${dir2Display}`,
        `   or ${dir3Display} any # with same ${axis} value.`,
      ];
      instructionTxt = `${cmd}(${axis}`;
      factor = 6;
      if (axis === "x") {
        recipeObj = { cmd, axis: "y", dir, axis2: "z", dir2 };
      } else if (axis === "y") {
        recipeObj = { cmd, axis: "x", dir, axis2: "z", dir2 };
      } else if (axis === "z") {
        recipeObj = { cmd, axis: "x", dir, axis2: "y", dir2 };
      }
    } else if (cmd === "SCULPT") {
      let allDirs = fxrand() > 0.7;
      stepTxtArr = allDirs ? [
          `   Place 1st # next to any #. Place each # next to prev #.`,
        ] : [
          `   Place 1st # ${dirDisplay} or ${dir2Display} any #.`,
          `   Place next #'s ${dirDisplay} or ${dir2Display} prev #.`,
        ];
      factor = 6;
      if (allDirs) {
        instructionTxt = `${cmd}(x, y, z`;
        recipeObj = { cmd };
      } else {
        if (axis === "x" || axis2 === "z") {
          instructionTxt = `${cmd}(${axis}, ${axis2}`;
        } else {
          instructionTxt = `${cmd}(${axis2}, ${axis}`;
        }
        recipeObj = { cmd, axis, dir, axis2, dir2 };
      }
    }

    const randomCubeCount = Math.floor(fxrand() * factor);
    const impactVals = {
      1: randomCubeCount + 1,
      2: randomCubeCount + factor,
      3: randomCubeCount + factor + factor,
    }
    const impactOpts = [1, 2, 3];
    randIdx = Math.floor(fxrand() * impactOpts.length);
    const impact = impactOpts[randIdx];
    const cubeCount = impactVals[impact];

    instructionTxt = `${instructionTxt}, ${cubeCount})`;

    stepTxtArr = [
      `${i + 2})${instructionTxt}`,
      ...stepTxtArr,
    ];

    recipeObj = {
      ...recipeObj,
      instruction: `${recipeObj.cmd}${recipeObj.axis ? `:${recipeObj.axis}${recipeObj.dir}` : ""}${recipeObj.axis2 ? `:${recipeObj.axis2}${recipeObj.dir2}` : ""}`,
      instructionTxt: `${recipeObj.cmd}(${recipeObj.axis ? `${recipeObj.axis}` : "x, y, z"}, ${cubeCount})`,
      stepTxtArr,
      cubeCount,
      impact,
    }
    recipeArr.push(recipeObj);
  }

  // B) Perform instructions
  let matrixFeatures;
  traits.stepsArr = [];
  traits.impact = {
    STACK: 0,
    PLANE: 0,
    PILE: 0,
    SCULPT: 0,
  };
  recipeArr.forEach((recipeObj, i) => {
    if (recipeObj.cmd === "STACK") {
      traits.impact.STACK += recipeObj.cubeCount;
    } else if (recipeObj.cmd === "PILE") {
      traits.impact.PILE += recipeObj.cubeCount;
    } else if (recipeObj.cmd === "PLANE") {
      traits.impact.PLANE += recipeObj.cubeCount;
    } else if (recipeObj.cmd === "SCULPT") {
      traits.impact.SCULPT += recipeObj.cubeCount;
    }

    traits.stepsArr = traits.stepsArr.concat(recipeObj.stepTxtArr);
    matrixFeatures = gridUtils.getMatrixFeatures(baseMatrix);
    let opts = {
      matrix: baseMatrix,
      stepName: recipeObj.instruction,
      cubeCount: recipeObj.cubeCount,
      xMin: matrixFeatures.xMin,
      xMax: matrixFeatures.xMax,
      yMin: matrixFeatures.yMin,
      yMax: matrixFeatures.yMax,
      zMin: matrixFeatures.zMin,
      zMax: matrixFeatures.zMax,
    };
    baseMatrix = executeStep(opts);
    baseMatrix = gridUtils.centerMatrix(baseMatrix);
  });

  // Find dominant instruction
  traits.dominantInstruction = Object.keys(traits.impact).reduce((a, b) => traits.impact[a] > traits.impact[b] ? a : b);
  traits.dominantInstruction = traits.dominantInstruction.charAt(0).toUpperCase() + traits.dominantInstruction.substr(1).toLowerCase();

  // Shape matrix
  baseMatrix = gridUtils.shapeMatrix({ random_dec: fxrand, matrix: baseMatrix, type: traits.architecture });
  // Center matrix ito X & Y
  baseMatrix = gridUtils.centerMatrix(baseMatrix);
  traits.hOffset = 0;
  // Center matrix ito Z
  traits.vOffset = matrixFeatures.vOffset;
  // Extract final matrix features
  matrixFeatures = gridUtils.getMatrixFeatures(baseMatrix);

  // Compose instructions
  traits.instructionsTxt = [
    "INSTRUCTIONS FOR STRUCTURE",
    "--------------------------",
    "These instructions were followed to build this structure.",
    "Cubes [#] were placed 1 by 1, to the LFT/RGT (x-axis),",
    "BHND/IFO (y-axis) or ABV/BEL (z-axis) other #'s.",
    "",
    ...traits.stepsArr,
    `${recipeArr.length + 1})SHAPE()`, `   Add ${matrixFeatures.architecture} features.`,
  ];

  // FEATURES
  const viewFeatureNames = [
    "Right",
    "Corner",
    "Left",
    "Flat",
  ];
  const lineWeightNames = {
    "2": "Light",
    "3.5": "Medium",
    "5": "Bold",
  };
  const borderNames = {
    0: "None",
    1: "Thin",
    2: "Wide",
  };
  const sizeNames = {
    0: "Tiny",   // 0-15
    1: "Small",  // 16-30
    2: "Medium", // 31-45
    3: "Large",  // 46-60
    4: "Huge",   // 61+
  };
  const pilotLineNames = {
    0: "None",
    1: "Yes",
    2: "Overkill",
  };

  let size = sizeNames[0];
  if ( matrixFeatures.cubeCount > 15) {
    size = sizeNames[1];
  }
  if ( matrixFeatures.cubeCount > 30) {
    size = sizeNames[2];
  }
  if ( matrixFeatures.cubeCount > 45) {
    size = sizeNames[3];
  }
  if ( matrixFeatures.cubeCount > 60) {
    size = sizeNames[4];
  }

  let style = traits.style.split(":")[0].toLowerCase();
  style = `${style[0].toUpperCase()}${style.slice(1)}`;

  let computedStyle = "Coloured";
  if (traits.regError) {
    computedStyle = "Screenprint";
  }
  if (traits.style.startsWith("ETCH") || traits.style.startsWith("TRACE") || traits.style.startsWith("LINE")) {
    computedStyle = "Line drawing";
  }
  if ((traits.style.startsWith("SCREENPRINT") || traits.style.startsWith("STENCIL"))) {
    computedStyle = "Monochrome";
  }

  traits.cubeCount = matrixFeatures.cubeCount;
  traits.cubeHeight = matrixFeatures.height;

  window.$fxhashFeatures = {
    "Dominant instruction": traits.dominantInstruction,
    "Palette": traits.palette.name,
    "Colours": traits.colors.uniqueColorCount,
    "Style": computedStyle,
    "Architecture": matrixFeatures.architecture,
    "Default view": viewFeatureNames[traits.angle],
    "Default zoom": getZoomLevelDisplay(),
    "Default frame": `${traits.frameCount}/16`,
    "Structure size": size,
    "Border": borderNames[traits.borderType],
    "Freehand": traits.freehand ? "Yes" : "No",
    "Line weight": lineWeightNames[traits.lineWidthMultiplier],
    "Pilot lines": pilotLineNames[traits.pilotLineType],
    "Shadow": traits.darkSide ? "Yes" : "No",
  };

  initialTraits = { ...traits };
}

function draw() {
  const canvasWidth = ctx.canvas.clientWidth;
  const canvasHeight = ctx.canvas.clientHeight;
  const canvasSize = canvasWidth > canvasHeight ? canvasHeight : canvasWidth; // Smallest side

  const txtSquareWidth = Math.floor(canvasSize / 320);
  const xGutter = Math.floor(traits.borderWidths[2].w) - (txtSquareWidth * 2);
  const yGutterTop = Math.floor(traits.borderWidths[1].h * 2) - (txtSquareWidth * 2);
  const yGutterBottom = Math.floor(traits.borderWidths[1].h * 3) + (txtSquareWidth * 2);

  const turns = Math.floor((traits.frameCount % 16) / 4); // 0, 1, 2, 3
  let matrix = gridUtils.rotate3DMatrixAroundZAxis({ matrix: baseMatrix, direction: "A", turns });

  // Background
  gridUtils.fillBackground(traits.colors.background);

  // Grid lines
  function drawGrid() {
    const gridCellWidth = canvasSize / traits.gridSize;
    const gridCellHeight = gridCellWidth;
    const baseGrid = gridUtils.getNewEmptyMatrix(traits.gridSize *2, traits.gridSize *2);
    if (traits.showGridLines) {
      let opts = {
        matrix: baseGrid,
        strokeColor: "#75766822",
        highlightStrokeColor: "rgba(0, 0, 0, 0.5)",
        highlightCount: 1000,
        strokeWidth: 1,
        sqWidth: gridCellWidth,
        sqHeight: gridCellHeight,
        showVerticals: traits.showGridLines,
        showHorizontals: traits.showGridLines,
        border: 0,
      };
      gridUtils.drawGridLines(opts);
    }
  }
  drawGrid();

  // Draw structure
  function drawRotatingSculpture() {
    const blockHeight = canvasSize / traits.gridSize;
    const canvasGridWidth = canvasWidth / blockHeight;
    const canvasGridheight = canvasHeight / blockHeight;
    const canvasGridMin = canvasGridWidth > canvasGridheight ? canvasGridheight : canvasGridWidth;

    const xStart = (canvasGridWidth / 2) + traits.hOffset;
    const yStart = (canvasGridheight / 2) - (canvasGridMin / 4) + traits.vOffset - ((5 - traits.zoomLevel));

    let shapeOpts = {
      matrix,
      xStart, // center
      yStart, // center
      cubeWidth: traits.cubeWidth,
      lineWidth: traits.lineWidth,
      pilotLineWidth: traits.pilotLineWidth,
      colors: {
        left: traits.frameCount % 8 < 4 ? traits.colors.left : traits.colors.right,
        right: traits.frameCount % 8 < 4 ? traits.colors.right : traits.colors.left,
        top: traits.colors.top,
        stroke: traits.colors.stroke,
        pilotLines: traits.colors.pilotLine,
      },
      angle: traits.frameCount % 4, // 0, 1, 2, 3
      phase: Math.floor(traits.frameCount / 4),
      showPilotLines: traits.pilotLineType, // 0, 1, 2
      freehand: traits.freehand,
      regError: traits.regError,
    }
    gridUtils.drawShapeMatrix(shapeOpts);
  }
  drawRotatingSculpture();

  // Instructions
  function drawOverlay(textArr) {
    gridUtils.fillBackground(traits.colors.overlay);

    if (txtSquareWidth >= 1) { // Don't show on small screens
      for (let i = 0; i < textArr.length; i++) {
        let txt = textArr[i];
        let txtArr = gridUtils.getStringAsArray(txt);
        let txtArrAlphabet = txtArr.map((character) => alphabet03_alt[character]);
        let flatOpts = {
          color: traits.colors.overlayTxt,
          canvasWidth,
          canvasHeight,
          squareWidth: txtSquareWidth,
        };
        txtArrAlphabet.forEach((char, idx) => {
          let charWidth = char[0].length;
          flatOpts = {
            ...flatOpts,
            matrix: char,
            xStart: (xGutter * 2) + (idx * charWidth * txtSquareWidth),
            yStart: yGutterTop * (i + 3),
          };
          gridUtils.drawFlatGrid(flatOpts);
        });
      }
    }
  }
  if (showInstructions) {
    drawOverlay(traits.instructionsTxt);
  }

  // Help
  const helpTxt = [
    "HELP",
    "----",
    "",
    "[H]elp",
    "[I]nstructions for structure",
    "[F]eatures for structure",
    "",
    "[R]eset to default view",
    "[P]rint size   > Responsive",
    "               > 2362 × 2362 (20 × 20 cm printed)",
    "               > 4724 × 4724 (40 × 40 cm printed)",
    "               > 5120 x 2880 (HD landscape)",
    "               > 2880 x 5120 (HD portrait)",
    "[Right click, Save] Save PNG image",
    "",
    "[Z]oom         > 1×  > 2×  > 3×  > 4x  > 5x",
    "[W] Move up",
    "[S] Move down",
    "[A] Move left",
    "[D] Move right",
    "[<] Rotate clockwise",
    "[>] Rotate anti-clockwise",
    "",
    "[H]elp",
    "[Esc] Cancel menu"
  ];

  if (showHelp) {
    drawOverlay(helpTxt);
  }

  const infoTxt = [
    "ARTIST STATEMENT",
    "----------------",
    "",
    "Instructures is a computer program that explores the endless",
    "and diverse outcomes when a minimal, straightforward set of",
    "instructions are followed to build structures out of cubes.",
    "",
    "Each time the program executes, a random signature is",
    "generated. The program accepts this signature as an input",
    "and outputs a corresponding artwork using a determinstic",
    "generative algorithm. Using the signature, the algorithm",
    "generates 4 to 8 instructions to build a structure out of",
    'cubes, for example "Stack 4 cubes on top of each other",',
    '"Place 7 cubes to the left/right of any other cube" or',
    '"Add rouned corners". The signature is displayed bottom',
    "left on each artwork, and a unique signature will always",
    "generate the same output.",
    "",
    "Even though the program is focused on generating unique",
    "structures, the additional variations in scale, composition,",
    "colour, viewing angle and drawing style create an even wider",
    "array of generative outcomes. Some outputs are recognisable",
    "as three-dimensional isometric drawings whilst others are",
    "more abstract. The unique artworks are also meant to be",
    "used as points of departure for creating new artworks using",
    "methods of drawing, painting, print making, sculpting etc.",
    "My aim with Instructures is to strike a balance between",
    "traditional art and the more technical nature of computers",
    "and programming art by blending visual cues from both",
    "disciplines. My hope is that the works can be appreciated",
    "by audiences from both of these worlds.",
    "",
    '"The idea becomes a machine that makes the art."',
    "   — Sol Lewitt, 1967",
  ];
  if (showInfo) {
    drawOverlay(infoTxt);
  }

  // Features
  const aboutTxt = [
    "FEATURES",
    "--------",
    "",
  ];
  let featCount = 0;
  for (const [key, value] of Object.entries(window.$fxhashFeatures)) {
    featCount++;
    let number = `${featCount})`;
    aboutTxt.push(`${number.padEnd(3, " ")} ${key.padEnd(21, " ")}: ${value}`);
  }
  if (showAbout) {
    drawOverlay(aboutTxt);
  }

  // Border
  const bWidth = traits.borderWidths[traits.borderType].w;
  const bHeight = traits.borderWidths[traits.borderType].h;
  gridUtils.fillBorder(traits.colors.border, bWidth, bHeight);
  if (traits.borderType !== 0 && traits.framed) {
    gridUtils.strokeBorder(traits.colors.stroke, bWidth, bHeight, traits.lineWidth);
  }

  // Meta
  if (showMeta) {
    let colorStr = traits.borderType === 2 ? traits.colors.meta : traits.colors.metaAlt;

    if (txtSquareWidth >= 1) { // Don't show on small screens
      let txt = " INSTRUCTURES ";
      let txtArr = gridUtils.getStringAsArray(txt);
      let txtArrAlphabet = txtArr.map((character) => alphabet03_alt[character] || [[]]);
      let flatOpts = {
        color: colorStr,
        canvasWidth,
        canvasHeight,
        squareWidth: txtSquareWidth,
      };
      if (traits.borderType !== 2) {
        flatOpts = {
          ...flatOpts,
          background: traits.colors.overlay,
        }
      }
      let charOffset = 0;
      txtArrAlphabet.forEach((char, idx) => {
        flatOpts = {
          ...flatOpts,
          matrix: char,
          xStart: xGutter + charOffset,
          yStart: yGutterTop,
        };
        gridUtils.drawFlatGrid(flatOpts);
        charOffset += char[0].length * txtSquareWidth;
      });

      charOffset = 0;
      function dec2bin(dec) {
        return (dec >>> 0).toString(2);
      }
      txt = ` ${traits.cubeHeight.toString().padStart(2, "0")}%   `
      txt += ` ${traits.cubeCount.toString().padStart(2, "0")}#   `
      txt += ` ${traits.hOffset.toFixed(1).toString().padStart(4, "+")}<>   `
      txt += `${(-traits.vOffset).toFixed(1).toString().padStart(4, "+")}&   `
      txt += `${getZoomLevelDisplay()}   ${dec2bin(traits.frameCount).padStart(4, "0")} `;
      txtArr = gridUtils.getStringAsArray(txt);
      txtArrAlphabet = txtArr.map((character) => alphabet03_alt[character]);
      txtArrAlphabet.reverse().forEach((char, idx) => {
        let charWidth = char[0].length;
        charOffset += char[0].length * txtSquareWidth;
        flatOpts = {
          ...flatOpts,
          matrix: char,
          xStart: canvasWidth - xGutter - charOffset,
          yStart: yGutterTop,
        };
        gridUtils.drawFlatGrid(flatOpts);
      });

      charOffset = 0;
      txt = ` ${traits.token} `;
      txtArr = gridUtils.getStringAsArray(txt);
      txtArrAlphabet = txtArr.map((character) => alphabet03_alt[character]);
      txtArrAlphabet.forEach((char, idx) => {
        let charWidth = char[0].length;
        flatOpts = {
          ...flatOpts,
          matrix: char,
          xStart: xGutter + charOffset,
          yStart: canvasHeight - yGutterBottom,
        };
        gridUtils.drawFlatGrid(flatOpts);
        charOffset += char[0].length * txtSquareWidth;
      });

      charOffset = 0;
      txt = " hp zozz ";
      txtArr = gridUtils.getStringAsArray(txt);
      txtArrAlphabet = txtArr.map((character) => alphabet03_alt[character]);
      txtArrAlphabet.reverse().forEach((char, idx) => {
        let charWidth = char[0].length;
        charOffset += char[0].length * txtSquareWidth;
        flatOpts = {
          ...flatOpts,
          matrix: char,
          xStart: canvasWidth - xGutter - charOffset,
          yStart: canvasHeight - yGutterBottom,
        };
        gridUtils.drawFlatGrid(flatOpts);
      });
    }
  }

  if (!firstDrawComplete) {
    fxpreview();
    firstDrawComplete = true;
  }

  traits.frameCount++; // Last call in draw
  traits.frameCount = traits.frameCount % frameCycleTotal;
}

function getLineWidth(multiplier = 2) {
  const cW = ctx.canvas.clientWidth;
  const cH = ctx.canvas.clientHeight;
  const cMin = cW > cH ? cH : cW;
  return cMin / 2048 * multiplier;
}

function getCubeWidth() {
  const cW = ctx.canvas.clientWidth;
  const cH = ctx.canvas.clientHeight;
  const cMin = cW > cH ? cH : cW;
  return cMin / traits.gridSize;
}

function getBorderWidths() {
  const cW = ctx.canvas.clientWidth;
  const cH = ctx.canvas.clientHeight;
  const cMin = cW > cH ? cH : cW;

  return [
    { w: 0, h: 0 },                 // 0 = None
    { w: cMin / 64, h: cMin / 64 }, // 1 = Thin
    { w: cMin / 32, h: cMin / 16 }, // 2 = Wide
  ];
}

function getZoomLevelDisplay() {
  return `${6 - traits.zoomLevel}x`;
}

function resizeCanvas() {
  if (canvasSize === 0) {
    // Responsive;
    gridUtils.createCanvas();
  } else if (canvasSize === 1) {
    // 2362 x 2362 (20 x 20cm 300dpi)
    gridUtils.createCanvas(2362, 2362);
  } else if (canvasSize === 2) {
    // 3780 x 3780 (32 x 32cm 300dpi)
    gridUtils.createCanvas(3780, 3780);
    // 4724 x 4724 (40 x 40cm 300dpi)
    // gridUtils.createCanvas(4724, 4724);
  } else if (canvasSize === 3) {
    // 5120 x 2880 (HD Landscape)
    gridUtils.createCanvas(5120, 2880);
  } else if (canvasSize === 4) {
    // 2880 x 5120 (HD Portrait)
    gridUtils.createCanvas(2880, 5120);
  }
  // Recalc for acurate positioning
  traits.lineWidth = getLineWidth(traits.lineWidthMultiplier);
  traits.pilotLineWidth = getLineWidth(2);
  traits.cubeWidth = getCubeWidth();
  traits.borderWidths = getBorderWidths();
  decreaseFrameCount(1);
  draw();
}

function toggleReset() {
  showMeta = true;
  showInstructions = false;
  showHelp = false;
  showInfo = false;
  showAbout = false;
  canvasSize = 0;
  gridUtils.createCanvas();

  traits = { ...initialTraits };
  traits.gridSize = traits.gridSizeOpts[traits.zoomLevel - 1] + 1;
  traits.cubeWidth = getCubeWidth();
  traits.lineWidth = getLineWidth(traits.lineWidthMultiplier);
  traits.pilotLineWidth = getLineWidth(2);
  traits.borderWidths = getBorderWidths();
  draw();
}

function toggleZoomLevel(type = "ZOOMIN") {
  if (type === "ZOOMIN") {
    traits.zoomLevel = (traits.zoomLevel - 1) < 1 ? 5 : (traits.zoomLevel - 1);
  } else {
    traits.zoomLevel = (traits.zoomLevel + 1) > 5 ? 1 : (traits.zoomLevel + 1);
  }
  traits.gridSize = traits.gridSizeOpts[traits.zoomLevel - 1] + 1;
  traits.cubeWidth = getCubeWidth();
  traits.lineWidth = getLineWidth(traits.lineWidthMultiplier);
  traits.pilotLineWidth = getLineWidth(2);

  decreaseFrameCount(1);
  draw();
}

function toggleBorder() {
  traits.borderType = (traits.borderType - 1) === -1 ? 2 : (traits.borderType - 1);
  traits.borderWidths = getBorderWidths();
  decreaseFrameCount(1);
  draw();
}

function toggleFramed() {
  traits.framed = !traits.framed;
  decreaseFrameCount(1);
  draw();
}

function toggleRegError() {
  traits.regError = !traits.regError;
  decreaseFrameCount(1);
  draw();
}

function toggleMeta() {
  showMeta = !showMeta;
  decreaseFrameCount(1);
  draw();
}

function togglePilotLines() {
  traits.pilotLineType = (traits.pilotLineType + 1) === 3 ? 0 : (traits.pilotLineType + 1);
  decreaseFrameCount(1);
  draw();
}

function toggleInstructions() {
  showHelp = false;
  showAbout = false;
  showInstructions = !showInstructions;
  showInfo = false;
  decreaseFrameCount(1);
  draw();
}

function toggleHelp() {
  showInstructions = false;
  showAbout = false;
  showHelp = !showHelp;
  showInfo = false;
  decreaseFrameCount(1);
  draw();
}

function toggleAbout() {
  showInstructions = false;
  showHelp = false;
  showAbout = !showAbout;
  showInfo = false;
  decreaseFrameCount(1);
  draw();
}

function toggleInfo() {
  showInstructions = false;
  showHelp = false;
  showAbout = false;
  showInfo = !showInfo;
  decreaseFrameCount(1);
  draw();
}

function cancelOverlays() {
  showInstructions = false;
  showHelp = false;
  showAbout = false;
  showInfo = false;
}

function decreaseFrameCount(steps) {
  traits.frameCount -= steps;
  traits.frameCount = traits.frameCount < 0 ? traits.frameCount + frameCycleTotal : traits.frameCount;
}

function startKeypressListener() {
  document.onclick = () => {
    // cancelOverlays();
    decreaseFrameCount(1);
    draw();
  };
  const reloadBtn = document.getElementById('reload');
  reloadBtn.onclick = () => {
    location.reload();
  }
  const zoomBtn = document.getElementById('zoom');
  zoomBtn.onclick = () => {
    toggleZoomLevel("ZOOMIN");
  }
  const rotateAntiBtn = document.getElementById('rotate-anti');
  rotateAntiBtn.onclick = () => {
    draw();
  }
  const rotateClockwiseBtn = document.getElementById('rotate-clockwise');
  rotateClockwiseBtn.onclick = () => {
    decreaseFrameCount(2);
    draw();
  }

  const upBtn = document.getElementById('up');
  upBtn.onclick = () => {
    decreaseFrameCount(1);
    traits.vOffset = traits.vOffset > -9 ? traits.vOffset - 0.5 : traits.vOffset;
    draw();
  }
  const downBtn = document.getElementById('down');
  downBtn.onclick = () => {
    traits.vOffset = traits.vOffset < 9 ? traits.vOffset + 0.5 : traits.vOffset;
    decreaseFrameCount(1);
    draw();
  }
  const leftBtn = document.getElementById('left');
  leftBtn.onclick = () => {
    decreaseFrameCount(1);
    traits.hOffset = traits.hOffset > -9 ? traits.hOffset - 0.5 : traits.hOffset;
    draw();
  }
  const rightBtn = document.getElementById('right');
  rightBtn.onclick = () => {
    decreaseFrameCount(1);
    traits.hOffset = traits.hOffset < 9 ? traits.hOffset + 0.5 : traits.hOffset;
    draw();
  }

  const helpBtn = document.getElementById('help');
  helpBtn.onclick = () => {
    toggleHelp();
  }
  const featBtn = document.getElementById('features');
  featBtn.onclick = () => {
    toggleAbout();
  }
  const instrBtn = document.getElementById('instructions');
  instrBtn.onclick = () => {
    toggleInstructions();
  }
  const resetBtn = document.getElementById('reset');
  resetBtn.onclick = () => {
    toggleReset();
  }
  const infoBtn = document.getElementById('info');
  infoBtn.onclick = () => {
    toggleInfo();
  }



  document.addEventListener("keydown", logKey);
  function logKey(e) {
    if (!e.repeat) { // Only once per keypress
      console.log(e.code);
      if (e.code === "KeyM") {
        cancelOverlays();
        toggleMeta();
      } else if (e.code === "KeyL") {
        cancelOverlays();
        togglePilotLines();
      } else if (e.code === "KeyB") {
        cancelOverlays();
        toggleBorder();
      } else if (e.code === "KeyN") {
        cancelOverlays();
        toggleFramed();
      } else if (e.code === "KeyG") {
        cancelOverlays();
        toggleRegError();
      } else if (e.code === "KeyZ" && !e.ctrlKey) {
        toggleZoomLevel("ZOOMIN");
      } else if (e.code === "KeyZ" && e.ctrlKey) {
        toggleZoomLevel("ZOOMOUT");
      } else if (e.code === "KeyI") {
        toggleInstructions();
      } else if (e.code === "KeyH") {
        toggleHelp();
      } else if (e.code === "KeyR") {
        toggleReset();
      } else if (e.code === "KeyF") {
        toggleAbout();
      } else if (e.code === "Enter") {
        toggleInfo();
      }
      /*else if (e.code === "KeyP") {
        canvasSize = (canvasSize + 1) % 5;
        resizeCanvas();
      }*/ else if (e.code === "Escape") {
        cancelOverlays();
        decreaseFrameCount(1);
        draw();
      } else if (e.code === "KeyA") {
        decreaseFrameCount(1);
        traits.hOffset = traits.hOffset > -9 ? traits.hOffset - 0.5 : traits.hOffset;
        draw();
      } else if (e.code === "KeyD") {
        decreaseFrameCount(1);
        traits.hOffset = traits.hOffset < 9 ? traits.hOffset + 0.5 : traits.hOffset;
        draw();
      } else if (e.code === "KeyW") {
        decreaseFrameCount(1);
        traits.vOffset = traits.vOffset > -9 ? traits.vOffset - 0.5 : traits.vOffset;
        draw();
      } else if (e.code === "KeyS" && !e.ctrlKey) {
        traits.vOffset = traits.vOffset < 9 ? traits.vOffset + 0.5 : traits.vOffset;
        decreaseFrameCount(1);
        draw();
      } else if (e.code === "ArrowRight" || e.code === "Period" ) {
        draw();
      } else if (e.code === "ArrowLeft" || e.code === "Comma") {
        decreaseFrameCount(2);
        draw();
      } else if (e.code === "Space") {
        location.reload();
      }
    }
  }
}

function executeStep({ matrix, stepName, cubeCount, xMin, xMax, yMin, yMax, zMin, zMax }) {
  const stepParts = stepName.split(":");
  const dir = stepParts[1] || "";
  const dir2 = stepParts[2] || "";

  if (stepName === "START") {
    matrix[traits.dimSize - 1][Math.floor(traits.dimSize / 2)][Math.floor(traits.dimSize / 2)] = 1;
  }

  if (stepName.startsWith("STACK")) {
    let opts = { random_dec: fxrand, matrix, method: "STACK", cubeCount };
    if (dir[0] === "x") { // STACK:x  X-DIRS
      opts = { ...opts, xDir: dir };
    }

    if (dir[0] === "y") { // STACK:y  Y-DIRS
      opts = { ...opts, yDir: dir };
    }

    if (dir[0] === "z") { // STACK:z  Z-DIRS
      opts = { ...opts, zDir: dir };
    }
    matrix = gridUtils.placeCubes(opts);
  }

  if (stepName.startsWith("PILE")) {
    let opts = { random_dec: fxrand, matrix, method: "PILE", cubeCount };

    if (dir[0] === "x") { // PILE-X
      opts = { ...opts, xDir: dir };
    }

    if (dir[0] === "y") { // PILE-Y
      opts = { ...opts, yDir: dir };
    }

    if (dir[0] === "z") { // PILE-Z
      opts = { ...opts, zDir: dir };
    }
    matrix = gridUtils.placeCubes(opts);
  }

  if (stepName.startsWith("PLANE") && dir && dir2) {
    const xDir = dir[0] === "x" ? dir : dir2[0] === "x" ? dir2 : undefined;
    const yDir = dir[0] === "y" ? dir : dir2[0] === "y" ? dir2 : undefined;
    const zDir = dir[0] === "z" ? dir : dir2[0] === "z" ? dir2 : undefined;
    let opts = { random_dec: fxrand, matrix, method: "PLANE", cubeCount };

    if (xDir !== undefined) {
      opts = { ...opts, xDir };
    } else {
      const randXLevel = xMin + Math.floor(fxrand() * (xMax - xMin));
      opts = { ...opts, xLock: randXLevel };
    }
    if (yDir !== undefined) {
      opts = { ...opts, yDir };
    } else {
      const randYLevel = yMin + Math.floor(fxrand() * (yMax - yMin));
      opts = { ...opts, yLock: randYLevel };
    }
    if (zDir !== undefined) {
      opts = { ...opts, zDir };
    } else {
      const randZLevel = zMin + Math.floor(fxrand() * (zMax - zMin));
      opts = { ...opts, zLock: randZLevel };
    }
    matrix = gridUtils.placeCubes(opts);
  }

  if (stepName.startsWith("SCULPT")) {
    const xDir = dir[0] === "x" ? dir : dir2[0] === "x" ? dir2 : undefined;
    const yDir = dir[0] === "y" ? dir : dir2[0] === "y" ? dir2 : undefined;
    const zDir = dir[0] === "z" ? dir : dir2[0] === "z" ? dir2 : undefined;
    let opts = { random_dec: fxrand, matrix, method: "SCULPT", cubeCount };

    // SCULPT-X
    if (xDir !== undefined) {
      opts = { ...opts, xDir };
    }

    // SCULPT-Y
    if (yDir !== undefined) {
      opts = { ...opts, yDir };
    }

    // SCULPT-Z
    if (zDir !== undefined) {
      opts = { ...opts, zDir };
    }
    matrix = gridUtils.placeCubes(opts);
  }

  return matrix;
}

function getColors(palette, style, darkSide = false, framed = false, transparent = false) {
  let selectedBackground = palette.background;
  if (palette.backgrounds !== undefined) {
    let randIdx = Math.floor(fxrand() * palette.backgrounds.length);
    selectedBackground = palette.backgrounds[randIdx];
  }

  let randIdx;
  let availColors = palette.colors;
  let colors = [];
  palette.colors.forEach((c) => {
    randIdx = Math.floor(fxrand() * availColors.length);
    let chosenColor = availColors[randIdx];
    colors.push(chosenColor);
    availColors = availColors.filter((c) => c !== chosenColor);
  });

  // Ensure 1st color is not same as bg cause we use 1st color for borders
  let bgIdx = colors.findIndex((c) => c === selectedBackground);
  if (bgIdx > -1) {
    colors = [
      ...colors.slice(0, bgIdx),
      ...colors.slice(bgIdx + 1),
      colors[bgIdx],
    ];
  }

  let background;
  let stroke;
  let pilotLine;
  let left;
  let right;
  let top;
  let meta;
  let metaAlt;
  let border;
  let frame;
  let overlay;
  let overlayTxt;

  if (style.startsWith("LINE")) {
    // Duotone: Stroke lines on background
    // background: Background, 3 sides
    // stroke: Stroke, meta/border
    const inverse = style === "LINE";
    const c1 = selectedBackground;
    const c2 = palette.stroke;
    background = inverse ? c1 : c2;
    stroke = inverse ? c2 : c1;
    frame = stroke;
    pilotLine = palettes.getHEXa(stroke, 0.2);
    left = background;
    right = background;
    top = background;
    meta = inverse ? palette.stroke : background;
    metaAlt = stroke;
    border = inverse ? palettes.getHEX(palette.background, 0.2) : stroke;
    overlayTxt = metaAlt;

  } else if (style.startsWith("ETCH")) {
    // Duotone: Stroke lines on random color
    // background: Background, sides
    // colro[0]:   Stroke, meta/border
    const inverse = style === "ETCH:INVERSE"

    let c = colors[0];
    for (let i = 0; i < colors.length; i++) {
      const contr = palettes.contrastRatio(colors[i], palette.stroke);
      if (contr > 2) {
        c = colors[i];
      }
    }
    const c1 = c;
    const c2 = palette.stroke;

    background = inverse ? c1 : c2;
    stroke = inverse ? c2 : c1;
    frame = stroke;
    pilotLine = palettes.getHEXa(stroke, 0.25);
    left = background;
    right = background;
    top = background;
    meta = inverse ? palette.stroke : background;
    metaAlt = stroke;
    border = inverse ? palette.background : stroke;
    overlayTxt = metaAlt;

  } else if (style.startsWith("TRACE")) {
    // Duotone: Random color on another color
    // color[0]: Background, sides
    // colro[1]:   Stroke, meta/border
    const colorCount = parseInt(style.split(":")[1]);
    const inverse = fxrand() > 0.5; // 50% chance of light background

    let c1 = inverse ? palettes.getHEX(colors[0], 0.25) : colors[0];
    let c2 = inverse ? colors[0] : palettes.getHEX(colors[0], 0.25);

    if (colorCount > 1) {
      const best = palettes.getBestColors(colors, [c1], 1);
      c2 = best !== undefined ? best[0] : c2;
    }

    background = c1;
    stroke = c2;
    frame = stroke;
    pilotLine = palettes.getHEXa(stroke, 0.25);
    left = background;
    right = background;
    top = background;
    meta = background;
    metaAlt = stroke;
    border = stroke;
    overlayTxt = metaAlt;

  } else if (style.startsWith("SCREENPRINT")) {
    // Monochrome (Dark bg, light structure)
    // Color 1: Background, stroke    (opacity: 1)
    // Color 2: Sides, meta         (opacity 0.2)
    const colorCount = parseInt(style.split(":")[1]);

    let c = colors[0];
    for (let i = 0; i < colors.length; i++) {
      const contr = palettes.contrastRatio(colors[i], palettes.getHEX(colors[i], 0.3));
      if (contr > 2) {
        c = colors[i];
      }
    }

    background = c; // dark
    const c1 = palettes.getHEX(background, 0.3); // lightest
    const c2 = palettes.getHEX(background, 0.5); // lighter
    const c3 = palettes.getHEX(background, 0.7); // light

    stroke = background;
    pilotLine = palettes.getHEXa(c2, 0.25);

    let combo = Math.floor(fxrand() * 3);
    if (combo === 0) {
      left = c1;
      right = colorCount > 1 ? c2 : c1;
      top = colorCount > 2 ? c3 : c1;
    } else if (combo === 1) {
      right = c1;
      top = colorCount > 1 ? c2 : c1;
      left = colorCount > 2 ? c3 : c1;
    } else if (combo === 2) {
      top = c1;
      left = colorCount > 1 ? c2 : c1;
      right = colorCount > 2 ? c3 : c1;
    }
    meta = background;
    metaAlt = c1;
    border = metaAlt;
    frame = background;
    overlayTxt = metaAlt;

  } else if (style.startsWith("STENCIL")) {
    // Monochrome (Light bg, dark structure)
    // Color 1: Background, stroke    (opacity: 1)
    // Color 2: Sides, meta         (opacity 0.2)
    const colorCount = parseInt(style.split(":")[1]); // 1, 2, 3, 4

    let c = colors[0];
    for (let i = 0; i < colors.length; i++) {
      const contr = palettes.contrastRatio(colors[i], palettes.getHEX(colors[i], 0.3));
      if (contr > 2) {
        c = colors[i];
      }
    }

    background = palettes.getHEX(c, 0.3) // light
    const c1 = transparent ? palettes.getHEXa(c, 0.9) : c; // dark
    const c2 = transparent ? palettes.getHEXa(c, 0.5) : palettes.getHEX(c, 0.5); // darker
    const c3 = transparent ? palettes.getHEXa(c, 0.75) : palettes.getHEX(c, 0.75); // darkest

    stroke = background;
    pilotLine = palettes.getHEXa(c2, 0.25);
    let combo = Math.floor(fxrand() * 3);

    if (combo === 0) {
      left = c1;
      right = colorCount > 1 ? c2 : c1;
      top = colorCount > 2 ? c3 : c1;
    } else if (combo === 1) {
      right = c1;
      top = colorCount > 1 ? c2 : c1;
      left = colorCount > 2 ? c3 : c1;
    } else if (combo === 2) {
      top = c1;
      left = colorCount > 1 ? c2 : c1;
      right = colorCount > 2 ? c3 : c1;
    }
    meta = background;
    metaAlt = c1;
    border = metaAlt;
    frame = background;
    overlayTxt = metaAlt;

  } else if (style.startsWith("ILLUSTRATE")) {
    const colorCount = parseInt(style.split(":")[1]);
    let c1 = colors[0];
    let c2 = colorCount > 2 ? colors[1] : c1;
    let c3 = colorCount > 3 ? colors[2] : c2;
    let c4 = colorCount > 4 ? colors[3] : c3;

    background = selectedBackground;
    stroke = palette.stroke;
    frame = stroke;
    pilotLine =
      background !== stroke ?
        palettes.getHEXa(palette.stroke, 0.1) :
        palettes.getHEXa(c1, 0.1);

    let randomSides = Math.floor(fxrand() * 3);
    if (randomSides === 0) {
      left = darkSide ? stroke : c1;
      right = c2;
      top = c3;
    } else if (randomSides === 1) {
      left = darkSide ? stroke : c3;
      right = c1;
      top = c2;
    } else if (randomSides === 2) {
      left = c2;
      right = darkSide ? stroke : c3;
      top = c1;
    }

    meta = background;
    metaAlt = c1;
    border = c1;
    if (!framed) {
      meta =
        palettes.contrastRatio(border, background) > 1.5 ? background : stroke;
      metaAlt = palettes.contrastRatio(background, c1) > 1.5 ? c1 : stroke;
    } else if (framed) {
      // Cool little flip trick if contrast not great
      meta = palettes.contrastRatio(border, stroke) > 1.5 ? stroke : background;
      metaAlt =
        palettes.contrastRatio(background, stroke) > 1.5 ? stroke : border;
    }
    overlayTxt = metaAlt;
  }

  const overlayContrast = palettes.contrastRatio(background, overlayTxt);
  if (overlayContrast < 1.5) {
    overlayTxt = palette.stroke;
  }

  overlay = palettes.getHEXa(background, 0.85);

  const colorArr = [background, left, right, top, border];
  const uniqueColors = [...new Set(colorArr)];
  const uniqueColorCount = uniqueColors.length;

  return {
    background,
    stroke,
    pilotLine,
    left,
    right,
    top,
    meta,
    metaAlt,
    border,
    overlay,
    overlayTxt,
    uniqueColorCount,
  };
}
