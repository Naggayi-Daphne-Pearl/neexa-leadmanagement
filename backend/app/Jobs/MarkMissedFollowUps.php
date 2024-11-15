<?php

// app/Jobs/MarkMissedFollowUps.php

namespace App\Jobs;

use App\Models\FollowUp;
use Carbon\Carbon;

class MarkMissedFollowUps
{
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $overdueFollowUps = FollowUp::where('status', '!=', 'Completed')
            ->where('scheduled_at', '<', Carbon::now())
            ->get();

        foreach ($overdueFollowUps as $followUp) {
            $followUp->update(['status' => 'Missed']);
        }
    }
}

