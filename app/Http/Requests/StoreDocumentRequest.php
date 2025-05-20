<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class StoreDocumentRequest extends FormRequest
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
        $file = asset(Storage::url($this->route('document')?->file)) === $this->file ? ['required'] : ['required', 'max:2048', 'mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png,csv'];

        return [
            'folder_id' => 'nullable',
            'name' => 'required',
            'code' => ['nullable', 'string', $this->route('document') ? Rule::unique('documents', 'code')->ignore($this->route('document')->id) : 'unique:documents,code'],
            'description' => 'nullable',
            'file' => $file,
            'status' => 'nullable',
            'accepted_at' => 'nullable|date',
            'is_private' => 'nullable|boolean',
        ];
    }

    public function messages()
    {
        return [
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
