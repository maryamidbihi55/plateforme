<?php
namespace App\Http\Controllers;
use App\Models\Client;
use App\Models\ServiceDemande;
use Illuminate\Http\Request;

class ClientController extends Controller {
    public function index() {
        return response()->json(Client::all());
    }

    public function store(Request $request) {
        $client = Client::create($request->all());
        return response()->json($client, 201);
    }

    public function show($id) {
        return response()->json(Client::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $client = Client::findOrFail($id);
        $client->update($request->all());
        return response()->json($client);
    }

    public function destroy($id) {
        Client::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function listRequestedServices(Request $request)
{
    $user = $request->user();
    $services = ServiceDemande::where('client_id', $user->id)->get();

    return response()->json($services);
}
}
