package com.patrick.projectM_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "projeto_partes")
@Getter
@Setter
public class ParteProjeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "criado_em")
    private LocalDate criadoEm;

    @ManyToOne
    @JoinColumn(name = "id_projeto")
    private Projeto projeto;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "concluido")
    private Boolean concluido;

    @Column(name = "editando")
    private Boolean editando;

    @PrePersist
    public void prePersist() {
        if (this.criadoEm == null) {
            this.criadoEm = LocalDate.now();
        }
    }
}