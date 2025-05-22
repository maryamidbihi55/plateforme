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
       Route::post('/avis', [AvisController::class, 'store']);
});
});

Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categorie/{id}/agences', [CategorieController::class, 'agencesParCategorieId']);


Route::prefix('agent')->group(function () {
    Route::post('/register', [AgentController::class, 'register']);
    Route::post('/login', [AgentController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AgentController::class, 'logout']);
    Route::get('/profile', [AgentController::class, 'profile']);
    Route::put('/profile/update', [AgentController::class, 'updateProfile']);
    Route::get('/missions', [AgentController::class, 'mesDemandes']);
    Route::put('/mission/{id}/terminer', [AgentController::class, 'terminerDemande']);
    Route::get('/Historique_missions', [AgentController::class, 'historiqueDemandes']);
});
});

Route::prefix('agence')->group(function () {
    Route::post('/register', [AgenceController::class, 'register']);
    Route::post('/login', [AgenceController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AgenceController::class, 'logout']);
        Route::get('/me', [AgenceController::class, 'show']);
        Route::get('/agents/non-valides', [AgenceController::class, 'agentsNonValidés']);
        Route::post('/valider-agent/{id}', [AgenceController::class, 'validerAgent']);
        Route::post('/refuser-agent/{id}', [AgenceController::class, 'refuserAgent']);
        Route::get('/agents', [AgenceController::class, 'listeAgents']);
        Route::get('/agent/{id}', [AgenceController::class, 'detailsAgent']);
        Route::get('/demandes', [AgenceController::class, 'demandesParAgence']);
        Route::post('/traiter-demande/{id}', [AgenceController::class, 'traiterDemande']);
        Route::post('/affecter-agent/{id_demande}', [AgenceController::class, 'affecterAgent']);
        Route::get('/profile', [AgenceController::class, 'profile']);
        Route::put('/profile/update', [AgenceController::class, 'updateProfile']);
    });
});

Route::prefix('admin')->group(function () {
    Route::post('/register', [AdministrationController::class, 'register']);
    Route::post('/login', [AdministrationController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AdministrationController::class, 'logout']);
        Route::get('/agences/non-validees', [AdministrationController::class, 'agencesNonValidees']);
        Route::put('/valider_agences/{id}', [AdministrationController::class, 'validerAgence']);
        Route::put('/refuser_agences/{id}', [AdministrationController::class, 'refuserAgence']);
        Route::get('/agences', [AdministrationController::class, 'listeAgences']);
        Route::get('/agence/{id}', [AdministrationController::class, 'detailsAgence']);
        Route::get('/agences/{id}/agents', [AdministrationController::class, 'agentsParAgence']);
        Route::get('/demandes', [AdministrationController::class, 'listeDemandes']);
    });
});

