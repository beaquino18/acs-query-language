# Lesson 1: GraphQL Intro

Write the query that solves each question. Using https://rickandmortyapi.com/graphql

1. Get Rick Sanchez's name and status.

```
query {
  character(id: 1) {
    name
    status
  }
}
```

Result:

```
{
  "data": {
    "character": {
      "name": "Rick Sanchez",
      "status": "Alive"
    }
  }
}
```

2. Get Morty Smith's name, species, and gender.

```
query {
  character(id:2) {
    name
    species
    gender
  }
}
```

Result:

```
{
  "data": {
    "character": {
      "name": "Morty Smith",
      "species": "Human",
      "gender": "Male"
    }
  }
}
```

3. Get Summer Smith's name and the name of her current location.

```
query {
  character(id:3) {
    name
    location {
      name
    }
  }
}
```

Result:

```
{
  "data": {
    "character": {
      "name": "Summer Smith",
      "location": {
        "name": "Earth (Replacement Dimension)"
      }
    }
  }
}
```

4. Get the total count of all characters. (Hint: try `characters { info { count } }`)

```
query {
  characters {
    info {
      count
    }
  }
}
```

Result:

```
{
  "data": {
    "characters": {
      "info": {
        "count": 826
      }
    }
  }
}
```

5. Get the name and air date of episode 1.

```
query {
  episode(id:1) {
    name
    air_date
  }
}
```

Result:

```
{
  "data": {
    "episode": {
      "name": "Pilot",
      "air_date": "December 2, 2013"
    }
  }
}
```

6. Get Rick's name and the name of his origin location.

```
query {
  character(id:1) {
    name
    origin {
      name
    }
  }
}
```

Result:

```
{
  "data": {
    "character": {
      "name": "Rick Sanchez",
      "origin": {
        "name": "Earth (C-137)"
      }
    }
  }
}
```

7. Get the dimension of Rick's origin location.

```
query {
  character(id:1) {
    name
    origin {
      name
      dimension
    }
  }
}
```

Result:

```
{
  "data": {
    "character": {
      "name": "Rick Sanchez",
      "origin": {
        "name": "Earth (C-137)",
        "dimension": "Dimension C-137"
      }
    }
  }
}
```

8. Get both Rick and Morty's names and species using a **single query**. Use aliases!

```
query {
  rick: character(id:1) {
    name
    species
  }
  morty: character(id:2) {
    name
    species
  }
}
```

Result:

```
{
  "data": {
    "rick": {
      "name": "Rick Sanchez",
      "species": "Human"
    },
    "morty": {
      "name": "Morty Smith",
      "species": "Human"
    }
  }
}
```

9. Get both Rick's origin location name and Morty's origin location name using a single query. Use aliases!

```
query {
  rick: character(id:1) {
    name
    origin {
      name
    }
  }
  morty: character(id:2) {
    name
    origin {
      name
    }
  }
}
```

Result:

```
{
  "data": {
    "rick": {
      "name": "Rick Sanchez",
      "origin": {
        "name": "Earth (C-137)"
      }
    },
    "morty": {
      "name": "Morty Smith",
      "origin": {
        "name": "unknown"
      }
    }
  }
}
```

10. Get the names of the first 3 residents of the Citadel of Ricks. (Hint: try `location(id: 3) { residents { name } }`)

```
query {
  location(id:3) {
    residents {
      name
    }
  }
}
```

Note: The `residents` field has no `first` or `limit` argument in the schema, so there's no way to ask GraphQL to get me the first 3 residents.

Result:

```
{
  "data": {
    "location": {
      "residents": [
        {
          "name": "Rick Sanchez"
        },
        {
          "name": "Morty Smith"
        },
        {
          "name": "Adjudicator Rick"
        },
        {
          "name": "Alien Morty"
        },
        {
          "name": "Alien Rick"
        },
        {
          "name": "Antenna Morty"
        },
        {
          "name": "Aqua Morty"
        },
        {
          "name": "Aqua Rick"
        },
        {
          "name": "Artist Morty"
        },
        {
          "name": "Big Head Morty"
        },
        {
          "name": "Big Morty"
        },
        {
          "name": "Body Guard Morty"
        },
        {
          "name": "Black Rick"
        },
        {
          "name": "Blue Shirt Morty"
        },
        {
          "name": "Bootleg Portal Chemist Rick"
        },
        {
          "name": "Campaign Manager Morty"
        },
        {
          "name": "Commander Rick"
        },
        {
          "name": "Cool Rick"
        },
        {
          "name": "Cop Morty"
        },
        {
          "name": "Cop Rick"
        },
        {
          "name": "Cowboy Morty"
        },
        {
          "name": "Cowboy Rick"
        },
        {
          "name": "Cyclops Morty"
        },
        {
          "name": "Cyclops Rick"
        },
        {
          "name": "Dipper and Mabel Mortys"
        },
        {
          "name": "Evil Morty"
        },
        {
          "name": "Evil Rick"
        },
        {
          "name": "Fat Morty"
        },
        {
          "name": "Garment District Rick"
        },
        {
          "name": "Glasses Morty"
        },
        {
          "name": "Hammerhead Morty"
        },
        {
          "name": "Insurance Rick"
        },
        {
          "name": "Investigator Rick"
        },
        {
          "name": "Juggling Rick"
        },
        {
          "name": "Lawyer Morty"
        },
        {
          "name": "Lizard Morty"
        },
        {
          "name": "Long Sleeved Morty"
        },
        {
          "name": "Mega Fruit Farmer Rick"
        },
        {
          "name": "Morty Mart Manager Morty"
        },
        {
          "name": "Morty Rick"
        },
        {
          "name": "Mortytown Loco"
        },
        {
          "name": "Plumber Rick"
        },
        {
          "name": "Regional Manager Rick"
        },
        {
          "name": "Reverse Rick Outrage"
        },
        {
          "name": "Rick D. Sanchez III"
        },
        {
          "name": "Rick Guilt Rick"
        },
        {
          "name": "Rick Prime"
        },
        {
          "name": "Rick D-99"
        },
        {
          "name": "Rick D716"
        },
        {
          "name": "Rick D716-B"
        },
        {
          "name": "Rick D716-C"
        },
        {
          "name": "Rick J-22"
        },
        {
          "name": "Riq IV"
        },
        {
          "name": "Robot Morty"
        },
        {
          "name": "Robot Rick"
        },
        {
          "name": "Simple Rick"
        },
        {
          "name": "Slick Morty"
        },
        {
          "name": "Slow Rick"
        },
        {
          "name": "Solicitor Rick"
        },
        {
          "name": "Teacher Rick"
        },
        {
          "name": "Tortured Morty"
        },
        {
          "name": "Trunk Morty"
        },
        {
          "name": "Wall Crawling Rick"
        },
        {
          "name": "Yellow Shirt Rick"
        },
        {
          "name": "Bearded Morty"
        },
        {
          "name": "Communication's Responsible Rick"
        },
        {
          "name": "Teleportation's Responsible Rick"
        },
        {
          "name": "SEAL Team Rick"
        },
        {
          "name": "SEAL Team Rick"
        },
        {
          "name": "SEAL Team Rick"
        },
        {
          "name": "SEAL Team Rick"
        },
        {
          "name": "Baby Rick"
        },
        {
          "name": "Bartender Morty"
        },
        {
          "name": "Dancer Cowboy Morty"
        },
        {
          "name": "Dancer Morty"
        },
        {
          "name": "Flower Morty"
        },
        {
          "name": "Hairdresser Rick"
        },
        {
          "name": "Journalist Rick"
        },
        {
          "name": "Private Sector Rick"
        },
        {
          "name": "Purple Morty"
        },
        {
          "name": "Retired General Rick"
        },
        {
          "name": "Secret Service Rick"
        },
        {
          "name": "Steve Jobs Rick"
        },
        {
          "name": "Sheik Rick"
        },
        {
          "name": "Modern Rick"
        },
        {
          "name": "Tan Rick"
        },
        {
          "name": "Visor Rick"
        },
        {
          "name": "Colonial Rick"
        },
        {
          "name": "P-Coat Rick"
        },
        {
          "name": "7+7 Years Old Morty"
        },
        {
          "name": "26 Years Old Morty"
        },
        {
          "name": "40 Years Old Morty"
        },
        {
          "name": "Andy"
        },
        {
          "name": "Baby Mouse Skin Morty"
        },
        {
          "name": "Metaphor for Capitalism"
        },
        {
          "name": "Stan Lee Rick"
        },
        {
          "name": "Re-Build-a-Morty Morty"
        },
        {
          "name": "Deformed Morty"
        },
        {
          "name": "Long Hair Rick"
        },
        {
          "name": "Redhead Rick"
        },
        {
          "name": "Redhead Morty"
        }
      ]
    }
  }
}
```
