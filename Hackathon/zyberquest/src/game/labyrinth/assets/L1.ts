export const L1 = (() => {
  const width = 20;
  const height = 15;
  const tilewidth = 16;
  const tileheight = 16;

  // 0 = floor, 1 = wall
  const floors = new Array(width * height).fill(0);
  const walls = new Array(width * height).fill(0);

  const idx = (x: number, y: number) => y * width + x;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isBorder = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      if (isBorder) walls[idx(x, y)] = 1;
    }
  }

  const doorX = Math.floor(width / 2);
  walls[idx(doorX, 0)] = 2;

  return {
    height,
    width,
    tilewidth,
    tileheight,
    type: "map",
    version: 1.6,
    tiledversion: "1.10.2",
    orientation: "orthogonal",
    renderorder: "right-down",
    infinite: false,
    nextlayerid: 3,
    nextobjectid: 1,
    layers: [
      {
        id: 1,
        name: "floors",
        type: "tilelayer",
        width,
        height,
        opacity: 1,
        visible: true,
        data: floors,
        x: 0,
        y: 0
      },
      {
        id: 2,
        name: "walls",
        type: "tilelayer",
        width,
        height,
        opacity: 1,
        visible: true,
        data: walls,
        x: 0,
        y: 0
      }
    ],
    tilesets: [
      {
        firstgid: 1,
        name: "tiles_basic",
        tilewidth,
        tileheight,
        spacing: 0,
        margin: 0,
        columns: 4,
        tilecount: 4,
        image: "tiles_basic.png", 
        imagewidth: 64,
        imageheight: 16
      }
    ]
  };
})();
