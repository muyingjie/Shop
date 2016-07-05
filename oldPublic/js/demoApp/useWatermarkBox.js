define(function (require) {
    
    $(".userWaterMarkBtn").click(function () {
        $.post("url",{isChecked:$("input:checked").attr("id")}, function () {
            if(data.state){
                
            }
        })
    })
})