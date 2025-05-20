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
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Response;


Route::get('accueil', fn () => response()->json([], Response::HTTP_OK));
Route::get('services', fn () => response()->json([], Response::HTTP_OK));
Route::get('prestataires', fn () => response()->json([], Response::HTTP_OK));
Route::get('a-propos', fn () => response()->json([], Response::HTTP_OK));

Route::prefix('client')->group(function () {
    Route::post('/register', [ClientController::class, 'register']);
    Route::post('/login', [ClientController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
       Route::get('/profile', [ClientController::class, 'profile']);
       Route::put('/profile/update', [ClientController::class, 'update']);
       Route::post('/logout', [ClientController::class, 'logout']);
       Route::get('/reservations', [ServiceDemandeController::class, 'index']);
       Route::post('/reservations', [ServiceDemandeController::class, 'store']);
       Route::delete('/reservations/{id}', [ServiceDemandeController::class, 'destroy']);
});
});

Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categorie/{id}/agences', [CategorieController::class, 'agencesParCategorieId']);

Route::prefix('societe')->group(function () {
    Route::post('/register', [SocietePartenaireController::class, 'register']);
    Route::post('/login', [SocietePartenaireController::class, 'login']);
 Route::middleware('auth:societe_api')->group(function () {
        Route::post('/logout', [SocietePartenaireController::class, 'logout']);
        Route::get('/profile', [SocietePartenaireController::class, 'getProfile']);
        Route::put('/profile', [SocietePartenaireController::class, 'updateProfile']);
        Route::put('/agences/{id}/valider', [SocietePartenaireController::class, 'validerAgence']);
        Route::get('/stats', [SocietePartenaireController::class, 'getStats']);
    });
});


Route::prefix('agent')->group(function () {
    Route::post('/register', [AgentController::class, 'register']);
    Route::post('/login', [AgentController::class, 'login']);
});

Route::prefix('agence')->group(function () {
    Route::post('/register', [AgenceController::class, 'register']);
    Route::post('/login', [AgenceController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [AgenceController::class, 'logout']);
    Route::get('/{id}', [AgenceController::class, 'show']);
    Route::post('/valider-agent/{id}', [AgenceController::class, 'validerAgent']);
    Route::get('/{id}/agents', [AgenceController::class, 'listeAgents']);
    Route::get('/demandes/{id_agence}', [AgenceController::class, 'demandesParAgence']);
    Route::post('/traiter-demande/{id}', [AgenceController::class, 'traiterDemande']);
    Route::post('/affecter-agent/{id_demande}', [AgenceController::class, 'affecterAgent']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/avis', [AvisController::class, 'store']);
});
