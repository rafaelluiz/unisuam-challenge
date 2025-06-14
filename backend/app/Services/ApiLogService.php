<?php

namespace App\Services;

use App\Models\ApiLog;
use Illuminate\Support\Facades\Request;

class ApiLogService
{
    public static function log(
        string $method,
        string $endpoint,
        array $payload = null,
        int $statusCode = 200
    ): void {
        ApiLog::create([
            'method' => strtoupper($method),
            'endpoint' => $endpoint,
            'payload' => $payload ?? [],
            'status_code' => $statusCode,
            'created_at' => now(),
        ]);
    }
}
