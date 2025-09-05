(function(w){

    const initEvent = () => {
        document.querySelector('#moreBtn').addEventListener('click', () => {
            console.log('click');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initEvent();
    });

})(this);
