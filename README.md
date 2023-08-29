# Rock Paper Scissors Lizard Spock game ✊ 🖐 ✌️ 🤏 🖖

The game serves as an expanded version of the classic 'Rock Paper Scissors' game, introducing two additional variables for players to choose from. Participants make their selections in unison. Notably, this iteration accommodates more than two players and the likelihood of a tie is significantly reduced. Victory is achieved by outplaying the majority of opponents. In cases of a tie, the game is reiterated until a clear winner emerges.

This specific application is designed for a two-player scenario, involving the user and the computer. Each game consists of 9 rounds, and the first player to secure 5 round victories will clinch the overall game triumph. Round scores will be visibly displayed beneath the available game icons. To initiate play, simply click the button below, make your icon selection, and the computer will then randomly make its choice to compete against you.

You can play the game on the live site [here](https://sasantazayoni.github.io/Rock-paper-scissors-lizard-spock-game-CI-PP2/).

![Rock paper scissors lizard spock game on various devices](documentation/responsiveness.png)

## Table of Contents

- [User Experience](#user-experience)
  - [User stories](#user-stories)
  - [Design](#design)
    * [Overall feel](#overall-feel)
    * [Colour Scheme](#colour-scheme)
    * [Typography](#typography)
  - [Wireframes](#wireframes)
- [Features](#features)
  - [Current features](#current-features)
  - [Future features](#future-features)
- [Technologies used](#technologies-used)
  - [Languages used](#languages-used)
  - [Frameworks, libraries and programs used](#frameworks-libraries-and-programs-used)
- [Testing](#testing)
  - [Validator testing](#validator-testing)
  - [Testing User Stories from (UX) section](#testing-user-stories-from-ux-section)
  - [Personal testing](#personal-testing)
  - [Responsinator](#responsinator)
  - [Third-party testing](#third-party-testing)
  - [Lighthouse testing](#lighthouse-testing)
  - [PowerMapper Compatibility](#powermapper-compatibility)
  - [Other testing](#other-testing)
  - [Bugs](#bugs)
- [Deployment](#deployment)
- [Credits](#credits)

## User Experience

### User stories

* As a user, I want to immediately understand what the game is about and how it works.
* As a user, I want to play the game as soon as possible.
* As a user, I want a clear indication of my current score and to know my round result each time I play a round.
* As a user, I want to be able to keep a record of and track how many games I have won or lost overall.
* As a user, I want to be able to check the game instructions in case I forget how the game works.
* As a user, I want to be able to reset the record of game results.

### Design

#### Overall feel

Embodying a modern and captivating aesthetic, this application offers an overall ambience that is both contemporary and visually pleasing. While its primary role is to provide entertainment, it also serves as a valuable tool for resolving disagreements when consensus proves elusive.


#### Colour scheme

![Color Swatches](documentation/colours.png)

This carefully curated color combination blends bold contrasts and soothing shades to enhance user experience, infuse energy, and maintain visual clarity in our web application.

#### Typography

'Exo 2' is the font of choice in this application with a fallback of the font-stack 'Arial, Helvetica, sans-serif'. This was a deliberate decision to align with the game's dynamic and modern aesthetic. With its geometric letterforms and clean lines, Exo 2 effectively captures the energy and excitement that our game offers. Its legibility and versatility ensure that players can navigate effortlessly while being immersed in the vibrant experience we've crafted.

#### Wireframes

Comprehensive wireframes were developed to cater to all screen sizes. The decision to create single wireframes, without the need for variations in different screen sizes, was driven by the minimal impact on design elements beyond font and icon sizes. Explore the wireframes here:

The main game UI: <br>

![The main game UI](documentation/main-ui-wframe.jpg) <br>

The rules modal: <br>

![The rules modal](documentation/rules-modal-wframe.jpg) <br>

The game scores modal: <br>

![The game scores modal](documentation/scores-modal-wframe.jpg) <br>

The main game UI with an open modal: <br>

![The main game UI with an open modal](documentation/main-ui-with-open-modal-wframe.jpg) <br>

## Features  

### Current features  

* The application is designed using Responsive Design and is fully responsive on all devices. This includes the modals and their content.
* All buttons have a neon hover effect when hovered over: <br>
    * Buttons: <br>
    
  ![The reset button](documentation/resetbtn.jpg)
  ![The open-rules button](documentation/openrulesbtn.jpg)
  ![The open-scores button](documentation/openscoresbtn.jpg)
  ![The close-rules button](documentation/closerulesbtn.jpg)
  ![The close-scores button](documentation/closescoresbtn.jpg)

  * Buttons with hover effects: <br>

  ![The reset button with hover](documentation/resetbtnhover.jpg)
  ![The open-rules button with hover](documentation/openrulesbtnhover.jpg)
  ![The open-scores button with hover](documentation/openscoresbtnhover.jpg)
  ![The close-rules button with hover](documentation/closerulesbtnhover.jpg)
  ![The close-scores button with hover](documentation/closescoresbtnhover.jpg)
  
* The reset button has an additional pulse effect when clicked to indicate that the button has reset the game scores: <br>

  ![The reset button oulse effect](documentation/resetbtnpulse.jpg)

* Clicking on the "See rules" button opens the rules modal: <br>

  ![The rules modal](documentation/rulesmodal.jpg)

* Clicking on the "Wins & Losses" button opens the game scores modal: <br>

  ![The game scores modal](documentation/scoresmodal.jpg)

* Modals can be closed by clicking on the button corresponding to the modal or by clicking on the overlay.
* The game icons have a hover effect on them indicating that they can be clicked: <br>

  ![The game icons](documentation/icons.jpg)

* Whenever an icon is clicked, it is compared against the computer's choice (which is random) and the UI is updated accordingly.
    * When the player wins, the round score of the player is incremented by 1 and the player's chosen icon is displayed with maximum opacity and slightly enlarged in the space beneath the player's round score while the computer's choice is displayed with partial opacity in the space beneath the computer's round score: <br>

    ![Winning a round](documentation/win.jpg)

    * When the player loses, the round score of the computer is incremented by 1 and the computer's chosen icon is displayed with maximum opacity and slightly enlarged in the space beneath the computer's round score while the player's choice is displayed with partial opacity in the space beneath the player's round score: <br>

    ![Losing a round](documentation/lose.jpg)

    * In the case of a draw, neither round is incremented and both chosen icons display with partial opacity beneath the respective scores
 
    ![Drawing a round](documentation/draw.jpg)

* After each round, the results are recorded both in the round scores and in the UI so that the player can see their previous choices as well as the computer's. The viewport will extend in size if there are many round played:

    ![Multiple rounds played](documentation/multiround.jpg)

* The game ends when either the player or the computer has 5 round wins. This increments the game scores in the scores modal and is stored in local storage in case the player closes their browser. Text is dynamically inserted into the scores modal depending on whether the player has won or lost the game and then removed when the modal is closed:

    ![End of game text](documentation/dynamictext.jpg)

* The game scores (but not round scores) can be reset using the reset button in the main UI.

### Future features

* A voice recognition can be introduced for a better user experience. This should be able to open the rules, check the scores, close modals, reset and play the game by saying simple commands like "Rules" or "Scores" or "Lizard".
* A feature can be added to allow multiple players to play against each other.
* Sound effects can be added for better user experience.
