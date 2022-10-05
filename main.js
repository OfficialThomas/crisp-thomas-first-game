title = "Snowy Day";

description = `
AVOID 
HYPOTHERMIA

[Hold] 
Pause Snow
`;

characters = [
  `
llllll
ll l l
ll l l
llllll
 l  l
 l  l
  `,
  `
llllll
ll l l
ll l l
llllll
ll  ll
  `
];

const G = {
  WIDTH: 100,
  HEIGHT: 150,
  STAR_SPEED_MIN: 0.5,
  STAR_SPEED_MAX: 1.0
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isPlayingBgm: true,
  isReplayEnabled: true,
  isDrawingScoreFront: true,
  theme: "dark"
};

/**
* @typedef {{
* pos: Vector, speed: number
* }} Star
*/
  
/**
* @type  { Star [] }
*/
let stars = [];
startick = 0;

/** @type {{pos: Vector, vx: number, ty: number}} */
let player;

function update() {
  //startup function
  if (!ticks) {
    //star setup
    for (let i = 0; i < 2; i++) {
      stars.push({
          pos: vec(rnd(0, G.WIDTH), 0),
          speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
      });
    }

    player = { pos: vec(G.WIDTH/2, 98), vx: 1, ty: 90 };
  }

  // Update for Star
  stars.forEach((s) => {
    // Move the star downwards
    s.pos.y += s.speed;
    // Bring the star back to top once it's past the bottom of the screen
    s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
    if (s.pos.y < G.HEIGHT && s.pos.y > 15 * G.HEIGHT/16) {
      s.pos.x = rnd(1, G.WIDTH - 1);
    }

    // Choose a color to draw
    color("light_black");
    // Draw the star as a square of size 1
    box(s.pos, 2);
  });

  startick += 1;
  if (startick > 120) {
    stars.push({
      pos: vec(rnd(0, G.WIDTH), 0),
      speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
    });
    startick = 0;
  }
  
  if (input.isPressed) {
    stars.forEach((s) => {
      s.speed = 0;
    });
  }
  else {
    stars.forEach((s) => {
      s.speed = rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX);
    });
  }

  color("light_black");
  rect(0, 100, G.WIDTH, 200);

  color("red")
  const c = char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;
}

addEventListener("load", onLoad);