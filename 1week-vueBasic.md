## vue 기초 내용 정리

### 선언적 렌더링
간단한 템플릿 구문을 사용해 선언적으로 DOM에 데이터를 렌더링해보자.
```html
<div id="app">{{message}}</div>
```
```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: 'hello Vue!'
    }
})
```

### Vue 인스턴스란?
- 생성된 Vue 오브젝트 하나
- Vue 앱을 시작하기 위해 필수적이며 앱의 진입점이 된다.

```javascript
//뷰 인스턴스
var vm = new Vue({
    //options
    el: '#app', //대상이 되는 html element 또는 css selector
    template: '', //Vue 인스턴스의 마크업으로 사용할 문자열 템플릿
    data: {}, //화면을 그리는데 사용하는 data를 반환하는 함수 또는 data 객체
    props: [], //부모 컴포넌트로부터 전달받은 프로퍼티들의  array 혹은 object
    computed: {}, //계산된 속성. getter와 setter는 자동으로 this 컨텍스트를 Vue 인스턴스에 바인딩 한다.
    methods: {}, //Vue 인스턴스에서 사용되는 메소드. this 컨텍스트를 Vue 인스턴스에 바인딩 한다.
    watch: {} //감시된 속성. Vue인스턴스에 데이터가 변경되는 시점에 호출
})
```

#### options - data
- Vue  인스턴스의 data 속성은 반응형 모델을 선언시 사용한다.
- 인스턴스가 생성된 후 this.$data로 접근 가능하다.
- Vue 인스턴스는 데이터 객체 내부의 값을 프락싱하므로 this.#data.a 와 this.a는 같은 값이다.
```javascript
//뷰 인스턴스
const data = {a : 1};
new Vue({
    data: data
})

//뷰 컴포넌트
const myComponent = Vue.extend({
    name: 'myComponent',
    data: (){
        return { a: 1}; //컴포넌트를 정의할때 data 속성은 반드시 Object 자료형을 반환하는 함수로 선언
    }
})
```

#### options - props
```html
<my-component :width="3" :height="3"></my-component>
```
```javascript
Vue.component('MyComponent',{
    props: ['size', 'myMessage']
})
Vue.component('myComponent2',{
    props:{
        height: Number,
        width:{
            type: Number,
            required: true,
            default: 1,
            validator (value){
                return value > 0
            }
        }
    }
})
```

#### options - computed
```javascript
Vue.component('myComponent',{
    template: '<div> {{doubleAge}} </div>',
    data(){
        return {age: 28}
    },
    computed: {
        doubleAge (){
            return this.age * 2
        }
    }
})
```
- computed 내부에서 사용된 데이터가 변경되면 자동으로 computed의 값도 갱신된다.
- computed의 가장 큰 장점은 값이 한번 계산되고 나면 캐싱된다는 점이다. computed 내부에서 사용된 데이터가 갱신되기 전에는 다시 계산되지 않으므로 함수를 선언해서 호출하는 방법보다 효율적이다. 

#### options - methods
- 인스턴스에 추가되는 메소드다.
- methods에 선언된 메소드를 실행시킬 때는 this를 통해 직접 접근하여 실행시키거나 디렉티브 표현식을 통해 사용할 수 있다.
- 선언된 모든 메소드는 this 컨텍스트를 통해 Vue 인스턴스에 바인딩한다. 그렇기 때문에 화살표함수를 사용하여 메소드를 정의하면 this가 현재 인스턴스가 아닌 부모 컨텍스트를 의미하게 되므로 메소드 내부에서 현재 인스턴스의 data나 props에 접근할수 없게 된다.

#### options - watch
뷰 인스턴스 내의 데이터의 변화를 감지하며, 특정 로직을 수행해야 할 때 주로 사용한다. 
- watch에 사용되는 메소드의 이름은 감시하는 데이터의 이름이다.
- 해당 데이터가 변경되었을때 메소드 내부에 작성한 코드가 실행된다.
```javascript
Vue.component('myComponent',{
    data (){
        return { a: 'hell', b: 1}
    },
    watch: {
        a (nextValue, prevValue){ //watch 속성을 선언할 때 함수의 인자로는 첫번째인자:새로운값, 두번째인자: 변경되기 전 상태
            console.log(`new: ${nextValue}, old: ${prevValue}`)
        }
    }
})
```

### Vue 인스턴스의 생명주기
- beforeCreate: Vue 인스턴스가 생성되기 전
- created: vue 인스턴스가 생성된 후
- beforeMount: Vue 인스턴스가 마운트되기 전
- Mounted : Vue 인스턴스가 마운트된 후
- beforeDestory: Vue 인스턴스가 파괴된기 전
- Destory: Vue 인스턴스가 파괴된 후
- beforeUpdate: Vue 인스턴스의 데이터가 변경되어 다시 렌더링하기 전
- upDated: Vue 인스턴스의 데이터가 변경되어 다시 렌더링한 후


## 템플릿 문법

### 텍스트 보간
자바스크립트 내 데이터를 DOM에 바인딩 하기 위해서 {{}}문법을 사용한다.
```html
<p v-once>{{ msg }}</p>
```
- v-once :데이터 변경 시 업데이트 되지 않는 일회성 보간 수행. 

### HTML 보간
실제 HTML상태로 데이타를 출력하려면 v-html 디렉티브를 사용한다.

```javascript
<div>
    <span v-html="rawHtml"></span>
</div>
<script>
export default{
    data(){
        return{
            rawHTML : '<span style="color:red">hee</span>
        }
    }
}
</script>
```
=> 붉은색 hee 출력

### javascript 표현식
{{}}에는 변수 뿐만 아니라 자바스크립트 표현식도 사용 가능하다.

```javascript
{{ 1+1 }}
{{ isFinish? 'ok' : 'no' }}
{{ userName.split('').reverse().join('') }}
{{ Math.random() }}
```

```html
<div v-bind:id="'element-' + userId"></div>
```

### 디렉티브
- 디렉티브는 지시문이라는 의미를 가진 단어다.
- Vue에서 디렉티브는 DOM의 모든 것을 관리할 수 있는 지시 혹은 명려이라고 할 수 있다.
- 디렉티브는 콜론:으로 표시되는 전달 인자를 사용할 수 있다.
```html
<div v-bind:id="'element-' + userId"></div>
<input v-model.number = "productPrice"> <!-- 사용자가 입력한 모델 값을 자동으로 숫자 자료형으로 변환-->
<button v-on:click.right="onLeft"></button> <!-- 마우스 우측 버튼 클릭시 이벤트 리스터 호출-->
```

### v-bind
HTML 속성 값을 동적으로 바인딩 하거나 컴포넌트의 props 속성에 값을 주입할 때 사용. 약어로 콜론: 사용 가능하다.
```html
<a v-bind:href="url"></a>
<a :href="url"></a>
<a v-bind="{id: 'test', href: url}"></a>
<div :class="['classA', 'classB']"></div>
```

### v-on
- DOM 엘리먼트나 컴포넌트에 이벤트 리스너를 연결할 수 있는 디렉티브.
- 약어로 @ 사용.
```html
<button v-on:click="onClick"></button>
<button @click="onClick"></button>
<button v-on:click="isToggle = !isToggle"></button>
<button v-on="{click: onClick, hover: onHover}"></button>
```

### v-if, v-else-if, v-else
- 주어진 표현식의 값이 거짓일때 해당 컴포넌트 혹은 엘리먼트는 주석으로 처리되고, 표현식의 값이 참일 경우 다시 렌더링 된다.

### v-show
- 표현식이 참일 경우 CSS의 display 속성을 사용하여 노출한다. 따라서 v-show 디렉티브를 사용한 엘리먼트는 항상 렌더링되고 DOM에 남아있다.

### v-for
v-for 디렉티브의 값은 for in문의 문법과 동일하게 변수 in 표현식을 사용하며 표현식으로는 배열과 객체를 사용할 수 있다.
```html
<div v-for="(item, index) in items">
    item 배열의 {{ index }}번 요소의 값은 {{ item.text }} 입니다.
</div>
<div v-for="(value, key, index) in object">
    object 객체의 {{ index }}번째 키인 {{ key }} 의 값은 {{ value }} 입니다.
</div>
```

### v-model
폼 요소와 같이 사용자의 입력을 받을 수 있는 요소에 양방향 데이터 바인딩을 생성할 수 있다.
```html
<input type="radio" v-model="selected" value="e">
<input type="radio" v-model="selected" value="m">

<select v-model="selected" multiple><!-- multiple을 상요하면 여러개 요소를 선택할 수 있기 때문에 체크박스와 마찬가지로 배열을 사용하여 데이터를 바인딩 해야 한다.-->
    <option>e</option>
    <option>m</option>
</select>
```
### v-once
엘리먼트나 컴포넌트를 한번만 렌더링 하도록 만들어주는 디렉티브다. v-once 디렉티브를 사용한 엘리먼트 뿐만 아니라 모든 하위요소까지 한번만 렌더링한다. 즉 하위요소까지 동적인 변화에 반응할 수 없게된다는 의미이기도 하다.

### v-pre
하위 요소에 대한 모든 컴파일을 하지 않게한다. 즉 Vue에서 제공하는 보간법을 사용해도 템플릿 문법으로 인식하지 않고 문자열 그대로 인식한다.
```html
<span v-pre>{{ m }}</span>
```
=> {{ m }} 이라는 문자열이 그댈 ㅗ노출된다.


## Vue 인스턴스의 속성과 메소드

- vm.$data, vm.$props
- vm.$el : element 줄임말. Vue인스턴스의 DOM 엘리먼트를 의미한다. 
- vm.$parent, vm.$children, vm.$root : 현재 인스턴스의 부모, 자식, 가장 상위 부모인 트리 루트
- vm.$attrs : 현재 컴포넌트에 주어진 HTML 속성 중 props 데이터로 인식되지 않은 속성들을 의미
- vm.$set, vm.$delete : 반응형으로 선언된 값을 업데이트하는 메소드
- vm.$emit : 인자로 주어진 이벤트를 트리거링 한다. 
- vm.$on : 인스턴스에 이벤트 핸들러를 등록할 수 있는 메소드. 기본적으로 v-on과 같은 기능을 한다.
- vm.$once : $on과 동일한 기능을 하나 이벤트 핸들러가 한번만 실행된다.
- vm.$off : 등록된 사용자 정의 이벤트를 제거한다.
- vm.$forceUpdate : 인스턴스를 강제로 다시 렌더링한다. 하위 컴포넌트나 인스턴스에는 영향 없이 forceUpdate 메소드가 실행된 인스턴스만 다시 렌더링된다. 
- vm.$nextTick : 다음 렌더링 사이클 이후 실행될 콜백 함수를 등록할 수 있는 기능을 제공하는 메소드. Vue가 상태가 갱신된 후 상태를 토대로 화면을 다시 그리는 주기를 tick이라고 한다.

* * *
### 참조
- 커피한잔 마시며 끝내는 Vue.js 책
- <https://kr.vuejs.org/v2/guide/instance.html>
- <https://velog.io/@psm8873/2019.01.12-Vue-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-7mjqyi53cl>