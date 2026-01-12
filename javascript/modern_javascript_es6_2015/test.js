
const title = '여기는 제목입니다';
const cond = true;

const markUp1 = `
<a href="#" class="item-link">
    <h2 class="item-title">${title}</h2>
    <span>icon</span>
</a>
`;

const markUp2 = `
<div href="#" class="item">
    <div class="item-content">
        <h2 class="item-title">${title}</h2>
        <div>
            <span>icon</span>
        </div>
    </div>
</div>
`;

let markUp = '';
if (cond) {
    markUp += `
        <a href="#" class="item-link">
            <h2 class="item-title">${title}</h2>
            <span>icon</span>
        </a>
        `;
} else {
    markUp += `
        <div href="#" class="item">
            <div class="item-content">
                <h2 class="item-title">${title}</h2>
                <div>
                    <span>icon</span>
                </div>
            </div>
        </div>
        `;
}

console.log(markUp1);
console.log(markUp2);
console.log(markUp);

function callApi({name, age}) {
    console.log();
    console.log('callApi');
    console.log('name', name);
    console.log('age', age);
}

callApi({name: 'james', age: 20});
