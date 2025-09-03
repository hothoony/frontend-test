(function(w){

    const list = [
        { title: "1 번째 아이템", description: "이것은 첫 번째 아이템의 상세 설명입니다. 중요한 정보가 포함되어 있습니다." },
        { title: "2 번째 아이템", description: "두 번째 아이템에 대한 설명으로, 다양한 기능을 제공합니다." },
        { title: "3 번째 아이템", description: "세 번째 아이템은 특별한 속성을 가지고 있으며 사용자에게 유용합니다." },
        { title: "4 번째 아이템", description: "네 번째 아이템의 상세한 정보와 사용 방법에 대한 안내입니다." },
        { title: "5 번째 아이템", description: "다섯 번째 아이템은 고급 기능을 제공하며 전문가용입니다." },
        { title: "6 번째 아이템", description: "여섯 번째 아이템에 대한 자세한 설명과 활용 방안입니다." },
        { title: "7 번째 아이템", description: "일곱 번째 아이템의 특징과 장점에 대한 상세 정보입니다." },
        { title: "8 번째 아이템", description: "여덟 번째 아이템은 혁신적인 기술을 적용한 제품입니다." },
        { title: "9 번째 아이템", description: "아홉 번째 아이템의 독특한 특성과 사용 사례입니다." },
        { title: "10 번째 아이템", description: "열 번째 아이템에 대한 포괄적인 정보와 가이드라인입니다." },
        { title: "11 번째 아이템", description: "열한 번째 아이템의 고유한 기능과 성능에 대한 설명입니다." },
        { title: "12 번째 아이템", description: "열두 번째 아이템은 최신 기술이 적용된 혁신적인 솔루션입니다." },
        { title: "13 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "14 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "15 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "16 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "17 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "18 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "19 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "20 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "21 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "22 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
        { title: "23 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." },
    ];

    const createItem = (item) => {
        const itemDiv = `
            <div>
                <div class="item-title">${item.title}</div>
                <div class="item-description">${item.description}</div>
            </div>
        `;
        return itemDiv;
    }

    const initEvent = () => {
        document.querySelector('#moreBtn').addEventListener('click', () => {
            renderMore();
        });
    }

    let page = 0;
    let pageSize = 5;
    let displayList = [];

    const renderList = (pageList) => {

        displayList = [...displayList, ...pageList];

        let content = '';
        for (let item of displayList) {
            content += createItem(item);
        }

        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = content;

        if (displayList.length >= list.length) {
            document.querySelector('#moreBtn').style.display = 'none';
        }
    }

    const renderFirst = () => {
        console.log('renderFirst');

        page = 1;
        const sidx = (page - 1) * pageSize;
        const eidx = page * pageSize;
        const pageList = list.slice(sidx, eidx);
        renderList(pageList);
    }

    const renderMore = () => {
        console.log('renderMore');

        page++;
        const sidx = (page - 1) * pageSize;
        const eidx = page * pageSize;
        const pageList = list.slice(sidx, eidx);
        renderList(pageList);
    }

    const init = () => {
        renderFirst();
    }

    document.addEventListener('DOMContentLoaded', () => {
        initEvent();
        init();
    });

})(this);
