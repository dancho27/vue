## vuex란?
- vuex는 상태관리를 통합적으로 구성할 수 있게 도와주는 라이브러리이다.
- vuex는 flux 상태 관리 패턴에서 영감을 받았다.

### flux 패턴
- flux 패턴은 mvc 패턴이 가진 문제를 해결(컨트롤러 여러개의 모델이나 뷰를 컨트롤하면서 복잡한 구조가 되기 쉽다)하고자 페이스북에서 발표한 패턴이다.
- MVC 패턴과 flux패턴의 가장 큰 차이점은 데이터으 흐름이 양방향이 아닌 단방향으로 흐른다는 점이다.
- Action -> Dispather -> Store -> View 
- 만약 뷰에서 사용자 액션이 일어나 데이터를 업데이트 해야한다면 action부터 다시 시작해야 한다.
- 이러한 단방향 데이터 흐름은 데이터의 상태를 예측하기가 쉬워지고 디버깅하기에 용이하다.

### flux - action
- flux 패턴 안에서 store를 변경하려면 dispatcher를 통해 업데이트가 필요하다.
- dispatcher는 action을 통해 실행시킬 수 있다.
- action은 type과 payload를 가지고 있는 단순한 객체다.
- action 생성자 : 어떠한 행위를 시스템에 맞게 변경해주는 전보 기사
action의 구조
```
{
    type : 'INCREMENT_COUNT', //개발자가 정의한 상수 목록
    payload: {count: 1}
}
```

### flux - dispatcher
- dispatcher는 일종의 중앙 허브로, 모든 데이터의 흐름을 관리한다.
- action에 대한 콜백함수를 제공한다
- action이 발생하면 store는 등록된 dispatcher의 콜백 함수를 통해 발생한 action에 대한 메세지를 전달받는다.
- dispatcher : 전화 교환대에 있는 전화 교환원

### flux - store
- store는 애플리케이션 내의 상태를 가지고 있다.
- store에 들어있는 상태는 MVC패턴의 Model과 같은 역할을 한다.
- store 상태를 변경하기 위해서는 반드시 action 생성자가 action을 생성한 후 dispatcher를 통해 store에 상태 변경을 요청해야 한다.
- store에 등록된 상태가 변경되면 store는 상태가 변경되었다는 변경 이벤트를 통해 view에 새로운 상태를 전달하고 view가 스스로 업데이트를 하게 한다.

### flux - view
- 화면 렌더링과 컨트롤러의 역할도 가진다.
- 최상의 뷰는 store의 상태를 가져와 자식뷰에 분배하기 떄문에 컨트롤러뷰 라고 부르기도 한다.

## vuex
- vuex의 구조에서 집중해야 하는 부분은 액션, 변이(Mutations), 상태, 뷰컴포넌트 이다.

### vuex - state
- vuex의 상태는 애플리케이션에서 공통으로 관리할 상태 즉 모델을 의미한다.
- 상태는 단일 상태 트리를 사용하며, 원본 소스의 역할을 한다. 단일 상태 트리란 단 하나의 객체를 의미한다.
- 컴포넌트에서 스토어의 상태에 접근해서 가져올 때는 computed 내에 작성한다.
- Vue 인스턴스에 sotre 옵션을 통해 vuex 스토어를 주입하면 루트 컴포넌트의 모든 자식 컴포넌트에 스토어가 자동으로 주입이 되어 store 프로퍼티를 이용하여 스토어에 접근할 수 있다. -> 모든 자식 컴포넌트에서  this.$store로 접근할 수 있다. 하지만 이러한 접근 방식은 컴포넌트 내에서 여러 상태에 접근해야하는 경우 반복적이고 장황해질 수 있다 -> 이부분을 mapState 헬퍼 함수를 통해 간결하게 사용할 수 있다.
    ```javascript
    // ★mapState 헬퍼 사용??
    <template>
    <div>
        {{ count }} + {{ number }} = {{ sum }}
    </div>
    </template>
    <script>
    import default{
        data(){
            return{
                number: 3
            }
        },
        computed: mapState({
            count: state => state.count,
            sum(state){
                return state.count + this.number
            }
        })
    }
    </script>
    ```

### vuex - Getters
- 게터는 스토어 내에서 vue의 computed와 같은 역할을 한다. 
    ```javascript
    export default new Vuex.Store({
        state:{
            count: 2
        },        
        getters:{
            add: state =>{
                return state.count state.count
            },
            multiply: (state, getters){
                return getters.add * state.count
            }
        }
    })
    ```
- 게터는 컴포넌트의 computed와 마찬가지로 내부에서 사용된 데이터가 변경될 때 마다 자동으로 갱신되고, 한번 계산된 후로는 재계산 되기 전까지 반환되는 값이 캐싱되는 점 또한 같다. getters 속성 내부에 선언되는 함수는 첫번째 인자로 속해있는 스토어의 상태를 전달, 두번째 인자로 getters 속성 자체를 전달받는다.

### vuex - Mutations
- 변이는 vuex에서 스토어의 상태를 변경할 수 있는 유일한 방법이다.
- flux에서 디스패처의 역할을 vuex에서는 변이가 한다.
```javascript
//스토어 내에서 변이 선언
export default new Vuex.Store({
    state:{
        count: 2
    },
    mutations:{
        INCREMENT (state, payload){
            state.count = state.count + payload
        }
    }
})
```
- 변이 핸들러 함수는 첫번째 인자로 스토어의 상태, 두번쨰 인자로 페이로드를 받는다.
- 변이는 게터와 다르게 store.mutation으로 직접 접근이 불가능하다.
- 변이를 호출하려면 반드시 store.commit 메소드를 통해 사용해야 한다.
- 변이에 대한 헬퍼 함수로 Vuex에서는 mapMutations 헬퍼 함수를 제공한다.
- 변이 안에서 가장 중요한 사실은 반드시 동기적 이어야 한다. 

### vuex - actions
- 액션은 크게 변이에 대한 커밋, 비동기적인 작업을 담당한다.
```javascript
//스토어 내에서 변이, 액션 선언
export default new Vuex.Store({
    state:{
        count: 2
    },
    mutations:{
        INCREMENT (state, payload){
            state.count = state.count + payload
        }
    },
    actions: {
        increment (context, payload){
            context.commit("INCREMENT", payload)
        }
    }
})
```
- 액션 핸들러는 첫번째 인자로 context를 받는데, 이 인자는 스토어의 메소드, 속성들을 그대로 가지고 있는 값이다. 그러므로 conext.commit 과 같이 스토어의 메소드를 context라는 값을 통해 실행시킬 수 있다.
- 액션 해들러의 두번째 인자는 변이와 마찬가지로 payload 이다.
- 액션은 dispatch 메소드, mapActions 헬퍼 함수를 통해 사용할 수 있다.
