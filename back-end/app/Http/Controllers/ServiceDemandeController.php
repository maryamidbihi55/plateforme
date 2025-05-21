<?php

namespace App\Http\Controllers;
use App\Models\ServiceDemande;
use Illuminate\Http\Request;

class ServiceDemandeController extends Controller
{
public function index(Request $request)
    {
        $client = $request->user();

        $demandes = ServiceDemande::where('id_client', $client->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($demandes);
    }
public function store(Request $request)
{
    $validated = $request->validate([
        'description' => 'required|string',
        'date_souhaitée' => 'required|date',
        'adresse_intervention' => 'required|string',
        'id_agence' => 'required|exists:agences,id',
    ]);

    $demande = ServiceDemande::create([
        'description' => $validated['description'],
        'date_souhaitée' => $validated['date_souhaitée'],
        'adresse_intervention' => $validated['adresse_intervention'],
        'id_agence' => $validated['id_agence'],
        'id_client' => $request->user()->id,
        'statut' => 'En attente',
        'etat_agence' => 'en attente',
    ]);

    return response()->json([
        'message' => 'Demande enregistrée avec succès',
        'demande' => $demande
    ], 201);
}

public function destroy(Request $request, $id)
    {
        $demande = ServiceDemande::where('id', $id)
            ->where('id_client', $request->user()->id)
            ->first();

        if (!$demande) {
            return response()->json(['message' => 'Demande non trouvée ou non autorisée'], 404);
        }

        $demande->delete();

        return response()->json(['message' => 'Demande supprimée avec succès']);
    }
}
