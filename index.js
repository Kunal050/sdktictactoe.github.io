console.log(`Welcome to TicTacToe`);
let user1 = prompt("User1: Please Enter your name");
let response1 = prompt(user1+` Enter your choice from "X" or "0"`);
let user2 = prompt("User2: Please Enter your name");
response1 = response1.toUpperCase();
let winner = '';
let response2 = response1==='X'?'0':'X';
let changeT = 0;

let d1 = document.getElementsByClassName("u1")[0];
let d2 = document.getElementsByClassName("u2")[0];
d1.innerText = user1+` (${response1})`;
d2.innerText = user2+` (${response2})`;

let music = new Audio("music.mp3");
let turnMusic = new Audio("turn_music.wav");
let gameOver = new Audio("win_music.wav");
let turn = "X";
document.getElementsByClassName("info")[0].innerText += turn===response1?user1:user2 + `!`;
let isGameover = false;
let count=0;

//Function to Change Turn
const changeTurn = () =>{
    return turn==="X"?"0":"X";
}
//Function to check for win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135]
    ]
    wins.forEach(e =>{
        if(boxtext[e[0]].innerText === boxtext[e[1]].innerText && boxtext[e[2]].innerText === boxtext[e[1]].innerText && boxtext[e[0]].innerText !== '')
        {
            if(boxtext[e[0]].innerText === response1)
              {  
                document.querySelector(".info").innerText =  `${user1} Won!`; 
                winner = response1;
              }
            else
              {
                document.querySelector(".info").innerText =  `${user2} Won!`; 
                winner = response2;
              }
            isGameover = true;
            gameOver.play();
            document.getElementsByClassName("info")[0].style.fontsize="32px";

            //UPDATE_POINT_TABLE------------------->
            if(boxtext[e[0]].innerText === response1){
                let d3 = document.getElementsByClassName("p1")[0];
                d3.innerText = parseInt(d3.innerText) + 1; 
            }else{
                let d3 = document.getElementsByClassName("p2")[0];
                d3.innerText = parseInt(d3.innerText) + 1; 
            }
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px";
            document.querySelector('.line').style.width='32vw';
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
        if((!isGameover) && (count===9))
        {
            document.querySelector(".info").innerText = "Its a Draw, try again!"; 
        }
    })
}

//GAME LOGIC
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', ()=>{
        if(!isGameover)
        {
            if(boxtext.innerText === '')
          {
            boxtext.innerText = turn;
            count++;
            turn = changeTurn();
            turnMusic.play();
            checkWin();
            if(!isGameover && count<9){
                document.getElementsByClassName("info")[0].innerText = `Its Your Turn ${turn===response1?user1:user2}`;
            }
          }
        }
    })
})

//AddOnClickLister on RESET button
    reset.addEventListener('click', ()=>{
        let boxtexts = document.querySelectorAll('.boxtext');
        Array.from(boxtexts).forEach(element => {
            element.innerText = "";
        });
        if(winner === 'X')
            turn = "X";
        else if(winner === '0')
            turn = "0";
        document.querySelector('.line').style.width='0vw';
        isGameover = false;
        count=0;
        document.getElementsByClassName("info")[0].innerText = `Its Your Turn ${turn===response1?user1:user2}`;
        document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
        gameOver.pause();
    })

//Add click listener on Reset the Point-Table-----------------
resetpoint.addEventListener('click', ()=>{
    let pt = document.querySelectorAll('.p');
    Array.from(pt).forEach(element => {
        element.innerText = '0';
    });
    //-----------------ALSO-RESET-THE-GAME--------------------
    // let boxtexts = document.querySelectorAll('.boxtext');
    //     Array.from(boxtexts).forEach(element => {
    //         element.innerText = "";
    //     });
        turn = "X";
    //     document.querySelector('.line').style.width='0vw';
    //     isGameover = false;
    //     count=0;
    //     document.getElementsByClassName("info")[0].innerText = "Turn for "+turn;
    //     document.querySelector('.imgbox').getElementsByTagName(img)[0].style.width = "0px";
})