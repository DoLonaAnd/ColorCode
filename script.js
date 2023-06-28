let colorCode = "#000000";
let colorProperties = [0, 0, 0, "FF"];
let colorLabel = ["red", "green", "blue", "transparent"];

const Codes = [
    document.getElementById("red"),
    document.getElementById("green"),
    document.getElementById("blue"),
    document.getElementById("transparent")
];
const CNum = [
    document.getElementById("red_num"),
    document.getElementById("green_num"),
    document.getElementById("blue_num"),
    document.getElementById("transparent_num")
]
const C = document.getElementById("color_code");
// キャメルケース変換
const toCamelcase = function(str, upper = true) {
	if (typeof str !== 'string') return str;

	var strs = str.split(/[-_ ]+/), i = 1, len = strs.length;

	if (len <= 1) return str;

	if (upper) {
		i = 0;
		str = '';
	} else {
		str = strs[0].toLowerCase();
	}

	for (; i < len; i++) {
		str += strs[i].toLowerCase().replace(/^[a-z]/, function(value) {
			return value.toUpperCase();
		});
	}

	return str;
};

// カラーコードをセットする。
function setColorCode() {
    for(let i = 0; i < colorProperties.length; i++) {
        colorProperties[i] = colorProperties[i].toString(16);
        if(colorProperties[i].length < 2){
            colorProperties[i] = "0" + colorProperties[i];
        }
    }
    C.innerHTML = "#" + colorProperties[0].toUpperCase()
                      + colorProperties[1].toUpperCase()
                      + colorProperties[2].toUpperCase();
    if(parseInt(colorProperties[3], 16) < 255){
        C.innerHTML += colorProperties[3].toUpperCase();
    }
    C.style.backgroundColor = C.innerHTML;
    colorCode = C.innerHTML;
}
// レンジバーと連動させる。
function interlockingRangeBar(num) {
    colorProperties[num] = parseInt(Codes[num].value);
    document.getElementById(colorLabel[num] + "_num").value = colorProperties[num];
}
function interlockingInput(num){
    if(CNum[num].value > 255){
        CNum[num].value = 255;
    }else if(CNum[num].value < 0){
        CNum[num].value = 0;
    }
    colorProperties[num] = parseInt(CNum[num].value);
    document.getElementById(toCamelcase(colorLabel[num])).value = colorProperties[num];
}
// カラーコードをクリップボードにコピーする。
function copyColorCode() {
	setTimeout(() => navigator.clipboard.writeText(colorCode), 100);
    alert("Copied color code!!\n" + colorCode);
}
// 関数管理。
function manageColors(){
    let num = this.n;
    interlockingRangeBar(num);
    setColorCode();
}
function manageColors2() {
    let num = this.n;
    interlockingInput(num);
    setColorCode();
}


// 変化を検知。
Codes[0].addEventListener("input", {n: 0, handleEvent: manageColors});
Codes[1].addEventListener("input", {n: 1, handleEvent: manageColors});
Codes[2].addEventListener("input", {n: 2, handleEvent: manageColors});
Codes[3].addEventListener("input", {n: 3, handleEvent: manageColors});

CNum[0].addEventListener("input", {n: 0, handleEvent: manageColors2});
CNum[1].addEventListener("input", {n: 1, handleEvent: manageColors2});
CNum[2].addEventListener("input", {n: 2, handleEvent: manageColors2});
CNum[3].addEventListener("input", {n: 3, handleEvent: manageColors2});
