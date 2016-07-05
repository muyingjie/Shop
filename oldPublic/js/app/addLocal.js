/**
 * Created by lenovo on 2016/5/18.
 */
define(function (require,exports,module) {
    var dlog=require("../widgets/dialogs");
    var pageParam = require("PageParam");
    require('jqueryForm');
    $(".gen-sureBtn").click(function(){
        var url=$("input[name='url']").val();
        if(url==""){
            dlog.closeDialog();
            return false;

        }
        $("#addNetForm").ajaxSubmit({
            dataType:"json",
            success:function (data) {
                if(data.status){
                    top.finder.loadData();
                    top.frameWarningHide("handleSuccess", "操作成功！", 3000);
                    dlog.closeDialog();
                }
            }

        })
    })



    }

)