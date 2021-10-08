# PokemonTest Documentation


## 1. Key concept(s) and/or intention(s) driving the project. Include any noteworthy inspirations or influences

To begin with this project, I searched on the Internet and looked for some interesting data sets. I came across this website - [Kaggle](https://www.kaggle.com/datasets). There are lots of datasets and I found [a pokemon dataset](https://www.kaggle.com/rounakbanik/pokemon).
I am a super Pokemon fan and I was aimed to make some fun with this project. 
I remenber that in the Pokemon animation, there is a plot that Ash and the Rocket team participating a Pokemon test. I planed to make an online version of it to let everyone test themselves and learn more about Pokemon.


## 2. Production decisions (i.e. technical, design, creative, etc.)

### Tech
I used jQuery for dom manipulation and microanimation and [jquery.csv.js](https://github.com/evanplaice/jquery-csv) to deal with CSV file I downloaded from the Internet.

### Design
- To create the Pokemon test vibe, I include a clip of the animation of that plot and placed it before the test. 
- I used a hand-writing style font [Gluten](https://fonts.google.com/specimen/Gluten#glyphs) to make it look cute and suitble for the theme.
- Also I used some Pokemon elements(pokeballs and the who-i-am question which is from the orginal Pokemon animation series) to set off the atmosphere.
- To display each Pokemon's ability value, I made a bar chart visulization to give users a stronger sense about it's abilities.


## 3. Major challenges and solutions (i.e. the most difficult aspects of the project for you and how you attempted to address them)
The major challenge is how to deal with null data. In this data set, there are some Pokemon's height and weight data that are empty. I didn't notice it when I was developing it until I invited my friend to test the game. I added a function to hide the height and weight value if these data are empty.


## 4.Lessons learned as well as potential next steps if work on the project continues
I learned that when you are dealing with a data set, it is very important to observe the characteristics of the data, such as the maximum and minimum; in some cases, will it be empty...Otherwise, you might encounter some errors.


## 5.Any relevant references/resources
- [a pokemon dataset](https://www.kaggle.com/rounakbanik/pokemon).
- [The Official Pokémon Website ](https://www.pokemon.com/us/)
- [jquery.csv.js](https://github.com/evanplaice/jquery-csv)
- [Gluten](https://fonts.google.com/specimen/Gluten#glyphs)



Project:
https://acetree.github.io/PokemonTestExam1/


Github Repo:
https://github.com/Acetree/PokemonTestExam1
