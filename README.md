# MongoDB Task

This is the task I got:

1. From scratch, make a few Schemas:
   ● A Solar System with:
   ○ planets (an array of Planet objects)
   ○ starName (a String)
   ● A Planet with:
   ○ name (String)
   ○ system (System object)
   ○ visitors (array of Visitor objects)
   ● A Visitor with:
   ○ name (String)
   ○ homePlanet (Planet object)
   ○ visitedPlanets (array of Planet objects)

2. Once those are set up, populate a few fields in your DB. You can make up your own
   planets, but make sure you're using what you’ve learned above.
   With everything ready, make the following queries using what you know about
   population:
   ● Find a visitor's list of visited planets
   ● Find all the visitors on a planet
   ● Find all the visitors in a system (sub-documents!)
   ● Find the name of the star in the system of a visitor's home planet
   ● Find a planet's system's star name as well as its visitors
