package com.patrick.projectM_backend.repository;

import com.patrick.projectM_backend.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
}
