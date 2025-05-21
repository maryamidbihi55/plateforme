<?php

namespace App\Http\Controllers;

use App\Models\Agence;
use App\Models\Agent;
use App\Models\ServiceDemande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AgenceController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_agence'   => 'required|string|max:255',
            'adresse'      => 'required|string',
            'téléphone'    => 'required|string|max:20',
            'email'        => 'required|email|unique:agences,email',
            'mot_de_passe' => 'required|string|min:6',
            'id_société'   => 'required|exists:societes_partenaires,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $agence = Agence::create([
            'nom_agence'   => $request->nom_agence,
            'adresse'      => $request->adresse,
            'téléphone'    => $request->téléphone,
            'email'        => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'id_société'   => $request->id_société,
            'is_validated' => false
        ]);

        $token = $agence->createToken('agence-token')->plainTextToken;

        return response()->json([
            'message' => 'Votre demande d\'inscription a été envoyée. Vous pourrez vous connecter une fois que votre agence aura été validée par la société partenaire.',
            'token'   => $token,
            'agence'  => $agence
        ]);
    }

public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email'        => 'required|email',
        'mot_de_passe' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $agence = Agence::where('email', $request->email)->first();

    if (!$agence || !Hash::check($request->mot_de_passe, $agence->mot_de_passe)) {
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    // Vérifier si l'agence est validée
    if (!$agence->is_validated) {
        return response()->json(['message' => 'Votre compte agence n\'a pas encore été validé. Veuillez attendre la validation.'], 403);
    }

    // ✅ Supprimé : vérification de la société partenaire

    $token = $agence->createToken('agence-token')->plainTextToken;

    return response()->json([
        'message' => 'Connexion réussie',
        'token'   => $token,
        'agence'  => $agence
    ]);
}

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Déconnexion réussie.'
    ]);
}
public function show($id)
{
    $agence = Agence::with(['societePartenaire', 'agents', 'CategoriesServices'])->find($id);

    if (!$agence) {
        return response()->json(['message' => 'Agence non trouvée'], 404);
    }

    return response()->json($agence);
}
public function listeAgents(Request $request)
{
    $agence = $request->user();

    if (!$agence) {
        return response()->json(['message' => 'Agence non authentifiée.'], 401);
    }

    $agents = $agence->agents;

    return response()->json([
        'agence' => $agence->nom_agence,
        'nombre_agents' => $agents->count(),
        'agents' => $agents
    ]);
}

public function validerAgent($id)
{
    $agent = Agent::find($id);

    if (!$agent) {
        return response()->json(['message' => 'Agent non trouvé.'], 404);
    }

    if ($agent->is_validated) {
        return response()->json([
            'message' => "Le compte de l'agent {$agent->nom} est déjà validé."
        ], 200);
    }

    $agent->is_validated = true;
    $agent->save();

    return response()->json([
        'message' => 'Compte Agent validé avec succès.',
        'agent' => $agent
    ], 200);
}
public function refuserAgent($id)
{
    $agent = Agent::find($id);

    if (!$agent) {
        return response()->json(['message' => 'Agent non trouvé.'], 404);
    }

    if ($agent->is_refused) {
        return response()->json([
            'message' => "Le compte de l'agent {$agent->nom} a déjà été refusé."
        ], 200);
    }

    if ($agent->is_validated) {
        return response()->json([
            'message' => "Impossible de refuser : le compte de l'agent {$agent->nom} est déjà validé."
        ], 400);
    }

    $agent->is_refused = true;
    $agent->save();

    return response()->json([
        'message' => "Le compte de l'agent {$agent->nom} a été refusé avec succès.",
        'agent' => $agent
    ], 200);
}

public function demandesParAgence()
{
    $agence = Auth::user();

    if (!$agence) {
        return response()->json(['message' => 'Agence non authentifiée.'], 401);
    }

    $demandes = ServiceDemande::with(['client'])
        ->where('id_agence', $agence->id)
        ->get();

    return response()->json([
        'message' => "Liste des demandes de l'agence : {$agence->nom_agence}.",
        'demandes' => $demandes
    ], 200);
}

public function traiterDemande(Request $request, $id)
{
    $request->validate([
        'etat_agence' => 'required|in:acceptée,refusée'
    ]);

    $demande = ServiceDemande::find($id);

    if (!$demande) {
        return response()->json(['message' => 'Demande non trouvée.'], 404);
    }
    $agence = Auth::user();

    if ($demande->id_agence !== $agence->id) {
        return response()->json(['message' => 'Cette demande n\'appartient pas à votre agence.'], 403);
    }

    $demande->etat_agence = $request->etat_agence;
    $demande->save();

    return response()->json([
        'message' => "Demande {$request->etat_agence} avec succès.",
        'demande' => $demande
    ]);
}


public function affecterAgent(Request $request, $id_demande)
{
    $request->validate([
        'id_agent' => 'required|exists:agents,id'
    ]);

    $demande = ServiceDemande::find($id_demande);

    if (!$demande) {
        return response()->json(['message' => 'Demande non trouvée.'], 404);
    }

    $agence = Auth::user();

    if ($demande->id_agence !== $agence->id) {
        return response()->json(['message' => 'Cette demande n\'appartient pas à votre agence.'], 403);
    }

    if ($demande->etat_agence !== 'acceptée') {
        return response()->json(['message' => 'Vous devez d\'abord accepter la demande avant d\'affecter un agent.'], 400);
    }

    $demande->id_agent = $request->id_agent;
    $demande->statut = 'En cours';
    $demande->save();

    return response()->json([
        'message' => 'Agent affecté à la demande avec succès.',
        'demande' => $demande
    ]);
}

public function profile()
{
    $agence = Auth::user()->load('CategoriesServices');

    return response()->json([
        'message' => 'Profil de l\'agence.',
        'agence' => [
            'id' => $agence->id,
            'nom_agence' => $agence->nom_agence,
            'adresse' => $agence->adresse,
            'téléphone' => $agence->téléphone,
            'email' => $agence->email,
            'categorie_service' => $agence->CategoriesServices->nom_catégorie ?? null,
            'created_at' => $agence->created_at,
            'updated_at' => $agence->updated_at
        ]
    ]);
}

public function updateProfile(Request $request)
{
    $agence = Auth::user();

    $validator = Validator::make($request->all(), [
        'nom_agence' => 'sometimes|string|max:255',
        'adresse' => 'sometimes|string',
        'téléphone' => 'sometimes|string|max:20',
        'email' => 'sometimes|email|unique:agences,email,' . $agence->id,
        'mot_de_passe' => 'sometimes|string|min:6|confirmed',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Mise à jour des champs si fournis
    if ($request->has('nom_agence')) {
        $agence->nom_agence = $request->nom_agence;
    }

    if ($request->has('adresse')) {
        $agence->adresse = $request->adresse;
    }

    if ($request->has('téléphone')) {
        $agence->téléphone = $request->téléphone;
    }

    if ($request->has('email')) {
        $agence->email = $request->email;
    }

    if ($request->filled('mot_de_passe')) {
        $agence->mot_de_passe = Hash::make($request->mot_de_passe);
    }

    $agence->save();

    return response()->json([
        'message' => 'Profil mis à jour avec succès.',
        'agence' => $agence
    ]);
}
}
