package com.patrick.toDo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.patrick.toDo_backend.model.ToDo;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {
}
