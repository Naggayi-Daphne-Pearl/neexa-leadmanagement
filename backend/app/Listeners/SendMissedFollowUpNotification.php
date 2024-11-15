<?php

namespace App\Listeners;

use App\Events\FollowUpStatusChanged;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendFollowUpMissedNotification implements ShouldQueue
{
    public function handle(FollowUpStatusChanged $event)
    {
        if ($event->followUp->status === 'Missed') {
            // Send a notification logic (e.g., via email or other channels)
        }
    }
}
