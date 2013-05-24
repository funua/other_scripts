var arr=$.makeArray($('.pile #clickArea'));
var delay = 5000;
function func(){
	if (arr.length == 0) {
		alert('All done');
		return false;
	}
	var item = arr.shift();
	$(item).click();
	setTimeout(function(){
		var a = document.createElement('a');
		var name = $('.track').html()+' - '+$('.artist').html();
		a.href = $('#audioplayer').attr('src');
		a.download = name;
		a.click();
		func();
	}, delay)
}
func();
