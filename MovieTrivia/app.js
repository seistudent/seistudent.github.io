/////////////////
//Game Logic
////////////////

// 1) create an array of top 250 movies
// 2) pick 10 and populate carousell
// 3) pull details of movie and store answers
// 4) player scrolls through each movie and answers the trivia question
// 5) if correct, scores 1 point and updates score board


/////////////////
//Actual code
/////////////////


$(() => {

  /////////////////////////////
  //Carousell Functionality
  /////////////////////////////

  // current image counter
  let currentImgIndex = 0;

  // counts how many images there are in the carousel
  let numberOfMovies = 10;

  // next button
  $('.next').on('click', () => {
    // we want current img to hide
    console.log(currentImgIndex);
    $('.carousel-inner').children().eq(currentImgIndex).css('display', 'none')
    // increment currentImgIndex
    if (currentImgIndex < numberOfMovies-1) {
      currentImgIndex ++;
    } else {
      currentImgIndex = 0;
    }
    // we want the next img to show
    $('.carousel-inner').children().eq(currentImgIndex).css('display', 'block')
  })

  // previous button
  $('.previous').on('click', () => {
    // we want the current img to hide
    $('.carousel-inner').children().eq(currentImgIndex).css('display', 'none');
    // decrement currentImgIndex
    if(currentImgIndex > 0) {
      currentImgIndex--;
    } else {
      currentImgIndex = numberOfMovies;
    }
    // we want the previous img to show
    $('.carousel-inner').children().eq(currentImgIndex).css('display', 'block');
  })


  ///////////////////////
  //Game Set up
  ///////////////////////

  //set up movie database
  const masterMovieDatabase250 = ["The Shawshank Redemption", "The Godfather", "Joker", "The Dark Knight", "The Godfather: Part II", "The Lord of the Rings: The Return of the King", "Pulp Fiction", "Schindler's List", "12 Angry Men", "Fight Club", "The Lord of the Rings: The Fellowship of the Ring", "Forrest Gump", "Drishyam", "The Lord of the Rings: The Two Towers", "Goodfellas", "One Flew Over the Cuckoo's Nest", "Harakiri", "Interstellar", "City of God", "Saving Private Ryan", "The Green Mile", "Life Is Beautiful", "Se7en", "The Silence of the Lambs", "Seven Samurai", "It's a Wonderful Life", "Parasite", "Whiplash", "The Intouchables", "The Prestige", "The Departed", "The Pianist", "Gladiator", "American History X", "Léon: The Professional", "The Lion King", "Cinema Paradiso", "Grave of the Fireflies", "Casablanca", "The Great Dictator", "Modern Times", "City Lights", "Capernaum", "Your Name.", "Dangal", "Django Unchained", "3 Idiots", "Like Stars on Earth", "The Lives of Others", "Oldboy", "Once Upon a Time in America", "The Shining", "Apocalypse Now", "Witness for the Prosecution", "Paths of Glory", "Sunset Blvd.", "Drishyam", "The Hunt", "A Separation", "Incendies", "My Father and My Son", "Inglourious Basterds", "Eternal Sunshine of the Spotless Mind", "Requiem for a Dream", "American Beauty", "Good Will Hunting", "Children of Heaven", "The Bandit", "Braveheart", "Reservoir Dogs", "Full Metal Jacket", "Come and See", "Amadeus", "Scarface", "Das Boot", "Taxi Driver", "The Sting", "A Clockwork Orange", "To Kill a Mockingbird", "Lawrence of Arabia", "The Apartment", "Ikiru", "Bicycle Thieves", "Double Indemnity", "Citizen Kane", "Metropolis", "The Kid", "Green Book", "Three Billboards Outside Ebbing, Missouri", "Room", "PK", "Inside Out", "Gangs of Wasseypur", "The Secret in Their Eyes", "Warrior", "The Wolf of Wall Street", "Pan's Labyrinth", "V for Vendetta", "Rang De Basanti", "Munna Bhai M.B.B.S."]
  let movieDatabase250 = masterMovieDatabase250;
  let movieSelection = [];
  let selectedMoviesIndex = [];

  //Scoreboard
  let players = [1, 2];
  let currentPlayer = players[0];
  let p1score = 0;
  let p2score = 0;
  let answers = ["", "", "", "", "", "", "", "", "", ""];
  let roundsRemaining = 3;

  //Timer
  let totalTime = 60 //in seconds
  let currentTime = totalTime
  let firstTap = true
  let timer = null

  //Set parameters page
  $('#player1ParamInput').on('click', () => {
    let player1Name = $('#player1Param').val();
    $('#p1scoreTitle').html(player1Name+": ");
  });

  $('#player2ParamInput').on('click', () => {
    let player2Name = $('#player2Param').val();
    $('#p2scoreTitle').html(player2Name+": ");
  });

  $('#timeLimitInput').on('click', () => {
    let userInput = $('#timeLimit2').val();
    totalTime = userInput;
    currentTime = totalTime;
    $('#timer').html(currentTime);
  });

  $('#numberOfMoviesSelectedInput').on('click', () => {
    let userInput = $('#numberOfMoviesSelected2').val();
    numberOfMovies = userInput;
    $('#moviesPerRound').text(numberOfMovies+ " per round!");
  })

  $('#numberOfRoundsInput').on('click', () => {
    let userInput = $('#numberOfRounds').val();
    numberOfRounds = userInput;
    $('#roundsRemaining').text(numberOfRounds+ " round(s) to play!");
  })

  //Key functions
  const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
  };

  const setTimer = () => {
      if (firstTap == true){
          firstTap = false
          timer = setInterval(function(){
              currentTime--
              $('#timer').html(currentTime);
              if (currentTime < 0){
                  currentTime = totalTime
                  $('#timer').html(currentTime);
                  clearInterval(timer);
                  //Hide answer panel
                  $('#firstQ').toggleClass('hidden');
                  $('#answerInputs').toggleClass('hidden');
                  alert("Time is up!");
                  //Round status update
                  if (currentPlayer===2) {
                    roundsRemaining--;
                    if (roundsRemaining===-1) {
                      alert('End of Game!')
                      if (p1Score>p2Score) {
                        alert('Player 1 is the Movie Trivia Champion!');
                      } else if (p1Score<p2Score) {
                        alert('Player 2 is the Movie Trivia Champion!');
                      } else {
                        alert('Wow, both of you are equals!')
                      };
                    } else {
                      $('#roundsRemaining').text(roundsRemaining+ " Rounds to play!");
                    }
                  };
                  //change player counter
                  players.reverse();
                  currentPlayer=players[0];
                  $('#currentPlayer').text("Player "+currentPlayer);
                  $('#p1scoreTitle').toggleClass('activePlayer');
                  $('#p1Score').toggleClass('activePlayer');
                  $('#p2scoreTitle').toggleClass('activePlayer');
                  $('#p2Score').toggleClass('activePlayer');
                  //reset Array
                  movieSelection=[];
                  firstTap = true;
              }
          }, 1000)
      }
  };
  $('#timer').html(". " + currentTime);

  ////////////
  //Buttons
  ////////////

  // Home button
  $('#home').on('click', () => {
    //functionality
    $('.scoreboard').removeClass('hidden');
    $('.rules').addClass('hidden');
    $('.cover').removeClass('hidden');
    $('.parameters').addClass('hidden');
    //formatting
    $('#home').addClass('active');
    $('#gameRules').removeClass('active');
    $('#gameParameters').removeClass('active');
  })

  // Set Parameters Button
  $('#gameParameters').on('click', () => {
    //functionality
    $('.scoreboard').addClass('hidden');
    $('.cover').addClass('hidden');
    $('.rules').addClass('hidden');
    $('.parameters').removeClass('hidden');
    //formatting
    $('#gameParameters').addClass('active');
    $('#gameRules').removeClass('active');
    $('#home').removeClass('active');
  })

  // Game Rules button
  $('#gameRules').on('click', () => {
    //functionality
    $('.scoreboard').addClass('hidden');
    $('.rules').removeClass('hidden');
    $('.cover').addClass('hidden');
    $('.parameters').addClass('hidden');
    //formatting
    $('#gameRules').addClass('active');
    $('#home').removeClass('active');
    $('#gameParameters').removeClass('active');
  })

  //Submit Answer Button
  $('#submitAnswer').on('click', (event)=>{
        event.preventDefault();
        const userInput = $('#submitAnswerInput').val();
        // console.log(answers);
        if (answers[currentImgIndex] === "") {
            if (userInput===movieSelection[currentImgIndex].Year) {
              alert('Brilliant!')
              if (currentPlayer==1) {
                p1score++;
                $('#p1Score').text(p1score + " points");
              } else if (currentPlayer==2) {
                p2score++;
                $('#p2Score').text(p2score + " points");
              };
            } else {
              alert('Sorry, wrong answer! Move on to the next one!')
            };
            answers[currentImgIndex]=userInput;
        } else {
          alert('You have answered this before! No cheating!')
        }
        console.log(answers);
    })

    //Start Game
    $('#startGame').on('click', (event)=>{
      console.log("startGame being run");
      setTimer();
      //reset answers and movieSelection
      answers = ["", "", "", "", "", "", "", "", "", ""];
      movieSelection = [];
      for (var i = 1; i < numberOfMovies; i++) {
        $(`.carousel-item`).eq(`${1}`).remove();
      };
      currentImgIndex = 0;
      //pull movies API
      let counter = 99;
      for (var i = 0; i < numberOfMovies; i++) {
        getMovie(counter).then(function(movieSelection) {
          if(movieSelection.length === numberOfMovies) {
              populatePosters(movieSelection)
          }
        })
      };
      console.log("Completed Generating Movie Array");
    })


  ///////////////////////
  //API Functionalities
  ///////////////////////

  // let masterMovieDatabase250Size = 49;

  //Function to pull movie from OMDB API
  function getMovie(counter) {
    return new Promise((resolve, reject) => {
      // Check to make sure movie has not been selected before
      let randomSelection = -1;
      let selected = false;
      while(!selected) {
        randomSelection = getRandomInt(counter);
            if (selectedMoviesIndex.includes(randomSelection)===false) {
              selectedMoviesIndex.push(randomSelection);
              selected = true;
            }
      }
      // ajax call
        $.ajax({
            url:'http://www.omdbapi.com/?apikey=53aa2cd6&t=' + movieDatabase250[randomSelection]
        }).then(
            (data)=>{
                movieSelection.push(data);
                resolve(movieSelection);
            },
            ()=>{
                console.log('bad');
                reject();
            }
        );
    });
  }

  //Function to populate movie posters pulled into the carousel
  const createNewPoster = (i) => {
    $newDiv = $('<div>').addClass('carousel-item');
    $newImg = $('<img>').attr('id', 'option'+i);
    $newImg.attr('src', '');
    $newImg.addClass('d-block w-25')
    $('.carousel-inner').append($newDiv);
    $newDiv.append($newImg);
  };

  const populatePosters = (movieSelection123) => {
    console.log("Movies selected: "+movieSelection.length);
    console.log(movieSelection);
    $('#firstQ').toggleClass('hidden');
    $('#answerInputs').toggleClass('hidden');
    $('#option0').attr('src', movieSelection[0].Poster);
    for (var i = 1; i < numberOfMovies; i++) {
      createNewPoster(i);
      $(`#option${i}`).attr('src', movieSelection[i].Poster);
    }
  };

});
