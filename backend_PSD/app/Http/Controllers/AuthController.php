<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Client;
use App\Models\SocietePartenaire;
use App\Models\Agence;
use App\Models\Agent;
use app\models\Administration;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
class AuthController extends Controller
{
    // 📌 Inscription du client
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:client,societe,agence,agent,admin',
        ]);
        Log::info('Requête reçue dans register()', $request->all());

        // Définition de `is_validated`
        $isValidated = strtolower($request->role) === 'client' ? true : false;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_validated' => $isValidated, // 🚀 Ajout du champ
        ]);
        Log::info('is_validated final : ' . ($isValidated ? 'true' : 'false'));

        Log::info("Utilisateur créé : ", ['user' => $user]); // 🔹 Vérification des logs

        // 🚀 Création automatique des entités associées UNIQUEMENT si validé
        if ($user->is_validated) {
            match ($user->role) {
                'client' => Client::create(['user_id' => $user->id]),
                'societe' => SocietePartenaire::create(['user_id' => $user->id]),
                'agence' => Agence::create(['user_id' => $user->id]),
                'agent' => Agent::create(['user_id' => $user->id]),
                'admin' => Administration::create(['user_id' => $user->id]),
            };

            Log::info("Entités associées créées pour l'utilisateur ID " . $user->id);
        }

        if ($user->is_validated) {
            Log::info("Validation réussie, réponse envoyée.");
            return response()->json([
                'message' => 'Compte créé avec succès.',
                'user' => $user,
                'token' => $user->createToken('API Token')->plainTextToken,
            ], 201);
        } else {
            Log::info("Validation en attente, réponse envoyée.");
            return response()->json([
                'message' => "Votre compte est en attente de validation. Vous ne pouvez pas vous connecter tant qu'il n'est pas approuvé.",
            ], 202);
        }
    }


    // 📌 Connexion du client
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.']
            ]);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    // 📌 Déconnexion du client
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie'], 200);
    }
}
