<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class LetterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $file = asset(Storage::url($this->route('letter')?->file)) === $this->file ? ['required'] : ['required', 'max:2048', 'mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png,csv'];

        return [
            'type_letter_id' => 'required',
            'folder_id' => 'nullable',
            'name' => 'required',
            'code' => ['nullable', 'string', $this->route('letter') ? Rule::unique('documents', 'code')->ignore($this->route('letter')->id) : 'unique:documents,code'],
            'description' => 'nullable',
            'file' => $file,
            'status' => 'nullable',
            'accepted_at' => 'required|date',
            'is_private' => 'nullable|boolean',
        ];
    }

    public function messages()
    {
        return [
            'type_letter_id.required' => 'Tipe surat tidak boleh kosong',
            'name.required' => 'Nama tidak boleh kosong',
            'code.unique' => 'Kode sudah ada',
            'file.required' => 'File tidak boleh kosong',
            'file.mimes' => 'File harus berupa: pdf, doc, docx, xls, xlsx, jpg, jpeg, png, csv',
            'file.max' => 'Ukuran file maksimal 2MB',
            'status.required' => 'Status tidak boleh kosong',
            'accepted_at.date' => 'Tanggal diterima tidak valid',
        ];
    }
}
