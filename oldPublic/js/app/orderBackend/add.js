//加载城市
define(function(require) {
    var main = require("../../main"),area = require('../area');
    //var $=require("jquery");
    //alert($(window).height());
    $('.content-T').height($(window).height()-73).css('overflow-y','auto');

    //收货地址 省
    $('.address select').eq(0).on('change',function(){
        area.getCity(2,this.value,'address_city')
    })

    //收货地址 市
    $('.address select').eq(1).on('change',function(){
        area.getCity(3,this.value,'address_region')
    })

    //选择会员
    $('#selectMember').click(function(){
        window.open(selectMemberUrl);
        //getMember();
    })

    //选择商品
    $('#selectGoods').click(function(){
        window.open(selectGoodsUrl);
        //getGoods();
    })

    //回调
    window.getSelectData = function(data){
        if(data){
            if(data.findername=='goods'){
                getGoods(data['ids'].join(','));
            }else{
                $('#member_id').val(data['ids'].join(','));
                getMember(data['ids'].join(','));
            }
        }
    }

    //选择会员后执行
    function getMember(mid){
        if(mid !=''){
            $.post('/index.php/Order/Order/getMember', {mid:mid},
                function(data){
                    if(data!='-1'){
                        $('#member_name').val(data);
                        showAddressList(mid);
                    }else{
                        $('#member_id').val('');
                    }
                }
            );
        }
    }

    //选择商品后执行
    function getGoods(goodsIds){
        if(goodsIds!=''){
            $.post('/index.php/Order/Order/getGoods', {goodsIds:goodsIds},
                function(data){
                    //alert(data);
                    if(data!='-1'){
                        $(data).appendTo('#goods');
                        main.listInit();
                    }
                }
            );
        }
    }

    //收货人信息 切换收货地址
    $(".info").on('click','.tag',function(){
        $('#ship_id').val($(this).attr('tagv'));
        $('.mainCont > div').eq(2).find('.active').removeClass('active');
        $(this).addClass('active');
        calcPay();
    })

    //切换配送方式
    $(".tagship").on('click',function(){
        $('#shipping').val($(this).attr('tagv'));
        $('.mainCont > div').eq(4).find('.active').removeClass('active');
        $(this).addClass('active');
        if($(this).attr('tagOffLine')!='true'){
            $(".tagpay[tagv=1]").hide();
            $('#payment').val('');
            $('.tagpay').removeClass('active');
        }else{
            $(".tagpay[tagv=1]").show();
        }
        calcPay();
    })

    //切换支付方式
    $(".tagpay").on('click',function(){
        $('#payment').val($(this).attr('tagv'));
        $('.mainCont > div').eq(5).find('.active').removeClass('active');
        $(this).addClass('active');
    })

    //新增收货地址
    $('.addAddress').click(function(){
        $('.mainCont > div').eq(3).show();
    })

    //保存收货地址
    $('#newAddress1Btn').click(function(){
        var member_id = $('#member_id').val();
        var ship_name = $('#ship_name').val();
        if(ship_name==''){
            $('#ship_name').focus();
            main.warningHide("handleDefault", "请填写收货人！", 2000);
            //alert('请填写收货人');
            return;
        }
        var pid = $('#pid').val();
        if(pid==''){
            main.warningHide("handleDefault", "请选择所在地区！", 2000);
            //alert('请选择所在地区');
            return;
        }
        var cityid = $('#address_city').val();
        if(cityid==''){
            main.warningHide("handleDefault", "请选择市！", 2000);
            //alert('请选择市');
            return;
        }
        var areaid = $('#address_region').val();
        if(areaid==''){
            main.warningHide("handleDefault", "请选择区！", 2000);
            //alert('请选择区');
            return;
        }
        var ship_address = $('#ship_address').val();
        if(ship_address==''){
            $('#ship_address').focus();
            main.warningHide("handleDefault", "请填写详细地址！", 2000);
            return;
        }
        var ship_mobile = $('#ship_mobile').val();
        var ship_tel = $('#ship_tel').val();
        
        if(ship_mobile=='' && ship_tel==''){
            $('#ship_mobile').focus();
            main.warningHide("handleDefault", "手机号码和固定电话请选填一个！", 2000);
            //alert('手机号码和固定电话请选填一个');
            return;
        }
        if(ship_mobile!='' && ship_mobile.length!=11){
            main.warningHide("handleDefault", "请检查手机号！", 2000);
            return;
        }
        
        
/*        字符型，7字符≤电话号码≤32字符，可包含数字0～9，“＋”，“-”，“(”，“)”，“Space”； */
        
        if(ship_tel!='' && (ship_tel.length<7 || ship_tel.length>32)){
            main.warningHide("handleDefault", "请检查固定电话！", 2000);
            return;
        }
        
        
        
        var ship_postcode = $('#ship_postcode').val();
        $.ajax({
            type:'post',
            url:'/index.php/Order/Order/address',
            data:{member_id:member_id,name:ship_name,pid:pid,cityid:cityid,areaid:areaid,detail:ship_address,code:ship_postcode,phone:ship_mobile,tel:ship_tel,act:'add'},
            //dataType:'json',
            success: function(data) {
                $('.mainCont > div').eq(2).find('.active').removeClass('active');
                $(data).insertBefore($('.mainCont > div').eq(2).find('.closeAddress').parents('li'));
                $('.closeAddress').show();
                $('#ship_id').val($('.mainCont > div').eq(2).find('.active').attr('tagv'));
                $('.mainCont > div').eq(3).find('input,select,textarea').val('');
                $('.mainCont > div').eq(3).hide();
                calcPay();
            }
        });
    })

    //收起地址
    var toggle = 1;
    $('.closeAddress').click(function(){
        if(toggle==1){
            $('.mainCont > div').eq(2).find('li .tag').parents('li').hide();
            $('.mainCont > div').eq(2).find('.active').parents('li').show();
            $('.closeAddress').html('查看更多');
            toggle = 0;
        }else{
            $('.mainCont > div').eq(2).find('li .tag').parents('li').show();
            $('.closeAddress').html('收起地址');
            toggle = 1;
        }
    })

    //删除商品
    $('.tableCont').on('click','.del',function(){
        $(this).parent().parent().remove();
        calcPay();
    })

    //修改商品数量
    $('.tableCont').on('change','input',function(){
        var totalNum = 0;
        totalNum = parseInt($(this).parent('td').prev('td').text());
        if(totalNum<$(this).val()){
            $(this).val('');
            $(this).focus();
            main.warningHide("handleDefault", "可售库存不足！", 2000);
            return;
        }
        calcPay();
    })

    //显示某个会员的收货地址
    function showAddressList(mid){
        $.ajax({
            type:'post',
            url:'/index.php/Order/Order/address',
            data:{member_id:mid},
            //dataType:'json',
            success: function(data) {
                $('.mainCont > div').eq(2).find('li:not(:first):not(:last)').remove();
                $('.closeAddress').show();//有收货地址时显示 查看更多
                $(data).insertBefore($('.mainCont > div').eq(2).find('.closeAddress').parents('li'));
            }
        });
    }

    //计算价格
    function calcPay(){
        $.ajax({
            type:'post',
            url:'/index.php/Order/Order/calcFee',
            data:$('#frm').serialize(),
            dataType:'json',
            success: function(data) {
                $('#goodsPrice').html(data.goodsPrice);
                $('#shipPrice').html(data.shipPrice);
                if($('#discount_price').length!=0 && parseFloat($('#discount_price').val())>0){
                    var value = data.totalPrice-$('#discount_price').val();
                    value = value.toFixed(2);
                    $('#totalPrice').html('￥'+value+'元');
                }else{
                    $('#totalPrice').html('￥'+data.totalPrice+'元');
                }
                $('#weight').html(data.weight);
            }
        });
    }

    $('#discount_price').on('change',function(){
        calcPay();
    })

    //添加／修改 订单 保存事件
    $('#save').click(function(){
        var ship_id = $('#ship_id').val();//收货地址
        var shipping = $('#shipping').val();
        var payment = $('#payment').val();
        if(ship_id==''){
            main.warningHide("handleDefault", "请填写收货人信息！", 2000);
            //alert('请填写收货地址');
            return;
        }
        if(shipping==''){
            main.warningHide("handleDefault", "请选择配送方式！", 2000);
            //alert('请选择配送方式');
            return;
        }
        if(payment==''){
            main.warningHide("handleDefault", "请选择支付方式！", 2000);
            //alert('请选择支付方式');
            return;
        }
        var weight = parseFloat($('#weight').html());
        if(weight<=0){
            main.warningHide("handleDefault", "请选择商品！", 2000);
            //alert('请选择商品');
            return;
        }
        var label = 1;
        var num = $('#goods .goodsNum').length;
        for(var i=0; i<num; i++){
            if($('#goods .goodsNum').eq(i).val()=='' || $('#goods .goodsNum').eq(i).val()<=0){
                $('#goods .goodsNum').eq(i).focus();
                label = 0;
                break;
            }
        }
        if(label==0){
            main.warningHide("handleDefault", "请填写商品的数量！", 2000);
            //alert('请填写商品的数量');
            return;
        }
        $('#save').unbind('click');
        $('#frm').submit();
    });

    //取消按钮事件
    $('.gen-cancelBtn').click(function(){
        history.go(-1);
    })
})