<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$payload = [
    'symbols' => [
        'tickers' => ['IDX:COMPOSITE'],
        'query' => ['types' => []],
    ],
    'columns' => ['close', 'change', 'change_abs'],
];

$body = json_encode($payload, JSON_UNESCAPED_SLASHES);
if ($body === false) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyiapkan request IHSG'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$url = 'https://scanner.tradingview.com/global/scan';
$responseText = null;

if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json',
            'User-Agent: MorningMalas/1.0',
        ],
    ]);
    $raw = curl_exec($ch);
    $curlError = curl_errno($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($curlError === 0 && $httpCode >= 200 && $httpCode < 400 && is_string($raw) && trim($raw) !== '') {
        $responseText = $raw;
    }
}

if ($responseText === null) {
    http_response_code(502);
    echo json_encode(['status' => 'error', 'message' => 'Gagal mengambil data IHSG'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$decoded = json_decode($responseText, true);
if (!is_array($decoded) || !isset($decoded['data'][0]['d']) || !is_array($decoded['data'][0]['d'])) {
    http_response_code(502);
    echo json_encode(['status' => 'error', 'message' => 'Respon IHSG tidak valid'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$data = $decoded['data'][0]['d'];
$last = isset($data[0]) ? (float) $data[0] : null;
$changePct = isset($data[1]) ? (float) $data[1] : null;
$changeAbs = isset($data[2]) ? (float) $data[2] : null;

if ($last === null || $changePct === null || $changeAbs === null) {
    http_response_code(502);
    echo json_encode(['status' => 'error', 'message' => 'Data IHSG tidak lengkap'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

echo json_encode([
    'status' => 'ok',
    'last' => $last,
    'changePct' => $changePct,
    'changeAbs' => $changeAbs,
    'updatedAt' => gmdate('c'),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
