<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiting\Limit;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 📌 Configuration des routes API
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        // 📌 Configuration du Rate Limiter pour API (évite l’erreur "Rate limiter [api] is not defined")
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60);
        });
    }
}
