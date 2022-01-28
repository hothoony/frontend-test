function MusicPlayer(name) {

    var name = name;
    var volume = 100;

    function play() {
        console.log('playing ' + name);
    }

    function stop() {
        console.log('stopped ' + name);
    }

    function volumeUp() {
        volume += 10;
    }

    function volumeDown() {
        volume -= 10;
    }

    function getVolume() {
        return volume;
    }

    return {
        play: play,
        stop: stop,
        volumeUp: volumeUp,
        volumeDown: volumeDown,
        getVolume: getVolume,
    }
}

// -----------------------------------------------

var player = new MusicPlayer('kpop');
player.play();
player.stop();
console.log(player.volume); // 프로퍼티 접근이 안됨
console.log(player.getVolume());
player.volumeDown();
player.volumeDown();
console.log(player.volume); // 프로퍼티 접근이 안됨
console.log(player.getVolume());
console.log('');

var player2 = new MusicPlayer('balad');
player2.play();
player2.stop();
console.log(player2.volume); // 프로퍼티 접근이 안됨
console.log(player2.getVolume());
player2.volumeDown();
player2.volumeDown();
player2.volumeDown();
player2.volumeUp();
player2.volumeUp();
console.log(player2.volume); // 프로퍼티 접근이 안됨
console.log(player2.getVolume());
console.log('');
