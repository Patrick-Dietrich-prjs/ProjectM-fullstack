package com.patrick.toDo_backend.controller;

import com.patrick.toDo_backend.model.ToDo;
import com.patrick.toDo_backend.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todo")
public class ToDoController {
    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public List<ToDo> findAll(){
        return toDoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> findById(@PathVariable Long id){
        Optional<ToDo> toDo = toDoService.findById(id);
        if(toDo.isPresent()){
            return ResponseEntity.ok(toDo.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ToDo> save(@RequestBody ToDo todo){
        ToDo toDo = toDoService.save(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        boolean deleted = toDoService.deleteById(id);
        if(deleted){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/concluido")
    public ResponseEntity<ToDo> updateStatus(@PathVariable Long id){
        Optional<ToDo> updated = toDoService.updateStatus(id);
        if(updated.isPresent()){
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    }

    /* @PutMapping("/{id}")
    public ResponseEntity<ToDo> update(@PathVariable Long id, @RequestBody ToDo descricao){
        Optional<ToDo> updated = toDoService.update(id, descricao);
        if(updated.isPresent()){
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    } */
}
