<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FollowUp;
use App\Events\FollowUpStatusChanged;
class FollowUpController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'lead_id' => 'required|exists:leads,id',
            'scheduled_at' => 'required|date|after:now',
        ]);

        $followUp = FollowUp::create($request->all());

        return response()->json($followUp, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Completed,Missed',
        ]);

        $followUp = FollowUp::findOrFail($id);
        $followUp->update(['status' => $request->status]);

        // Trigger event if status is Missed
        if ($request->status === 'Missed') {
            event(new FollowUpStatusChanged($followUp));
        }

        return response()->json($followUp);
    }
}
