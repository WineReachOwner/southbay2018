/*
* Note script
* Shows and write notes to winery
*
*/

/*----------------------------------------------------
|
| Show notes
| Replace notes with line break
|-----------------------------------------------------*/
function showNotes(wineryID,target){

	
	//if it is already declared just push it to the storage
	try{
		var notes_winery=JSON.parse(window.localStorage.getItem('notes'));
		var notes=notes_winery[0][window.localStorage.getItem('id')];

		//replace carriage return with <br/>
		//please note that text MUST NOT BE REPLACED if you are going to place it inside TEXTAREA element
		var text=notes.replace(/(?:\r\n|\r|\n)/g, '<br />');

		var htm=`<div id='stacks_out_363_page12' class='stacks_out'>
									<div id='stacks_in_363_page12' class='stacks_in html_stack'>
										<font face="Open Sans">`+text+`</font>
									</div>
								</div>`;
		//append to html	
		$(target).html(htm);

	}catch(e){}
}

