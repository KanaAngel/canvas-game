class TestScene extends Scene {
  update(ctx, step) {
    ctx.fillStyle = `white`;
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

    ctx.fillStyle = `red`;
    ctx.fillRect((step % ctx.canvas.width) - 5,0,32,32);
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
