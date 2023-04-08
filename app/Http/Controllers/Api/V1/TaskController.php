<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function edit($id)
    {
        $task = Task::find($id);
        return response()->json([
            'title' => $task->title,
            'description' => $task->description,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'description' => ['required'],
        ]);
    }
}
