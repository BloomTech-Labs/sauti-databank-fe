## Project Breakdown
---
### App flow

> The user selects an item in `FilterBox.js` which sends state to App and back down to `Queries.js` which tells our Apollo GraphQL plugin what to query the backend for. In order to display the data, it needs to be in a certain format. The data is passed from `Queries.js` to `dataParse.js` to put the data in the correct format and then passed to `Graph.js` for displaying.

### Dataparse

> Takes in raw data and, based on what kind of information the user is asking for, will run a different function to shape it into the correct format. The correct format will always be an array of objects. The dataParse function uses a lot of loops to go through the data and, one step at a time, performing appropriate actions to get our end result. 

> **_Note that the dataParse function avoids manipulating objects directly and instead attempts to create either a new object or a copy of the object before continuing. This is due to object properties in JS being immutable, which can cause problems if you try to directly manipulate an object._**

### Queries

> Using GraphQL and Apollo, queries are written from the frontend. In `Queries.js` you'll find some conditionals that will determine which table to get the data from. We utilized the users table, which has less data overall, when there was no need to request data from the sessions table. If both the index and crossfilter are available on the users table, we use that.

## Checklist

*  Implement login for Lance so that only _he_ has access to csv download
*  Ability to save graph as a pdf or image file
*  The "other" bucket doesn't work when cross-filtering
*  UI/UX improvements for `FilterBox.js`
*  Some most requested cross-filters are missing some bars because of the way Nivo works
*  Improvements can be made to reduce the amount of code and conditional statements in all files
*  Support multiple additional filters
*  Support viewing data over time with line graph (Get all data for certain dates, split up data by month in React, shape data for each month and send to Nivo. We'll need to tell Nivo switch to a different type of graph)

