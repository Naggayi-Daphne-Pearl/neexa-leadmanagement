// app/Listeners/SendFollowUpStatusNotification.php

namespace App\Listeners;

use App\Events\FollowUpStatusChanged;
use App\Notifications\FollowUpStatusNotification;
use Illuminate\Support\Facades\Notification;

class SendFollowUpStatusNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\FollowUpStatusChanged  $event
     * @return void
     */
    public function handle(FollowUpStatusChanged $event)
    {
        $followUp = $event->followUp;

        // Send a notification to the lead associated with the follow-up
        Notification::send($followUp->lead, new FollowUpStatusNotification($followUp));
    }
}
