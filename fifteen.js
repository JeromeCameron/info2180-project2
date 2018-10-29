"use strict";
window.onload = function(){

    /*Apperance*/
        /*Setting up Tiles*/
        let parentTile = document.getElementById('puzzlearea');
        let tiles = parentTile.querySelectorAll("div");
        let x = 0;
        const col = 4;

        tiles.forEach(item => {
                item.classList.add('puzzlepiece');
                item.style.top =(Math.floor(x / col)) * 100 + "px";
                item.style.left = ( x % col ) * 100 + "px";
                item.style.backgroundPosition = "-"+item.style.left+" "+"-"+item.style.top;
                x += 1;
            });

    /*Behavior*/



    /*Extra Features*/
}
