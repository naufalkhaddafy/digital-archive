<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingRequest;
use App\Models\Setting;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Http\Resources\TypeLetterResource;
use App\Models\TypeLetter;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        retensiSchedule();
        $type = TypeLetter::all();
        $retensi = Setting::query()->where('key', 'retensi')->first();
        return inertia('Document/Setting/Index', [
            'type' => TypeLetterResource::collection($type),
            'retensi' => SettingResource::make($retensi),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SettingRequest $request)
    {
        $retensi = Setting::query()->where('key', 'retensi')->first();
        $retensi->update([
            'key' => 'retensi',
            'value' => json_encode($request->all())
        ]);

        flashMessage('Success', 'Berhasil memperbarui retensi');
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
