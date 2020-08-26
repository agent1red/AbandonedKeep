// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

var app = {};

window.onload = function () {

    var player = { hp: 100 };
    var sword = { str: 20, name: "fire sword", location: 2, aka: ['sword'] };
    var dagger = { str: 10, name: "dagger", location: 0, aka:['knife'] };
    var coin = { str: 0, name: "coin", location: 0, aka: ['money', 'loot'] };
    var fish = { str: 0, name: "dead fish", location: 0, aka: ['fish','trout'] };

   

    var objects = [sword, dagger, coin, fish];
    app.objects = objects;
    var entrance = {id:1, n: 2, s: 0, e: 0, w: 0, name: "Front Gate", desc: 'You are at the front gate. There are iron bars rusting on the windows.' }
    var greatHall = { id: 2, n: 0, s: 1, e: 0, w: 0, name: "Great Hall", desc: 'This is the Great Hall.' }


    var rooms = [entrance, greatHall];
    app.rooms = rooms;
    

    player.inventory = [];
    player.location = 1;
    
    app.player = player;

    app.where = function () {
        var room = this.rooms[this.player.location - 1]; 
        document.getElementById('outputText').append("You are at the "+room.name + "\n");
        this.showObjects();
    }

    app.look = function () {
        var room = this.rooms[this.player.location - 1];
        document.getElementById('outputText').append(room.desc + "\n");

    }

    app.pickUp = function (item) {
        var found = false;
        for (var i = 0; i < app.objects.length; i++) {
            var obj = app.objects[i];
            if (obj.name == item) {
                app.player.inventory.push(obj);
            }
            for (var j = 0; j < obj.aka.length; j++) {
                if (obj.aka[j] == item) {
                    if (obj.location == this.player.location) {
                        found = true;
                        app.player.inventory.push(obj);
                        this.say(obj.name + " taken!")
                    }  
                    
                }
            }
        }
        if (found == false) {
            this.say("There is no " + item + " here");
        }
    }





    app.clicked = function () {


        var text = document.getElementById('commandText').value;
        var words = text.split(" ");

        var verb = words[0];
        var object = words[1];

        switch (verb) {
            case "inventory": this.showInventory();

                break;

            case "move":
            case "walk":
            case "go":
            case "run":
                this.move(object);

                break;

            case "take":
                this.pickUp(object);
                break;

            case "drop":
                this.drop(object);
                break;
            case "where":
                this.where();
                break;

            case "look":
                this.look();
                break;
        }

        //document.getElementById('outputText').append(text + "\n");

    }
    app.move = function (dir) {
        var room = this.rooms[this.player.location - 1]; 
        switch (dir) {
            case "north":
            if (room.n != 0) {
                    this.player.location = room.n;
                this.where();
                this.showObjects();
            } else {
                this.say("there is no door in that direction");
            }
                break;
            case "south":
                if (room.s != 0) {
                    this.player.location = room.s;
                    this.where();
                    this.showObjects();
                } else {
                    this.say("there is no door in that direction");
                }
                break;
            case "east":
                if (room.e != 0) {
                    this.player.location = room.e;
                    this.where();
                    this.showObjects();
                } else {
                    this.say("there is no door in that direction");
                }
                break;
            case "west":
                if (room.w != 0) {
                    this.player.location = room.w;
                    this.where();
                    this.showObjects();
                } else {
                    this.say("there is no door in that direction");
                }
                break;
        }
    }
    app.showInventory = function () {

        var len = app.player.inventory.length;
        var inString = "\n You are carrying "

        if (len == 0) {
            inString += "nothing";
        }
        for (var i = 0; i < len; i++) {
            inString += app.player.inventory[i].name + " ,";
        }
        inString += "\n";
        document.getElementById('outputText').append(inString);

    }

    app.showObjects = function () {
        for (var i = 0; i < app.objects.length; i++) {
            var obj = app.objects[i];
            if (obj.location == this.player.location) {
                this.say("there is a " + obj.name + " here");
            }
        }
    }

    app.say = function (text) {
        document.getElementById('outputText').append(text + "\n");
    }
}
