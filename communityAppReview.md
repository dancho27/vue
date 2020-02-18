### VUEX 흐름 정리
![vuex 흐름]](./img/vuex.jpg)

### actions의 사용 이유?
- 비동기적인 호출이 필요할때 사용
- state를 변화시키기 위한 비즈니스 로직이 주로 actions에 들어간다.

### actions에서 인자값은 왜 { commit }, postId 이렇게 구분하여 들어가는지?
```javascript
// 원래는 아래와 같이 context인자를 받는 함수로 사용해야한다. 하지만 context가 반복됨.
actions:{
    addUsers: context => {
        context.commit('addUsers') //mutations의 addUser를 커밋
    }
}

// context의 반복을 피하기 위해 아래와같이 사용.
actions:{
    addUsers: { commit } => {
        commit('addUsers')
    }
}

// postId 넘겨주려면 아래와같이 하면 편하겠지만, {commit}은 context 값이기 때문에 바깥쪽에 postId를 넣어야 한다.
actions:{
    addUsers: { commit, postId } => {
        commit('addUsers')
    }
}

//따라서 아래와 같이 해야한다.
actions:{
    addUsers: ({ commit }, postId) => {
        commit('addUsers', postId)
    }
}
```


### !!
- boolean으로 형변환 0은 false, 1은 true 
- 값이 있는지 없는지 확인할때 유용
```javascript
var test = function testFunc(){ 
    var a = 1;
    var result = "I'm a result";
    if(a){
        console.log(result); // " I'm a result " 출력
        console.log(!result); // " false " 출력
        console.log(!!result); // " true" 출력
    }
}
```

### token
- 토큰에서 Bearer??

