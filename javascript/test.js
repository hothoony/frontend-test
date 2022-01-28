function Player(name) {
    var name = '';

    function play() {
        console.log('playing');
    }

    function stop() {
        console.log(' stopped');
    }

    return {
        play: play,
        stop: stop,
    }
}

function MusicPlayer(name) {

    // var name = '';
    var volume = 100;

    // function play() {
    //     console.log(name + ' playing volume = ' + volume);
    // }

    // function stop() {
    //     console.log(name + ' stopped');
    // }

    function volumeUp() {
        volume += 10;
        console.log('volumn up ' + volume);
    }

    function volumeDown() {
        volume -= 10;
        console.log('volumn down ' + volume);
    }

    function getVolume() {
        return volume;
    }

    return {
        // play: play,
        // stop: stop,
        volumeUp: volumeUp,
        volumeDown: volumeDown,
        getVolume: getVolume,
    }
}

// MusicPlayer.prototype = Player;
MusicPlayer.prototype = Object.create(Player.prototype);
MusicPlayer.prototype.constructor = MusicPlayer;

// -----------------------------------------------

var player = new MusicPlayer('kpop22');
player.volumeDown();
player.volumeDown();
player.volumeDown();
player.volumeUp();
player.play();
player.stop();
console.log('volume', player.volume); // 프로퍼티 접근이 안됨
console.log('getVolume()', player.getVolume());
console.log('');
