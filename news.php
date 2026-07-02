<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$count = isset($_GET['count']) ? (int) $_GET['count'] : 16;
if ($count < 4) {
    $count = 4;
}
if ($count > 200) {
    $count = 200;
}

$rssUrl = 'https://news.google.com/rss/search?q=site:finance.detik.com&hl=id&gl=ID&ceid=ID:id';
$requestHeaders = "User-Agent: MorningMalas/1.0\r\nAccept: application/rss+xml, application/xml;q=0.9, */*;q=0.8\r\n";

$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'timeout' => 12,
        'header' => $requestHeaders,
    ],
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
    ],
]);

$rssContent = @file_get_contents($rssUrl, false, $context);
if (($rssContent === false || trim($rssContent) === '') && function_exists('curl_init')) {
    $ch = curl_init($rssUrl);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_HTTPHEADER => [
            'User-Agent: MorningMalas/1.0',
            'Accept: application/rss+xml, application/xml;q=0.9, */*;q=0.8',
        ],
    ]);
    $curlBody = curl_exec($ch);
    $curlError = curl_errno($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($curlError === 0 && $httpCode >= 200 && $httpCode < 400 && is_string($curlBody) && trim($curlBody) !== '') {
        $rssContent = $curlBody;
    }
}

if ($rssContent === false || trim($rssContent) === '') {
    http_response_code(502);
    echo json_encode([
        'status' => 'error',
        'message' => 'Gagal mengambil feed Detik Finance',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

libxml_use_internal_errors(true);
$xml = simplexml_load_string($rssContent, 'SimpleXMLElement', LIBXML_NOCDATA);
if ($xml === false || !isset($xml->channel->item)) {
    http_response_code(502);
    echo json_encode([
        'status' => 'error',
        'message' => 'Feed Detik Finance tidak valid',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$items = [];
foreach ($xml->channel->item as $item) {
    $title = trim((string) ($item->title ?? ''));
    $link = trim((string) ($item->link ?? ''));
    $pubDate = trim((string) ($item->pubDate ?? ''));

    if ($title === '' || $link === '') {
        continue;
    }

    $items[] = [
        'title' => $title,
        'link' => $link,
        'pubDate' => $pubDate,
    ];

    if (count($items) >= $count) {
        break;
    }
}

if (count($items) === 0) {
    http_response_code(502);
    echo json_encode([
        'status' => 'error',
        'message' => 'Tidak ada berita dari feed Detik Finance',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

echo json_encode([
    'status' => 'ok',
    'items' => $items,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
