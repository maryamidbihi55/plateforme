<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Avis;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class AvisController extends Controller
{
    public function index()
    {
        //
    }

   public function store(Request $request)
    {
        $request->validate([
            'commentaire' => 'required|string',
        ]);

        $avis = Avis::create([
            'commentaire' => $request->commentaire,
            'date_avis' => Carbon::now()->toDateString(),
            'id_client' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Avis ajouté avec succès.',
            'avis' => $avis
        ], 201);
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
