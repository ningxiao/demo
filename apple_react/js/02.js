var observable, button = document.querySelector("#ckbtn");
//一秒钟内只执行一次
Rx.Observable.fromEvent(button, 'click').throttleTime(1000).map(function(event) {
    return event.clientX;
}).scan(function(count, clientX) {
    return count + clientX;
}, 0).subscribe(function(count) {
    console.log(`Clicked ${count} times`);
});
//当订阅下面代码中的 Observable 的时候会立即(同步地)推送值1、2、3，然后1秒后会推送值4，再然后是完成流
observable = Rx.Observable.create(function(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(function() {
        observer.next({ "name": "nxiao", "age": 12 });
        observer.complete();
    }, 1000);
});
console.log('订阅之前-----------------------------------');

var subscription = observable.subscribe({
    next: function(x) {
        console.log('获取值 ', x);
    },
    error: function(err) {
        console.error('发生错误: ' + err);
    },
    complete: function() {
        console.log('done');
    },
});
//取消进行中的执行
//subscription.unsubscribe(); 
//简单化订阅
// observable.subscribe(function(x) {
//     console.log(x);
// });
console.log('订阅开始-----------------------------------');
//Subject (主体)
var subject = new Rx.Subject();
subject.subscribe({
    next: function(v) {
        console.log('observerA: ' + v)
    }
});
subject.subscribe({
    next: function(v) {
        console.log('observerB: ' + v)
    }
});
observable = Rx.Observable.from([1, 2, 3]);
observable.subscribe(subject); // 你可以提供一个 Subject 进行订阅