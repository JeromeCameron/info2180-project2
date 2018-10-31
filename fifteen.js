"use strict";
window.onload = function(){

    //Global Variables
    let blankTileX = 0; //Blank tile Row value
    let blankTileY = 0; //Blank tile Column value
    let Xpx = 0;        //Stores style.top px value
    let Ypx = 0;        //Stores style.left px value

    //Apperance and Set Up

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
        //sets up tiles with background image
        tiles.forEach(item => {
                item.classList.add('puzzlepiece');
                item.style.top =(Math.floor(x / grid)) * 100 + "px";
                item.style.left = ( x % grid ) * 100 + "px";
                item.style.backgroundPosition = "-"+item.style.left+" "+"-"+item.style.top;
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
    function moveTile(item){
        //Temp variables to track changing values
        let tempX = parseInt(item.style.top);
        let tempY = parseInt(item.style.left);
        let tempTileX = parseInt(item.id[5]);
        let tempTileY = parseInt(item.id[7]);
        //Assign new values to tile top and left style attributes to change its position
        item.style.top = Xpx + 'px';
        item.style.left = Ypx + 'px';
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
            console.log("true");
            return true;
        }else if((blankTileX - row === 0 && blankTileY - col === -1) || (blankTileX - row === -1 && blankTileY - col === 0)){
            return true;
        }else{
            console.log("false");
            return false;
        }
    }

    /* Extra Features */
}
