## 그리드 컴포넌트 예제 정리
<https://kr.vuejs.org/v2/examples/grid-component.html>


### 사용된 메서드 정리
- toLowerCase() :  문자열을 소문자로 변환해 반환
```javascript
var sentence = 'The quick brown fox jumps over the lazy dog.';
console.log(sentence.toLowerCase());
// expected output: "the quick brown fox jumps over the lazy dog."
```
- forEach() : 주어진 함수를 배열 요소 각각에 대해 실행
```javascript
// for 반복문을 forEach로 바꾸기
const items = ['item1', 'item2', 'item3'];
const copy = [];

// 이전
for (let i=0; i<items.length; i++) {
  copy.push(items[i]);
}

// 이후
items.forEach(function(item){
  copy.push(item);
});
```
- filter : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
```javascript
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

- some : 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트
  - 참고: 빈 배열에서 호출하면 무조건 false를 반환

```javascript
//값이 배열 내 존재하는지 확인
var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
    return arr.some(function(arrVal) {
        return val === arrVal;
    });
}

checkAvailability(fruits, 'kela'); //false
checkAvailability(fruits, 'banana'); //true
```

- indexOf : 호출한 String 객체에서 주어진 값과 일치하는 첫 번째 인덱스를 반환. 일치하는 값이 없으면 -1을 반환
  - 문자열 내에 있는 문자들은 왼쪽에서 오른쪽 방향으로 순번이 매겨집니다. 제일 처음 문자는 0번째 순번(index)이며, stringName 문자열의 마지막 문자의 순번 stringName.length -1 입니다. 
```javascript
'Blue Whale'.indexOf('Blue');     // returns  0
'Blue Whale'.indexOf('Blute');    // returns -1
'Blue Whale'.indexOf('Whale', 0); // returns  5
'Blue Whale'.indexOf('Whale', 5); // returns  5
'Blue Whale'.indexOf('Whale', 7); // returns -1
'Blue Whale'.indexOf('');         // returns  0
'Blue Whale'.indexOf('', 9);      // returns  9
'Blue Whale'.indexOf('', 10);     // returns 10
'Blue Whale'.indexOf('', 11);     // returns 10
```

- sort : 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환. 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따릅니다.
```javascript
var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

var array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
```

- charAt : 문자열에서 특정 인덱스에 위치하는  유니코드 단일문자를 반환
  - str.charAt(index)
  - 매개변수 : 0과 문자열의 길이 - 1 사이의 정수값. 인자를 생략하면 기본값으로 0를 설정되고 첫 문자를 반환한다. 
  - 반환값 :  지정된 인덱스에 해당하는 유니코드 단일문자를 반환. 약 인덱스가 문자열 길이보다 큰 경우 빈 문자열 (예) " " 을 반환
```javascript
var anyString = 'Brave new world';
console.log("The character at index 0   is '" + anyString.charAt()   + "'");
// No index was provided, used 0 as default

console.log("The character at index 0   is '" + anyString.charAt(0)   + "'");
console.log("The character at index 1   is '" + anyString.charAt(1)   + "'");
console.log("The character at index 2   is '" + anyString.charAt(2)   + "'");
console.log("The character at index 3   is '" + anyString.charAt(3)   + "'");
console.log("The character at index 4   is '" + anyString.charAt(4)   + "'");
console.log("The character at index 999 is '" + anyString.charAt(999) + "'");

// expected output
// The character at index 0   is 'B'
// The character at index 1   is 'r'
// The character at index 2   is 'a'
// The character at index 3   is 'v'
// The character at index 4   is 'e'
// The character at index 999 is ''
```