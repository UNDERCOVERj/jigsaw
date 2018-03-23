/**
 * Created by Administrator on 2016/12/12.
 */
(function () {
    var parent=document.getElementById('content');
    var a=Game(parent)
    function Game(parent){
        var data={
            x:3,
            y:3,
            imgWidth:300,
            imgHeight:300,

        };
        var divArr=[];
        var len;
        var src=document.getElementsByTagName('img')[0].src;
        var time=document.getElementById('time');
        var trace=document.getElementById('trace');
        var model=document.getElementById('model');
        var timeNum=0;
        var traceNum=0;
        var begin=document.getElementById('begin');
        var timer=null;
        function resetFunc(){
            document.getElementById('reset').onclick= function () {
                parent.innerHTML='';
                model.innerHTML='';
                time.innerHTML=0;
                trace.innerHTML=0;
                beforeBegin();
                timeNum=0;
                reset();
            }
        }
        function reset(){
            divArr=[];
            clearInterval(timer);
            timer=null;
        }
        function beforeBegin(){
            var _flag=0;
            if(parent.innerHTML==''){
                parent.style.width=data.imgWidth+data.x-1+'px';
                parent.style.height=data.imgHeight+data.y-1+'px';
                parent.style.left=parseInt((document.getElementById('container').offsetWidth)-parseInt(parent.style.width))/2+'px';
                parent.style.background='pink';
                parent.innerHTML='<h2 style="text-align: center;line-height: 300px;font-size: 16px;cursor: pointer">请选择模式</h2>'
                parent.style.background='#pink';
            }
            document.getElementById('easy').onclick= function () {
                _flag=1;
                data.x=3;
                data.y=3;
                model.innerHTML=document.getElementById('easy').innerHTML;
            };
            document.getElementById('difficult').onclick= function () {
                _flag=1;
                data.x=4;
                data.y=4;
                model.innerHTML=document.getElementById('difficult').innerHTML;
            };
            begin.onclick= function () {
                if(_flag===0){
                    alert('请选择模式');
                    //beforeBegin();
                }else{
                    setCss();
                    begin.onclick= function () {
                        alert('正在游戏中');
                    };
                    document.getElementById('easy').onclick=null;
                    document.getElementById('difficult').onclick=null;
                    timer=setInterval(function () {
                        time.innerHTML=timeNum++;
                    },1000)
                }
            };
            document.getElementsByTagName('h2')[0].onclick=begin.onclick;
        }
        function setCss(){
            len=data.x*data.y;
            parent.style.background='none';
            parent.innerHTML='';
            var el,i;
            for(i=0;i<len-1;i++){
                el=document.createElement('div');
                el.className='element';
                el.flag=1;
                el.tag=i;
                el.style.width=data.imgWidth/data.x+'px';
                el.style.height=data.imgHeight/data.y+'px';
                el.style.background='url('+src+') no-repeat';
                el.style.backgroundPosition='-'+(data.imgWidth/data.x)*(i%data.x)+'px -'+(data.imgHeight/data.y)*(Math.floor(i/data.x))+'px';
                el.style.backgroundSize=data.imgWidth+'px '+data.imgHeight+'px';
                divArr.push(el);
            }
            parent.style.width=data.imgWidth+data.x-1+'px';
            parent.style.height=data.imgHeight+data.y-1+'px';
            parent.style.left=parseInt((document.getElementById('container').offsetWidth)-parseInt(parent.style.width))/2+'px';
            randomArr();//µÚÒ»´Î´òÂÒË³Ðò
            el=document.createElement('div');
            el.className='element';
            el.flag=0;
            el.tag=len-1;//×îºó¼ì²é
            el.style.width=data.imgWidth/data.x+'px';
            el.style.height=data.imgHeight/data.y+'px';
            divArr.push(el);//Ìí¼Ó×îºóÒ»¸ö¿Õ°×div
            render();
        }
        //´Ëº¯ÊýÓÃÓÚ´òÂÒÊý×é
        function randomArr(){
            divArr.sort(function () {
                return Math.random()<.5?1:-1;
            })
        }
        //äÖÈ¾£¬Ã¿´Î¸Ä±äË³Ðò¶¼Òªrender
        function render(){
            for(var i=0;i<divArr.length;i++){
                divArr[i].style.left=(data.imgWidth/data.x+1)*(i%data.x)+'px';
                divArr[i].style.top=(data.imgHeight/data.y+1)*(Math.floor(i/data.x))+'px';
                (function(i){
                    divArr[i].onclick= function () {
                        move(i);
                    }
                })(i)
                parent.appendChild(divArr[i]);
            }

        }
        //µ±µã»÷µÄÔªËØµÄÏàÁÚÔªËØflag==0Ê±£¬½»»»ÔªËØ£¬²¢render
        function move(num){
            if(divArr[num].flag!==0){
                if((num%data.x!==0)&&divArr[num-1].flag===0){
                    swap(num,num-1);
                }
                if(((num+1)%data.x!==0)&&divArr[num+1].flag===0){
                    swap(num,num+1);
                }
                if(((num+data.x)<len)&&divArr[num+data.x].flag===0){
                    swap(num,num+data.x);
                }
                if(((num-data.x)>=0)&&divArr[num-data.x].flag===0){
                    swap(num,num-data.x);
                }
            }
        }
        function swap(m,n){
            var temp;
            temp=divArr[m];
            divArr[m]=divArr[n];
            divArr[n]=temp;
            trace.innerHTML=++traceNum;
            render();
            check();
        }
        //¼ì²éÊÇ·ñÍê³ÉÓÎÏ·
        function check(){
            var flag=0;
            for(var i=0;i<divArr.length;i++){
                if(divArr[i].tag!==i){
                    flag=1;
                }
            }
            if(flag===0){
                divArr[len-1].style.background='url('+src+') no-repeat';
                divArr[len-1].style.backgroundPosition='-'+(data.imgWidth/data.x)*((len-1)%data.x)+'px -'+(data.imgHeight/data.y)*(Math.floor((len-1)/data.x))+'px';
                divArr[len-1].style.backgroundSize=data.imgWidth+'px '+data.imgHeight+'px';
                setTimeout(function () {
                    alert('游戏完成,用时:'+(timeNum-1)+'秒,步数:'+traceNum);
                },50);
                reset();
                begin.onclick= function () {
                    alert('请选择模式')
                };
                //document.getElementById('easy').onclick=null;
               // document.getElementById('difficult').onclick=null
            }
        }
        beforeBegin();
        resetFunc()
    }
})()