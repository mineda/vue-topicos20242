import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usuarioStore = defineStore('usuario', () => {
    
    const usuarios = ref([{ id: 1, nome: 'teste', senha: '123'},
            { id: 2, nome: 'teste2', senha: '123'}
        ]);
    
    const erro = ref<string>();
    
    async function buscarUsuarios() {
        try {
            usuarios.value = ( await axios.get('usuario')).data;
            erro.value = '';
        }
        catch(ex) {
            erro.value = (ex as Error).message;
        }
    }
    
    async function adicionarUsuario(nome: string, senha: string) {
        try {
            await axios.post('usuario', { nome: nome, senha: senha });
            buscarUsuarios();
            erro.value = ''; 
        }
        catch(ex) {
            erro.value = (ex as Error).message;
        }
       
    }

  return { usuarios, erro, buscarUsuarios, adicionarUsuario }
},
{ 
    persist: true 
})
