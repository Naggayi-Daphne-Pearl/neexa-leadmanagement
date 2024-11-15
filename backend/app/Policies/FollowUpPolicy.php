<?php


namespace App\Policies;

use App\Models\FollowUp;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FollowUpPolicy
{
    use HandlesAuthorization;

    public function update(User $user, FollowUp $followUp)
    {
        return in_array($user->role, ['Admin', 'Sales Manager']);
    }
}
