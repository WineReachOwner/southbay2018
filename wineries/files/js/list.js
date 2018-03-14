/*
* List script
* Shows list of wineries into a section
*
*/


/*----------------------------------------------------
|
| get details of vendor in the list when click
| this allows to avoid additional request to server
|-----------------------------------------------------*/
function setVendorActive(data,e){
	e.preventDefault();

	window.localStorage.setItem('id',$(data).attr('data-id'))

	if(window.localStorage.getItem('vendor_details')==null){
		var vendor_details={}
		vendor_details[$(data).attr('data-id')]=$(data).attr('data-json')	
	}else{
		var vendor_details=JSON.parse(window.localStorage.getItem('vendor_details'));
		vendor_details[$(data).attr('data-id')]=$(data).attr('data-json')
	}
	
	window.localStorage.setItem('vendor_details',JSON.stringify(vendor_details))

	setTimeout(function(){
		window.location=data.href;
	},300)
}


/*----------------------------------------------------
|
| appendToList()
| append the data as html element
|-----------------------------------------------------*/

function appendToList(data){ 
	var htm=''

	//get bookmarks
    var bookmarks=JSON.parse(window.localStorage.getItem('saved_bookmarks'));

        //get target
    var target=window.sessionStorage.getItem('vendor-target')==null?'':window.sessionStorage.getItem('vendor-target')

    var counter=0;
    var page_limit=30;

    //loop for eachlist
	$.each(data, function(i, field){
        /*----------------------------------------------------
		| Read bookmarks from localstorage bookmarks
		| and set activeClass=active if wineryID is on the list
		|-----------------------------------------------------*/     
		var activeClass='';
		counter ++;
		try{
			if(typeof bookmarks[data[i].id]!='undefined'){
				//avoid null values
				if(bookmarks[data[i].id]!=null) activeClass='active';
	    	 }
		}catch(e){}


		//append each winery to html
		//this requires bookmark.js

		/*
 		htm+=`<p>

					<div style="float:left;width:100%;position:relative;width="100%">
						<a href="#" class="bookmarks `+activeClass+`" onclick="bookmark('`+data[i].wineryID+`',this);">
													</a>
	        			<center>
							<span title="`+data[i].winery+`" onclick="window.localStorage.setItem('id', '`+data[i].wineryID+`');window.location='details.html?id=`+data[i].wineryID+`';"><img class="imageStyle" src="http://williambaughman.com/centralcoast/admin/user_images/`+data[i].logo+`" style="max-width:80%;">
							</span>

							<hr style="background:#808080; border:0; height:2px">

						</center>
					</div>
				</p>`
		*/

		htm+=`<!--vendor-->
<div id='stacks_out_6_page1' class='stacks_out' style="position:relative;">
	<div id='stacks_in_6_page1' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

		<div class='row'>
			<div class='columns small-12   '> 
				<div id='stacks_out_82_page1' class='stacks_out'>
					<div id='stacks_in_82_page1' class='stacks_in com_joeworkman_stacks_link_stack'>

					
							<div id='stacks_out_21_page1' class='stacks_out'>

								<div id='stacks_in_21_page1' class='stacks_in com_joeworkman_stacks_foundation_2col_s3_stack'>

									<div class='row'>
										<div class='columns small-9  '>
											<a href="../details/details.html" data-id="`+data[i].id+`" data-json='`+JSON.stringify(data[i])+`' class="list-link" rel="" onclick="setVendorActive(this,event);"> 
  
												<div id='stacks_out_24_page1' class='stacks_out'>
													<div id='stacks_in_24_page1' class='stacks_in com_joeworkman_stacks_foundation_header_stack'>
														<h3 class="text-left     " >`+data[i].business_name+`</h3>

													</div>
												</div> 
											</a>
										</div>
										<div class='columns small-3  '>  
											<div id='stacks_out_26_page1' class='stacks_out'>
												<div id='stacks_in_26_page1' class='stacks_in com_joeworkman_stacks_foundation_image_stack'>

													<div class="text-center  ">    
														<span class="bookmarks `+activeClass+`" data-vendor-type="`+data[i].category.toLowerCase()+`" onclick="event.preventDefault();bookmark(`+data[i].id+`,this);"></span>
												
													</div>

												</div>
											</div> 
										</div>
									</div>

								</div>
							</div> 
						

					</div>
				</div>
				<div id='stacks_out_10_page1' class='stacks_out'>
					<div id='stacks_in_10_page1' class='stacks_in com_joeworkman_stacks_foundation_divider_s3_stack'>

						<hr class=""/>

					</div>
				</div>
			</div>
		</div>

	</div>
</div>

<!--/vendor-->
			`
    });

	/*----------------------------------------------
	| show more items
	| shows if item count is equal to page treshold
	|
	-----------------------------------------------*/
	window.counter=counter;
	if(counter==page_limit){
		htm+=`<div class="text-center" style="color:rgb(150,150,150);cursor:pointer;" onclick="showMoreList(event,this)">Show More<div>`;

	}

	if(window.counter<=0){
            	var htm=`<div class="text-center internet-connection-status" style="color:rgb(150,150,150);margin-top:30px;">No Available Data<br/>Please check your internet connection<div>`;

				//shows the list to html element
			    $(target).html(htm);
	}

	if(counter>0){
		//shows the list to html element
	    $(target).append(htm);
	}
}



/*----------------------------------------------------
| Read from phone
|-----------------------------------------------------*/

function readListFromLocalStorage(){

	try{
		//show from localstorage
		var storage=window.sessionStorage.getItem('vendor-storage')==null?'list':window.sessionStorage.getItem('vendor-storage')

		//show from localstorage
	    var json=window.localStorage.getItem(storage)
	    var data=$.parseJSON(json)
		appendToList(data.result)
		return data.result
	}catch(e){}

}

//init from server
function readListFromServerInit(){

	//start reading from server and do a pre callback
	readListFromServer(function(json,length){
		if(length>0){
			//clear area for the very first time to avoid appending items from server
			// to the items saved in storage resulting with duplicate in the list
			$('.list-section').html('');
		}
	},function(){
		//$('.list-section').html('oops!');
	});
}


/*----------------------------------------------------
| Read from domain
|-----------------------------------------------------*/
function readListFromServer(callback_pre_success=function(json,count=0,data=[]){},callback_success=function(e){}){
	//settings
	var page=window.sessionStorage.getItem('list-page')==null?1:window.sessionStorage.getItem('list-page')
	//show from localstorage
	var storage=window.sessionStorage.getItem('vendor-storage')==null?'list':window.sessionStorage.getItem('vendor-storage')
	var category=window.sessionStorage.getItem('vendor-category')==null?'winery':window.sessionStorage.getItem('vendor-category')

//https://3otzf2vj3l.execute-api.us-west-1.amazonaws.com/putnam/vendors/

	$.ajax({
         type: "GET",
		url:"https://hdl2fzrybi.execute-api.us-west-1.amazonaws.com/bestcoast/vendors/?category="+category+"&page="+parseInt(page),
         beforeSend: function(){ },
         success: function(json){
            
            //aws returns object
            if(typeof json=='object'){
            	var data=json;

            	//make it a string to be saved in localstorage
            	json=JSON.stringify(json)
            }else{
            	//show result into the target div
           		 var data=$.parseJSON(json)
            }

            
            var length=0;

            try{length=data.result.length;}catch(e){}

            //before appending
            //used in init
            callback_pre_success(json,length);


            //save to local storage if not empty to be accessible later
            if(length>0){
	           	window.localStorage.setItem(storage,json)
	            appendToList(data.result)
	            //set to next page
	            page++
	            window.sessionStorage.setItem('list-page',page);
	            callback_success(data.result);
	        }

            



           
        },error:function(){}
     });
}

function showMoreList(e,element){
	$(element).html('Loading . . .')
	readListFromServer(function(){
		//remove loading
		$(element).remove();
	});
}




