class FGInput extends Input {
  light = 0;
  heavy = 0;
  run = 0;

  constructor() {
    super();

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 90) this.light = 1;
      if (e.keyCode == 88) this.heavy = 1;
      if (e.keyCode == 16) this.run = 1;
    });

    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 90) this.light = 0;
      if (e.keyCode == 88) this.heavy = 0;
      if (e.keyCode == 16) this.run = 0;
    });
  }
}

class ControlsScene extends Scene {
  constructor() {
    super();
    this.init();
  }

  init() {
    var controlViewer = new ControlViewer();
    this.gameObjects.push(controlViewer);
  }

  update(ctx, step) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

    this.gameObjects.forEach((obj) => {
      obj.update(ctx, step);
    });
  }
}

class ControlViewer extends GameObject {
  arrowInput = new ArrowInput();
  fgInput = new FGInput();

  update(ctx, step) {
    // Up key
    ctx.fillStyle = `rgb(${ this.arrowInput.up > 0 ? 255 : 0 },0,0)`;
    ctx.fillRect(310, 60, 180, 80);

    // Left key
    ctx.fillStyle = `rgb(${ this.arrowInput.left > 0 ? 255 : 0 },0,${ this.arrowInput.left > 0 && this.fgInput.run > 0 ? step / 2 % 255 : 0 })`;
    ctx.fillRect(110, 160, 180, 80);

    // Down key
    ctx.fillStyle = `rgb(${ this.arrowInput.down > 0 ? 255 : 0 },0,0)`;
    ctx.fillRect(310, 160, 180, 80);

    // Right key
    ctx.fillStyle = `rgb(${ this.arrowInput.right > 0 ? 255 : 0 },0,${ this.arrowInput.right > 0 && this.fgInput.run > 0 ? step / 2 % 255 : 0 })`;
    ctx.fillRect(510, 160, 180, 80);

    // Light attack key
    ctx.fillStyle = `rgb(${ this.fgInput.light > 0 ? 255 : 0 },0,0)`;
    ctx.fillRect(110, 310, 280, 80);

    /*// Heavy attack key
    ctx.fillStyle = `rgb(${ this.fgInput.heavy > 0 ? 255 : 0 },0,0)`;
    ctx.fillRectc(410, 310, 280, 80);*/

    var inputCode = "";

    // First number: Attack Type
    if (this.fgInput.light > 0) inputCode += "1";
    //else if (this.fgInput.heavy > 0) inputCode += "2";
    else inputCode += "0";

    // Second number: Direction
    if (this.arrowInput.down > 0) inputCode += "3";
    else if (this.arrowInput.right > 0) inputCode += "4";
    else if (this.arrowInput.left > 0) inputCode += "2";
    else if (this.arrowInput.up > 0) inputCode += "1";
    else inputCode += "0";

    // Third Number: Aerial
    inputCode += "0";

    // Fourth Number: Dashing
    if (this.fgInput.run > 0) inputCode += "1";
    else inputCode += "0";

    ctx.fillStyle = 'black';
    ctx.font = '22px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.translateCode(inputCode), 400, 275, 250);
  }

  translateCode(code) {
    var chars = code.split('');
    var name = "";

    switch (chars[1]) {
      case "1":
        name += "Skyward";
        break;
      case "2":
        name += "Left";
        break;
      case "3":
        name += "Downward";
        break;
      case "4":
        name += "Right";
        break;
    }

    if (chars[0] == '1') name += " Light Attack";

    return name.trim();
  }
}

// Bind the game engine to a canvas element.
function bind(canvas) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    return console.error("Could not bind to canvas: given object was not a canvas.");
  }

  window.engine = new Engine(canvas);
  engine.init();
  console.log("Engine bound to", canvas);

  init();
}

function init() {
  engine.sceneManager.loadSingle(new ControlsScene());
}

function setDimensions() {
  engine.canvas.width = 800;
  engine.canvas.height = 450;
}

window.onload = () => {
  bind(document.getElementById('canvas'));
  setDimensions();
};
