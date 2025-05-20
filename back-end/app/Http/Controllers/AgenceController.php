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
public function listeAgents($id)
{
    $agence = Agence::find($id);

    if (!$agence) {
        return response()->json(['message' => 'Agence non trouvée.'], 404);
    }

    $agents = $agence->agents()->get();

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

    $agent->is_validated = true;
    $agent->save();

    return response()->json([
        'message' => 'Compte Agent validé avec succès.',
        'agent' => $agent
    ], 200);
}
public function demandesParAgence($id_agence)
{
    $demandes = ServiceDemande::with(['client', 'agent'])
        ->where('id_agence', $id_agence)
        ->get();

    return response()->json([
        'message' => 'Liste des demandes de l\'agence.',
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

    $demande->etat_agence = $request->etat_agence;
    $demande->save();

    return response()->json([
        'message' => "Demande {$request->etat_agence} avec succès.",
        'demande' => $demande
    ], 200);
}
public function affecterAgent(Request $request, $id_demande)
{
    $request->validate([
        'id_agent' => 'required|exists:agents,id',
    ]);

    $demande = ServiceDemande::find($id_demande);

    if (!$demande) {
        return response()->json(['message' => 'Demande non trouvée.'], 404);
    }

    // Vérifie si la demande est acceptée par l'agence
    if ($demande->etat_agence !== 'acceptée') {
        return response()->json(['message' => 'La demande doit être acceptée avant d\'assigner un agent.'], 403);
    }

    // Assigne l'agent et met à jour le statut
    $demande->id_agent = $request->id_agent;
    $demande->statut = 'En cours';
    $demande->save();

    return response()->json([
        'message' => 'Agent assigné avec succès à la demande.',
        'demande' => $demande
    ], 200);
}

}
