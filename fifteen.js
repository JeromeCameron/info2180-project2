"use strict";
window.onload = function(){

    /*Apperance*/
        /*Setting up Tiles*/
        let parentTile = document.getElementById('puzzlearea');
        let tiles = parentTile.querySelectorAll("div");
        let x = 0;

        tiles.forEach(item => {
                item.classList.add('puzzlepiece');
                item.style.top =(Math.floor(x / 4)) * 100 + "px";
                item.style.left = ( x % 4 ) * 100 + "px";
                item.style.backgroundPosition = "-"+item.style.left+" "+"-"+item.style.top;
                x += 1;
            });

    /*Behavior*/



    /*Extra Features*/
}
