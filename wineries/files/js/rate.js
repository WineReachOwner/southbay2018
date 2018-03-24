/*
* Rating script
* This allow users to rate inery and save to device
*
*/

/*----------------------------------------------------
|
| Rate Wine
| Get data from localstorage then add a new item
| Then save to localstorage as cache-rate-wineryID
| Ex. cache-rate-alma_fria
|------------------------------------------------------
|
| Notes:
| Add 1 for ratings coz rating starts from 0
|
| winery.wines for wines
| winery.rare_wines for rare wines
|-------------------------------------------------------*/

function rate_product(wineryID,wineID,rate){
	if(window.localStorage.getItem('cache-rate-'+wineryID)==null){
		var winery_rating={}
		winery_rating[wineryID]={}
		winery_rating[wineryID].products={}
		winery_rating[wineryID].products[wineID]={}


		saveRatingsToRemoteServer(wineryID,wineID,rate+1,function(json){

			 //aws returns object
            if(typeof json=='object'){
            	var data=json
            }else{
            	//show result into the target div
           		var data=JSON.parse(json);
            }




			//save to storage
			winery_rating[wineryID].products[wineID].rate=rate+1;


			winery_rating[wineryID].products[wineID].id=data.id

			//save to device
			window.localStorage.setItem('cache-rate-'+wineryID,JSON.stringify(winery_rating));
		},function(){
			$('.cork-'+wineID).removeClass('active')
		})


	}else{
		var winery_rating=JSON.parse(window.localStorage.getItem('cache-rate-'+wineryID));


		if(typeof winery_rating[wineryID].products[wineID]=='undefined')  winery_rating[wineryID].products[wineID]={}

		//if item is present but no ratings yet
		if(typeof winery_rating[wineryID].products[wineID].rate=='undefined'){
			saveRatingsToRemoteServer(wineryID,wineID,rate+1,function(json){

				 //aws returns object
	            if(typeof json=='object'){
	            	var data=json
	            }else{
	            	//show result into the target div
	           		var data=JSON.parse(json);
	            }


				//save to storage
				winery_rating[wineryID].products[wineID].rate=rate+1;

				winery_rating[wineryID].products[wineID].id=data.id
				//save to device
				window.localStorage.setItem('cache-rate-'+wineryID,JSON.stringify(winery_rating))

			},function(){
				$('.cork-'+wineID).removeClass('active')
			})

		}else{
			var new_rate=rate+1
			if(winery_rating[wineryID].products[wineID].rate==new_rate){
				new_rate=0

				//delete
				deleteRatingsFromRemoteServer(winery_rating[wineryID].products[wineID].id,new_rate,function(json){

					 //aws returns object
		            if(typeof json=='object'){
		            	var data=json
		            }else{
		            	//show result into the target div
		           		var data=JSON.parse(json);
		            }


					//remove storage
					delete winery_rating[wineryID].products[wineID]


					//save to device
					window.localStorage.setItem('cache-rate-'+wineryID,JSON.stringify(winery_rating))

					$('.cork-'+wineID).removeClass('active')

				},function(){
					var old_ratings=(winery_rating[wineryID].products[wineID].rate)

					$('.cork-'+wineID).removeClass('active')

					for(var a=0;a<old_ratings.length;a++){
						$('.cork-'+wineID)[a].classList.add('active')
					}


				})
			//end delete


			}else{

				//update
				updateRatingsToRemoteServer(winery_rating[wineryID].products[wineID].id,new_rate,function(json){

					 //aws returns object
		            if(typeof json=='object'){
		            	var data=json
		            }else{
		            	//show result into the target div
		           		var data=JSON.parse(json);
		            }


					//save to storage
					winery_rating[wineryID].products[wineID].rate=new_rate;


					//save to device
					window.localStorage.setItem('cache-rate-'+wineryID,JSON.stringify(winery_rating))

				},function(){
					var old_ratings=(winery_rating[wineryID].products[wineID].rate)

					$('.cork-'+wineID).removeClass('active')

					for(var a=0;a<old_ratings.length;a++){
						$('.cork-'+wineID)[a].classList.add('active')
					}


				})
			}
		}

	}
}






/*----------------------------------------------------
|
| Get Rate for Wines and rare Wines
| Get data from localstorage
| Ex. cache-rate-alma_fria
|------------------------------------------------------*/

function get_rate_products(id,product_id){
	try{
		var prod=JSON.parse(window.localStorage.getItem('cache-rate-'+id));
		return prod[id].products[product_id].rate;

	}catch(e){
		return 0;
	}
}



function saveRatingsToRemoteServer(wineryID,wine_id,ratings,callback,error_callback){

	$.post('https://hwjqi3t3vd.execute-api.us-west-1.amazonaws.com/southbay/products/ratings/',{id:wine_id,ratings:ratings,vendor_id:wineryID,uuid:device.uuid},function(json){

		try{
			 //aws returns object
            if(typeof json=='object'){
            	var data=json
            }else{
            	//show result into the target div
           		var data=JSON.parse(json);
            }

			if(typeof data.id!='undefined'&&data.status==200){

				callback(json);

			}else{
				error_callback();
			}

		}catch(e){

		}

	}).fail(function(){
		error_callback();
	})
}


function updateRatingsToRemoteServer(id,ratings,callback,error_callback){
	var put_data={id:id,ratings:ratings,uuid:device.uuid};


	$.ajax({
         type: "PUT",
         url:"https://hwjqi3t3vd.execute-api.us-west-1.amazonaws.com/southbay/products/ratings/",
         data:put_data,
         beforeSend: function(){ },
         success: function(json){
	         try{
				 //aws returns object
	            if(typeof json=='object'){
	            	var data=json
	            }else{
	            	//show result into the target div
	           		var data=JSON.parse(json);
	            }

				if(typeof data.affected_rows!='undefined'){
					callback(json);
				}else{
					error_callback();
				}
			}catch(e){
				error_callback();
			}
        },error:function(){
        	error_callback();
		}
    });
}



function deleteRatingsFromRemoteServer(id,ratings,callback,error_callback){
	var put_data={id:id,ratings:ratings,uuid:device.uuid};


	$.ajax({
         type: "DELETE",
         url:"https://hwjqi3t3vd.execute-api.us-west-1.amazonaws.com/southbay/products/ratings/",
         data:put_data,
         beforeSend: function(){ },
         success: function(json){
	         try{
				 //aws returns object
	            if(typeof json=='object'){
	            	var data=json
	            }else{
	            	//show result into the target div
	           		var data=JSON.parse(json);
	            }

				if(typeof data.affected_rows!='undefined'){
					callback(json);
				}else{
					error_callback();
				}
			}catch(e){
				error_callback();
			}
        },error:function(){
        	error_callback();
		}
    });
}
