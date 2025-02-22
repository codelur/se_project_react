export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const weatherOptions = [
  {
    isDay: true,
    condition: "storm",
    url: new URL("./../assets/stormDay.svg", import.meta.url),
  },
  {
    isDay: false,
    condition: "storm",
    url: new URL("./../assets/stormNight.svg", import.meta.url),
  },
  {
    isDay: true,
    condition: "clear",
    url: new URL("./../assets/clearDay.svg", import.meta.url),
  },
  {
    isDay: false,
    condition: "clear",
    url: new URL("./../assets/clearNight.svg", import.meta.url),
  },

  {
    isDay: true,
    condition: "clouds",
    url: new URL("./../assets/cloudsDay.svg", import.meta.url),
  },
  {
    isDay: false,
    condition: "clouds",
    url: new URL("./../assets/cloudsNight.svg", import.meta.url),
  },
  {
    isDay: true,
    condition: "rain",
    url: new URL("./../assets/rainDay.svg", import.meta.url),
  },
  {
    isDay: false,
    condition: "rain",
    url: new URL("./../assets/rainNight.svg", import.meta.url),
  },
  {
    isDay: true,
    condition: "snow",
    url: new URL("./../assets/snowDay.svg", import.meta.url),
  },
  {
    isDay: false,
    condition: "snow",
    url: new URL("./../assets/snowNight.svg", import.meta.url),
  },
  {
    isDay: true,
    condition: "atmosphere",
    url: new URL("./../assets/atmosphereDay.svg", import.meta.url),
  },
  {
    isDay: false,
    condition: "atmosphere",
    url: new URL("./../assets/atmosphereNight.svg", import.meta.url),
  },
];

export const coordinates = { latitude: 34.068934, longitude: -118.280054 };

export const APIkey = "eb552af63de156e5e1c51d146217d8bf";

export const avatarSrc = new URL("./../assets/avatar.svg", import.meta.url);
export const altAvatarSrc = new URL(
  "./../assets/alternativeAvatar.svg",
  import.meta.url
);

export const defaultLiked = new URL(
  "./../assets/defaultLiked.svg",
  import.meta.url
);
export const liked = new URL("./../assets/liked.svg", import.meta.url);
