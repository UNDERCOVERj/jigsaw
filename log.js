/**
 * Created by Administrator on 2016/12/12.
 */
$(function () {
    var clientW=document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;//�̶����ڿ��
    var clientH=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;//�̶����ڸ߶�
    $(window).bind('resize', function () {
        setCss();
        surround();
    })
    $(window).bind('scroll',function () {
        setCss();
        surround();
    });
    $('#log_p a').click(function () {
        $('.log_top').find('span').eq(0).click();
        clientH=document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;//�̶����ڿ��
        clientW=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
        $('#log').show();
        setCss();
        surround();
    })
    $('.log_top').find('span').eq(1).click(function () {
        $('#form1').show();
        $('#form2').hide();
        $(this).css({background: '#5fa6e5',color:'#fff'}).siblings().css({color:'#5fa6e5',background:'#fff'})
    });
    $('.log_top').find('span').eq(0).click(function () {
        $('#form2').show();
        $('#form1').hide();
        $(this).css({background: '#5fa6e5',color:'#fff'}).siblings().css({color:'#5fa6e5',background:'#fff'})
    });
    $('.log_top').find('span').eq(0).click();
    $('#register_user').bind('change', function () {
       var val=$(this)[0].value;
        if(/^[a-zA-Z]{4,10}/g.test(val)){
            $(this).css({'border-color':'green'}).next().html('������ȷ').css({color:'green'}).removeClass('error');
        }else{
            $(this).css({'border-color':'red'}).next().html('������4-10���ַ�').css({color:'red'}).addClass('error');
        }
    });
    $('#repas').bind('change', function () {
        var repasval=$(this)[0].value;
        var pasval=$('#pas')[0].value;
        if(pasval!==repasval){
            $(this).css({'border-color':'red'}).next().html('�������벻һ��').css({color:'red'}).addClass('error');
            $('#pas').next().css({color:'red'})
        }else{
            $(this).css({'border-color':'green'}).next().html('��������һ��').css({color:'green'}).removeClass('error');
            $('#pas').next().css({color:'green'}).html('��������һ��');
        }
    });
    $('#form1 button').click(function (e) {
        if($('#pas')[0].value===''){
            $('#pas').next().html('����Ϊ��').css({color:'red','border-color':'red'}).addClass('error');
            e.preventDefault();
        }
        if($('#repas')[0].value===''){
            $('#repas').next().html('����Ϊ��').css({color:'red','border-color':'red'}).addClass('error');
            e.preventDefault();
        }
        if($('p').hasClass('error')){
            e.preventDefault();
        }
    });
    $('.to_register').click(function (e) {
        $('.log_top').find('span').eq(1).click();
        e.preventDefault();
    })
    $('form').submit(function () {
        $('#log_p').html('�û�');
        return false;
    });
    function setCss(){
        clientW=document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
        clientH=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
        $('#log').css({top:$(window).scrollTop()+(clientH-$('#log').height())/2,left:$(window).scrollLeft()+(clientW-$('#log').width())/2})
    }
    function surround(){
        if($('.surround').length!==0){
            $('.surround').eq(0).remove();
        }
        if($('#log').is(':visible')){
            var $oDiv=$('<div></div>');
            $oDiv.attr({'class':'surround'}).css({width:clientW,height:clientH,top:$(window).scrollTop(),left:$(window).scrollLeft()});
            $oDiv.click(function () {
                $('#log').hide();
                $oDiv.remove();

            })
            $('body').prepend($oDiv);
        }
    }

})