<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        return Lead::all();
    }

    // Store a newly created resource in storage.
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

    // Display the specified resource.
    public function show(Lead $lead)
    {
        return $lead;
    }

    // Update the specified resource in storage.
    public function update(Request $request, Lead $lead)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:leads,email,' . $lead->id,
            'phone' => 'sometimes|required|string|max:15',
        ]);

        $lead->update($request->all());

        return response()->json($lead);
    }

    // Remove the specified resource from storage.
    public function destroy(Lead $lead)
    {
        $lead->delete();

        return response()->json(null, 204);
    }
}
