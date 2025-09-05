(function(w){

    const initEvent = () => {
        document.querySelector('#moreBtn').addEventListener('click', () => {
            console.log('click');
        });
    }

    initEvent();

})(this);
