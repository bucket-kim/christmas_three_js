export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.png",
      "textures/environmentMap/nx.png",
      "textures/environmentMap/py.png",
      "textures/environmentMap/ny.png",
      "textures/environmentMap/pz.png",
      "textures/environmentMap/nz.png",
    ],
  },
  // {
  //   name: "environmentMapTexture",
  //   type: "cubeTexture",
  //   path: "textures/environmentMap/studio_country_hall_1k.hdr",
  // },
  // model import
  {
    name: "christmasModel",
    type: "gltfModel",
    path: "models/christmas.gltf",
  },
  {
    name: "floorModel",
    type: "gltfModel",
    path: "models/floor.gltf",
  },
  // texture import
  {
    name: "christmasTexture",
    type: "texture",
    path: "textures/christmasTexture/colorMap.png",
  },
  {
    name: "christmasRoughnessTexture",
    type: "texture",
    path: "textures/christmasTexture/roughnessMap.png",
  },
  {
    name: "christmasMetalnessTexture",
    type: "texture",
    path: "textures/christmasTexture/metalMap.png",
  },
  {
    name: "floorTexture",
    type: "texture",
    path: "textures/floorTexture/colorMap2.png",
  },
  {
    name: "floorRoughness",
    type: "texture",
    path: "textures/floorTexture/floorRoughness.png",
  },
];
