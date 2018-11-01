"use strict";
/*
Extra Features Used:
1. Animations and/or transitions
2. Multiple backgrounds
3. Game time
4. End-of-game notification
*/

window.onload = function(){

    //Global Variables
    let blankTileX = 0; //Blank tile Row value
    let blankTileY = 0; //Blank tile Column value
    let Xpx = 0;        //Stores style.top px value
    let Ypx = 0;        //Stores style.left px value

    //Apperance and Set Up
        let backImages = ["background.jpg","abstract-art.jpg","art.jpg","city-skyline.jpg"];
        let image = backImages[Math.floor(Math.random() * 4)];

        //On load this block of code sets up the appearance and attribute values of the puzzle pieces
        //Variables
        let parentTile = document.getElementById('puzzlearea');
        let tiles = parentTile.querySelectorAll("div");
        let row = 1;        //Stores Row value
        let col = 0;        //Stores Column value
        let x = 0;          //counter
        const grid = 4;     //number of cloumns
        let count = 1;      //counter
        let count_2 = 1;    //counter

        let node =  document.createElement("div");
        parentTile.after(node);
        node.style.margin="20px 20px 20px 20px";
        node.innerHTML = "Select from  our other backgrounds<br>";

        for(let i=0; i<4; i++){
            let newNode = document.createElement("img");
            node.after(newNode);
            newNode.src = backImages[i];
            newNode.style = "width:100px;height:100px;";
            newNode.setAttribute("id", "image_"+i);

            newNode.addEventListener("click", function(){
                let pic = document.getElementById(newNode.id).src;
                tiles.forEach(item => {
                loadBackground(item,pic);
                });
            });
        };

        //sets up tiles with background image
        tiles.forEach(item => {
                let img = image;
                item.classList.add('puzzlepiece');
                item.style.top =(Math.floor(x / grid)) * 100 + "px";
                item.style.left = ( x % grid ) * 100 + "px";
                loadBackground(item,img);
                //Variable counters
                x += 1;
                col += 1;
                count += 1;
                //sets ID for each attribute as it goes through the loop
                item.setAttribute("id", "tile_" + row + "," + col);
                //calculates the Row abd Column numbers for each tile
                if(count > 4){
                    row += 1;
                    count = 1;
                }
                if(count_2 === 4){
                    col = 0;
                    count_2 = 0;
                }
                count_2 += 1;
                //initial assignemnt of blank tile values
                blankTileX = parseInt(item.id[5]);
                blankTileY = parseInt(item.id[7]) + 1;
                Xpx = parseInt(item.style.top);
                Ypx = parseInt(item.style.left) + 100;
            });

    //Behavior


    tiles.forEach(item => {
        item.addEventListener("click", function(){
            if(isMovevable(item)){
                moveTile(item);
            }
        });
    });

    tiles.forEach(item => {
        item.addEventListener("mouseover", function(){
            if(isMovevable(item)){
                item.classList.add("movablepiece");
            }
        });
    });

    tiles.forEach(item => {
        item.addEventListener("mouseleave", function(){
            if(isMovevable(item)){
                item.classList.remove("movablepiece");
            }
        });
    });

    //This function moves puzzle pieces
    function moveTile(item,task){
        //Temp variables to track changing values
        let tempX = parseInt(item.style.top);
        let tempY = parseInt(item.style.left);
        let tempTileX = parseInt(item.id[5]);
        let tempTileY = parseInt(item.id[7]);
        //Assign new values to tile top and left style attributes to change its position
        if(task === "shuffle"){
            item.style.top = Xpx + 'px';
            item.style.left = Ypx + 'px';
        }else{
            $(item).animate({
                top: Xpx + 'px',
                left: Ypx + 'px',
            },500);
        }

        Xpx = tempX;
        Ypx = tempY;
        item.setAttribute("id", "tile_" + blankTileX + "," + blankTileY);
        blankTileX = tempTileX;
        blankTileY = tempTileY;
    }
    //Function checks it a tile is movevable
    function isMovevable(item){
        let row = parseInt(item.id[5]);
        let col = parseInt(item.id[7]);

        if((blankTileX - row === 1 && blankTileY - col === 0) || (blankTileX - row === 0 && blankTileY - col === 1)){
            return true;
        }else if((blankTileX - row === 0 && blankTileY - col === -1) || (blankTileX - row === -1 && blankTileY - col === 0)){
            return true;
        }else{
            return false;
        }
    }

    function shuffle(){
        let task = "shuffle";
        let button = document.querySelector("button");
        button.addEventListener("click", function(){
                    for(let i=0; i<100; i++){
                        tiles.forEach(item => {
                            if(isMovevable(item)){
                            moveTile(item,task);
                            }
                        });
                    }
        })
    }shuffle();

    function loadBackground(item,img){
        item.style.background = "url("+img+")";
        item.style.backgroundPosition = "-"+item.style.left+" "+"-"+item.style.top;
    }
}
