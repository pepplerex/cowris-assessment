<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Ramsey\Uuid\Type\Integer;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Handle user login and generate token
     * @param array $data Login credentials
     * @return string|mixed Token or error response
     */
    public function handleLogin($data)
    {
        $user = $this->where('email', $data['email'])->first();
        if ($user) {
            if (password_verify($data['password'], $user->password)) {
                return $user->createToken('auth_token')->plainTextToken;
            } else {
                return response()->json(['message' => 'Invalid credentials'], 400);
            }
        }
    }

    /**
     * Get all users
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUsers()
    {
        return $this->all();
    }

    /**
     * Get user by ID
     * @param int $id
     * @return \App\Models\User|null
     */
    public function getUser($id)
    {
        return $this->find($id);
    }

    /**
     * Create new user
     * @param array $data User data
     * @return \App\Models\User
     */
    public function createUser($data)
    {
        $data['password'] = Hash::make($data['password']);
        return $this->create($data);
    }

    /**
     * Update user information
     * @param int $id
     * @param array $data Updated user data
     * @return bool
     */
    public function updateUser($id, $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        return $this->find($id)->update($data);
    }

    /**
     * Delete user by ID
     * @param int $id
     * @return bool
     */
    public function deleteUser($id)
    {
        return $this->find($id)->delete();
    }
}
