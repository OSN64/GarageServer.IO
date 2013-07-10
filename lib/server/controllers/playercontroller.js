var EntityController = require('./entitycontroller'),
    Player = require('../entities/player');

exports = module.exports = PlayerController;

function PlayerController () {
    EntityController.call(this);
}

PlayerController.prototype = Object.create(EntityController.prototype);

PlayerController.prototype.add = function (client) {
    var newPlayer, playerFound = false;

    this.entities.some(function (player) {
        if (player.client.id === client.id) {
            newPlayer = player;
            playerFound = true;
            return true;
        }
    });

    if (!playerFound) {
        newPlayer = new Player(client);
        this.entities.push(newPlayer);
    }
    return newPlayer;
};

PlayerController.prototype.addInput = function (id, input, sequence, time) {
    this.entities.some(function (player) {
        if (player.client.id === id) {
            player.inputs.push({ input: input, seq: sequence, time: time });
            return true;
        }
    });
};

PlayerController.prototype.setState = function (id, state) {
    this.entities.some(function (player) {
        if (player.client.id === id) {
            player.state = state;
            player.inputs = [];
            return true;
        }
    });
};