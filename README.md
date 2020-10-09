# challenge-countries

This challenge is to create an app that gets a list of countries from an API and has the ability to search and filter them. 


## Setup & Running
- Clone this repo
- Run `npm i` to install dependencies
- Run `npm run dev` to start dev server
- cd into `app/main.jsx` and start creating the app from there

## Instructions
- User should be able to view all countries in a table.
- User should be able to see these information about each country: `name`, `capital`, `region`, `population`, `languages` and `timezones`
- User should be able to search countries by: `name`, `capital` and `languages`
- User should choose by which from the above columns he/she wants to search.
- User should be able to select a region and list all countries from that region.
- User should be able to filter countries that has a population between 2 inputs.
- User should be able to use all 3 search/filter functionalities together, e.g. if the user selects `Asia` as a region, chooses to search by `name`, searches for `sa` and adds a population boundary of `15000` and `5000000` the result should be all countries from `Asia` that there names has `sa` and has a population between `15000` and `5000000`
- User should be able to clear all searches/filters by one click.

## Rules
- use this open source API to get the list of countries https://restcountries.eu/
- use [material-ui](https://aterial-ui.com/) components.
- don't use any external libraries that are not already in the repo.
- make sure that the components you create are reusable, e.g. if we add another view to list and search for animals we could use the same components.
- Follow these [coding style guidelines](https://gist.github.com/davidguttman/9fbdd0e9ee1fb3b33f5cf693195f2edb#code-style)
- Be creative