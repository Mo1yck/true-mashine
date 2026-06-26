<?php

namespace App\Traits;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

trait LogsActivity
{
    protected function logActivity($action, $entity = null, $old = null, $new = null)
{
    if (!Auth::check()) {
        return;
    }

    AuditLog::create([
        'user_id' => Auth::id(),
        'action' => $action,
        'entity_type' => $entity ? get_class($entity) : 'system', // <-- ИСПРАВЛЕНО
        'entity_id' => $entity ? $entity->id : null,
        'old_values' => $old,
        'new_values' => $new,
        'ip_address' => request()->ip(),
        'user_agent' => request()->userAgent(),
    ]);
}
}