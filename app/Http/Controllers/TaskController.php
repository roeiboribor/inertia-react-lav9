<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
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

    public function edit(Task $task)
    {
        return Inertia::render('Tasks/Edit', [
            'task' => $task
        ]);
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'description' => ['required'],
        ]);

        Task::find($id)->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect()->route('tasks.index');
    }

    public function destroy($id)
    {
        Task::find($id)->delete();
        return redirect()->route('tasks.index');
    }
}
