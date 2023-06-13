const data = [
    {
        "groupCd": "A01",
        "codes": [
            {
                "label": "재직",
                "value": "A01020"
            },
            {
                "label": "휴직",
                "value": "A01070"
            },
            {
                "label": "퇴사",
                "value": "A01999"
            }
        ]
    },
    {
        "groupCd": "B01",
        "codes": [
            {
                "label": "한국어",
                "value": "B011"
            },
            {
                "label": "영어",
                "value": "B012"
            }
        ]
    },
    {
        "groupCd": "C01",
        "codes": [
            {
                "label": "여자",
                "value": "C01F"
            },
            {
                "label": "남자",
                "value": "C01M"
            }
        ]
    }
];

for (let item of data) {
    // console.log(item);
    console.log(JSON.stringify(item));
}

const getCodeByGroupCd = (groupCd => {
    return data.filter(e => e.groupCd === groupCd)
               .map(e => e.codes)[0]; // 첫번째 원소를 리턴
});

const codeA01 = getCodeByGroupCd('A01');
console.log('codeA01 =', JSON.stringify(codeA01));

const codeB01 = getCodeByGroupCd('B01');
console.log('codeB01 =', JSON.stringify(codeB01));

const codeC01 = getCodeByGroupCd('C01');
console.log('codeC01 =', JSON.stringify(codeC01));
