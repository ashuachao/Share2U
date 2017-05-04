// var logo = document.getElementById('logo')
// var context = logo.getContext('2d');
// logo.width = 400;
// logo.height = 400;
// // 填充样式
// context.fillStyle = '#D9252E';
// // 笔触颜色
// context.strokeStyle = '#D9252E';
// // 边框宽度
// // context.lineWidth = 1;
// context.font="italic 40px Arial";
// context.fillText('SHARE2U', 0, 50);
// // context.strokeRect(20,20,150,100);

// function drawLogo() {

// }
window.addEventListener('popstate', function() {
    console.log('state has change');
})
// new Vivus('my-svg', {duration: 100}, function() {});
var button = document.querySelector('#btn');
button.addEventListener('click', function() {
    console.log('click')
    history.pushState({}, null, 'aaa');
})
