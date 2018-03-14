<?php
header('Access-Control-Allow-Origin: *');

//-------------------------------------------
// Return Data
//-------------------------------------------
function return_success($msg)
{
	header('Content-Type: application/json');
	echo json_encode(array(
		'code' => 200,
		'data' => $msg,
	));
	exit();
}
function return_error($msg)
{
	$json = json_encode(array(
		'code' => 500,
		'data' => $msg,
	));
	header('HTTP/1.1 500 Internal Server Error');
	header('Content-Type: application/json');
	die($json);
}

// Assuming the this is deployed at /rw_common/plugins/stacks/
$site_root = preg_replace('/(.*)\/rw_common.+/','$1',__DIR__);
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
	if (!isset($_GET['folder'])) exit;

	$folder = $_GET['folder'];
	$html   = "$site_root/$folder/index.html";
	$php    = "$site_root/$folder/index.php";

	if (file_exists($html) && file_exists($php)) {
		return_success('duplicate');
	}
	return_success('no dups');
}


if ($method == 'POST') {
	if (!isset($_POST['folder'])) exit;
	if (!isset($_POST['remove'])) exit;

	$folder = $_POST['folder'];
	$type   = $_POST['remove'];
	$html   = "$site_root/$folder/index.html";
	$php    = "$site_root/$folder/index.php";

	if ($type == 'html' && file_exists($html)) {
		if (unlink($html)) return_success('complete');
		return_error('unlink html failed');
	}
	if ($type == 'php' && file_exists($php)) {
		if (unlink($php)) return_success('complete');
		return_error('unlink php failed');
	}
}
