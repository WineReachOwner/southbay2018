<?php header('X-Robots-Tag: noindex'); ?>

<!-- Server Debug info -->

<h3>Server Debug Info</h3>
<div style="color:red">

<?php
	function get_all_the_headers() {
		$all_headers = array();
		if (function_exists('getallheaders')) {
			$all_headers = getallheaders();
		}
		elseif (function_exists('apache_request_headers')) {
			$all_headers = apache_request_headers();
		}
		else {
		    foreach($_SERVER as $name => $value){
		        if(substr($name,0,5)==='HTTP_') {
		            $name=substr($name,5);
		            $name=str_replace('_',' ',$name);
		            $name=strtolower($name);
		            $name=ucwords($name);
		            $name=str_replace(' ', '-', $name);
		            $all_headers[$name] = $value;
		        }
		    }
		}
		return $all_headers;
	}

	$header = get_all_the_headers();
	if (count($header) === 0) echo '<p>Unable to process server request headers.</p>';

	// Image support check
	if (!extension_loaded('gd')) {
		echo "<p>You do not have the PHP gd extension enabled</p>";
	}

	// curl support check
	if (!extension_loaded('curl')) {
		echo "<p>curl extension is not enabled on this server.</p>";
    }

    // EXIF Check
    if (!function_exists('exif_read_data')) {
    	echo "<p>The exif_read_data() function is not installed. Images uploaded from mobile cannot be auto-rotated unless this is installed.</p>";
    }

	// TotalCMS lib dir
	$asset_dir = __DIR__;
	if (!is_writable($asset_dir)) {
		chmod($cms_dir,0775);
		if (!is_writable($asset_dir)) echo "<p>The lib directory is not writable. Please fix the permissions on the directory: $asset_dir</p>";
	}

	if (version_compare(PHP_VERSION, '5.6.0') <= 0) {
	    echo '<p>You are running an unsupported version of PHP. You must be running PHP v5.6+. Your version: '.PHP_VERSION."</p>";
	}
?>
</div>

<?php
	echo '<p>PHP version: '. phpversion() .'</p>';
	echo '<p>HTTP_HOST: '. $_SERVER['HTTP_HOST'] .'</p>';
	echo '<p>SERVER_NAME: '. $_SERVER['SERVER_NAME'] .'</p>';
	echo '<p>DOCUMENT_ROOT: '. $_SERVER['DOCUMENT_ROOT'] .'</p>';
	echo '<p>DOCUMENT_ROOT (realpath): '. realpath($_SERVER['DOCUMENT_ROOT']) .'</p>';
	echo '<p>SITE ROOT: '. preg_replace('/(.*).rw_common.+/','$1',__DIR__) .'</p>';

	if (isset($_SERVER['SUBDOMAIN_DOCUMENT_ROOT']) && is_dir($_SERVER['SUBDOMAIN_DOCUMENT_ROOT'])) echo '<p>SUBDOMAIN_DOCUMENT_ROOT (GoDaddy?): '.$_SERVER['SUBDOMAIN_DOCUMENT_ROOT'].'</p>';
	if (isset($_SERVER['PHPRC']) && is_dir($_SERVER['PHPRC'])) echo '<p>PHPRC: '.$_SERVER['PHPRC'].'</p>';

	echo '<p>POST_MAX_SIZE: '.ini_get('post_max_size').'</p>';
	echo '<p>UPLOAD_MAX_FILESIZE: '.ini_get('upload_max_filesize').'</p>';
	echo '<p>MEMORY LIMIT: '.ini_get('memory_limit').'</p>';
	echo '<p>MAX_EXECUTION_TIME: '.ini_get('max_execution_time').'</p>';
?>

<pre><?php if(isset($_GET['info'])) phpinfo(); ?></pre>
