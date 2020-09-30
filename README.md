# Duelduko

## The story

I often enjoy Sudoku, along with my wife. Sometimes when I'm solving a puzle, she'll offer to help and suggest certain numbers to fill in. While the help isn't necessarily needed, it did give me this idea: Competitive Sudoku. My thought was, what if we could each use our own phone to play the same board at the same time, with each of our scores tracked individually, allowing us to compete for the best score.

## The goal

I plan on adding a lot more features, and maybe one day getting it on the play store or ios app store, but for now it's really just a fun project I'll run on a server somewhere so I can enjoy a multiplayer version of what was originally just a game you only needed a pencil and piece of paper for.

## The tech

I wanted to make this relatively simple to run. Apart from starting the server, no other dependencies are required. No redis, no database, nothing. There's no place to login, no storage of any data, just a easy to run server. Next.JS felt like an obvious choice because it's a single command to get the whole thing working.

## How to run

1. `npm install`
2. `npm start`
