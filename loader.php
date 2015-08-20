<?php

/* gets the data from a URL */
function get_data($url)
{
    $ch = curl_init();
    $timeout = 5;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $data = curl_exec($ch);

    if (!curl_errno($ch)) {
        $info = curl_getinfo($ch);
    }
    curl_close($ch);

    $result = array(
        'content' => $data,
        'statusCode' => $info['http_code'],
    );

    return $result;
}

$returned_content = get_data($_GET['url']);

header('Content-type:application/json;charset=utf-8');

echo json_encode($returned_content);
