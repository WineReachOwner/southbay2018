<?php
if(isset($_GET['google_map_url']) && $_GET['stack_id'] === 'stacks_in_4122_page13') {
	$map_url = base64_decode($_GET['google_map_url']);
	$map_id = md5($map_url);
	$cache_img = "google_map_${map_id}.png";
	$cache_age = 24*60*60;

	if (!file_exists($cache_img) || (file_exists($cache_img) && time()-filemtime($cache_img) > $cache_age)) {
		// If the cache image does not exist and is greater than cache_mins old, then create it
		$fp = fopen($cache_img, "wb");
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_FILE, $fp);
	    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	    curl_setopt($ch, CURLOPT_HEADER, 0);
	    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
		curl_setopt($ch, CURLOPT_URL, $map_url);
		curl_exec($ch);
		curl_close($ch);
		fclose($fp);
	}
	// $img = imagecreatefrompng($cache_img);
	// header('Content-Type: image/png');
	// imagepng($img);
	// imagedestroy($img);
	echo $cache_img;
	exit(0);
}
?>
