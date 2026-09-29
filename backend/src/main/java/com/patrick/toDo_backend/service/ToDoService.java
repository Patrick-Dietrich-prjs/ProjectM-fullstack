package com.patrick.toDo_backend.service;

import com.patrick.toDo_backend.model.ToDo;
import com.patrick.toDo_backend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    public List<ToDo> findAll() {
        return toDoRepository.findAll();
    }

    public Optional<ToDo> findById(Long id){
        return toDoRepository.findById(id);
    }

    @Transactional
    public ToDo save(ToDo toDo){
        return toDoRepository.save(toDo);
    }

    @Transactional
    public boolean deleteById(Long id){
        if(toDoRepository.existsById(id)){
            toDoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public Optional<ToDo> updateStatus(Long id){
        return toDoRepository.findById(id)
                .map(toDo -> {
                    toDo.setConcluido(!toDo.getConcluido());
                    return toDoRepository.save(toDo);
                });
    }

    @Transactional
    public Optional<ToDo> update(Long id, ToDo dados) {
        return toDoRepository.findById(id)
                .map(todo -> {
                    todo.setDescricao(dados.getDescricao());
                    return toDoRepository.save(todo);
                });
    }
}