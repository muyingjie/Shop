define(function (require) {
    
    var swfUpload_w=require('../widgets/swfUpload_w');
    var pageParam = require("PageParam");

    //图片上传
    var pageOptions = pageParam.getParam();
    var isduoxuan=pageOptions.choice==='single'? SWFUpload.BUTTON_ACTION.SELECT_FILE : SWFUpload.BUTTON_ACTION.SELECT_FILES;
    upload_img("upload",pageOptions.url,isduoxuan, function (res) {//商品详情图设置上传图片水印图片
      $(".goodsImgList").append(
      '<div class="addGoodsImg">'
            +'<img src="'+res.info.url+'"/>'
            +'<input image_id="'+res.info.image_id+'" type="hidden" value="'+res.info.url+'"/>'
            +'<i class="deleteIcon"></i>'
            +'</div>'
      );
    });

    //删除图片
    $(".goodsImgList").on("click",".deleteIcon", function () {
        var _this = $(this)
        $.post("",{image_id:_this.siblings("input").attr("image_id"),image_src:_this.siblings("input").val()}, function () {
            if(data.stata){
                _this.parents(".addGoodsImg").remove()//ajax请求成功后执行
            }
        })

    });

    //保存
    $(".gen-sureBtn ").click(function () {

    });

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
                var _imgObj=eval("("+serverData+")");
                if (_imgObj.status) {

                    successCallback(_imgObj);

                } else {

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

    }

});