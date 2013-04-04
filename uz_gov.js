(function(){
    var jq = document.createElement('script');
    jq.src = "http://code.jquery.com/jquery-latest.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);

    function again(){        
        var date = new Date(),
            time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
            found = false;
        setTimeout(function(){
            $.ajax({
                type:'POST',
                url:'/purchase/search/',
                beforeSend: function (request){
                    request.setRequestHeader('GV-Ajax', 1);
                    request.setRequestHeader('GV-Referer', GV.site.htcur_host + GV.site.requestUri);
                    request.setRequestHeader('GV-Screen', screen.width + 'x' + screen.height);
                    request.setRequestHeader('GV-Token', window.token || '');
                    request.setRequestHeader('GV-Referer-Src', GV.site.refererSrc);
                    request.setRequestHeader("GV-Referer-Src-Jump", 1 * GV.site.refererSrcJump);
                },
                data:{
                    station_id_from:'2200001',
                    station_id_till:'2218095',
                    station_from:'Київ',
                    station_till:'Ужгород',
                    date_dep:'30.04.2013',
                    time_dep:'00:00'
                }
            }).done(function(data){ 
                if (data.error){
                    alert('Ошибка!!! Перезагрузите страницу и запустите скрипт заного');
                } else {
                    try {
                        $.each(data.value, function(){
                            var from = this.from.date_format;
                            var till = this.till.date_format;
                            var msg = time+': Отправление - '+from.hours+':'+((from.minutes+'').length==1?'0'+from.minutes:from.minutes)+';';
                            msg += ' Прибытие - '+till.hours+':'+((till.minutes+'').length==1?'0'+till.minutes:till.minutes)+'; Места:';
                            $.each(this.types, function(){
                                msg += ' '+this.title+'- '+this.places+', ';
                                if (this.letter == 'П') {
                                    alert('Появились билеты на плацкарт. Повторите поиск!');   
                                    found = true;
                                }
                            })
                            console.log(msg);
                        })
                        if (!found) again();
                    } catch(e){
                        console.log(e);
                        alert('Что-то не так) свяжитесь с разработчиком)');
                    }
                }
            });
        }, 60*1000)
    }
    setTimeout(again, 1000);
})()
