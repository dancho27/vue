## Vue Router란?
- 단일 페이지 애플리케이션(SPA)을 만드는데 도움을 주는 클라이언트 사이드 라우팅 공식 라이브러리다.
- 클라이언트는 현재 URL에 따라 페이지의 내용을 결정하고 그린다. 클라이언트는 어떤 내용을 페이지에 그릴 것인지 결정해야 하는데 Vue Router는 이 과정을 굉장히 쉽게 만들어준다.

### 동적 라우트 매칭
#### 동적 세그먼트란?
- 동적 라우트란 posts/{게시글 아이디} 와 같이 경로에 변수를 가지고 있는 라우트를 의미한다. 이때 경로 내부에 들어있는 변수를 동적 세그먼트라고 부른다. Vue Router는 동적 세그먼트에 어떤 값이 들어올지 알 수 없으므로, 라우트를 선언할 때 path 속성을 사용하여 패턴을 정의해 주어야 한다.
```javascript
//동적 라우트 선언
new VueRouter({
    routes: [
        //동적 세그먼트는 콜론으로 시작
        {path: '[posts/:postId', component: PostDetailPage}
    ]
})
```
- 이렇게 선언된 라우트의 동적 세그먼트는 컴포넌트 내에서 this.$route.params를 통해 접근할 수 있다.

#### 동적 세그먼트 변경에 반응하기
- 사용자가 /posts/1를 보다가 /posts/2를 이동할때 /posts/:postId와 같은 동적 라우트를 사용했다면 postId에 해당하는 동적 세그먼트만 변경시 기존에 불러왔던 컴포넌트를 재사용 한다. 페이지 이동시 페이지 모든내용을 변경하지 않고 부분만 변경할수 있는 클라이언트 사이드 렌더링의 장점을 활용한 것이다. 그렇기 때문에 create나 mounted와 같은 훅이 호출되지 않는다.  따라서 이러한 동일한 경로의 동적 세그만트만 변경되는 상황에서 Vue의 watch 속성을 사용하여 $route 객체를 감시함으로써 동적 세그먼트가 변경되었다는 것을 감지할 수 있다.
```javascript
//watch 속성을 사용하여 라우트 객체의 변경 감지하는 모습
export default{
    name: 'PostDetailPage',
    watch: {
        '$route' (to, from){
            console.log('라우트 객체가 변경되었습니다.')
        }
    }
}
```
```javascript
//beforeRouteUpdate를 사용하여 라우트 객체가 생긴되었음을 감지할 수도 있다.
export default{
    name: 'PostDetailPage',
    beforeRouteUpdate(to, from, next){
        console.log('라우트 객체가 변경되었습니다.')
        next(); //next 함수를 호출하지 않으면 다음 라우트로 이동하지 않는다.
    }
}
```

### 중첩된 라우트
- 중첩된 라우트란 /posts/foo, /posts/bar 와 같이 여러단계로 중첩된 라우트를 말한다. 이러한 경로를 가지고 있는 페이지들의 경우 같은 레이아웃을 공유하는 경우가 일반적이기 때문에 Vue Router는 이런 관계의 페이지들을 쉽게 정의할 수 있는 기능을 제공한다.

```javascript
//중첩된 라우트 사용하기

<div id="app">
    <router-view>
        <div id="post">
            <h4>post 컴포넌트</h4>
            <router-view></router-view> //중첩된 router-view에 다른 컴포넌트를 렌더할 수 있다.
        </div>
    </router-view>
</div>
```
```javascript
//중첩된 라우트를 선언한 모습
new VueRouter({
    routes: [
        {
            path: '/posts',
            component: Post,
            children:{
                path: '',
            },
            {
                path:'foo',
                component: Foo
            },
            {
                path:'bar',
                component: Bar
            }
        }
    ]
})
```

## 프로그래밍 방식 네비게이션
Vue Router는 router-link 컴포넌트를 사용하여 anchor 태그를 만드는 방법 외에도 컴포넌트 내에서 this.$router로 접근할 수 있는 라우터 객체의 메소드를 사용하여 라우팅할 수 있도록 지원하고 있다. 이러한 방식을 프로그래밍 방식으로 수행한다고 한다.

### router.push
```javascript
push: Function(location, onComplete?, onAbprt?)

$router.push('/posts') //경로 직접 전달
$router.push({path: '/posts'}) //라우트 객체를 통해 경로 전달
$router.push({name}: 'Posts'}) //라우트 객체를 통해 이름 전달
$router.push({path: '/posts'}, () => {
    console.log('라우트 이동 완료')
}, () =>{
    console.log('라우트 이동 중단')
})
```
- push 메소드는 다른 경로로 이동할 때 사용한다.
- push 메소드는 이동하면서 새로운 경로를 브라우저의 히스토리에도 저장하기 때문에 사용자가 뒤로가기 버튼을 눌렀을 때 이전 경로로 다시 돌아갈 수 있다.
- push 메소드는 router-link 컴포넌트를 사용자가 클릭할 때 Vue Router가 내부적으로 호출하는 메소드 이기 때문에 push 메소드를 사용하여 이동하는 것과 router-link 컴포넌트를 클릭해서 이동하는 것은 같은 동작이다.

### router.replace
```javascript
replace: Function(location, onComplete?, onAbort?)
```
- replace 메소드는 push와 같은 역할을 하지만 브라우저의 히스토리에 이동한 라우트가 추가되지 않는다. 즉 replace로 라우트를 변경하게 되면 이후 사용자가 뒤로가기 버튼을 눌러도 이동하기 전 라우트로 돌아갈 수 없다.

### router.go
```javascript
go: Function(n)
$router.go(1) //한단계 앞으로 이동
$router.go(-1) //한단계 뒤로 이동
$router.go(3) //3단계 앞으로 이동
```
go는 현재 쌓여있는 히스토리 스택에서 이동할 수 있는 메소드이다.사용자가 브라우저에서 사용할 수 있는 앞으로가기, 뒤로가기 기능과 동일하다고 보면 된다. n인자는 정수이며, 양수: n단계 앞으로, 음수: n단계 뒤로 이동한다.


## 내비게이션 가드
- 내비게이션 가드는 라우터에서 다른 라우터로 이동하는 내비게이팅이 수행될 때 실행되어 라우터의 이동을 막거나 다른 라우터로 리다이렉팅 할 수 있는 기능이다.
- 적용 범위에 따라 전역, 라우트별, 컴포넌트별 가드로 나뉜다.
- 가드의 호출 타이밍에 따라 before훅(라우터의 이동이 끝나기 전에 미리 호출), after훅(라우터의 이동이 끝난 후 호출) 으로 나뉜다.

### 전역가드
- 라우터에서 특정 라우터나 컴포넌트가 아니라 애플리케이션 내부에서 내비게이팅이 수행될 때마다 호출되는 전역적인 가드다. 주로 애플리케이션 내에서 공통적으로 수행해야하는 동작을 정의할때 사용한다.

  - beforeEach : 라우터가 내비게이팅을 시작한 후 이동할 라우트의 컴포넌트들을 불러오기 전에 실행된다.
  ```javascript
  const router = new VueRouter({...})
  router.beforeEach((to, from, next)=>{
      //...
      next()
  })
  // to : 다음에 이동할 라우트 정보
  // from : 이전 라우트 정보
  // next : 명시적으로 호출되어야 다음 라우트로 이동한다.
  ```

  - afterEach : 라우터의 이동이 완료된 후 호출되는 훅이다.
  ```javascript
  const router = new VueRouter({...})
  router.afterEach((to, from)=>{
      //이미 라우팅이 완료된 후 호출되는 훅이기 때문에 next 함수가 없다.
  })
  ````

### 라우트별 가드
- 특정 라우트에서만 수행하는 가드다. 특정 페이지에만 영향을 줘야 하는 리다이렉트와 같은 동작에 주로 사용된다.
  - beforeEnter : beforeEach와 비슷하다.

### 컴포넌트별 가드
- 특정 컴포넌트에서 수행되는 가드다. 특이점으로 leave 훅을 사용할 수 있다.
  - beforeRouteEnter : 아직 라우팅이 끝나지 않았기 때문에 컴포넌트가 생성되지 않은 상태다. 즉 this 컨텍스트를 통해 컴포넌트에 접근할 수 없다.
  - beforeRouteLeave : this 컨텍스트를 통해 컴포넌트에 접근 가능하다. 사용자가 저장하지 않은 편집 내용을 두고 실수로 현재 라우트를 떠나는 것을 방지하는 등의 동작에 사용될 수 있다. 이때 next(false)를 사용하여 다음 라우트로의 이동을 취소할 수 있다.


