<?php

namespace App\Events;

use App\Models\FollowUp;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FollowUpStatusChanged
{
    use Dispatchable, SerializesModels;

    public $followUp;

    public function __construct(FollowUp $followUp)
    {
        $this->followUp = $followUp;
    }
}
