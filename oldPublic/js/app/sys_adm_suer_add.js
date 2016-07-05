
define(function (require,exports,module) {
    //
    /*var box = require('../widgets/dialogs');*/
    var showMsg = require('../widgets/validate').showMsg;
    var result = false;
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    $('form').html5Validate(function() {//自己的验证方式接口，不需要时可删掉
        this.submit();
    }, {validate: function() {
        result = true;
        /**
         *此区域可以写自己的一些验证，比如用户名重复，省市区是否选择
         **/
        return result;
    }});

    $(function(){
        /*表单重置*/
        var arr=[]
        $(".codeUl1 :checkbox").each(function(i){
            if($(this).prop("checked")){
                arr.push(i)
            }
        })
        $(".roleReset").click(function(){
            $(".codeUl1 :checkbox").prop("checked",false);
            $(".codeUl1 label").removeClass("c1");
            $(".codeUl1 :checkbox").each(function(i){
                if($.inArray(i,arr)!=-1){
                    $(this).prop("checked",true);
                    $(this).siblings("label").addClass("c1")
                }
            })
        });

        /*实现全选*/
        $(".codeUl1 li").each(function(){
            $(".s_c_left :checkbox",this).on("click",function(){
                $(this).parents("li").find($(":checkbox")).prop("checked",$(this).prop("checked"))
                    .each(function(){
                        if($(this).prop("checked")){
                            $(this).parents("li").find("label").addClass("c1")
                        }else{
                            $(this).parents("li").find("label").removeClass("c1")
                        }
                    })
            });
        });
        /* 实现单选控制左侧权限*/
        $(".s_c_right :checkbox").on("click",function(){
            var _this=$(this);
            var len = _this.parents(".s_c_right").find(":checkbox");
            var n=0;
            for(var i=0;i<len.length;i++){
                if(len[i].checked){
                    n++;
                }
            }
            if(n > 0){
                _this.parents("li").find(".s_c_left").find($(":checkbox")).prop("checked",true);
                _this.parents("li").find(".s_c_left").find("label").addClass("c1");
            }else if(n === 0){
                _this.parents("li").find(".s_c_left").find($(":checkbox")).prop("checked",false);
                _this.parents("li").find(".s_c_left").find("label").removeClass("c1");
            }
        });

        /*保存提交数据*/
        $(".roleSave").click(function(){
            var result = $.html5Validate.isAllpass($('form'));
            if($('form').find('.error')[0]) {
                showMsg.call($('form').find('.error')[0]);
            };

			//console.log($('form').serialize());
            if(result){
                //$('form').submit();//表单提交
                $.post("/index.php/DeskAuth/Roles/rolesadd",$('form').serialize(),function(d){//ajax提交
                    //var data = $.parseJSON(info)
                    if(d.status == '2'){
                        //alert("重复了");
						$(".codeName1").parent("div").addClass("err");
						$(".codeName1").siblings(".err-tip").show().find("span").text("角色名称重复")
                    }else if(d.status == '1'){
                        //alert("保存成功！");
                       // window.close();
                        window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
                        setTimeout(function(){
                            window.opener.top.finder.loadData();
                            self.close();
                        },1000);
                        //window.location.href="index.php/desktop/index?app=DeskAuth&act=usersListRoles&dsp=finder&argc=";
                        //parent.window.location.reload();
                    }else{
                        alert(d.msg);
                    }
                }, 'json');
            }
          

        });
    });

    $(".checkbox").click(function () {
        var _this=$(this);
        if (_this.hasClass("checked")) {
            _this.removeClass("checked");
        } else {
            _this.addClass("checked");
        }
    });


    $(function(){
        var inputDefaultVal=$(".codeName1").val();
        $(".roleReset").on("click",function(){
            $(".codeName1").val(inputDefaultVal);
        })
    })


});

