/**
*
*BOOKMARK SCRIPT
*
*/

function bookmark(id,target){

	//#toggle design
	if($(target).hasClass('active')){
		$(target).removeClass('active')

	}else{
		$(target).addClass('active')

	}

	if(window.localStorage.getItem('saved_bookmarks')==null){

		//remove click event first
		$(target).prop('onclick',null).off('click');

		saveBookmarksToRemoteServer(id,function(){
			$(target).addClass('active')
			$(target).attr('onclick',$(target).attr('onclick'));
		},function(){
			$(target).removeClass('active')
			$(target).attr('onclick',$(target).attr('onclick'));
		});




	}else{
		//remove click event first
		$(target).prop('onclick',null).off('click');

		//clear from server
		var bookmarks_winery=JSON.parse(window.localStorage.getItem('saved_bookmarks'));

			if(bookmarks_winery[id]!=null){
				clearBookmarksToRemoteServer(id,bookmarks_winery[id],function(){
					$(target).removeClass('active')
					$(target).attr('onclick',$(target).attr('onclick'))
				},function(){
					$(target).addClass('active')
					$(target).attr('onclick',$(target).attr('onclick'))
				});

			}

			if(bookmarks_winery[id]==null){
				saveBookmarksToRemoteServer(id,function(){
					$(target).addClass('active')
					$(target).attr('onclick',$(target).attr('onclick'))
				},function(){
					$(target).removeClass('active')
					$(target).attr('onclick',$(target).attr('onclick'))
				});

			}



	}


}

function setActive(id){

	//By default bookmark is not known so create it for the first time before adding item on it
	if(window.localStorage.getItem('bookmarks')==null){
		var bookmarks_winery=[];
		bookmarks_winery.push(id);

		var json=JSON.stringify(bookmarks_winery);
		window.localStorage.setItem('bookmarks',json)

	}else{
		//if it is already declared just push it to the storage
		var bookmarks_winery=JSON.parse(window.localStorage.getItem('bookmarks'));

		//if already exist in bookmarks remove the item on bookmark
		//or else remove it from bookmarks list
		var index=bookmarks_winery.indexOf(id);
		if(index<0){
			bookmarks_winery.push(id)
		}else{

			bookmarks_winery.splice(index,1);
		}

		//set changes to storage
		var json=JSON.stringify(bookmarks_winery);
		window.localStorage.setItem('bookmarks',json)
	}

}

function saveBookmarksToRemoteServer(winery,callback,error_callback){
	//http://williambaughman.com/apitest/api.bookmarks.php
	$.post('https://hwjqi3t3vd.execute-api.us-west-1.amazonaws.com/southbay/vendors/bookmark/',{id:winery,uuid:device.uuid},function(json){
		console.log(json)
		try{

			 //aws returns object
            if(typeof json=='object'){
            	var data=json
            }else{
            	//show result into the target div
           		var data=JSON.parse(json);
            }



			if(typeof data.id!='undefined'){

				//saved to local storage
				if(window.localStorage.getItem('saved_bookmarks')==null){
					var bookmarks_winery={};
					bookmarks_winery[winery]=data.id
				}else{
					var bookmarks_winery=JSON.parse(window.localStorage.getItem('saved_bookmarks'));
					bookmarks_winery[winery]=data.id;
				}

				//set changes to storage
				var json=JSON.stringify(bookmarks_winery);
				window.localStorage.setItem('saved_bookmarks',json)

				callback();

			}else{
				error_callback();
			}

		}catch(e){error_callback();}

	}).fail(function(){
		error_callback();
	})
}


function clearBookmarksToRemoteServer(winery,id,callback,error_callback){
	$.post('https://hzkd2pj18a.execute-api.us-west-1.amazonaws.com/southbay/vendors/unmark/',{id:id,uuid:device.uuid},function(json){
		try{


				 //aws returns object
	            if(typeof json=='object'){
	            	var data=json
	            }else{
	            	//show result into the target div
	           		var data=JSON.parse(json);
	            }

				if(data.status==200){


					//saved to local storage
					if(window.localStorage.getItem('saved_bookmarks')!=null){
						var bookmarks_winery=JSON.parse(window.localStorage.getItem('saved_bookmarks'));

						bookmarks_winery[winery]=null;

						//set changes to storage
						var json=JSON.stringify(bookmarks_winery);
						window.localStorage.setItem('saved_bookmarks',json)


					}

					callback()
				}else{
					error_callback();
				}





		}catch(e){}
	}).fail(function(){
		error_callback();
	})
}
