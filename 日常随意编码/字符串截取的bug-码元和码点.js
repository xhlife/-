const str = "啊是🐔娃娃，𠮷是真的啊";

console.log(str.length); // 13
console.log(str.slice(2, 3)); // 得到乱码

/*
 * 为什么长度是13？
 * 解析： 常规字符占用一个码元， 而特殊字符占两个码元， js中字符串的length读取的是码元的长度
 *        在utf-16编码中，一个码点可能占16位，也可能占32位
 *       str中， 🐔和𠮷 特殊字符，占据了两个字符，因此length比常规的多出了2， 因此截取的时候会得到乱码
 *
 * 解决办法： 采用码点方式进行截取, 码点： 一个字符一个码点
 */

String.prototype.sliceByPoint = function (pStart, pEnd) {
  let result = "";
  let pIndex = 0; // 码点指针
  let cIndex = 0; // 码元指针

  while (1) {
    if (pIndex >= pEnd || cIndex >= this.length) {
      break;
    }
    const point = this.codePointAt(cIndex); // 拿到码点的值， 有可能是16位，也有可能是32位
    if (pIndex >= pStart) {
      result += String.fromCodePoint(point); // 通过码点恢复字符， 不能采用下标的方式获取
    }
    cIndex += point > 0xffff ? 2 : 1; // 如果码点的值比16位最大值还大，说明该字符占两个码元
    pIndex++;
  }
  return result;
};

console.log(str.sliceByPoint(2, 3)); // 🐔
