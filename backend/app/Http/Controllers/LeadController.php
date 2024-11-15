<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index()
    {
        
    $leads = Lead::with('followUps')->get();
        return response()->json(Lead::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:leads,email',
            'phone' => 'required|string|max:15',
        ]);

        $lead = Lead::create($request->all());

        return response()->json($lead, 201);
    }

    public function show(Lead $lead)
    {
        return response()->json($lead); 
    }

    // Update the specified lead in storage.
    public function update(Request $request, Lead $lead)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:leads,email,' . $lead->id,
            'phone' => 'sometimes|required|string|max:15',
        ]);

        $lead->update($request->all());

        // Returning the updated lead as JSON
        return response()->json($lead);
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return response()->json(null, 204);
    }
}
