<?php

use App\Models\Document;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

function flashMessage($title, $message, $type = 'success')
{
    session()->flash('flash_message', [
        'title' => $title,
        'message' => $message,
        'type' => $type
    ]);
}

function retensiSchedule()
{
    $retensi = Setting::query()->where('key', 'retensi')->first();
    $json = json_decode($retensi->value, true);
    $jsonString = array_filter($json['documents'], 'is_string');
    $jsonInterger = array_filter($json['documents'], 'is_int');
    $letterRemove = Document::query()->whereIn('type_letter_id', $jsonInterger)->where('accepted_at', '<', Carbon::now()->subYears($json['time']))->get();
    $documetRemove = $jsonString ? Document::query()->whereNull('type_letter_id')->where('created_at', '<', Carbon::now()->subYears($json['time']))->get() : [];
    collect($letterRemove)->each(function ($item) {
        if (!empty($item->file) && Storage::disk('public')->exists($item->file)) {
            Storage::disk('public')->delete($item->file);
        }
        $item->delete();
    });
    collect($documetRemove)->each(function ($item) {
        if (!empty($item->file) && Storage::disk('public')->exists($item->file)) {
            Storage::disk('public')->delete($item->file);
        }
        $item->delete();
    });
    // return $letterRemove;
}
