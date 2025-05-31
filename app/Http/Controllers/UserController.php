<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return inertia('User/Index', [
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->assignRole($request->role);

        flashMessage('Success', 'Berhasil menambahkan pengguna');

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $pengguna)
    {
        $validate = $request->validate([
            'name' => "required|max:255",
            'email' => 'required|email|unique:users,email,' . $pengguna->id,
        ]);

        $validatePw = [];

        if ($request->password != null) {
            $validatePw = $request->validate([
                'password' => 'required|confirmed|min:8',
            ]);

            $validate['password'] = $validatePw['password'];
        }

        $pengguna->update($validate);

        flashMessage('Success', 'Berhasil mengubah pengguna');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $pengguna)
    {
        $pengguna->delete();
        flashMessage('Success', 'Berhasil menghapus pengguna');
        return back();
    }
}
