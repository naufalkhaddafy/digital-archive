<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        retensiSchedule();
        return inertia('dashboard', [
            'letterIn' => count(Document::query()->whereNotNull('type_letter_id')->where('status', 'masuk')->get()),
            'letterOut' => count(Document::query()->whereNotNull('type_letter_id')->where('status', 'keluar')->get()),
            'docAll' => count(Document::all()),
        ]);
    }
}
