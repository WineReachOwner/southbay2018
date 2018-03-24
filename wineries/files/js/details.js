/*
* Details script
* Append details of winery into a section
*
*/

/*----------------------------------------------------
|
| appendToList()
| append the data as html element
|-----------------------------------------------------*/

function appendToList(data){

	/*----------------------------------------------------
	| Read bookmarks from localstorage bookmarks
	| and set activeClass=active if wineryID is on the list
	|-----------------------------------------------------*/
	var activeClass='';

	//get bookmarks
    var bookmarks=JSON.parse(window.localStorage.getItem('saved_bookmarks'));

	try{
		if(typeof bookmarks[data.wineryID]!='undefined'){
			//avoid null values
			if(bookmarks[data.wineryID]!=null) activeClass='active';
    	 }
	}catch(e){}


	var counter=0;
	var page_limit=30;

	var htm='';
	//wines
	for(var x=0;x<data.length; x++){
		counter++;

		htm+=`<!--products-->
			<div id='stacks_out_193_page12' class='stacks_out'>
				<div id='stacks_in_193_page12' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

					<div class='row'>
						<div class='columns small-12   '>
							<div id='stacks_out_431_page12' class='stacks_out'>
								<div id='stacks_in_431_page12' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

									<div class='row'>
										<div class='columns small-12'>
											<div id='stacks_out_432_page12' class='stacks_out'>
												<div id='stacks_in_432_page12' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

													<div class='row'>
														<div class='columns small-12   '>
															<div id='stacks_out_467_page12' class='stacks_out'>
																<div id='stacks_in_467_page12' class='stacks_in com_joeworkman_stacks_foundation_paragraph_s3_stack'>

			 														<p class="text-left    " draggable="false">`+data[x].product_name+`</p>

																</div>
															</div>
															<div id='stacks_out_435_page12' class='stacks_out'>
																<div id='stacks_in_435_page12' class='stacks_in html_stack columns small-12 ' style="padding-left:0px;">
																	`

																	//cork

																	var rate=0;
																	var activeClass='';

																	//get ratings
																	if(typeof get_rate_products(window.localStorage.getItem('id'),data[x].id)!='undefined'){
																		rate=(get_rate_products(window.localStorage.getItem('id'),data[x].id))
																	}


																	//show rate icon
																	for(var a=0;a<5;a++){

																		if(a<rate){activeClass='active';}else{activeClass='';}
																		htm+=`<span class="corks `+activeClass+` cork-`+data[x].id+`" data-position="`+a+`" onclick="rate_product(`+window.localStorage.getItem('id')+`,`+data[x].id+`,`+a+`)"></span>`;
																	}




															htm+=	`
																</div>
															</div>
															<div id='stacks_out_437_page12' class='stacks_out'>
																<div id='stacks_in_437_page12' class='stacks_in html_stack'>
																	<font face="Open Sans">`+data[x].about+`</font>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id='stacks_out_369_page12' class='stacks_out'>
								<div id='stacks_in_369_page12' class='stacks_in com_joeworkman_stacks_foundation_divider_s3_stack'>

									<hr class=""/>

								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			<!--/products-->`
	}

	/*----------------------------------------------
	| show more items
	| shows if item count is equal to page treshold
	|
	-----------------------------------------------*/
	window.counter=counter;
	if(counter==page_limit){
		htm+=`<div class="text-center" style="color:rgb(150,150,150);"  onclick="showMoreProducts(event,this)">Show More<div>`;

	}

	if(window.counter<=0){
            	var htm=`<div class="text-center internet-connection-status" style="color:rgb(150,150,150);margin-top:30px;">No Available Data<br/>Please check your internet connection<div>`;

				//shows the list to html element
			    $('.product_section').html(htm)
	}

	if(counter>0){
		//shows the list to html element
	    $('.product_section').append(htm)
	}





	//add active state if corks is click
	$('.corks').click(function(){

		$(this).removeClass('active');
		$(this).addClass('active');

		var parent=$(this).parent()
		var position=$(this).attr('data-position');
		var children=$(parent).children();
		for(var x=0;x<children.length;x++){
			$(children[x]).removeClass('active');

			if(x<=position){
				$(children[x]).addClass('active');
			}

		}

	})

}




/*----------------------------------------------------
|
| Read details from phone
|
|-----------------------------------------------------*/
function readDetailsFromStorage(){
	//read from local storage
	try{
  	 	var json=window.localStorage.getItem('cache-'+window.localStorage.getItem('vendor_id'));
  	 	var data=$.parseJSON(json)
  	 	appendToList(data)
  	}catch(e){}

}


/*----------------------------------------------------
|
| Read vendor details from phone
|
|-----------------------------------------------------*/
function readVendorDetailsFromStorage(callback=function(data){}){
	//read from local storage
	try{
  	 	var json=window.localStorage.getItem('vendor_details');
  	 	var id=window.localStorage.getItem('id');
  	 	var data=JSON.parse(json)

  	 	callback(JSON.parse(data[id]))

  	}catch(e){}

}

function showVendorDetails(data){

	/*----------------------------------------------------
	| Read bookmarks from localstorage bookmarks
	| and set activeClass=active if wineryID is on the list
	|-----------------------------------------------------*/
	var activeClass='';

	//get bookmarks
    var bookmarks=JSON.parse(window.localStorage.getItem('saved_bookmarks'));

	try{
		if(typeof bookmarks[data.id]!='undefined'){
			//avoid null values
			if(bookmarks[data.id]!=null) activeClass='active';
    	 }
	}catch(e){}

		var logo=`
			<div id='stacks_out_160_page12' class='stacks_out'  style="position:relative;">
				<div id='stacks_in_160_page12' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

					<div class='row'>
						<div class='columns small-12  small-centered    medium-12  medium-centered      large-12  large-centered     '>
							<div id='stacks_out_231_page12' class='stacks_out'>
								<div id='stacks_in_231_page12' class='stacks_in com_joeworkman_stacks_foundation_image_stack'>

									<!--bookmark icon-->
									<span class="bookmarks `+activeClass+`" onclick="bookmark('`+data.id+`',this);"  data-vendor-type="`+data.category.toLowerCase()+`" ></span>

									<div class="text-center  ">
											<img class="" oncontextmenu="return false;" draggable="false"  src="`+data.logo+`" width="85%"  data-interchange='[details_files/small_231.png,(default)]' alt="My Image" onerror="this.remove()"/>
									</div>

								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div id='stacks_out_162_page12' class='stacks_out'>
				<div id='stacks_in_162_page12' class='stacks_in com_joeworkman_stacks_foundation_divider_s3_stack'>

					<hr class=""/>

				</div>
			</div>
		`;

	var html=logo+ `<!--details-->

				<div id='stacks_out_187_page12' class='stacks_out'>
					<div id='stacks_in_187_page12' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

						<div class='row'>
							<div class='columns small-12   '>
								<div id='stacks_out_465_page12' class='stacks_out'>
									<div id='stacks_in_465_page12' class='stacks_in com_joeworkman_stacks_foundation_panel_s3_stack'>

										<div   class="panel panel ">
											<div id='stacks_out_238_page12' class='stacks_out'>
												<div id='stacks_in_238_page12' class='stacks_in com_joeworkman_stacks_foundation_paragraph_s3_stack'>

						 							<p class="text-left    " draggable="false">
						 								<span id='stacks_in_239_page12'>`+data.business_name+`</span>
						 							</p>

												</div>
											</div>
											<div id='stacks_out_461_page12' class='stacks_out'>
												<div id='stacks_in_461_page12' class='stacks_in com_joeworkman_stacks_foundation_paragraph_s3_stack'>

						 							<p class="text-left    " draggable="false">`+data.location+`</p>

												</div>
											</div>
											<div id='stacks_out_463_page12' class='stacks_out'>
												<div id='stacks_in_463_page12' class='stacks_in com_joeworkman_stacks_foundation_paragraph_s3_stack'>

							 						<p class="text-left    " draggable="false">`+data.website+`</p>

												</div>
											</div>
										</div>

									</div>
								</div>
								<div id='stacks_out_189_page12' class='stacks_out'>
									<div id='stacks_in_189_page12' class='stacks_in com_joeworkman_stacks_foundation_1col_s3_stack'>

										<div class='row        '>
											<div class='columns small-12   '>
												<div id='stacks_out_252_page12' class='stacks_out'>
													<div id='stacks_in_252_page12' class='stacks_in com_joeworkman_stacks_foundation_paragraph_s3_stack'>

							 							<p class="text-left    " draggable="false">`+data.about+`</p>

													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div id='stacks_out_175_page12' class='stacks_out'>
					<div id='stacks_in_175_page12' class='stacks_in com_joeworkman_stacks_foundation_divider_s3_stack'>

						<hr class=""/>

					</div>
				</div>

	<!--/details-->`;

	$('.details_section').html(html)
}


/*----------------------------------------------------
|
| Read details from domain
|
|-----------------------------------------------------*/
function readProductsFromServer(callback_pre_success=function(json,count=0,data=[]){},callback_success=function(e){}){
	//settings
	var page=window.sessionStorage.getItem('product-page')==null?1:window.sessionStorage.getItem('product-page')
//ttps://3otzf2vj3l.execute-api.us-west-1.amazonaws.com/putnam/vendors/preview/
	$.ajax({
	     type: "GET",
	     url:"https://hwjqi3t3vd.execute-api.us-west-1.amazonaws.com/southbay/vendors/preview/?vendor_id="+window.localStorage.getItem('id')+"&products=true&page="+parseInt(page),
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


            if(length>0){
		        //add localy
		        window.localStorage.setItem('cache-'+window.localStorage.getItem('id'),json)

		        appendToList(data.result);

		        //set to next page
	            page++
	            window.sessionStorage.setItem('product-page',page);
	            callback_success(data.result)

	        }


		 },error:function(){

			  	//readDetailsFromStorage();

		        //load data from storage.Thus, unable to connect to server
		        //$('.update-status-bar').addClass('active').html('Unable to connect to server.Please check your internet Connection')
		}


	});
}

//show more products
function showMoreProducts(e,element){
	$(element).html('Loading . . .')
	readProductsFromServer(function(){
		//remove loading
		$(element).remove();
	});
}
