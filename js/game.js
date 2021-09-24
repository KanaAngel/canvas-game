class TestScene extends Scene {
  constructor() {
    super();
    this.init();
  }

  init() {
    var character = new Character();
    this.gameObjects.push(character);
  }

  update(ctx, step) {
    ctx.fillStyle = `white`;
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);


    this.gameObjects.forEach((obj) => {
      obj.update(ctx, step);
    });
  }
}

class Character extends GameObject {
  input = new ArrowInput();

  update(ctx, step) {
    ctx.fillStyle = `rgb(0,${255 - (step / 2 % 255)},0)`;
    if (this.input.up > 0) ctx.fillRect(0, 0, 10, 10);
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
  engine.sceneManager.loadSingle(new TestScene());
}

function fixAspectRatio() {
  if (!engine) {
    return console.error("Couldn't fix aspect ratio on non-existent game.");
  }

  var w = window.innerWidth;
  var h = 9.0 * window.innerWidth / 16.0;

  if (h > window.innerHeight) {
    w = 16.0 * window.innerHeight / 9.0;
    h = window.innerHeight;
  }

  engine.canvas.width = w + 1;
  engine.canvas.height = h;
}

window.onload = () => {
  bind(document.getElementById('canvas'));
  fixAspectRatio();
};

window.onresize = fixAspectRatio;
