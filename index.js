/**
 * Created by lenovo on 2018/8/23.
 */
//获取要操作的元素
var header  = document.getElementById('shop');
var buttons = header.getElementsByTagName('a');
var shopList =document.getElementById('shopList');
var data =null;
//2.请求服务端数据进行展示
var xhr= new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange = function () {
    if(xhr.readyState==4 && xhr.status ==200){
        data =JSON.parse(xhr.responseText);//转对象（）
    }
};
xhr.send();//将数据进行发送
//////console.log(data);


//3.将数据绑定到页面中
function bindHtml(data) {
    var str =``;//用es6创建一个空
    data.forEach(function (item,index) {
      str +=`<li>                                   
            <img src="${item.img}" alt="">
            <p class="title">${item.title}</p>
            <p class="hot">热度${item.hot}</p>
            <del>￥9999</del>
            <span >${item.price}</span>
            <p class="time">上架时间:${item.time}</p>
            </li>`
    });
   shopList.innerHTML=str;
}
bindHtml(data);
//4.点击按钮实现排序




for (var i=0; i<buttons.length;i++){
    buttons[i].index=-1;//1 -1  1         //5
    buttons[i].onclick=function () {
        //先循环数据排序，再绑定页面展示
        this.index*=-1;                  //6
        var value =this.getAttribute('attrName');//1
        productSort.call(this,value);
        changeArrow.call(this);
        clearArrow.call(this)
    }
}
function productSort(value){
    console.log(this);//buttons[i]
    var _this=this;

/*
    if(value==='hot'){
        data.sort(function (a,b) {
            return a.hot-b.hot

        })
    }else if(value==='price'){
        data.sort(function (a,b) {
            return a.price-b.price

        })
    }else if(value==='time'){
        data.sort(function (a,b) {
            return new Date(a.time)-new Date(b.time)

        })
*/ //时间 热度 价格
    if (value==='time'){ //2
        data.sort(function (a,b) {
            return (new Date(a.time)-new Date(b.time))*_this.index
        })
    }else {
        //如果不是时间，直接相减
        data.sort(function (a,b) {
            return (a[value]-b[value])*_this.index  //3

        })
    }
    bindHtml(data)  //4
}

//5.点击的时候让箭头根据正序倒序发生颜色的变化
function changeArrow (){

    var down =   this.children[1];
    var up   =   this.children[0];
    if(this.index<0){
       //down.className='bg';
       down.classList.add('bg');
       up.classList.remove('bg');
    }
    else{
        up.classList.add('bg');
        down.classList.remove('bg');
    }
}
//6.只保留最后点击的那个按钮，清除其它箭头的颜色
function clearArrow() {
    for(var i=0;i<buttons.length;i++){
        if(this!=buttons[i]){
            buttons[i].children[0].classList.remove('bg');
            buttons[i].children[1].classList.remove('bg');
            buttons[i].index=-1     //优先从升序开始排列
        }

    }

}