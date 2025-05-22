<?php

namespace App\Http\Controllers;

use App\Models\Agence;
use App\Models\Agent;
use App\Models\Administration;
use App\Models\ServiceDemande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AdministrationController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $admin = Administration::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->mot_de_passe, $admin->mot_de_passe)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'admin' => $admin,
        ]);
    }
   public function validerAgence($id)
{
    $agence = Agence::find($id);

    if (!$agence) {
        return response()->json([
            'message' => 'Agence introuvable.'
        ], 404);
    }

    if ($agence->is_validated) {
        return response()->json([
            'message' => 'Cette agence est déjà validée.'
        ], 400);
    }

    $agence->is_validated = true;
    $agence->save();

    return response()->json([
        'message' => 'Agence validée avec succès.',
        'agence' => $agence
    ]);
}
public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nom' => 'required|string|max:255',
        'prénom' => 'required|string|max:255',
        'email' => 'required|email|unique:administration,email',
        'mot_de_passe' => 'required|string|min:6',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $admin = Administration::create([
        'nom' => $request->nom,
        'prénom' => $request->prénom,
        'email' => $request->email,
        'mot_de_passe' => Hash::make($request->mot_de_passe),
    ]);

    $token = $admin->createToken('admin-token')->plainTextToken;

    return response()->json([
        'message' => 'Administrateur enregistré avec succès',
        'token' => $token,
        'admin' => $admin,
    ], 201);
}
public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Déconnexion réussie'
    ]);
}
public function agencesNonValidees()
{
    $agences = Agence::where('is_validated', false)->get();

    return response()->json($agences);
}

public function refuserAgence($id)
{
    $agence = Agence::find($id);

    if (!$agence) {
        return response()->json(['message' => 'Agence non trouvée'], 404);
    }

    $agence->is_validated = false;
    $agence->is_refused = true;
    $agence->save();

    return response()->json(['message' => 'Agence refusée avec succès']);
}
public function agentsParAgence($id)
{
    $agence = Agence::find($id);

    if (!$agence) {
        return response()->json(['message' => 'Agence non trouvée'], 404);
    }

    $agents = Agent::where('id_agence', $id)->get();

    return response()->json($agents);
}
public function listeDemandes()
{
    $demandes = ServiceDemande::with(['client', 'agent', 'agence'])
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($demandes);
}
public function detailsAgence($id)
{
    $agence = Agence::with('agents')->find($id);

    if (!$agence) {
        return response()->json(['message' => 'Agence non trouvée'], 404);
    }

    return response()->json($agence);
}
public function listeAgences()
{
    $agences = Agence::where('is_validated', true)
                ->withCount('agents')
                ->orderBy('created_at', 'desc')
                ->get();

    return response()->json($agences);
}


}
