let data = ['mac', 'linux', 'windows'];

let osType1 = data[0];
let osType2 = data[1];
console.log(osType1, osType2);

let [osType3,,osType4] = data;
console.log(osType3, osType4);
