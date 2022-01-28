function MusicPlayer(name) {

    this.name = name;
    this.volume = 100;

    this.play = function() {
        console.log('playing ' + this.name);
    }

    this.stop = function() {
        console.log('stopped ' + this.name);
    }

    this.volumeUp = function() {
        this.volume += 10;
    }

    this.volumeDown = function() {
        this.volume -= 10;
    }

    this.getVolume = function() {
        return this.volume;
    }
}

// -----------------------------------------------

var player = new MusicPlayer('kpop');
player.play();
player.stop();
console.log(player.volume); // 프로퍼티 접근이 됨
console.log(player.getVolume());
player.volumeDown();
player.volumeDown();
console.log(player.volume); // 프로퍼티 접근이 됨
console.log(player.getVolume());
