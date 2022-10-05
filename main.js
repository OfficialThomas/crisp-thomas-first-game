title = "JUMP STAR";

description = `
[Hold] Set angle
[Release] Jump
`;

characters = [];

const G = {
  WIDTH: 200,
  HEIGHT: 150,
  STAR_SPEED_MIN: 0.5,
  STAR_SPEED_MAX: 1.0
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Star
 */

/**
 * @type { Star [] }
 */
let stars;

function update() {
  //startup function
  if (!ticks) {
    stars = times(20, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(0, G.HEIGHT);

      return {
        pos: vec(posX, posY),
        speed: rnd(0.5, 1.0)
      };
    });
  }
}

addEventListener("load", onLoad);