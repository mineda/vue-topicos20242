<template>
    <div>
        <p>{{ usuario.nome }}</p>
        <p>{{ usuario.senha }}</p>
        <p><input type='text' v-model='usuario.nome'/></p>
        <p><input type='text' :value='usuario.senha' @input='senhaMudou'/></p>
        <p v-if='usuario.senha.length < 5'>Senha curta</p>
        <div v-else>Senha ok</div>
        <button @click='adicionarUsuario'>Incluir</button>
        <button @click='buscarUsuarios'>Atualizar</button>
        <p v-if='erro'>{{ erro }}</p>
        <table>
            <thead>
                <th>Id</th>
                <th>Nome</th>
            </thead>
            <tbody>
                <tr v-for='usuario in usuarios' :key='usuario.id'>
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nome }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

const usuario = ref({ nome: 'teste', senha: '123'});
const id = ref(3);

const usuarios = ref([{ id: 1, nome: 'teste', senha: '123'},
        { id: 2, nome: 'teste2', senha: '123'}
    ]);

const erro = ref<string>();

function senhaMudou(event: any) {
    usuario.value.senha = event.target.value;
}

async function buscarUsuarios() {
    try {
        usuarios.value = ( await axios.get('usuario')).data;
        erro.value = '';
    }
    catch(ex) {
        erro.value = (ex as Error).message;
    }
}

async function adicionarUsuario() {
    try {
        await axios.post('usuario', usuario.value);
        buscarUsuarios();
        erro.value = ''; 
    }
    catch(ex) {
        erro.value = (ex as Error).message;
    }
   
}

onMounted(() => {
    buscarUsuarios();
});

</script>