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
public function register(Request $request)
{
    $request->validate([
        'nom' => 'required',
        'prénom' => 'required',
        'email' => 'required|email|unique:clients',
        'mot_de_passe' => 'required|min:6',
    ]);

    Client::create([
        'nom' => $request->nom,
        'prénom' => $request->prénom,
        'email' => $request->email,
        'mot_de_passe' => Hash::make($request->mot_de_passe),
    ]);

    return response()->json(['message' => 'Inscription réussie']);
}

public function login(Request $request)
{
    if (Auth::guard('client')->attempt([
        'email' => $request->email,
        'mot_de_passe' => $request->mot_de_passe,
    ])) {
        return response()->json(['message' => 'Connexion réussie']);
    }
    return response()->json(['message' => 'Échec de connexion'], 401);
}

/*
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
*/
    // 📌 Déconnexion du client
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie'], 200);
    }
}
