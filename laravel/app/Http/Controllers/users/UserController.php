<?php

namespace App\Http\Controllers\users;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserAccount;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserLoginRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Authenticate user and generate token
     * @param UserLoginRequest $request
     * @return mixed Token or error response
     */
    public function login(UserLoginRequest $request)
    {
        return $this->userModel->handleLogin($request);
    }

    /**
     * Get all users
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return $this->userModel->getUsers();
    }

    /**
     * Get specific user by ID
     * @param int $id
     * @return \App\Models\User|null
     */
    public function show($id)
    {
        return $this->userModel->getUser($id);
    }

    /**
     * Create new user
     * @param CreateUserAccount $request
     * @return \App\Models\User
     */
    public function store(CreateUserAccount $request)
    {
        return $this->userModel->createUser($request->all());
    }

    /**
     * Update user information
     * @param UpdateUserRequest $request
     * @param int $id
     * @return bool
     */
    public function update(UpdateUserRequest $request, $id)
    {
        return $this->userModel->updateUser($id, $request->all());
    }

    /**
     * Delete user
     * @param int $id
     * @return bool
     */
    public function destroy($id)
    {
        return $this->userModel->deleteUser($id);
    }
}
