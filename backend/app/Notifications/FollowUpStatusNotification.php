<?php

// app/Notifications/FollowUpStatusNotification.php

namespace App\Notifications;

use App\Models\FollowUp;
use Illuminate\Notifications\Notification;

class FollowUpStatusNotification extends Notification
{
    public $followUp;

    /**
     * Create a new notification instance.
     *
     * @param FollowUp $followUp
     */
    public function __construct(FollowUp $followUp)
    {
        $this->followUp = $followUp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail']; // You can add other channels like 'database', 'slack', etc.
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new \Illuminate\Notifications\Messages\MailMessage)
                    ->line('The status of your follow-up has been updated.')
                    ->line('New status: ' . $this->followUp->status)
                    ->action('View Follow-Up', url('/follow-ups/' . $this->followUp->id))
                    ->line('Thank you for using our application!');
    }
    }
