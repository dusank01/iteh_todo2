<?php

// use App\Helpers\DbConnect;
use Illuminate\Http\Request;
use App\Models\task;

//Route::middleware('cors')->group(function () {
    Route::get('/tasks', function () {
        $tasks=task::all();
        return response()->json($tasks,200);
    });

    Route::post('/tasks', function (Request $request) {
       
        $newtask=new task();
        $newtask->naziv=$request->input('naziv');
        $newtask->korisnik=$request->input('korisnik');
        $newtask->opis=$request->input('opis');
        $newtask->rok=$request->input('rok');
        $newtask->save();
        return response()->json($newtask,200);
    });

    Route::put('/tasks/{id}', function (Request $request, $id) {
        $newtask=task::find($id);
       
        $newtask->korisnik=$request->input('korisnik', $newtask->korisnik);
        $newtask->naziv=$request->input('naziv',$newtask->naziv);
        $newtask->opis=$request->input('opis',$newtask->opis);
        $newtask->rok=$request->input('rok',$newtask->rok);
        $newtask->save();
        return response()->json($newtask,200);

    });

    Route::delete('/tasks/{id}', function ($id) {
       $task=task::find($id);
       $task->delete();
       return response()->json($task,200);
    });

    Route::get('/tasks/{id}', function ($id) {
        $task=task::find($id);
        
        return response()->json($task,200);
     });
//});
