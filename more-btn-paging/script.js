class ListPagination {
    constructor() {
        this.allItems = []; // 전체 데이터
        this.displayedItems = []; // 현재 화면에 표시된 데이터
        this.itemsPerPage = 5; // 한 번에 보여줄 아이템 수
        this.currentPage = 0; // 현재 페이지 (0부터 시작)
        
        // DOM 요소들
        this.listContainer = document.getElementById('listContainer');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.displayedCountEl = document.getElementById('displayedCount');
        this.totalCountEl = document.getElementById('totalCount');
        
        this.init();
    }
    
    async init() {
        // 더보기 버튼 이벤트 리스너
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreItems();
        });
        
        // 데이터 fetch 및 초기 렌더링
        await this.fetchData();
        this.renderInitialItems();
    }
    
    // API에서 데이터를 가져오는 함수 (실제로는 fetch를 사용)
    async fetchData() {
        // 로딩 표시
        this.showLoading();
        
        try {
            // 실제 API 호출을 시뮬레이션 (13개 아이템)
            await this.simulateApiDelay();
            
            this.allItems = [
                { id: 1, title: "첫 번째 아이템", description: "이것은 첫 번째 아이템의 상세 설명입니다. 중요한 정보가 포함되어 있습니다." },
                { id: 2, title: "두 번째 아이템", description: "두 번째 아이템에 대한 설명으로, 다양한 기능을 제공합니다." },
                { id: 3, title: "세 번째 아이템", description: "세 번째 아이템은 특별한 속성을 가지고 있으며 사용자에게 유용합니다." },
                { id: 4, title: "네 번째 아이템", description: "네 번째 아이템의 상세한 정보와 사용 방법에 대한 안내입니다." },
                { id: 5, title: "다섯 번째 아이템", description: "다섯 번째 아이템은 고급 기능을 제공하며 전문가용입니다." },
                { id: 6, title: "여섯 번째 아이템", description: "여섯 번째 아이템에 대한 자세한 설명과 활용 방안입니다." },
                { id: 7, title: "일곱 번째 아이템", description: "일곱 번째 아이템의 특징과 장점에 대한 상세 정보입니다." },
                { id: 8, title: "여덟 번째 아이템", description: "여덟 번째 아이템은 혁신적인 기술을 적용한 제품입니다." },
                { id: 9, title: "아홉 번째 아이템", description: "아홉 번째 아이템의 독특한 특성과 사용 사례입니다." },
                { id: 10, title: "열 번째 아이템", description: "열 번째 아이템에 대한 포괄적인 정보와 가이드라인입니다." },
                { id: 11, title: "열한 번째 아이템", description: "열한 번째 아이템의 고유한 기능과 성능에 대한 설명입니다." },
                { id: 12, title: "열두 번째 아이템", description: "열두 번째 아이템은 최신 기술이 적용된 혁신적인 솔루션입니다." },
                { id: 13, title: "열세 번째 아이템", description: "마지막 아이템으로, 모든 기능을 종합한 완성형 제품입니다." }
            ];
            
            // 전체 개수 업데이트
            this.totalCountEl.textContent = this.allItems.length;
            
        } catch (error) {
            console.error('데이터를 가져오는데 실패했습니다:', error);
            this.showError();
        } finally {
            this.hideLoading();
        }
    }
    
    // API 지연 시뮬레이션
    simulateApiDelay() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000); // 1초 지연
        });
    }
    
    // 초기 아이템들 렌더링 (처음 5개)
    renderInitialItems() {
        if (this.allItems.length === 0) return;
        
        // 처음 5개 아이템 추출
        const initialItems = this.allItems.slice(0, this.itemsPerPage);
        this.displayedItems = [...initialItems];
        this.currentPage = 1;
        
        // 화면에 렌더링
        this.renderItems(initialItems);
        this.updateStats();
        
        // 더보기 버튼 표시 여부 결정
        if (this.allItems.length > this.itemsPerPage) {
            this.loadMoreBtn.classList.remove('hidden');
        }
    }
    
    // 더보기 버튼 클릭 시 추가 아이템 로드
    loadMoreItems() {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.allItems.length);
        const newItems = this.allItems.slice(startIndex, endIndex);
        
        if (newItems.length > 0) {
            // 새 아이템들을 표시된 아이템들에 추가
            this.displayedItems = [...this.displayedItems, ...newItems];
            this.currentPage++;
            
            // 새 아이템들 렌더링
            this.renderItems(newItems, true);
            this.updateStats();
            
            // 모든 아이템이 표시되었으면 더보기 버튼 숨기기
            if (this.displayedItems.length >= this.allItems.length) {
                this.loadMoreBtn.classList.add('hidden');
            }
        }
    }
    
    // 아이템들을 화면에 렌더링
    renderItems(items, isAppend = false) {
        if (!isAppend) {
            this.listContainer.innerHTML = '';
        }
        
        items.forEach((item, index) => {
            const itemElement = this.createItemElement(item, index);
            this.listContainer.appendChild(itemElement);
        });
    }
    
    // 개별 아이템 요소 생성
    createItemElement(item, index) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'list-item';
        itemDiv.style.animationDelay = `${index * 0.1}s`;
        
        itemDiv.innerHTML = `
            <div class="item-title">${item.title}</div>
            <div class="item-description">${item.description}</div>
        `;
        
        return itemDiv;
    }
    
    // 통계 정보 업데이트
    updateStats() {
        this.displayedCountEl.textContent = this.displayedItems.length;
    }
    
    // 로딩 표시
    showLoading() {
        this.loadingIndicator.classList.remove('hidden');
    }
    
    // 로딩 숨기기
    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
    }
    
    // 에러 표시
    showError() {
        this.listContainer.innerHTML = `
            <div style="text-align: center; color: #dc3545; padding: 20px;">
                ❌ 데이터를 불러오는데 실패했습니다.
            </div>
        `;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ListPagination();
});