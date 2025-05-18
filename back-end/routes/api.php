<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\SocietePartenaireController;
use App\Http\Controllers\AgenceController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\ServiceDemandeController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\AdministrationController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Response;


Route::get('accueil', fn () => response()->json([], Response::HTTP_OK));
Route::get('services', fn () => response()->json([], Response::HTTP_OK));
Route::get('prestataires', fn () => response()->json([], Response::HTTP_OK));
Route::get('a-propos', fn () => response()->json([], Response::HTTP_OK));

Route::prefix('client')->group(function () {
    Route::post('register', [ClientController::class, 'register']);
    Route::post('login', [ClientController::class, 'login']);
});
Route::prefix('societe')->group(function () {
    Route::post('/register', [SocietePartenaireController::class, 'register']);
    Route::post('/login', [SocietePartenaireController::class, 'login']);
});
