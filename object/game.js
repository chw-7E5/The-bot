const Discord = require('discord.js');

/** 
     * @param {Discord.Message} msg The message
     * @param {Discord.User} player0 The first user player
     * @param {Discord.User} player1 The second user player
     */

var Game = function (msg, player0, player1) {
    this.msg = msg;
    this.round = 0; // 0
    this.guild = msg.guild
    this.channel = msg.channel
    this.player0 = player0
    this.player1 = player1
    this.board = 
        [9,9,9,
         9,9,9,
         9,9,9]
};

/** 
     * @param {int} x 
     * @param {int} y 
     * @param {int} player The player
     */

Game.prototype.place = function(_x,_y,player) {
    x = parseInt(_x)
    y = parseInt(_y)
    function at(x,y){
        return x + y*3
    }
    // check if placing is allowed
    if(at(x,y) > 8 || at(x,y) < 0) return false;
    if(this.board[at(x,y)] === 0 || this.board[at(x,y)]  === 1) return false
    this.board[at(x,y)] = player
    this.check(x,y)
    return true;
};

Game.prototype.check = function(x,y) {
    var validate = (position) =>{
        if(position >= 0 && position < this.board.length)
            return true
        else return false;
    }
    
    function at(x,y){
        return x + y*3
    }

    var h_vic = 0;
    var v_vic = 0;
    var ls_vic = 0;
    var rs_vic = 0;
    for(var i = 0; i <= 2; i++){
        if(this.board[at(i,y)] === 0)
            h_vic++
        else if(this.board[at(i,y)] === 1)
            h_vic--

        if(this.board[at(x,i)] === 0)
            v_vic++
        else if(this.board[at(x,i)] === 1)
            v_vic--

        if(this.board[at(i,i)] === 0)
            rs_vic++
        else if(this.board[at(i,i)] === 1)
            rs_vic--

        if(this.board[at(i,2-i)] === 0)
            ls_vic++
        else if(this.board[at(i,2-i)] === 1)
            ls_vic--
    }

    if(h_vic === 3 || v_vic === 3 || rs_vic === 3 || ls_vic === 3) return this.winner = 0
    if(h_vic === -3 || v_vic === -3 || rs_vic === -3 || ls_vic === -3) return this.winner = 1
};

Game.prototype.end = function() {
    if(this.winner === 0)
        return this.channel.send(`Game ended, <@${player0.id}> won!`)
    else if(this.winner === 0)
        return this.channel.send(`Game ended, <@${player1.id}> won!`)
    else
        return this.channel.send(`Game ended, no one won!`)
        
}

module.exports = Game

