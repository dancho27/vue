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