<template>
    <div>
        <p>{{ usuario.nome }}</p>
        <p>{{ usuario.senha }}</p>
        <p><input type='text' v-model='usuario.nome'/></p>
        <p><input type='text' :value='usuario.senha' @input='senhaMudou'/></p>
        <p v-if='usuario.senha.length < 5'>Senha curta</p>
        <div v-else>Senha ok</div>
        <button @click='store.adicionarUsuario(usuario.nome, usuario.senha)'>Incluir</button>
        <button @click='store.buscarUsuarios'>Atualizar</button>
        <p v-if='store.erro'>{{ store.erro }}</p>
        <table>
            <thead>
                <th>Id</th>
                <th>Nome</th>
            </thead>
            <tbody>
                <tr v-for='usuario in store.usuarios' :key='usuario.id'>
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nome }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { usuarioStore } from '@/stores/usuario';

const store = usuarioStore();

const usuario = ref({ nome: 'teste', senha: '123'});
const id = ref(3);

function senhaMudou(event: any) {
    usuario.value.senha = event.target.value;
}

onMounted(() => {
    store.buscarUsuarios();
});

</script>