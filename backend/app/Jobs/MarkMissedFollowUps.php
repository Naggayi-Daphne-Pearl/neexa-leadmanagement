<?php

namespace App\Jobs;

use App\Models\FollowUp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class MarkMissedFollowUps implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function handle()
    {
        $followUps = FollowUp::where('status', 'Pending')
                             ->where('scheduled_at', '<', now())
                             ->get();

        foreach ($followUps as $followUp) {
            $followUp->update(['status' => 'Missed']);
        }
    }
}
