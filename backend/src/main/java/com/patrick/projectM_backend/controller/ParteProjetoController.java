package com.patrick.projectM_backend.controller;

import com.patrick.projectM_backend.model.ParteProjeto;
import com.patrick.projectM_backend.service.ParteProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/parteprojeto")
public class ParteProjetoController {
    @Autowired
    private ParteProjetoService parteProjetoService;

    @GetMapping
    public List<ParteProjeto> findAll(){
        return parteProjetoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParteProjeto> findById(@PathVariable Long id){
        Optional<ParteProjeto> parteProjeto = parteProjetoService.findById(id);
        if(parteProjeto.isPresent()){
            return ResponseEntity.ok(parteProjeto.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ParteProjeto> save(@RequestBody ParteProjeto parteprojeto){
        ParteProjeto parteProjeto = parteProjetoService.save(parteprojeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(parteProjeto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        boolean deleted = parteProjetoService.deleteById(id);
        if(deleted){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/concluido")
    public ResponseEntity<ParteProjeto> updateStatus(@PathVariable Long id){
        Optional<ParteProjeto> updated = parteProjetoService.updateStatus(id);
        if(updated.isPresent()){
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/editando")
    public ResponseEntity<ParteProjeto> updateEditando(@PathVariable Long id){
        Optional<ParteProjeto> updated = parteProjetoService.updateEditando(id);
        if(updated.isPresent()){
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParteProjeto> update(@PathVariable Long id, @RequestBody ParteProjeto dadosUpdate){
        Optional<ParteProjeto> updated = parteProjetoService.update(id, dadosUpdate);
        if(updated.isPresent()){
            return ResponseEntity.ok(updated.get());
        }
        return ResponseEntity.notFound().build();
    }
}
