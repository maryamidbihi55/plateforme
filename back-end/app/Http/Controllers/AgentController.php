<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AgentController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prénom' => 'required|string|max:255',
            'email' => 'required|email|unique:agents,email',
            'téléphone' => 'required|string|max:20',
            'spécialité' => 'nullable|string|max:255',
            'mot_de_passe' => 'required|string|min:6',
            'id_agence' => 'required|exists:agences,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $agent = Agent::create([
            'nom' => $request->nom,
            'prénom' => $request->prénom,
            'email' => $request->email,
            'téléphone' => $request->téléphone,
            'spécialité' => $request->spécialité,
            'id_agence' => $request->id_agence,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
        ]);

        $token = $agent->createToken('agent-token')->plainTextToken;

        return response()->json([
            'message' => 'Agent enregistré avec succès',
            'token' => $token,
            'agent' => $agent
        ]);
    }

    public function login(Request $request)
    {
        $agent = Agent::where('email', $request->email)->first();

        if (!$agent || !Hash::check($request->mot_de_passe, $agent->mot_de_passe)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $token = $agent->createToken('agent-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'agent' => $agent
        ]);
    }

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
