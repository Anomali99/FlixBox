# FlixBox

Simple web application for streaming video collections. Using it is quite easy, you only need to build it once and when adding a new video you just need to change one file. This website can also be combined with Nginx which is placed on an external hard disk, so it can be run directly on any computer.

## Tech Stack

- React JS (Vite)
- TypeScript
- TailwindCSS

## Installation

#### 1. Build Project

you can [download the build](https://github.com/Anomali99/FlixBox/releases/tag/build-1.1) or build manually :

- clone github repository

```cmd
git clone https://github.com/Anomali99/FlixBox.git
```

- install ependencies

```cmd
cd FlixBox
npm install
```

- build project

```cmd
npm run dev
```

#### 2. add data

you can add videos, whether movies or series. The video is placed in the `movie` folder if you don't have it first, and the poster is in the `image` folder if you don't have it first.

- example of video `movie` data

```json
{
  "id": 1,
  "title": "Venom: The Last Dance",
  "slug": "venom_the_last_dance",
  "year": "2024",
  "type": "movie",
  "poster": "venom.jpg",
  "group": { "id": 1, "name": "Spider-Man" },
  "class": { "id": 1, "name": "Venom" },
  "genre": [{ "id": 1, "name": "Action" }],
  "path": { "moviePath": "D21.FUN-Venom_ The Last Dance (2024)-1080p.mp4" }
}
```

- example of video `series` data

```json
{
  "id": 3,
  "title": "Soul Land 2",
  "slug": "soul_land_2",
  "year": "2024",
  "type": "series",
  "poster": "soulLand.jpg",
  "group": { "id": 3, "name": "Animation" },
  "genre": [
    { "id": 1, "name": "Action" },
    { "id": 2, "name": "Animation" }
  ],
  "path": [
    {
      "eps": "74",
      "moviePath": "soulLand2/[Anixverse]_Soul_Land_II_-_74_V1_[720p].mkv"
    },
    {
      "eps": "75",
      "moviePath": "soulLand2/[Anixverse]_Soul_Land_II_-_75_V1_[720p].mkv"
    }
  ]
}
```

poster and video paths are written without including the `video/image` and without the beginning `/`.

- example full data

```json
{
  "genre": [
    { "id": 1, "name": "Action" },
    { "id": 2, "name": "Animation" }
  ],
  "group": [
    {
      "id": 1,
      "name": "Spider-Man",
      "class": [
        { "id": 1, "name": "Spider-Man" },
        { "id": 2, "name": "Venom" }
      ]
    },
    { "id": 2, "name": "Animation" }
  ],
  "film": [{}, {}]
}
```

you can see the data type details for `DataType` in [data/index.ts](https://github.com/Anomali99/FlixBox/blob/main/src/data/index.ts).

#### 3. Configuration (Optional)

you can add configuration to the app.conf.json file, the configuration is `height` and `hide`. height is the number of x6 films displayed in home, search and history. while hide is to hide films based on `title/year/type/group/class/genre`, this hide is optional so it is not mandatory, the use of hide can also be stacked.

- configuration example

```json
{
  "height": 4,
  "hide": {
    "title": ["Transformers One"],
    "genre": ["Animation"]
  }
}
```

#### 3. Finished

you can run it with the [Nginx](https://nginx.org/), [Apache](https://httpd.apache.org/) or similar web server.
