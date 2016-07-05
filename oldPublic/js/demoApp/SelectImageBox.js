define(function (require) {
    
    var swfUpload_w=require('../widgets/swfUpload_w');
    var showMsg = window.showMsg = require('../widgets/validate').showMsg;
    require('../widgets/tabs');
    var pageParam = require("PageParam");
    //tab切换
    $(".Tab-ul").tabs(null, null, 'Tab-li-select');

    //上传图片
    var pageOptions = pageParam.getParam();
    var isduoxuan=pageOptions.choice==='single'? SWFUpload.BUTTON_ACTION.SELECT_FILE : SWFUpload.BUTTON_ACTION.SELECT_FILES;
    upload_img("upload",pageOptions.url,isduoxuan, function (res) {//商品详情图设置上传图片水印图片
        $(".upload").attr({
            "src":res.info.url,
            "id":res.info.id
        });
        //$(".upload").siblings("input").val(res.info.url);
    });

    //从图库选择图片
    $(".local-img-list").on("click","li", function () {
        $(".local-img-list>li>i").removeClass("imgSelected");
        $(this).children("i").addClass("imgSelected");
        $(".local-img-list").prev("input").val($(this).children("img").attr("src")).attr("img_id",$(this).children("img").attr("id"));//把img的src付给隐藏的input
    });

    //表单验证
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    //图片上传方法
    function upload_img(domId,url,fils,successCallback){
        swfUpload_w.swfUploadInit({
            upload_url : url,
            //按钮设置
            button_placeholder_id : domId,
            custom_settings:{
                upload_target:"divFileProgressContainer",
                thumbnails:"thumbnails"
            },
            button_width : 117,
            button_action : fils,

            //处理函数
            swfupload_preload_handler : preLoad,//预处理，检查浏览器flash插件版本是否支持
            swfupload_load_failed_handler : loadFailed,
            file_queue_error_handler :  fileQueueError,
            //  file_dialog_start_handler:fileDialogStart,
            file_dialog_complete_handler : fileDialogComplete,
            upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess,
            upload_complete_handler :  uploadComplete
        });

        //上传文件前检查浏览器flash插件版本是否支持
        function preLoad() {
            if (!this.support.loading) {
                alert("您的Flash Player版本过低,需要9.028或以上版本才能使用 .");
                return false;
            }

        }
        function loadFailed() {
            alert("上传失败！");

        }

        function fileQueueError(file, errorCode, message) {
            try {
                var imageName = "error.gif";
                var errorName = "";
                if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
                    errorName = "You have attempted to queue too many files.";
                }

                if (errorName !== "") {
                    alert(errorName);
                    return;
                }

                switch (errorCode) {
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        alert('文件0字节');
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        alert('文件太大，超出设定的2M');
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    default:
                        alert(message);
                        break;
                }

                //  addImage("images/" + imageName);

            } catch (ex) {
                this.debug(ex);
            }

        }

        function fileDialogComplete(numFilesSelected, numFilesQueued) {
            try {
                if (numFilesQueued > 0) {
                    this.startResizedUpload(this.getFile(0).ID, 100, 100, SWFUpload.RESIZE_ENCODING.JPEG, 100);
                }
            } catch (ex) {
                this.debug(ex);
            }
        }

        function uploadProgress(file, bytesLoaded) {

            try {

                var percent = Math.ceil((bytesLoaded / file.size) * 100);

                // var progress = new FileProgress(file,  this.customSettings.upload_target);
                // progress.setProgress(percent);
                // progress.setStatus("Uploading...");
                // progress.toggleCancel(true, this);
            } catch (ex) {
                this.debug(ex);
            }
        }

        function uploadSuccess(file, serverData) {

            try {

                //var progress = new FileProgress(file,  this.customSettings.upload_target);
                var _imgObj=eval("("+serverData+")");
                if (_imgObj.status) {
                    //document.getElementById(this.customSettings.thumbnails).style.background="url(../../../"+_imgObj.info.url+")no-repeat"
                    // addImage("../../../"+_imgObj.info.url,this.customSettings.thumbnails);
                    // progress.setStatus("Upload Complete.");
                    // progress.toggleCancel(false);
                    // alert("上传成功");
                    successCallback(_imgObj);

                } else {
                    // addImage("images/error.gif",this.customSettings.thumbnails);
                    // progress.setStatus("Error.");
                    // progress.toggleCancel(false);
                    // alert(serverData);

                }


            } catch (ex) {
                this.debug(ex);

            }
        }

        function uploadComplete(file) {
            try {

                /*  I want the next upload to continue automatically so I'll call startUpload here */
                if (this.getStats().files_queued > 0) {
                    this.startResizedUpload(this.getFile(0).ID, 100, 100, SWFUpload.RESIZE_ENCODING.JPEG, 100);
                } else {
                    // var progress = new FileProgress(file,  this.customSettings.upload_target);
                    // progress.setComplete();
                    // progress.setStatus("All images received.");
                    // progress.toggleCancel(false);
                }
            } catch (ex) {
                this.debug(ex);
            }
        }

        function uploadError(file, errorCode, message) {
            var imageName =  "error.gif";
            var progress;
            try {
                switch (errorCode) {
                    case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                        try {
                            // progress = new FileProgress(file,  this.customSettings.upload_target);
                            // progress.setCancelled();
                            // progress.setStatus("Cancelled");
                            // progress.toggleCancel(false);
                        }
                        catch (ex1) {
                            this.debug(ex1);
                        }
                        break;
                    case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                        try {
                            // progress = new FileProgress(file,  this.customSettings.upload_target);
                            // progress.setCancelled();
                            // progress.setStatus("Stopped");
                            // progress.toggleCancel(true);
                        }
                        catch (ex2) {
                            this.debug(ex2);
                        }
                    case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                        alert("文件数量超过了5个");
                        break;
                    default:
                        alert(message);
                        break;
                }


            } catch (ex3) {
                this.debug(ex3);
            }

        }


        function addImage(src,thumid) {

            var newImg = document.createElement("img");
            newImg.style.margin = "5px";
            $(newImg).addClass('add');

            var $firstImg=$("#"+thumid).find("img:first");
            if (!$firstImg.hasClass("add")) {
                $firstImg.remove();
            }
            $("#"+thumid).get(0).appendChild(newImg);

            newImg.src = src;
        }
    }
    $(".gen-sureBtn").click(function(){
        var img_message;
        var item = $(".Tab-ul>li");
        if(item.eq(0).hasClass("Tab-li-select")){//本地选择图片保存

            if(!$(".uploaderImg input").val()){
                alert("请添加图片在保存");
            }else{
                img_message = {
                    img_id:$(".uploaderImg").attr("id"),
                    img_src:$(".uploaderImg").attr("src")
                };

            }

        }else if(item.eq(1).hasClass("Tab-li-select")){//从图库选择图片保存

            if(!$(".local-img>input").val()){
                alert("请选择图片后再保存");
            }else{
                img_message = {
                    img_id:$(".local-img-list").prev("input").attr("img_id"),
                    img_src:$(".local-img-list").prev("input").val()
                };
            }
        }else{//互联网上的图片保存
            var result = $.html5Validate.isAllpass($('form'));
            if($('form').find('.error')[0]) {
                showMsg.call($('form').find('.error')[0]);
            }
            if(result){
                $.post("",{"img_src":$(".image-sel-content2 input").val()}, function (data) {
                    if(data.state){
                        img_message = {
                            img_id:$(".uploaderImg").attr("id"),
                            img_src:$(".uploaderImg").attr("src")
                        };
                    }
                });
            }
        }
        console.log(img_message);
    })


});