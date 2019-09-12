
var sum = 0;
console.log('========');
console.time('time');
for (let index = 0; index < 300000000; index++) {
	sum++;
}
function test () {
	console.log ('-------test',sum);
};
console.timeEnd('time');
console.log('time---',Date.now());