package com.patrick.projectM_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.patrick.projectM_backend.model.ParteProjeto;

import java.util.List;

public interface ParteProjetoRepository extends JpaRepository<ParteProjeto, Long> {
    List<ParteProjeto> findByProjetoId(Long projetoId);
}
