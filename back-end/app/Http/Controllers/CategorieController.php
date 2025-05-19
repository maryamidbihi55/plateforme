<?php

namespace App\Http\Controllers;

use App\Models\CategoriesServices;

class CategorieController extends Controller
{
    public function index()
    {
        return response()->json(CategoriesServices::all());
    }
}
