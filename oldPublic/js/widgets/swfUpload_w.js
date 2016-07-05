/**
 * Created by lenovo on 2016/5/3.
 */
    define(function (require, exports, module) {
       
        var swfUpload = require("swfUpload");
        //swfUpload=window.SWFUpload;
        var _swfUpload_instance;

    //-----------------------------------------------------------------------------------------------------

        var defaults = {//定义参数配置对象
            upload_url : "http://localhost/index.php/Image/manage/uploadImage",
            post_params: {"PHPSESSID": "<?php echo session_id(); ?>"},
            flash_url : "/Public/js/libs/plugs/swfUpload/swfupload.swf",
            flash9_url : "/Public/js/libs/plugs/swfUpload/swfupload_fp9.swf",
       /*   file_post_name : "Filedata",
            post_params : { //一个对象直接量，里面的键/值对会随着每一个文件一起上传，文件上传要附加一些信息时很有用
                "post_param_name_1" : "post_param_value_1",
                "post_param_name_2" : "post_param_value_2",
                "post_param_name_n" : "post_param_value_n"
            },
            use_query_string : false,   //为true时，则会以get方式上传,为false时，则会以post方式上传
            requeue_on_error : false,
            http_success : [201, 202],       
            assume_success_timeout : 0,
        */  file_types : "*.*",//所有文件类型。也可设为指定文件类型，如"*.jpg;*.gif"
            file_types_description: "All Files",//文件类型描述，起提示作用
            file_size_limit : "2048",//默认为KB，可以设置单位:B、KB、MB、GB
            file_upload_limit : 0,//文件的上传数，值为0时表示不限制文件的上传数
            file_queue_limit : 0,//指定文件上传队列里最多能同时存放多少个文件

            //按钮设置
            button_placeholder_id : "upload",//指定一个dom元素的id,该dom元素在swfupload实例化后会被Flash按钮代替，这个dom元素相当于一个占位符
            button_image_url : "/Public/images/addImage_bg.jpg",//按钮的背景图片
            button_width : 117,
            button_height : 29,
            button_text_style : "",
            button_text_left_padding : 3,
            button_text_top_padding : 2,
            button_action : swfUpload.BUTTON_ACTION.SELECT_FILES,//多文件上传
            button_disabled : false,//为true时Flash按钮将变为禁用状态，点击也不会触发任何行为
            button_cursor : swfUpload.CURSOR.HAND,
            button_window_mode : swfUpload.WINDOW_MODE.TRANSPARENT
            
        }; 

    exports.swfUploadInit = function(arg){
        var setting_object = $.extend(defaults,arg);
        _swfUpload_instance = new swfUpload(setting_object);
         
    }       

});