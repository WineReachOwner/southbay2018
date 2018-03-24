
window.settings={}
window.settings.event={}

/*----------------------------------------------------
|
| appendToList()
| append the data as html element
|-----------------------------------------------------*/

function appendToEventList(data){
	var htm=''

	//get bookmarks
    var bookmarks=JSON.parse(window.localStorage.getItem('event_bookmarks'));

    //get target
    var target=window.sessionStorage.getItem('event-target')==null?'':window.sessionStorage.getItem('event-target')

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



		htm+=`<!--event-->
<div id='stacks_out_3831_page4' class='stacks_out'>
	<div id='stacks_in_3831_page4' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

		<div class='row'>
			<div class='columns small-12   '>
				<div id='stacks_out_3838_page4' class='stacks_out'>
					<div id='stacks_in_3838_page4' class='stacks_in com_joeworkman_stacks_foundation_panel_s3_stack'>

						<div   class="panel panel ">

							<div id='stacks_out_3834_page4' class='stacks_out'>
								<div id='stacks_in_3834_page4' class='stacks_in com_joeworkman_stacks_foundation_header_stack'>

									<h3 class="text-center     " >`+data[i].event_name+`</h3>

								</div>
							</div>

							<div id='stacks_out_3840_page4' class='stacks_out'>
								<div id='stacks_in_3840_page4' class='stacks_in com_joeworkman_stacks_foundation_divider_s3_stack'>

									<hr class=""/>

								</div>
							</div>

							<div id='stacks_out_3833_page4' class='stacks_out'>
								<div id='stacks_in_3833_page4' class='stacks_in com_joeworkman_stacks_foundation_image_stack'>

									<div class="text-center  ">
										<img class="" oncontextmenu="return false;" draggable="false" onerror="this.remove();"  src="`+data[i].cover+`"  data-interchange='[files/small_3833.jpg,(default)]' alt="My Image"/>
									</div>

								</div>
							</div>

							<div id='stacks_out_3866_page4' class='stacks_out'>
								<div id='stacks_in_3866_page4' class='stacks_in com_joeworkman_stacks_foundation_divider_s3_stack'>

									<hr class=""/>

								</div>
							</div>



							<div id='stacks_out_3836_page4' class='stacks_out'>
								<div id='stacks_in_3836_page4' class='stacks_in com_joeworkman_stacks_foundation_header_stack'>

									<h4 class="text-center     " >`+data[i].event_day+`<br>
										`+data[i].event_date+`<br>
										`+data[i].location+`<br>
										`+data[i].event_time+`<br></h4>

								</div>
							</div>
							<div id='stacks_out_3866_page4' class='stacks_out'>
								<div id='stacks_in_3866_page4' class='stacks_in com_joeworkman_stacks_foundation_divider_s3_stack'>

									<hr class=""/>

								</div>
							</div>


							<div id='stacks_out_3852_page4' class='stacks_out'>
								<div id='stacks_in_3852_page4' class='stacks_in com_joeworkman_stacks_foundation_paragraph_s3_stack'>

 									<p class="text-justify    " draggable="false">`+data[i].about+`</p>

								</div>
							</div>
						</div>

					</div>
				</div>

			</div>
		</div>

	</div>
</div>

<!--/event-->
			`
    });

	/*----------------------------------------------
	| show more items
	| shows if item count is equal to page treshold
	|
	-----------------------------------------------*/
	window.counter=counter;
	if(counter==page_limit){
		htm+=`<div class="text-center" style="color:rgb(150,150,150);cursor:pointer;" onclick="showMoreEvents(event,this)">Show More<div>`;

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

function readEventsFromLocalStorage(){

	try{
		//show from localstorage
		var storage=window.sessionStorage.getItem('event-storage')==null?'events':window.sessionStorage.getItem('event-storage')

	    var json=window.localStorage.getItem(storage)
	    var data=$.parseJSON(json)
		appendToEventList(data.result)
		return data.result
	}catch(e){}

}

//init from server
function readEventsListFromServerInit(){

	//start reading from server and do a pre callback
	readEventsFromServer(function(json,length){
		if(length>0){
			//clear area for the very first time to avoid appending items from server
			// to the items saved in storage resulting with duplicate in the list
			$('.event-section').html('');
		}
	},function(){
		//$('.list-section').html('oops!');
	});
}


/*----------------------------------------------------
| Read from domain
|-----------------------------------------------------*/
function readEventsFromServer(callback_pre_success=function(json,count=0,data=[]){},callback_success=function(e){}){
	//settings
	var page=window.sessionStorage.getItem('event-page')==null?1:window.sessionStorage.getItem('event-page')
	var category=window.sessionStorage.getItem('event-category')==null?1:window.sessionStorage.getItem('event-category')
	var storage=window.sessionStorage.getItem('event-storage')==null?'events':window.sessionStorage.getItem('event-storage')
	$.ajax({
         type: "GET",
         url:"https://hwjqi3t3vd.execute-api.us-west-1.amazonaws.com/southbay/events/?category="+category+"&page="+parseInt(page),
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
	            appendToEventList(data.result)
	            //set to next page
	            page++
	            window.sessionStorage.setItem('event-page',page);
	            callback_success(data.result);
	        }






        },error:function(){}
     });
}

function showMoreEvents(e,element){
	$(element).html('Loading . . .')
	readEventsFromServer(function(){
		//remove loading
		$(element).remove();
	});
}
