<?php

namespace App\Http\Controllers;

use App\Models\CategoriesServices;

class CategorieController extends Controller
{
    public function index()
    {
        return response()->json(CategoriesServices::all());
    }
    public function agencesParCategorieId($id)
    {
        $categorie = CategoriesServices::with('agences')->find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        return response()->json([
            'categorie' => $categorie->nom_catégorie,
            'agences' => $categorie->agences
        ]);
    }
}
