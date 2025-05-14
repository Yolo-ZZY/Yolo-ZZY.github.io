$(document).ready(function () {


    // 动态心跳
    $('.copyright').html('©2022 <i class="fa-fw fas fa-heartbeat card-announcement-animation cc_pointer"></i> By yolo-zzy');

    // 插入运行时间容器
    $('.framework-info').html('小破站已经安全运行<span id="span_dt_dt" style="color: #fff;"></span>');

    // 启动时间更新
    show_date_time();
});

function show_date_time() {
    var $span = $('#span_dt_dt');

    if ($span.length) {
        var BirthDay = new Date("3/1/2025 0:0:0");
        var today = new Date();
        var timeold = today.getTime() - BirthDay.getTime();
        var msPerDay = 24 * 60 * 60 * 1000;

        var daysold = Math.floor(timeold / msPerDay);
        var hrsold = Math.floor(((timeold / msPerDay) - daysold) * 24);
        var minsold = Math.floor((((timeold / msPerDay) - daysold) * 24 - hrsold) * 60);
        var seconds = Math.floor(((((timeold / msPerDay) - daysold) * 24 - hrsold) * 60 - minsold) * 60);

        $span.html(
            '<font style=color:#afb4db>' + daysold + '</font> 天 ' +
            '<font style=color:#f391a9>' + hrsold + '</font> 时 ' +
            '<font style=color:#fdb933>' + minsold + '</font> 分 ' +
            '<font style=color:#a3cf62>' + seconds + '</font> 秒'
        );
    }

    setTimeout(show_date_time, 1000);
}