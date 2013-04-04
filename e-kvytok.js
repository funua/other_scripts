(function again(l){
		console.log(l);
		var minTrains = 1,
			m = Math.floor(Math.random() * (3 - 1 + 1)) + 1,
			date = new Date(),
        	time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
        	msg =  'НОВЫЙ ПОЕЗД!!!';
		setTimeout(function(){
			$.post('http://e-kvytok.kiev.ua/search', {
				page_id: window.page_id,
				Services:'',
				StartAirp1: 'Київ, П-З', 
				StartAirp1Code:'2200000',
				EndAirp1:'Ужгород, ЛЬВ',
				EndAirp1Code:'2218095',
				Date1:'30.04.2013',
				timeout:'1365026971.707'
			}, function(d){
				l = time+': search new train. Found '+d.seats+' train';
				if (d.seats && d.seats*1 > minTrains) {
					setInterval(function(){
						document.title = msg;
						var t = msg.slice(0,1);
						msg = msg.slice(-msg.length+1)
						msg = msg + t;
					}, 100)
					if (confirm('Появились новые билеты!!! Перейти для просмотра?')) {
						window.location = '/'+d.session_id;
					} else again(l);
				} else again(l);
			}, 'json')
		}, 60000)
})('Script Run')