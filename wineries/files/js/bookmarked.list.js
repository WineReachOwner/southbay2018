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
    var target='.bookmarked-list-section'

        /*----------------------------------------------------
		| Read bookmarks from localstorage bookmarks
		| and set activeClass=active if wineryID is on the list
		|-----------------------------------------------------*/
		var activeClass='';

		try{
			if(typeof bookmarks[data.id]!='undefined'){
				//avoid null values
				if(bookmarks[data.id]!=null) activeClass='active';
	    	 }
		}catch(e){}


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
											<a href="../details/details.html" data-id="`+data.id+`" data-json='`+JSON.stringify(data)+`' class="list-link" rel="" onclick="setVendorActive(this,event);">

												<div id='stacks_out_24_page1' class='stacks_out'>
													<div id='stacks_in_24_page1' class='stacks_in com_joeworkman_stacks_foundation_header_stack'>
														<h3 class="text-left     " >`+data.business_name+`</h3>

													</div>
												</div>
											</a>
										</div>
										<div class='columns small-3  '>
											<div id='stacks_out_26_page1' class='stacks_out'>
												<div id='stacks_in_26_page1' class='stacks_in com_joeworkman_stacks_foundation_image_stack'>

													<div class="text-center  ">
														<span class="bookmarks `+activeClass+`" onclick="event.preventDefault();bookmark(`+data.id+`,this);"  data-vendor-type="`+data.category.toLowerCase()+`"></span>

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


	//shows the list to html element
	$(target).append(htm);

}


function readFromBookmarks(){
	var bookmarked=(window.localStorage.getItem('saved_bookmarks'))
	var savedItems=(window.localStorage.getItem('wineries'))
	var bokmarkedArray=[]

	if(bookmarked&&savedItems){
		var item=JSON.parse(bookmarked)
		var sItems=JSON.parse(savedItems)
		for(var a in sItems.result){
			if(typeof item[sItems.result[a].id]=='string'){
				appendToList(sItems.result[a])
			}
		}

		for(var x in item){
			console.log(x)
		}
	}

}
