<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prénom' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'téléphone' => 'required|string|max:20',
            'adresse' => 'required|string',
            'mot_de_passe' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $client = Client::create([
            'nom' => $request->nom,
            'prénom' => $request->prénom,
            'email' => $request->email,
            'téléphone' => $request->téléphone,
            'adresse' => $request->adresse,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
        ]);

        $token = $client->createToken('client-token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'token' => $token,
            'client' => $client
        ]);
    }

    public function login(Request $request)
    {
        $client = Client::where('email', $request->email)->first();

        if (!$client || !Hash::check($request->mot_de_passe, $client->mot_de_passe)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $token = $client->createToken('client-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'client' => $client
        ]);
    }

    public function profile()
    {
        return response()->json(Auth::user());
    }

    public function update(Request $request)
    {
        $client = Auth::user();

        $validated = $request->validate([
            'nom' => 'nullable|string|max:255',
            'prénom' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:clients,email,' . $client->id,
            'téléphone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string',
            'mot_de_passe' => 'nullable|string|min:6|confirmed'
        ]);

        if (!empty($validated['mot_de_passe'])) {
            $validated['mot_de_passe'] = Hash::make($validated['mot_de_passe']);
        } else {
            unset($validated['mot_de_passe']);
        }

        $client->update($validated);

        return response()->json(['message' => 'Profil mis à jour avec succès', 'client' => $client]);
    }
    public function logout(Request $request)
{
    $request->user()->tokens()->delete();

    return response()->json([
        'message' => 'Déconnexion réussie'
    ]);
}

}
