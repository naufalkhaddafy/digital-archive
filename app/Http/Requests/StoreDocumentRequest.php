<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'type_letter_id' => 'nullable',
            'folder_id' => 'nullable',
            'name' => 'required',
            'code' => 'nullable|unique:documents,code',
            'description' => 'nullable',
            'file' => 'required|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png,csv|max:2048',
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
