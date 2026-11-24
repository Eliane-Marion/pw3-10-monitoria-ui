import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VagaMonitoria } from '../models/vaga-monitoria';

@Injectable({
  providedIn: 'root'
})
export class Monitoria {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/monitorias';

  listar() {
    return this.http.get<VagaMonitoria[]>(this.apiUrl);
  }

  buscarPorId(id: number) {
    return this.http.get<VagaMonitoria>(`${this.apiUrl}/${id}`);
  }


  criar(dados: Pick<VagaMonitoria, 'disciplina' | 'nomeMonitor' | 'vagasTotais'>) {
    return this.http.post<VagaMonitoria>(this.apiUrl, dados);
  }

  editar(id: number, monitoria: VagaMonitoria) {
    return this.http.put<VagaMonitoria>(
      `${this.apiUrl}/${id}`, monitoria
    );
  }

  excluir(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  inscrever(id: number) {
    return this.http.post<VagaMonitoria>(
      `${this.apiUrl}/${id}/inscrever`, {}
    );
  }

  
}
