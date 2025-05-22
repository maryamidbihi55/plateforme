<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\ServiceDemande;
class AgentController extends Controller
{
    public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|email|unique:agents,email',
        'telephone' => 'required|string|max:20',
        'specialite' => 'nullable|string|max:255',
        'mot_de_passe' => 'required|string|min:6',
        'id_agence' => 'required|exists:agences,id',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $agent = Agent::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'email' => $request->email,
        'telephone' => $request->telephone,
        'specialite' => $request->specialite,
        'id_agence' => $request->id_agence,
        'mot_de_passe' => Hash::make($request->mot_de_passe),
        'is_validated' => false,
        'is_refused' => false,
    ]);

    // Créer un token si tu utilises Sanctum
    $token = $agent->createToken('agent-token')->plainTextToken;

    return response()->json([
        'message' => 'Agent enregistré avec succès',
        'token' => $token,
        'agent' => $agent
    ], 201);
}

    public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'mot_de_passe' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $agent = Agent::where('email', $request->email)->first();

    if (!$agent || !Hash::check($request->mot_de_passe, $agent->mot_de_passe)) {
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    // ✅ Vérification : agent validé par l'agence ?
    if (!$agent->is_validated) {
        return response()->json([
            'message' => 'Votre compte n\'a pas encore été validé. Veuillez attendre la validation par l\'agence.'
        ], 403);
    }

    $token = $agent->createToken('agent-token')->plainTextToken;

    return response()->json([
        'message' => 'Connexion réussie',
        'token' => $token,
        'agent' => $agent
    ]);
}
public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Déconnexion réussie'
    ]);
}
public function profile(Request $request)
{
    return response()->json($request->user());
}
public function updateProfile(Request $request)
{
    $agent = $request->user(); // Auth::user()

    // Validation simple
    $request->validate([
        'nom' => 'nullable|string|max:255',
        'prenom' => 'nullable|string|max:255',
        'email' => 'nullable|email|unique:agents,email,' . $agent->id,
        'telephone' => 'nullable|string|max:20',
        'specialite' => 'nullable|string|max:255',
        'ancien_mot_de_passe' => 'nullable|string',
        'nouveau_mot_de_passe' => 'nullable|string|min:6|confirmed',
    ]);

    // Mise à jour des champs de profil
    $agent->update($request->only(['nom', 'prenom', 'email', 'telephone', 'specialite']));

    // Mise à jour du mot de passe si demandé
    if ($request->filled('ancien_mot_de_passe') && $request->filled('nouveau_mot_de_passe')) {
        if (!Hash::check($request->ancien_mot_de_passe, $agent->mot_de_passe)) {
            return response()->json(['message' => 'Ancien mot de passe incorrect'], 401);
        }

        $agent->mot_de_passe = Hash::make($request->nouveau_mot_de_passe);
        $agent->save();
    }

    return response()->json([
        'message' => 'Profil mis à jour avec succès',
        'agent' => $agent
    ]);
}

public function mesDemandes(Request $request)
{
    $agent = $request->user();

    $demandes = ServiceDemande::where('id_agent', $agent->id)
                ->whereIn('statut', ['En attente', 'En cours'])
                ->orderBy('created_at', 'desc')
                ->get();

    return response()->json([
        'message' => 'Liste des demandes en cours et en attente',
        'demandes' => $demandes
    ]);
}

public function terminerDemande($id, Request $request)
{
    $agent = $request->user();

    $demande = ServiceDemande::where('id', $id)
                      ->where('id_agent', $agent->id)
                      ->first();

    if (!$demande) {
        return response()->json([
            'message' => 'Demande introuvable ou non autorisée.'
        ], 404);
    }

    if ($demande->statut === 'Terminé') {
        return response()->json([
            'message' => 'Cette demande est déjà terminée.'
        ], 400);
    }

    $demande->statut = 'Terminé';
    $demande->save();

    return response()->json([
        'message' => 'Demande marquée comme terminée avec succès.',
        'demande' => $demande
    ]);
}

public function historiqueDemandes(Request $request)
{
    $agent = $request->user();

    $demandes = ServiceDemande::where('id_agent', $agent->id)
                ->where('statut', 'Terminé')
                ->orderBy('updated_at', 'desc')
                ->get();

    return response()->json([
        'message' => 'Historique des demandes terminées',
        'demandes' => $demandes
    ]);
}


}
