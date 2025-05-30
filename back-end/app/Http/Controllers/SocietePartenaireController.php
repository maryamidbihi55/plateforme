<?php

namespace App\Http\Controllers;

use App\Models\SocietePartenaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SocietePartenaireController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_société' => 'required|string|max:255',
            'email' => 'required|email|unique:societes_partenaires,email',
            'téléphone' => 'required|string|max:20',
            'adresse' => 'required|string',
            'id_catégorie' => 'required|exists:categories_services,id',
            'mot_de_passe' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $societe = SocietePartenaire::create([
            'nom_société' => $request->nom_société,
            'email' => $request->email,
            'téléphone' => $request->téléphone,
            'adresse' => $request->adresse,
            'id_catégorie' => $request->id_catégorie,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'is_validated' => false
        ]);

        $token = $societe->createToken('societe-token')->plainTextToken;

        return response()->json([
            'message' => 'Votre demande d\'inscription a été envoyée avec succès. Vous recevrez un message une fois que votre compte aura été validé par l\'administrateur.',
            'token' => $token,
            'societe' => $societe
        ]);
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

    $societe = SocietePartenaire::where('email', $request->email)->first();

    if (!$societe || !Hash::check($request->mot_de_passe, $societe->mot_de_passe)) {
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    if (!$societe->is_validated) {
        return response()->json(['message' => 'Votre compte n\'a pas encore été validé par l\'administrateur.'], 403);
    }

    $token = $societe->createToken('societe-token')->plainTextToken;

    return response()->json([
        'message' => 'Connexion réussie',
        'token' => $token,
        'societe' => $societe
    ]);
}

}
