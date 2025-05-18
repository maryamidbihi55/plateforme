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

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::middleware('auth:sanctum')->post('logout', 'logout');
});
Route::middleware('auth:sanctum')->get('client/info', 'ClientController@index');
Route::middleware('auth:sanctum')->get('client/services', 'ClientController@listRequestedServices');

/*
Route::apiResource('clients', ClientController::class);
Route::apiResource('societes', SocietePartenaireController::class);
Route::apiResource('agences', AgenceController::class);
Route::apiResource('agents', AgentController::class);
Route::apiResource('services-demandes', ServiceDemandeController::class);
Route::apiResource('paiements', PaiementController::class);
Route::apiResource('avis', AvisController::class);
Route::apiResource('administrations', AdministrationController::class);
Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'API IS OK']);
});
*/
