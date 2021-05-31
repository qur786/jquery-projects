$('document').ready(function(){
	//search bar animation
	var searchField = $('#query');
	var icon = $('#search-btn');
	
	$(searchField).on('focus',function(){
		$(this).animate({
			width:"100%"
		},400);
		
		$(icon).animate({
			right:'10px'
		},400);
	});
	
	$(searchField).on('blur',function(){
		if($(searchField).val() == ""){
			$(this).animate({
				width:"45%"
			},400);
			
			$(icon).animate({
				right:'55%'
			},400);
		}
	});
	
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
});


// search function

function search(){
	//clearing results and buttons
	$('#results').html("");
	$('#buttons').html("");
	
	//getting the query 
	var query = $('#query').val();
	 
	//sending the request
	$.get(
		'https://www.googleapis.com/youtube/v3/search',{
			part: 'snippet , id',
			q : query,
			type:'video',
			key: 'AIzaSyDiCm4f3jeHF-pp6mlGttanJXC53D_Pvcs'
		},
		function(data){
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;
			
			
		// each function
		$.each(data.items,function(i,item){
			var output = getOutput(item);
			$('#results').append(output);
		});
		
		// appending buttons
		var buttons = getButtons(prevPageToken,nextPageToken);
		$('#buttons').append(buttons);
		}
	);
	
}

//nextPage function

function nextPage(){
	
	var token = $('#next-button').data('token');
	var query = $('#next-button').data('query');
	//clearing results and buttons
	$('#results').html("");
	$('#buttons').html("");
	
	//getting the query 
	var query = $('#query').val();
	 
	//sending the request
	$.get(
		'https://www.googleapis.com/youtube/v3/search',{
			part: 'snippet , id',
			q : query,
			pageToken:token,
			type:'video',
			key: 'AIzaSyDiCm4f3jeHF-pp6mlGttanJXC53D_Pvcs'
		},
		function(data){
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;
			
			
		// each function
		$.each(data.items,function(i,item){
			var output = getOutput(item);
			$('#results').append(output);
		});
		
		// appending buttons
		var buttons = getButtons(prevPageToken,nextPageToken);
		$('#buttons').append(buttons);
		}
	);
}

// prevPage function
function prevPage(){
	
	var token = $('#prev-button').data('token');
	var query = $('#prev-button').data('query');
	//clearing results and buttons
	$('#results').html("");
	$('#buttons').html("");
	
	//getting the query 
	var query = $('#query').val();
	 
	//sending the request
	$.get(
		'https://www.googleapis.com/youtube/v3/search',{
			part: 'snippet , id',
			q : query,
			pageToken:token,
			type:'video',
			key: 'AIzaSyDiCm4f3jeHF-pp6mlGttanJXC53D_Pvcs'
		},
		function(data){
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;
			
			
		// each function
		$.each(data.items,function(i,item){
			var output = getOutput(item);
			$('#results').append(output);
		});
		
		// appending buttons
		var buttons = getButtons(prevPageToken,nextPageToken);
		$('#buttons').append(buttons);
		}
	);
}

// defining getOutput function
function getOutput(item){
		var id = item.id.videoId;
		var title = item.snippet.title;
		var description = item.snippet.description;
		var thumbnail = item.snippet.thumbnails.high.url;
		var channelTitle = item.snippet.channelTitle;
		var videoDate = item.snippet.publishedAt;
		
		
		var output = '<li>' +
		'<div class = "left-list">'+
		'<a data-fancybox   href="https://www.youtube.com/watch?v='+id+'">'+
		'<img src ='+thumbnail+' alt="thumbnail"> </a>'+
		'</div>'+
		'<div class="right-list">'+
		'<h3>'+title+'</h3>'+
		'<small> By <span class="chtitle">'+channelTitle+'</span> on <strong>'+videoDate+'</strong></small>'+
		'<p class="vid-description">'+description+'</p>'+
		'</div>'+
		'<div class="clearfix"></div>'+
		'';
		
		return output;
		
}

// defining get button function

function getButtons(prevPageToken,nextPageToken){
	if(!prevPageToken){
		var btnOutput = '<div class="button-container">'+
		'<button id="next-button" class="page-button" '+
		'data-token='+nextPageToken+' data-query='+query+' onclick="nextPage();" >next page </button></div>';
	}
	else{
		var btnOutput = '<div class="button-container">'+
		'<button id="prev-button" class="page-button" '+
		'data-token='+prevPageToken+' data-query='+query+' onclick="prevPage();" >Prev Page </button>'+
		'<button id="next-button" class="page-button" '+
		'data-token='+nextPageToken+' data-query='+query+' onclick="nextPage();" >Next page </button></div>';
	}
	return btnOutput;
}
