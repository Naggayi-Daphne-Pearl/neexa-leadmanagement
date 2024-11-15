<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\FollowUpController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/leads', [LeadController::class, 'store']);
Route::get('/leads', [LeadController::class, 'index']);
Route::get('follow-ups', [FollowUpController::class, 'index']);
Route::post('follow-ups', [FollowUpController::class, 'store']);

Route::patch('follow-ups/{id}/status', [FollowUpController::class, 'updateStatus']); 



// Route::apiResource('leads', LeadController::class);
// Route::apiResource('follow-ups', FollowUpController::class);