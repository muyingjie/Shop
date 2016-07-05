/**
 * Created by lenovo on 2016/4/26.
 */
var userRegExp = {
    userName : {reg:/^[\u4e00-\u9fa5a-zA-Z0-9_\-]{4,20}$/,errInfor:"用户名格式错误"},//用户名
    pwd:{reg:/\S{4,20}/,errInfor:"密码格式错误"},
    cellPhone:{reg:/^1\d{10}$/,errInfor:"手机号码格式错误"},//手机号码
    email : {reg:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,errInfor:"邮箱格式错误"},//邮箱
    realName : {reg:/^([\u4e00-\u9fa5]|.){2,20}$/,errInfor:"姓名格式错误"},//客户姓名
    idNumber : {reg:/^[1-9]\d{16}([0-9]|[xX])$/,errInfor:"身份证格式错误"},//身份证号码
    telePhone : {reg:/^(\+86-|\(86\)|86\-|\(+86\))?(\(\d{3,4}\)|\d{3,4}-|\d{3,4}\s)\d{7,14}$/,errInfor:"电话格式错误"},//固定电话
    address : {reg:/^([^\x00-\xff]|[A-Za-z0-9_])+/,errInfor:"地址格式错误"},//联系地址
    mailCode : {reg:/^\d{6}$/,errInfor:"邮政编码格式错误"},//邮政编码
    referrer : {reg:/^[\u4e00-\u9fa5a-zA-Z0-9_\-]{4,20}$/,errInfor:"推荐人格式错误"},//推荐人
    qq : {reg:/^[1-9]\d{4,14}$/,errInfor:"QQ号格式错误"},//qq号码
    message : {reg:/^[a-zA-Z0-9]{6}$/},//短信验证
    score : {reg:/^[1-9][0-9]{0,7}$/,errInfor:"积分格式错误"},//积分验证
    referrName : {reg:/^[\u4e00-\u9fa5a-zA-Z0-9_\-]{4,20}$/,errInfor:"用户名格式错误"},//用户名

}


