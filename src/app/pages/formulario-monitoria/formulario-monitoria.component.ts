import { RouterLink } from '@angular/router';
import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Monitoria } from '../../services/monitoria.service';
import { VagaMonitoria } from '../../models/vaga-monitoria';

@Component({
  selector: 'app-formulario-monitoria',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-monitoria.component.html',
  styleUrl: './formulario-monitoria.component.css'
})
export class FormularioMonitoria implements OnInit {

  private fb = inject(FormBuilder);
  private monitoriaService = inject(Monitoria);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  idEdicao: number | null = null;
  monitoriaOriginal: VagaMonitoria | null = null;
  mensagem = '';
  salvando = false;
  carregando = false;

  formulario = this.fb.nonNullable.group({
    disciplina: ['', [Validators.required, Validators.minLength(2)]],
    nomeMonitor: ['', [Validators.required, Validators.minLength(2)]],
    vagasTotais: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.idEdicao = Number(id);

      if (!Number.isInteger(this.idEdicao) || this.idEdicao <= 0) {
        this.mensagem = 'Identificador inválido.';
        return;
      }

      this.carregando = true;

      this.monitoriaService.buscarPorId(this.idEdicao).subscribe({
        next: (monitoria) => {
          this.monitoriaOriginal = monitoria;

          this.formulario.patchValue({
            disciplina: monitoria.disciplina,
            nomeMonitor: monitoria.nomeMonitor,
            vagasTotais: monitoria.vagasTotais
          });

          this.carregando = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.mensagem = 'Erro ao carregar a monitoria.';
          this.carregando = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  salvar(): void {
    if (this.salvando || this.carregando) return;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.getRawValue();

    let requisicao;

    if (this.idEdicao !== null) {
      if (!this.monitoriaOriginal) {
        this.mensagem = 'Não foi possível carregar os dados para edição.';
        return;
      }

      const atualizada: VagaMonitoria = {
        ...this.monitoriaOriginal,
        ...dados
      };

      requisicao = this.monitoriaService.editar(this.idEdicao, atualizada);
    } else {
      requisicao = this.monitoriaService.criar(dados);
    }

    this.salvando = true;
    this.mensagem = '';

    requisicao.subscribe({
      next: () => {
        this.mensagem = this.idEdicao !== null
          ? 'Monitoria atualizada com sucesso!'
          : 'Monitoria cadastrada com sucesso!';

        this.salvando = false;

        if (this.idEdicao === null) {
          this.formulario.reset();
        }

        this.cdr.markForCheck();
      },


      error: (erro) => {
        console.error('Erro ao salvar:', erro);

        if (erro.status === 0) {
          this.mensagem = 'Servidor indisponível / Verifique a conexão';
        } else if (erro.status === 404) {
          this.mensagem = 'Monitoria não encontrada';
        } else if (erro.status === 400) {
          this.mensagem = typeof erro.error === 'string'
            ? erro.error
            : 'Dados inválidos / Verifique o formulário';
        } else {
          this.mensagem = 'Não foi possível salvar a monitoria';
        }

        this.salvando = false;
        this.cdr.markForCheck();
      }

      
    });
    
  }
  
}
