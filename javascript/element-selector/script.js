(function(w) {

    document.addEventListener('DOMContentLoaded', () => {

        // 1. querySelector: CSS 선택자와 일치하는 첫 번째 요소를 반환합니다.
        console.log('--- querySelector ---');
        const mainContent = document.querySelector('#main-content');
        mainContent.classList.add('highlight');
        console.log('#main-content 요소를 선택하고 highlight 클래스를 추가했습니다.', mainContent);

        // 2. querySelectorAll: CSS 선택자와 일치하는 모든 요소의 NodeList를 반환합니다.
        console.log('\n--- querySelectorAll ---');
        const items = mainContent.querySelectorAll('.item');
        console.log('.item 클래스를 가진 모든 요소를 선택했습니다.', items);
        items.forEach((item, index) => {
            item.textContent += ` (${index + 1}번)`;
        });

        // 특별(special) 항목을 찾아 변수에 저장합니다.
        const specialItem = document.querySelector('.special');
        console.log('\n선택된 특별 항목:', specialItem);

        // 3. closest: 자신을 포함하여 CSS 선택자와 일치하는 가장 가까운 조상 요소를 반환합니다.
        console.log('\n--- closest ---');
        const contentBlock = specialItem.closest('.content-block');
        console.log('.special 요소의 가장 가까운 .content-block 조상:', contentBlock);

        // 4. matches: 요소가 주어진 CSS 선택자와 일치하는지 여부를 true/false로 반환합니다.
        console.log('\n--- matches ---');
        if (specialItem.matches('.special')) {
            console.log('.special 요소는 ".special" 선택자와 일치합니다.');
        }
        if (!specialItem.matches('div')) {
            console.log('.special 요소는 "div" 선택자와 일치하지 않습니다.');
        }

        // 5. previousElementSibling: 요소의 바로 이전 형제 요소를 반환합니다.
        console.log('\n--- previousElementSibling ---');
        const prevSibling = specialItem.previousElementSibling;
        if (prevSibling) {
            prevSibling.classList.add('bold-text');
            console.log('.special 요소의 이전 형제 요소에 bold-text 클래스를 추가했습니다.', prevSibling);
        }

        // 6. insertAdjacentHTML: 지정된 위치에 HTML 텍스트를 파싱하여 DOM 트리에 노드를 삽입합니다.
        console.log('\n--- insertAdjacentHTML ---');
        const addButton = document.querySelector('.btn-add');
        addButton.addEventListener('click', () => {
            const targetBlock = document.querySelector('.content-block[data-id="block-2"]');
            const htmlToAdd = '<div class="new-element">동적으로 추가된 요소입니다.</div>';
            
            // 'beforeend'는 대상 요소의 마지막 자식 바로 뒤에 삽입합니다.
            targetBlock.insertAdjacentHTML('beforeend', htmlToAdd);
            console.log('새로운 HTML 요소를 추가했습니다.');
            // 한 번만 추가되도록 리스너를 제거합니다.
            addButton.disabled = true;
        });

        // 추가 예제: 이벤트 위임을 사용한 클릭 처리
        const firstBlock = document.querySelector('[data-id="block-1"]');
        firstBlock.addEventListener('click', (event) => {
            // 클릭된 요소가 .btn-change인지 확인합니다.
            if (event.target.matches('.btn-change')) {
                console.log('\n스타일 변경 버튼이 클릭되었습니다.');
                const paragraph = firstBlock.querySelector('p');
                paragraph.style.color = 'blue';
                paragraph.style.fontWeight = 'bold';
            }
        });
    });


})(this);
