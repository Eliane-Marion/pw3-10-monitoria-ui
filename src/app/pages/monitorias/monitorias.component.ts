import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Monitoria } from '../../services/monitoria.service';
import { VagaMonitoria } from '../../models/vaga-monitoria';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-monitorias',
  imports: [RouterLink],
  templateUrl: './monitorias.component.html',
  styleUrl: './monitorias.component.css'
})
export class Monitorias implements OnInit {

  private monitoriaService = inject(Monitoria);
  private cdr = inject(ChangeDetectorRef);

  monitorias: VagaMonitoria[] = [];
  carregando = true;
  erro = '';
  mensagemAcao = '';

  ngOnInit(): void {
    this.carregarMonitorias();
  }

  carregarMonitorias(): void {
    this.carregando = true;
    this.erro = '';

    this.monitoriaService.listar().subscribe({
      next: (dados) => {
        this.monitorias = dados;
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: (erro) => {
        console.error('Erro ao buscar monitorias:', erro);
        this.erro = 'Não foi possível carregar as monitorias.';
        this.carregando = false;
        this.cdr.markForCheck();
      }
    });
  }

  inscrever(id: number): void {
    this.mensagemAcao = '';

    this.monitoriaService.inscrever(id).subscribe({
      next: () => {
        this.mensagemAcao = 'Inscrição realizada com sucesso!';
        this.carregarMonitorias();
      },



  error: (erro) => {
    console.error('Erro ao inscrever:', erro);

    if (erro.status === 400 || erro.status === 409) {
      this.mensagemAcao =
        typeof erro.error === 'string'
          ? erro.error
          : erro.error?.message || 'Inscrição não permitida.';
    } else if (erro.status === 0) {
      this.mensagemAcao = 'Não foi possível conectar ao servidor.';
    } else {
      this.mensagemAcao = 'Erro ao realizar a inscrição.';
    }

    this.cdr.markForCheck();
  }



    });
  }


excluir(id: number): void {
  const confirmar = confirm('Deseja realmente excluir esta monitoria?');

  if (!confirmar) {
    return;
  }

  this.mensagemAcao = '';

  this.monitoriaService.excluir(id).subscribe({
    next: () => {
      this.mensagemAcao = 'Monitoria excluída com sucesso!';
      this.carregarMonitorias();
    },
    error: (erro) => {
      console.error('Erro ao excluir monitoria:', erro);
      this.mensagemAcao = 'Não foi possível excluir a monitoria.';
      this.cdr.markForCheck();
    }
  });
}

}
