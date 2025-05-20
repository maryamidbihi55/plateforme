<?php

namespace App\Http\Controllers;

use App\Models\Agence;
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

    // Vérifier si la société partenaire est validée
    if (!$agence->societePartenaire || !$agence->societePartenaire->is_validated) {
        return response()->json(['message' => 'La société partenaire associée à votre agence n\'est pas encore validée.'], 403);
    }

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
}
