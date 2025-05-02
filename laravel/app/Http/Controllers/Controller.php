<?php

namespace App\Http\Controllers;

use App\Models\User;

abstract class Controller
{

    public $userModel;

    public function __construct(User $user)
    {
        $this->userModel = $user;
    }
}
