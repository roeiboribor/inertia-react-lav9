<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::latest()->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    public function create()
    {
        return Inertia::render('Tasks/Create');
    }

    public function store(Request $request)
    {
        $task = $request->validate([
            'title' => ['required'],
            'description' => ['required'],
        ]);

        Task::create($task);

        return redirect()->route('tasks.index');
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'title' => [
                'required',
                Rule::unique('tasks')->ignore($id)
            ],
            'description' => ['required'],
        ]);

        Task::find($id)->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        // Removed redirect due to modal only
        // return redirect()->route('tasks.index');
    }

    public function destroy($id)
    {
        Task::find($id)->delete();
        return redirect()->route('tasks.index');
    }

    public function updatedIsCompleted($id)
    {
        $task = Task::find($id);

        $task->update(['is_completed' => !$task->is_completed]);
        return redirect()->route('tasks.index');
    }
}
